const storageKeys = {
  accounts: "writing-app-accounts",
  selectedAccountId: "writing-app-selected-account-id",
  platformSettings: "writing-app-platform-settings",
  savedResearchLog: "writing-app-saved-research-log",
  llmProvider: "writing-app-llm-provider",
  llmModel: "writing-app-llm-model",
};

const llmDefaults = {
  openai: "gpt-5",
  anthropic: "claude-sonnet-4-20250514",
  google: "gemini-2.5-flash",
};

const basePlatformProfiles = {
  note: {
    label: "Note",
    strategy: "導入で共感や問題意識を置き、見出しで整理しながら最後に学びやCTAへ着地する。",
    structure: "1. 導入で共感と問題意識\n2. 本題で事実・観察・示唆を整理\n3. 実践ポイント\n4. まとめと次の行動",
    hookStyle: "読み進めたくなる導入と、保存したくなる整理感を重視する。",
    lengthGuide: "1,500〜3,000字",
    hashtags: "必要なら 0〜2 個",
    headingCount: "3〜4個",
    ctaStrength: "medium",
    notes: "導入で読む理由を明確にし、最後は学びか次の行動で締める。",
  },
  x: {
    label: "X",
    strategy: "冒頭1文で結論を置き、短文連投しやすいテンポでフックを強くする。",
    structure: "1. 1投稿目で結論\n2. 2-4投稿目で根拠や具体例\n3. 終盤で学びを要約\n4. 最後にCTA",
    hookStyle: "最初の1文で止まっても意味が伝わる強い書き出しにする。",
    lengthGuide: "1投稿 90〜140字 / スレッド 5〜8投稿",
    hashtags: "0〜2個",
    headingCount: "見出しなし",
    ctaStrength: "strong",
    notes: "最初の1投稿目に結論を置き、改行多めで読みやすくする。",
  },
  wordpress: {
    label: "WordPress",
    strategy: "検索流入も意識しながら、悩みの整理、解決策、実践例を順番に並べて信頼感を積み上げる。",
    structure: "1. 読者の悩みを言語化\n2. 背景と前提を整理\n3. 解決策やノウハウ\n4. 実践例\n5. まとめと次の導線",
    hookStyle: "検索意図に答える見出しと、本文での具体性を重視する。",
    lengthGuide: "2,000〜4,000字",
    hashtags: "基本なし",
    headingCount: "4〜6個",
    ctaStrength: "medium",
    notes: "検索意図に合わせた見出し構成と、具体例の厚みを意識する。",
  },
  ameblo: {
    label: "Amebaブログ",
    strategy: "人柄や日常感を残しつつ、読者との距離が近い語り口でストーリー性を持たせる。",
    structure: "1. 近況や導入\n2. 今日のテーマ\n3. 気づきやエピソード\n4. 読者への問いかけや締め",
    hookStyle: "感情の温度感や親しみやすさが伝わる流れにする。",
    lengthGuide: "800〜2,000字",
    hashtags: "文末に 2〜5 個",
    headingCount: "2〜3個",
    ctaStrength: "soft",
    notes: "人柄が見える一言や日常の文脈を入れると馴染みやすい。",
  },
  instagram: {
    label: "Instagram",
    strategy: "最初の一文と改行で読みやすさをつくり、共感、実用性、保存価値を短く濃くまとめる。",
    structure: "1. フック\n2. 共感や問題提起\n3. ポイントを箇条書き的に整理\n4. 保存・コメント導線",
    hookStyle: "視認性の高い短文、改行、保存したくなる要点整理を重視する。",
    lengthGuide: "キャプション 300〜800字",
    hashtags: "3〜8個",
    headingCount: "見出しなし",
    ctaStrength: "medium",
    notes: "短文と改行を増やし、保存したくなる要点整理に寄せる。",
  },
  threads: {
    label: "Threads",
    strategy: "会話に入りやすい口調で、短めの段落を重ねながら共感と意見を自然につなぐ。",
    structure: "1. 話しかける導入\n2. 背景や体感\n3. 意見や学び\n4. 軽いCTAや問いかけ",
    hookStyle: "タイムラインで浮かない自然さと、反応しやすい余白を残す。",
    lengthGuide: "250〜500字",
    hashtags: "0〜3個",
    headingCount: "見出しなし",
    ctaStrength: "soft",
    notes: "会話の延長に見える自然なトーンと、反応しやすい問いが相性良い。",
  },
};

const defaultAccounts = [
  {
    id: crypto.randomUUID(),
    name: "個人開発アカウント",
    purpose: "プロダクトづくりや学びの発信",
    tone: "親しみやすく、現場感のある語り口",
    audience: "個人開発者、クリエイター",
    goal: "共感獲得とフォロー促進",
  },
  {
    id: crypto.randomUUID(),
    name: "法人広報アカウント",
    purpose: "サービスの信頼感を高める発信",
    tone: "落ち着いて誠実、過度に煽らない",
    audience: "導入検討中の担当者、既存顧客",
    goal: "認知拡大と問い合わせ導線",
  },
];

