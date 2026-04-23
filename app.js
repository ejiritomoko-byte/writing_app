const storageKeys = {
  accounts: "writing-app-accounts",
  selectedAccountId: "writing-app-selected-account-id",
  platformSettings: "writing-app-platform-settings",
  savedResearchLog: "writing-app-saved-research-log",
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
  factsInput: document.getElementById("factsInput"),
  insightsInput: document.getElementById("insightsInput"),
  openQuestionsInput: document.getElementById("openQuestionsInput"),
  researchSummary: document.getElementById("researchSummary"),
  planPreview: document.getElementById("planPreview"),
  planEditor: document.getElementById("planEditor"),
  planStatus: document.getElementById("planStatus"),
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
  attachEvents();
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
      window.alert("コピーする本文がまだありません。");
      return;
    }
    await navigator.clipboard.writeText(text);
    els.copyDraftButton.textContent = "コピー済み";
    window.setTimeout(() => {
      els.copyDraftButton.textContent = "本文をコピー";
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
  els.keywordsInput.addEventListener("input", renderResearchLinks);
  els.researchSubjectInput.addEventListener("input", renderResearchLinks);
  els.officialDomainInput.addEventListener("input", renderResearchLinks);
  els.competitorsInput.addEventListener("input", renderResearchLinks);
  els.trendCheck.addEventListener("change", renderResearchLinks);
  els.officialNewsCheck.addEventListener("change", renderResearchLinks);
  els.competitorCheck.addEventListener("change", renderResearchLinks);
  els.sourceUrlsInput.addEventListener("input", renderSourceUrlList);
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
  els.draftPreview.textContent = "方針が確定したらここに本文が出ます。";
  els.draftPreview.classList.add("empty-state");
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
    researchNotes: els.researchNotesInput.value.trim(),
    researchSubject: els.researchSubjectInput.value.trim(),
    officialDomain: els.officialDomainInput.value.trim(),
    competitors: els.competitorsInput.value.trim(),
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
  const summaryLine = brief.researchNotes || brief.sourceNotes || "";
  const audienceText = brief.customAudience || account?.audience || "読者";
  const hashtagLine = buildHashtagLine(brief, profile);
  const ctaLine = buildCtaLine(account?.goal, profile.ctaStrength, brief.platform);
  const factLine = brief.facts || "";
  const cautionLine = brief.openQuestions ? `ただ、${brief.openQuestions} はまだ断定しないほうがよさそうです。` : "";
  const sourceLine = brief.sourceUrls.length ? `参照元: ${brief.sourceUrls.join(" / ")}` : "";
  const leadSubject = brief.researchSubject || brief.keywords || brief.topic || "この話題";
  const leadFact = firstSentence(factLine);
  const leadInsight = firstSentence(brief.insights || "");
  const compellingHook = buildCompellingHook(leadSubject, leadFact, brief.platform);
  const naturalReaction = buildNaturalReaction(leadInsight, brief.openQuestions, brief.platform);
  const verdictLine = buildVerdictLine(leadSubject, leadFact);
  const bodyTheme = brief.topic || brief.keywords || leadSubject;

  let draft = "";

  if (brief.platform === "note" || brief.platform === "wordpress" || brief.platform === "ameblo") {
    draft = [
      compellingHook,
      "",
      `${verdictLine}`,
      "",
      `${summaryLine || `${bodyTheme} を追ってみたら、思っていたより空気が変わっていました。`}`,
      "",
      `${brief.insights ? `${brief.insights}。` : naturalReaction}`,
      `${brief.mustInclude ? `${brief.mustInclude} まで見ると、この話はただの小ネタでは終わらないです。` : "表面だけ見ると小さな変化に見えるけど、使っている側にはじわっと効いてくるタイプだと思います。"} `,
      `${cautionLine}`,
      "",
      `${notes || ctaLine}`,
      sourceLine,
    ].filter(Boolean).join("\n");
  } else if (brief.platform === "x") {
    draft = [
      compellingHook,
      "",
      `${verdictLine}`,
      "",
      `${leadInsight || naturalReaction}`,
      "",
      `${brief.mustInclude ? `${brief.mustInclude} は入れておきたい。` : "これ、地味に困る人多そう。"} `,
      `${brief.openQuestions ? `ただ、${brief.openQuestions} はまだ追加確認したい。` : ""}`,
      "",
      `${notes || ctaLine}`,
      hashtagLine,
      sourceLine,
    ].filter(Boolean).join("\n");
  } else if (brief.platform === "threads" || brief.platform === "instagram") {
    draft = [
      compellingHook,
      "",
      `${verdictLine}`,
      "",
      `${leadInsight || naturalReaction}`,
      "",
      `${brief.mustInclude ? `${brief.mustInclude} まで見ると、かなり空気感が変わります。` : "見た目の話題性だけじゃなく、実際に使えるかどうかの差が大きいです。"}`,
      `${brief.openQuestions ? `まだ ${brief.openQuestions} は残っているので、断定しすぎないほうがよさそう。` : ""}`,
      "",
      `${notes || ctaLine}`,
      hashtagLine,
      sourceLine,
    ].filter(Boolean).join("\n");
  } else {
    draft = [
      compellingHook,
      "",
      `${verdictLine}`,
      "",
      `${summaryLine || `${audienceText} に伝えるなら、この話はかなり温度感があると思いました。`}`,
      "",
      `${leadInsight || naturalReaction}`,
      `${brief.mustInclude ? `${brief.mustInclude} を入れると、ただの話題紹介じゃなくなる。` : "情報を並べるだけじゃなく、どう困るのか、どう判断するのかまで入れたほうが伝わります。"}`,
      `${cautionLine}`,
      "",
      `${account?.goal || "反応獲得"} を狙うなら、最後はコメントしやすい問いかけや軽いCTAで閉じます。`,
      `${notes || ctaLine}`,
      hashtagLine,
      sourceLine,
    ].join("\n");
  }

  els.draftPreview.textContent = draft;
  els.draftPreview.classList.remove("empty-state");
  els.draftStatus.textContent = "生成済み";
  els.planStatus.textContent = "確定";
}

function firstSentence(value) {
  return value
    .split(/[。!?！？\n]/)
    .map((part) => part.trim())
    .find(Boolean) || "";
}

function buildCompellingHook(subject, fact, platform) {
  if (platform === "x" || platform === "threads" || platform === "instagram") {
    return `${subject}、ちょっと嫌な予感が当たってるかもしれない。`;
  }
  if (!fact) {
    return `${subject}、ただの噂で終わらせにくい話でした。`;
  }
  return `${subject}、ただの噂かと思ったら、思ったより現実味がありました。`;
}

function buildVerdictLine(subject, fact) {
  if (!fact) {
    return `${subject} について確認を進めたところ、まだ断定しきれない部分が残っています。`;
  }
  return `${subject} を追ってみたら、いま確認できている事実は「${fact}」でした。`;
}

function buildNaturalReaction(insight, openQuestion, platform) {
  if (insight) {
    return platform === "x"
      ? `${insight}。これは見え方がかなり変わる。`
      : `${insight}。ここがいちばん引っかかりました。`;
  }

  if (openQuestion) {
    return `${openQuestion} まではまだ見切れていないので、ここは少し慎重に見ています。`;
  }

  return platform === "x"
    ? "これ、使っている側からすると地味に困るやつ。"
    : "実際に使っている人ほど、じわっと困る変化かもしれません。";
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

function saveResearchLog() {
  const brief = collectBrief();
  savedResearchLog = {
    savedAt: new Date().toLocaleString("ja-JP"),
    researchSubject: brief.researchSubject || brief.keywords || "未設定",
    officialDomain: brief.officialDomain || "",
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
  els.draftPreview.textContent = "方針が確定したらここに本文が出ます。";
  els.draftPreview.classList.add("empty-state");
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
