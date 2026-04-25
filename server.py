import json
import os
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ENV_PATH = ROOT / ".env"


def load_env_file():
    if not ENV_PATH.exists():
        return
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


load_env_file()


def json_response(handler, status_code, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def read_json_body(handler):
    length = int(handler.headers.get("Content-Length", "0"))
    raw = handler.rfile.read(length) if length else b"{}"
    return json.loads(raw.decode("utf-8"))


def configured_providers():
    return {
        "openai": {"configured": bool(os.environ.get("OPENAI_API_KEY"))},
        "anthropic": {"configured": bool(os.environ.get("ANTHROPIC_API_KEY"))},
        "google": {"configured": bool(os.environ.get("GOOGLE_API_KEY"))},
    }


def call_openai(model, prompt):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    payload = {
        "model": model,
        "input": prompt,
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))

    output_text = data.get("output_text")
    if output_text:
        return output_text

    texts = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                texts.append(content["text"])
    return "\n".join(texts).strip()


def call_anthropic(model, prompt):
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY is not set")

    payload = {
        "model": model,
        "max_tokens": 1600,
        "messages": [
            {"role": "user", "content": prompt},
        ],
    }
    request = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))

    texts = []
    for content in data.get("content", []):
      if content.get("type") == "text" and content.get("text"):
        texts.append(content["text"])
    return "\n".join(texts).strip()


def call_google(model, prompt):
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError("GOOGLE_API_KEY is not set")

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                ]
            }
        ]
    }
    request = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-goog-api-key": api_key,
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))

    texts = []
    for candidate in data.get("candidates", []):
        content = candidate.get("content", {})
        for part in content.get("parts", []):
            if part.get("text"):
                texts.append(part["text"])
    return "\n".join(texts).strip()


def generate_text(provider, model, prompt):
    if provider == "openai":
        return call_openai(model, prompt)
    if provider == "anthropic":
        return call_anthropic(model, prompt)
    if provider == "google":
        return call_google(model, prompt)
    raise RuntimeError(f"Unsupported provider: {provider}")


class AppHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/providers":
            json_response(self, 200, {"providers": configured_providers()})
            return
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/generate":
            json_response(self, 404, {"error": "Not found"})
            return

        try:
            body = read_json_body(self)
            provider = body.get("provider", "").strip()
            model = body.get("model", "").strip()
            prompt = body.get("prompt", "").strip()
            if not provider or not model or not prompt:
                raise RuntimeError("provider, model, and prompt are required")

            text = generate_text(provider, model, prompt)
            json_response(self, 200, {"text": text})
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8", errors="ignore")
            json_response(self, error.code, {"error": detail or str(error)})
        except Exception as error:
            json_response(self, 500, {"error": str(error)})

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", port), AppHandler)
    print(f"WebWritingTool server running at http://127.0.0.1:{port}")
    server.serve_forever()