const els = {
  briefForm: document.getElementById("briefForm"),
  platformSelect: document.getElementById("platformSelect"),
  accountSelect: document.getElementById("accountSelect"),
  keywordsInput: document.getElementById("keywordsInput"),
  audienceInput: document.getElementById("audienceInput"),
  topicInput: document.getElementById("topicInput"),
  mustIncludeInput: document.getElementById("mustIncludeInput"),
  avoidInput: document.getElementById("avoidInput"),
  sourcesInput: document.getElementById("sourcesInput"),
  trendCheck: document.getElementById("trendCheck"),
  officialNewsCheck: document.getElementById("officialNewsCheck"),
  competitorCheck: document.getElementById("competitorCheck"),
  researchSubjectInput: document.getElementById("researchSubjectInput"),
  officialDomainInput: document.getElementById("officialDomainInput"),
  competitorsInput: document.getElementById("competitorsInput"),
  buildResearchLinksButton: document.getElementById("buildResearchLinksButton"),
  openResearchSweepButton: document.getElementById("openResearchSweepButton"),
  saveResearchLogButton: document.getElementById("saveResearchLogButton"),
  researchLinks: document.getElementById("researchLinks"),
  savedResearchSummary: document.getElementById("savedResearchSummary"),
  platformPresetSummary: document.getElementById("platformPresetSummary"),
  researchNotesInput: document.getElementById("researchNotesInput"),
  sourceUrlsInput: document.getElementById("sourceUrlsInput"),
  sourceUrlList: document.getElementById("sourceUrlList"),
  sourceTextsInput: document.getElementById("sourceTextsInput"),
  factCheckTargetsInput: document.getElementById("factCheckTargetsInput"),
  factCheckLinkList: document.getElementById("factCheckLinkList"),
  factsInput: document.getElementById("factsInput"),
  insightsInput: document.getElementById("insightsInput"),
  openQuestionsInput: document.getElementById("openQuestionsInput"),
  researchSummary: document.getElementById("researchSummary"),
  planPreview: document.getElementById("planPreview"),
  planEditor: document.getElementById("planEditor"),
  planStatus: document.getElementById("planStatus"),
  appModeTitle: document.getElementById("appModeTitle"),
  appModeText: document.getElementById("appModeText"),
  llmSetupGuide: document.getElementById("llmSetupGuide"),
  llmProviderSelect: document.getElementById("llmProviderSelect"),
  llmModelInput: document.getElementById("llmModelInput"),
  llmStatusText: document.getElementById("llmStatusText"),
  generateWithLlmButton: document.getElementById("generateWithLlmButton"),
  llmOutput: document.getElementById("llmOutput"),
  draftPreview: document.getElementById("draftPreview"),
  draftStatus: document.getElementById("draftStatus"),
  draftNotesInput: document.getElementById("draftNotesInput"),
  openSettingsButton: document.getElementById("openSettingsButton"),
  settingsDialog: document.getElementById("settingsDialog"),
  accountCards: document.getElementById("accountCards"),
  accountNameInput: document.getElementById("accountNameInput"),
  accountPurposeInput: document.getElementById("accountPurposeInput"),
  accountToneInput: document.getElementById("accountToneInput"),
  accountAudienceInput: document.getElementById("accountAudienceInput"),
  accountGoalInput: document.getElementById("accountGoalInput"),
  saveAccountButton: document.getElementById("saveAccountButton"),
  newAccountButton: document.getElementById("newAccountButton"),
  deleteAccountButton: document.getElementById("deleteAccountButton"),
  platformCards: document.getElementById("platformCards"),
  platformLengthInput: document.getElementById("platformLengthInput"),
  platformHashtagsInput: document.getElementById("platformHashtagsInput"),
  platformHeadingCountInput: document.getElementById("platformHeadingCountInput"),
  platformCtaStrengthInput: document.getElementById("platformCtaStrengthInput"),
  platformNotesInput: document.getElementById("platformNotesInput"),
  savePlatformButton: document.getElementById("savePlatformButton"),
  copyOutputButton: document.getElementById("copyOutputButton"),
  copyDraftButton: document.getElementById("copyDraftButton"),
  resetButton: document.getElementById("resetButton"),
  approvePlanButton: document.getElementById("approvePlanButton"),
  rebuildPlanButton: document.getElementById("rebuildPlanButton"),
};

let platformProfiles = loadPlatformProfiles();
let accounts = loadAccounts();
let selectedAccountId = loadSelectedAccountId();
let editingAccountId = selectedAccountId || accounts[0]?.id || null;
let editingPlatformKey = "note";
let savedResearchLog = loadSavedResearchLog();
let llmProvider = loadLlmProvider();
let llmModel = loadLlmModel();

hydrate();

function hydrate() {
  renderAccountSelect();
  renderAccountCards();
  renderPlatformCards();
  fillAccountEditor(editingAccountId);
  fillPlatformEditor(editingPlatformKey);
  renderPlatformPresetSummary();
  renderResearchLinks();
  hydrateSavedResearchLog();
  renderSourceUrlList();
  renderFactCheckLinks();
  hydrateLlmSettings();
  renderAppMode();
  attachEvents();
  void refreshLlmStatus();
}

function attachEvents() {
  els.briefForm.addEventListener("submit", (event) => {
    event.preventDefault();
    buildPlanFromInputs();
  });

  els.resetButton.addEventListener("click", () => {
    els.briefForm.reset();
    els.trendCheck.checked = true;
    els.officialNewsCheck.checked = true;
    renderPlatformPresetSummary();
    renderEmptyState();
  });

  els.approvePlanButton.addEventListener("click", () => {
    const planText = els.planEditor.value.trim() || els.planPreview.textContent.trim();
    if (!planText || planText.includes("方針をつくると")) {
      window.alert("先に方針を作成してください。");
      return;
    }
    buildDraft(planText);
  });

  els.rebuildPlanButton.addEventListener("click", buildPlanFromInputs);

  els.copyDraftButton.addEventListener("click", async () => {
    const text = els.draftPreview.textContent.trim();
    if (!text || text.includes("方針が確定したら")) {
      window.alert("コピーするプロンプトがまだありません。");
      return;
    }
    await navigator.clipboard.writeText(text);
    els.copyDraftButton.textContent = "コピー済み";
    window.setTimeout(() => {
      els.copyDraftButton.textContent = "プロンプトをコピー";
    }, 1600);
  });

  els.copyOutputButton.addEventListener("click", async () => {
    const text = els.llmOutput.textContent.trim();
    if (!text || text.includes("APIキーを設定して")) {
      window.alert("コピーする生成結果がまだありません。");
      return;
    }
    await navigator.clipboard.writeText(text);
    els.copyOutputButton.textContent = "コピー済み";
    window.setTimeout(() => {
      els.copyOutputButton.textContent = "生成結果をコピー";
    }, 1600);
  });

  els.openSettingsButton.addEventListener("click", () => {
    renderAccountCards();
    fillAccountEditor(editingAccountId);
    els.settingsDialog.showModal();
  });

  els.saveAccountButton.addEventListener("click", saveAccount);
  els.newAccountButton.addEventListener("click", createNewAccountDraft);
  els.deleteAccountButton.addEventListener("click", deleteAccount);
  els.savePlatformButton.addEventListener("click", savePlatformProfile);
  els.platformSelect.addEventListener("change", renderPlatformPresetSummary);
  els.buildResearchLinksButton.addEventListener("click", renderResearchLinks);
  els.openResearchSweepButton.addEventListener("click", openResearchSweep);
  els.saveResearchLogButton.addEventListener("click", saveResearchLog);
  els.generateWithLlmButton.addEventListener("click", generateWithLlm);
  els.keywordsInput.addEventListener("input", renderResearchLinks);
  els.researchSubjectInput.addEventListener("input", renderResearchLinks);
  els.officialDomainInput.addEventListener("input", renderResearchLinks);
  els.competitorsInput.addEventListener("input", renderResearchLinks);
  els.trendCheck.addEventListener("change", renderResearchLinks);
  els.officialNewsCheck.addEventListener("change", renderResearchLinks);
  els.competitorCheck.addEventListener("change", renderResearchLinks);
  els.sourceUrlsInput.addEventListener("input", renderSourceUrlList);
  els.factCheckTargetsInput.addEventListener("input", renderFactCheckLinks);
  els.officialDomainInput.addEventListener("input", renderFactCheckLinks);
  els.llmProviderSelect.addEventListener("change", onLlmProviderChange);
  els.llmModelInput.addEventListener("input", onLlmModelInput);
}

function loadPlatformProfiles() {
  const raw = localStorage.getItem(storageKeys.platformSettings);
  if (!raw) {
    return structuredClone(basePlatformProfiles);
  }

  try {
    const parsed = JSON.parse(raw);
    return Object.fromEntries(
      Object.entries(basePlatformProfiles).map(([key, profile]) => [
        key,
        { ...profile, ...(parsed[key] || {}) },
      ])
    );
  } catch {
    return structuredClone(basePlatformProfiles);
  }
}

function loadAccounts() {
  const raw = localStorage.getItem(storageKeys.accounts);
  if (!raw) {
    localStorage.setItem(storageKeys.accounts, JSON.stringify(defaultAccounts));
    return [...defaultAccounts];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultAccounts];
  } catch {
    return [...defaultAccounts];
  }
}

function loadSavedResearchLog() {
  const raw = localStorage.getItem(storageKeys.savedResearchLog);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadLlmProvider() {
  return localStorage.getItem(storageKeys.llmProvider) || "openai";
}

function loadLlmModel() {
  return localStorage.getItem(storageKeys.llmModel) || llmDefaults[loadLlmProvider()] || llmDefaults.openai;
}

function loadSelectedAccountId() {
  return localStorage.getItem(storageKeys.selectedAccountId) || accounts[0]?.id || null;
}

function persistAccounts() {
  localStorage.setItem(storageKeys.accounts, JSON.stringify(accounts));
  localStorage.setItem(storageKeys.selectedAccountId, selectedAccountId);
}

function persistPlatformProfiles() {
  localStorage.setItem(storageKeys.platformSettings, JSON.stringify(platformProfiles));
}

function persistSavedResearchLog() {
  localStorage.setItem(storageKeys.savedResearchLog, JSON.stringify(savedResearchLog));
}

function persistLlmSettings() {
  localStorage.setItem(storageKeys.llmProvider, llmProvider);
  localStorage.setItem(storageKeys.llmModel, llmModel);
}

function hydrateLlmSettings() {
  els.llmProviderSelect.value = llmProvider;
  els.llmModelInput.value = llmModel;
}

function onLlmProviderChange() {
  llmProvider = els.llmProviderSelect.value;
  if (!els.llmModelInput.value.trim() || Object.values(llmDefaults).includes(llmModel)) {
    llmModel = llmDefaults[llmProvider];
    els.llmModelInput.value = llmModel;
  } else {
    llmModel = els.llmModelInput.value.trim();
  }
  persistLlmSettings();
  void refreshLlmStatus();
}

function onLlmModelInput() {
  llmModel = els.llmModelInput.value.trim();
  persistLlmSettings();
}

async function refreshLlmStatus() {
  try {
    const response = await fetch("/api/providers");
    if (!response.ok) {
      throw new Error("status");
    }
    const data = await response.json();
    const current = data.providers?.[llmProvider];
    if (current?.configured) {
      els.llmStatusText.textContent = `${labelForProvider(llmProvider)} のAPIキー設定済み。モデル: ${llmModel || llmDefaults[llmProvider]}`;
    } else {
      els.llmStatusText.textContent = `${labelForProvider(llmProvider)} のAPIキーが未設定です。.env にキーを入れると生成できます。`;
    }
    renderAppMode(data.providers);
  } catch {
    els.llmStatusText.textContent = "ローカルAPIサーバーに未接続です。`python server.py` で起動してください。";
    renderAppMode();
  }
}

async function generateWithLlm() {
  const planText = els.planEditor.value.trim() || els.planPreview.textContent.trim();
  if (!planText || planText.includes("方針をつくると")) {
    window.alert("先に方針を作成してください。");
    return;
  }

  const brief = collectBrief();
  const account = accounts.find((item) => item.id === brief.accountId);
  const profile = platformProfiles[brief.platform] || platformProfiles.note;
  const audienceText = brief.customAudience || account?.audience || "読者";
  const subject = brief.researchSubject || brief.keywords || brief.topic || "この話題";
  const prompt = buildGenerationPrompt({
    brief,
    account,
    profile,
    audienceText,
    subject,
    planText,
    notes: els.draftNotesInput.value.trim(),
  });

  els.llmOutput.textContent = "生成中...";
  els.llmOutput.classList.remove("empty-state");

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: llmProvider,
        model: els.llmModelInput.value.trim() || llmDefaults[llmProvider],
        prompt,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "LLM generation failed");
    }

    els.llmOutput.textContent = data.text || "本文を取得できませんでした。";
    els.draftStatus.textContent = "生成済み";
  } catch (error) {
    els.llmOutput.textContent = `生成に失敗しました: ${error.message}`;
    els.llmOutput.classList.remove("empty-state");
  }
}

function labelForProvider(provider) {
  if (provider === "anthropic") {
    return "Claude";
  }
  if (provider === "google") {
    return "Gemini";
  }
  return "OpenAI";
}

function renderAppMode(providers) {
  const isLocalApp = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
  if (isLocalApp) {
    const configuredCount = providers
      ? Object.values(providers).filter((provider) => provider.configured).length
      : 0;
    els.appModeTitle.textContent = "ローカルLLM版";
    els.appModeText.textContent = configuredCount
      ? `APIキー設定済みプロバイダ: ${configuredCount}件。調査整理に加えて本文生成まで使えます。`
      : "調査整理とプロンプト生成は使えます。.env に API キーを入れると本文生成まで使えます。";
    els.llmSetupGuide.textContent = [
      "1. Step 1 と Step 2 を埋める",
      "2. .env に使いたい API キーを入れる",
      "3. python server.py を起動したまま Step 3 で本文生成する",
    ].join("\n");
    return;
  }

  els.appModeTitle.textContent = "GitHub Pages版";
  els.appModeText.textContent = "調査整理と生成プロンプト作成が使えます。本文生成はローカル版で使います。";
  els.llmSetupGuide.textContent = [
    "1. Pages版では調査と方針整理まで進める",
    "2. 生成プロンプトをコピーする",
    "3. ローカル版または ChatGPT / Claude / Gemini に渡して本文化する",
  ].join("\n");
}

function renderAccountSelect() {
  els.accountSelect.innerHTML = "";

  accounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = account.name;
    if (account.id === selectedAccountId) {
      option.selected = true;
    }
    els.accountSelect.append(option);
  });

  els.accountSelect.onchange = () => {
    selectedAccountId = els.accountSelect.value;
    editingAccountId = selectedAccountId;
    persistAccounts();
  };
}

function renderAccountCards() {
  els.accountCards.innerHTML = "";

  accounts.forEach((account) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `account-card${account.id === editingAccountId ? " is-active" : ""}`;
    card.innerHTML = `<strong>${escapeHtml(account.name)}</strong><p>${escapeHtml(account.purpose || "用途未設定")}</p>`;
    card.addEventListener("click", () => {
      editingAccountId = account.id;
      fillAccountEditor(account.id);
      renderAccountCards();
    });
    els.accountCards.append(card);
  });
}

function renderPlatformCards() {
  els.platformCards.innerHTML = "";

  Object.entries(platformProfiles).forEach(([key, profile]) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `account-card${key === editingPlatformKey ? " is-active" : ""}`;
    card.innerHTML = `<strong>${escapeHtml(profile.label)}</strong><p>${escapeHtml(profile.lengthGuide || "文字数未設定")}</p>`;
    card.addEventListener("click", () => {
      editingPlatformKey = key;
      fillPlatformEditor(key);
      renderPlatformCards();
    });
    els.platformCards.append(card);
  });
}

function fillAccountEditor(accountId) {
  const account = accounts.find((item) => item.id === accountId) || accounts[0];
  if (!account) {
    return;
  }

  editingAccountId = account.id;
  els.accountNameInput.value = account.name || "";
  els.accountPurposeInput.value = account.purpose || "";
  els.accountToneInput.value = account.tone || "";
  els.accountAudienceInput.value = account.audience || "";
  els.accountGoalInput.value = account.goal || "";
}

function fillPlatformEditor(platformKey) {
  const profile = platformProfiles[platformKey] || platformProfiles.note;
  editingPlatformKey = platformKey;
  els.platformLengthInput.value = profile.lengthGuide || "";
  els.platformHashtagsInput.value = profile.hashtags || "";
  els.platformHeadingCountInput.value = profile.headingCount || "";
  els.platformCtaStrengthInput.value = profile.ctaStrength || "medium";
  els.platformNotesInput.value = profile.notes || "";
}

function saveAccount() {
  const payload = {
    id: editingAccountId || crypto.randomUUID(),
    name: els.accountNameInput.value.trim() || "新しいアカウント",
    purpose: els.accountPurposeInput.value.trim(),
    tone: els.accountToneInput.value.trim(),
    audience: els.accountAudienceInput.value.trim(),
    goal: els.accountGoalInput.value.trim(),
  };

  const index = accounts.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    accounts[index] = payload;
  } else {
    accounts.unshift(payload);
  }

  editingAccountId = payload.id;
  selectedAccountId = payload.id;
  persistAccounts();
  renderAccountSelect();
  renderAccountCards();
  fillAccountEditor(payload.id);
}

function createNewAccountDraft() {
  editingAccountId = null;
  els.accountNameInput.value = "";
  els.accountPurposeInput.value = "";
  els.accountToneInput.value = "";
  els.accountAudienceInput.value = "";
  els.accountGoalInput.value = "";
  renderAccountCards();
}

function deleteAccount() {
  if (accounts.length === 1) {
    window.alert("最後の1件は削除できません。");
    return;
  }

  if (!editingAccountId) {
    return;
  }

  accounts = accounts.filter((account) => account.id !== editingAccountId);
  selectedAccountId = accounts[0].id;
  editingAccountId = accounts[0].id;
  persistAccounts();
  renderAccountSelect();
  renderAccountCards();
  fillAccountEditor(editingAccountId);
}

function savePlatformProfile() {
  const key = editingPlatformKey;
  const current = platformProfiles[key];
  platformProfiles[key] = {
    ...current,
    lengthGuide: els.platformLengthInput.value.trim(),
    hashtags: els.platformHashtagsInput.value.trim(),
    headingCount: els.platformHeadingCountInput.value.trim(),
    ctaStrength: els.platformCtaStrengthInput.value,
    notes: els.platformNotesInput.value.trim(),
  };

  persistPlatformProfiles();
  renderPlatformCards();
  renderPlatformPresetSummary();
}

function renderPlatformPresetSummary() {
  const profile = platformProfiles[els.platformSelect.value] || platformProfiles.note;
  const ctaLabels = {
    soft: "やさしめ",
    medium: "標準",
    strong: "強め",
  };

  els.platformPresetSummary.textContent = [
    `${profile.label} の現在設定`,
    `文字数目安: ${profile.lengthGuide || "未設定"}`,
    `ハッシュタグ: ${profile.hashtags || "未設定"}`,
    `見出し数: ${profile.headingCount || "未設定"}`,
    `CTAの強さ: ${ctaLabels[profile.ctaStrength] || "標準"}`,
    `運用メモ: ${profile.notes || "未設定"}`,
  ].join("\n");
}

function renderResearchLinks() {
  const brief = collectBrief();
  const subject = brief.researchSubject || brief.keywords || brief.topic;
  const links = buildResearchLinks(brief, subject);

  if (!links.length) {
    els.researchLinks.textContent = "テーマとドメインを入れると、Google Trends、Google News、公式サイト検索、競合比較用のリンクがここに出ます。";
    els.researchLinks.classList.add("empty-state");
    return;
  }

  els.researchLinks.classList.remove("empty-state");
  els.researchLinks.innerHTML = links.map((link) => `
    <article class="research-link-card">
      <span class="mini-label">${escapeHtml(link.group)}</span>
      <a href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>
      <p>${escapeHtml(link.description)}</p>
    </article>
  `).join("");
}

function buildResearchLinks(brief, subject) {
  if (!subject) {
    return [];
  }

  const normalizedDomain = normalizeDomain(brief.officialDomain);
  const links = [];

  if (brief.researchTargets.includes("Googleトレンド")) {
    links.push({
      group: "Official Research",
      label: "Google Trends で調べる",
      description: `${subject} の検索需要や関連トピックを確認する`,
      url: `https://trends.google.com/trends/explore?date=today%2012-m&q=${encodeURIComponent(subject)}`,
    });
  }

  if (brief.researchTargets.includes("公式ニュース")) {
    links.push({
      group: "Official Research",
      label: "Google News で検索する",
      description: `${subject} の最新ニュースや報道の流れを確認する`,
      url: `https://news.google.com/search?q=${encodeURIComponent(subject)}`,
    });
  }

  if (normalizedDomain) {
    links.push({
      group: "Official Research",
      label: "公式サイト内を検索する",
      description: `${normalizedDomain} 内で ${subject} に関する公式情報を探す`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:${normalizedDomain} ${subject}`)}`,
    });
    links.push({
      group: "Official Research",
      label: "公式ニュースルームを探す",
      description: "プレスリリース、発表、アナウンスを確認する",
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:${normalizedDomain} (${subject}) (news OR newsroom OR press release OR announcement OR blog)`)}`,
    });
    links.push({
      group: "Official Research",
      label: "公式ヘルプ / FAQ を探す",
      description: "仕様変更、利用可否、プラン条件を確認する",
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:${normalizedDomain} ${subject} (help OR faq OR support OR pricing OR plan)`)}`,
    });
  }

  if (brief.researchTargets.includes("周辺事例")) {
    const competitors = brief.competitors
      .split(/[、,]/)
      .map((name) => name.trim())
      .filter(Boolean)
      .slice(0, 3);

    competitors.forEach((competitor) => {
      links.push({
        group: "Competitive Research",
        label: `${competitor} と比較する`,
        description: `${subject} との違いや比較文脈を把握する`,
        url: `https://www.google.com/search?q=${encodeURIComponent(`${subject} ${competitor} comparison`)}`,
      });
    });
  }

  links.push({
    group: "General Verification",
    label: "一般検索で事実確認する",
    description: "噂やSNS投稿だけでなく、一次情報や複数ソースで裏取りする",
    url: `https://www.google.com/search?q=${encodeURIComponent(subject)}`,
  });

  links.push({
    group: "General Verification",
    label: "SNS上の反応を検索する",
    description: "実際に困っている人や話題化の有無を探る",
    url: `https://www.google.com/search?q=${encodeURIComponent(`${subject} X OR Twitter OR Reddit OR Threads`)}`,
  });

  return links.sort((left, right) => rankResearchGroup(left.group) - rankResearchGroup(right.group));
}

function rankResearchGroup(group) {
  if (group === "Official Research") {
    return 0;
  }
  if (group === "Competitive Research") {
    return 1;
  }
  return 2;
}

function openResearchSweep() {
  const brief = collectBrief();
  const subject = brief.researchSubject || brief.keywords || brief.topic;
  const links = buildResearchLinks(brief, subject).slice(0, 6);
  links.forEach((link) => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  });
}

function buildPlanFromInputs() {
  const brief = collectBrief();
  const account = accounts.find((item) => item.id === brief.accountId);
  const profile = platformProfiles[brief.platform] || platformProfiles.note;
  const audienceText = brief.customAudience || account?.audience || "未入力";

  const researchSummary = [
    `確認対象: ${brief.researchTargets.join(" / ") || "指定なし"}`,
    `出力先: ${profile.label}`,
    `キーワード: ${brief.keywords || "未入力"}`,
    `調査テーマ: ${brief.researchSubject || "未入力"}`,
    `公式ドメイン: ${brief.officialDomain || "未入力"}`,
    `ターゲット読者: ${audienceText}`,
    `文字数目安: ${profile.lengthGuide || "未設定"}`,
    `調査メモ: ${brief.researchNotes || "未入力"}`,
    `確認できた事実: ${brief.facts || "未入力"}`,
    `仮説・読み: ${brief.insights || "未入力"}`,
    `未確認ポイント: ${brief.openQuestions || "未入力"}`,
    `参考メモ: ${brief.sourceNotes || "未入力"}`,
  ].join("\n");

  const plan = [
    `対象アカウント: ${account?.name || "未設定アカウント"}`,
    `出力先: ${profile.label}`,
    `アカウントの役割: ${account?.purpose || "未設定"}`,
    `推奨トーン: ${account?.tone || "未設定"}`,
    `想定ユーザー層: ${audienceText}`,
    "",
    "執筆方針",
    `${profile.strategy}`,
    `媒体特性メモ: ${profile.hookStyle}`,
    `文字数目安: ${profile.lengthGuide || "未設定"}`,
    `ハッシュタグ方針: ${profile.hashtags || "未設定"}`,
    `見出し数目安: ${profile.headingCount || "未設定"}`,
    `CTAの強さ: ${describeCtaStrength(profile.ctaStrength)}`,
    `${profile.notes ? `運用メモ: ${profile.notes}` : "運用メモ: 未設定"}`,
    `${brief.topic ? `主題は「${brief.topic}」を中心に据える。` : "主題は入力キーワードを軸に具体例を加えて立ち上げる。"}`,
    `${brief.mustInclude ? `必須要素として ${brief.mustInclude} を盛り込む。` : "必要に応じて事例・観察・学びの順で厚みをつくる。"}`,
    `${brief.avoid ? `避けたいこと: ${brief.avoid}` : "煽り表現や断定が強すぎる表現は避ける。"}`,
    `${brief.facts ? `確認済みの事実: ${brief.facts}` : "確認済みの事実: 明記されていないので、推測は事実として書かない。"}`,
    `${brief.insights ? `事実からの読み: ${brief.insights}` : "事実からの読み: 確認できた事実から解釈を分けて書く。"}`,
    `${brief.openQuestions ? `未確認ポイント: ${brief.openQuestions}` : "未確認ポイント: 不確かな点は断定せず、注意書きを残す。"}`,
    `読者への寄せ方: ${audienceText} が「自分向けの内容だ」と感じる語彙と具体例を優先する。`,
    "",
    "構成案",
    profile.structure,
    "",
    "見出し・フック案",
    buildHooks(brief, account, profile),
    "",
    "狙い",
    `${account?.goal || "反応を得る"} を意識しつつ、${audienceText} に刺さる切り口にする。`,
  ].join("\n");

  els.researchSummary.textContent = researchSummary;
  els.researchSummary.classList.remove("empty-state");
  els.planPreview.textContent = plan;
  els.planPreview.classList.remove("empty-state");
  els.planEditor.value = plan;
  els.planStatus.textContent = "レビュー待ち";
  els.draftPreview.textContent = "方針が確定したらここに生成プロンプトが出ます。";
  els.draftPreview.classList.add("empty-state");
  els.llmOutput.textContent = "APIキーを設定して「LLMで本文生成」を押すと、ここに本文が出ます。";
  els.llmOutput.classList.add("empty-state");
  els.draftStatus.textContent = "未作成";
}

function collectBrief() {
  return {
    platform: els.platformSelect.value,
    accountId: els.accountSelect.value,
    keywords: els.keywordsInput.value.trim(),
    customAudience: els.audienceInput.value.trim(),
    topic: els.topicInput.value.trim(),
    mustInclude: els.mustIncludeInput.value.trim(),
    avoid: els.avoidInput.value.trim(),
    sourceNotes: els.sourcesInput.value.trim(),
    sourceUrls: parseSourceUrls(els.sourceUrlsInput.value),
    sourceTexts: els.sourceTextsInput.value.trim(),
    researchNotes: els.researchNotesInput.value.trim(),
    researchSubject: els.researchSubjectInput.value.trim(),
    officialDomain: els.officialDomainInput.value.trim(),
    competitors: els.competitorsInput.value.trim(),
    factCheckTargets: parseMultilineItems(els.factCheckTargetsInput.value),
    facts: els.factsInput.value.trim(),
    insights: els.insightsInput.value.trim(),
    openQuestions: els.openQuestionsInput.value.trim(),
    researchTargets: [
      els.trendCheck.checked ? "Googleトレンド" : "",
      els.officialNewsCheck.checked ? "公式ニュース" : "",
      els.competitorCheck.checked ? "周辺事例" : "",
    ].filter(Boolean),
  };
}

function parseSourceUrls(value) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseMultilineItems(value) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildHooks(brief, account, profile) {
  const baseKeyword = brief.keywords || "いま気になっているテーマ";
  if (brief.platform === "note" || brief.platform === "wordpress" || brief.platform === "ameblo") {
    return [
      `・${baseKeyword}を見て、発信の切り口をどう変えるか`,
      `・${brief.customAudience || account?.audience || "読者"}が知っておきたいポイント`,
      `・${profile.label}らしい見せ方で、調査メモの変化を噛み砕く`,
    ].join("\n");
  }

  if (brief.platform === "instagram" || brief.platform === "threads") {
    return [
      `・${baseKeyword}、いま共感されやすい切り口`,
      `・${brief.customAudience || account?.audience || "読者"}に保存・反応されやすい要点`,
      `・${profile.label}向けに短く強く伝えるなら何を残すか`,
    ].join("\n");
  }

  return [
    `・${baseKeyword}、いま見ておく価値がある理由`,
    "・公式情報と実感を並べると、見え方がかなり変わる",
    "・この話題を発信に乗せるなら、まず押さえたいポイント",
  ].join("\n");
}

function buildDraft(planText) {
  const brief = collectBrief();
  const account = accounts.find((item) => item.id === brief.accountId);
  const profile = platformProfiles[brief.platform] || platformProfiles.note;
  const notes = els.draftNotesInput.value.trim();
  const audienceText = brief.customAudience || account?.audience || "読者";
  const subject = brief.researchSubject || brief.keywords || brief.topic || "この話題";
  const prompt = buildGenerationPrompt({
    brief,
    account,
    profile,
    audienceText,
    subject,
    planText,
    notes,
  });

  els.draftPreview.textContent = prompt;
  els.draftPreview.classList.remove("empty-state");
  els.draftStatus.textContent = "生成済み";
  els.planStatus.textContent = "確定";
}

function buildGenerationPrompt({ brief, account, profile, audienceText, subject, planText, notes }) {
  const platformLabel = profile.label;
  const styleGuide = getPlatformOutputGuide(brief.platform);
  const sourceLine = brief.sourceUrls.length ? brief.sourceUrls.join("\n- ") : "なし";
  const sourceTexts = brief.sourceTexts || "なし";
  const factCheckLine = brief.factCheckTargets.length ? brief.factCheckTargets.join("\n- ") : "なし";

  return [
    `あなたは日本語のSNS/ブログ編集者です。${platformLabel}向けに、読者が思わず止まる自然な文章を書いてください。`,
    "",
    "絶対条件",
    "- 入力を言い換えるだけの説明文にしない",
    "- 最初の1〜2文で『え、そうなの？』と気になる入りにする",
    "- 事実と推測を分ける",
    "- 人がそのまま投稿したような温度感にする",
    "- 不自然なまとめ方、説明調、箇条書き調を避ける",
    `- 出力先は ${platformLabel}。${styleGuide}`,
    "- 元ソースの主張をそのまま写さず、自分の投稿として再構成する",
    "",
    "この投稿で伝えたいこと",
    `- テーマ: ${subject}`,
    `- 誰向けか: ${audienceText}`,
    `- アカウントの役割: ${account?.purpose || "未設定"}`,
    `- トーン: ${account?.tone || "未設定"}`,
    `- 狙い: ${account?.goal || "未設定"}`,
    "",
    "調査で確認できたこと",
    `- 先に公式確認したい論点:\n- ${factCheckLine}`,
    `- 事実: ${brief.facts || "未入力"}`,
    `- 読み/仮説: ${brief.insights || "未入力"}`,
    `- 未確認ポイント: ${brief.openQuestions || "未入力"}`,
    `- 調査メモ: ${brief.researchNotes || brief.sourceNotes || "未入力"}`,
    "",
    "盛り込みたい内容",
    `- 背景/ざっくり内容: ${brief.topic || "未入力"}`,
    `- 入れたい要素: ${brief.mustInclude || "未入力"}`,
    `- 避けたいこと: ${brief.avoid || "未入力"}`,
    `- 参考URL:\n- ${sourceLine}`,
    `- 貼り付け本文 / 抜粋:\n${sourceTexts}`,
    "",
    "方針メモ",
    planText,
    "",
    "出力ルール",
    "- 必要な論点は、まず公式情報を優先して確認した前提で書く",
    "- 複数URLや貼り付け本文は、重複を整理して1本の自然な投稿に統合する",
    "- まず完成本文だけを出す",
    "- 必要ならその下に『別案フックを3つ』だけ付ける",
    "- 文章は自然な日本語にする",
    "- 『確認済みの事実をもとに』のような機械っぽい表現は禁止",
    "- 『誰に何を伝えたいか』が一読で伝わるようにする",
    "",
    `追加指示: ${notes || "特になし"}`,
  ].join("\n");
}

function getPlatformOutputGuide(platform) {
  if (platform === "x") {
    return "1投稿または短いスレッドで、そのままポストできる長さにする。";
  }
  if (platform === "threads") {
    return "会話っぽく自然で、反応したくなる口調にする。";
  }
  if (platform === "instagram") {
    return "キャプションとして読めるように、改行を活かして感情と要点を両立する。";
  }
  if (platform === "wordpress" || platform === "ameblo" || platform === "note") {
    return "読みものとして成立する自然な導入と流れをつくる。";
  }
  return "投稿先に合う自然な長さとトーンにする。";
}

function normalizeDomain(value) {
  return value
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function describeCtaStrength(value) {
  if (value === "soft") {
    return "やさしめ。自然な問いかけや軽い誘導に留める。";
  }
  if (value === "strong") {
    return "強め。保存、フォロー、問い合わせなどの行動をはっきり促す。";
  }
  return "標準。押しつけすぎず、次の行動を明確にする。";
}

function buildCtaLine(goal, strength, platform) {
  const targetGoal = goal || "反応獲得";
  if (strength === "soft") {
    return platform === "threads"
      ? `このテーマ、あなたはどう感じますか。無理のない形で ${targetGoal} につながればうれしいです。`
      : `気になったら、あなたのやり方でも試してみてください。自然な形で ${targetGoal} につながれば十分です。`;
  }
  if (strength === "strong") {
    return `役に立ちそうなら保存やシェアを。次の一歩として ${targetGoal} につながる動きをはっきり促します。`;
  }
  return `気づきがあれば保存、共有、フォローなど次の行動につなげてもらえるとうれしいです。${targetGoal} を意識した締めです。`;
}

function buildHashtagLine(brief, profile) {
  if (!profile.hashtags || profile.hashtags.includes("なし")) {
    return "";
  }

  const tokens = [brief.keywords, brief.topic]
    .filter(Boolean)
    .join(" ")
    .split(/[\s,、]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((token) => `#${token.replace(/^#/, "")}`);

  if (!tokens.length) {
    return `ハッシュタグ目安: ${profile.hashtags}`;
  }

  return `${tokens.join(" ")}\nハッシュタグ目安: ${profile.hashtags}`;
}

function renderSourceUrlList() {
  const urls = parseSourceUrls(els.sourceUrlsInput.value);
  if (!urls.length) {
    els.sourceUrlList.textContent = "追加した引用元URLがここに並びます。";
    els.sourceUrlList.classList.add("empty-state");
    return;
  }

  els.sourceUrlList.classList.remove("empty-state");
  els.sourceUrlList.innerHTML = urls.map((url, index) => `
    <article class="research-link-card">
      <span class="mini-label">Source ${index + 1}</span>
      <a href="${escapeAttribute(url)}" target="_blank" rel="noreferrer">${escapeHtml(url)}</a>
      <p>本文や方針に使う引用元URL</p>
    </article>
  `).join("");
}

function renderFactCheckLinks() {
  const brief = collectBrief();
  const links = buildFactCheckLinks(brief);
  if (!links.length) {
    els.factCheckLinkList.textContent = "公式確認したい論点を入れると、公式サイトやヘルプ向けの確認リンクがここに出ます。";
    els.factCheckLinkList.classList.add("empty-state");
    return;
  }

  els.factCheckLinkList.classList.remove("empty-state");
  els.factCheckLinkList.innerHTML = links.map((link) => `
    <article class="research-link-card">
      <span class="mini-label">${escapeHtml(link.group)}</span>
      <a href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>
      <p>${escapeHtml(link.description)}</p>
    </article>
  `).join("");
}

function buildFactCheckLinks(brief) {
  const targets = brief.factCheckTargets || [];
  const domain = normalizeDomain(brief.officialDomain);
  if (!targets.length) {
    return [];
  }

  const links = [];
  targets.forEach((target) => {
    if (domain) {
      links.push({
        group: "Official Verification",
        label: `公式サイトで「${target}」を確認`,
        description: "一次情報を優先して探す",
        url: `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} ${target}`)}`,
      });
      links.push({
        group: "Official Verification",
        label: `ヘルプ / FAQ で「${target}」を確認`,
        description: "サポート、FAQ、プラン説明を確認する",
        url: `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} ${target} (help OR faq OR support OR docs OR pricing OR plan)`)}`,
      });
    }

    links.push({
      group: "Cross Check",
      label: `ニュースで「${target}」を確認`,
      description: "外部報道や周辺情報を確認する",
      url: `https://news.google.com/search?q=${encodeURIComponent(target)}`,
    });
  });

  return links;
}

function saveResearchLog() {
  const brief = collectBrief();
  savedResearchLog = {
    savedAt: new Date().toLocaleString("ja-JP"),
    researchSubject: brief.researchSubject || brief.keywords || "未設定",
    officialDomain: brief.officialDomain || "",
    factCheckTargets: brief.factCheckTargets,
    facts: brief.facts || "",
    insights: brief.insights || "",
    openQuestions: brief.openQuestions || "",
    sourceUrls: brief.sourceUrls,
  };

  persistSavedResearchLog();
  renderSavedResearchSummary();
}

function hydrateSavedResearchLog() {
  if (!savedResearchLog) {
    renderSavedResearchSummary();
    return;
  }

  if (!els.researchSubjectInput.value) {
    els.researchSubjectInput.value = savedResearchLog.researchSubject || "";
  }
  if (!els.officialDomainInput.value) {
    els.officialDomainInput.value = savedResearchLog.officialDomain || "";
  }
  if (!els.factsInput.value) {
    els.factsInput.value = savedResearchLog.facts || "";
  }
  if (!els.factCheckTargetsInput.value && savedResearchLog.factCheckTargets?.length) {
    els.factCheckTargetsInput.value = savedResearchLog.factCheckTargets.join("\n");
  }
  if (!els.insightsInput.value) {
    els.insightsInput.value = savedResearchLog.insights || "";
  }
  if (!els.openQuestionsInput.value) {
    els.openQuestionsInput.value = savedResearchLog.openQuestions || "";
  }
  if (!els.sourceUrlsInput.value && savedResearchLog.sourceUrls?.length) {
    els.sourceUrlsInput.value = savedResearchLog.sourceUrls.join("\n");
  }

  renderSavedResearchSummary();
  renderFactCheckLinks();
}

function renderSavedResearchSummary() {
  if (!savedResearchLog) {
    els.savedResearchSummary.textContent = "保存した調査ログはここに表示されます。";
    els.savedResearchSummary.classList.add("empty-state");
    return;
  }

  els.savedResearchSummary.classList.remove("empty-state");
  els.savedResearchSummary.textContent = [
    `最終保存: ${savedResearchLog.savedAt}`,
    `調査テーマ: ${savedResearchLog.researchSubject || "未設定"}`,
    `公式ドメイン: ${savedResearchLog.officialDomain || "未設定"}`,
    `公式確認論点: ${savedResearchLog.factCheckTargets?.length || 0}`,
    `確認できた事実: ${savedResearchLog.facts || "未設定"}`,
    `仮説・読み: ${savedResearchLog.insights || "未設定"}`,
    `未確認ポイント: ${savedResearchLog.openQuestions || "未設定"}`,
    `引用元URL数: ${savedResearchLog.sourceUrls?.length || 0}`,
  ].join("\n");
}

function renderEmptyState() {
  els.researchSummary.textContent = "入力内容からここに調査整理が表示されます。";
  els.researchSummary.classList.add("empty-state");
  els.planPreview.textContent = "方針をつくると、構成・トーン・見出し案・投稿の狙いを確認できます。";
  els.planPreview.classList.add("empty-state");
  els.planEditor.value = "";
  els.planStatus.textContent = "未作成";
  els.draftPreview.textContent = "方針が確定したらここに生成プロンプトが出ます。";
  els.draftPreview.classList.add("empty-state");
  els.llmOutput.textContent = "APIキーを設定して「LLMで本文生成」を押すと、ここに本文が出ます。";
  els.llmOutput.classList.add("empty-state");
  els.draftStatus.textContent = "未作成";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
