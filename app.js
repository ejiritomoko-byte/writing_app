const storageKeys = {
  accounts: "writing-app-accounts",
  selectedAccountId: "writing-app-selected-account-id",
  platformSettings: "writing-app-platform-settings",
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
  platformPresetSummary: document.getElementById("platformPresetSummary"),
  researchNotesInput: document.getElementById("researchNotesInput"),
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

hydrate();

function hydrate() {
  renderAccountSelect();
  renderAccountCards();
  renderPlatformCards();
  fillAccountEditor(editingAccountId);
  fillPlatformEditor(editingPlatformKey);
  renderPlatformPresetSummary();
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

function buildPlanFromInputs() {
  const brief = collectBrief();
  const account = accounts.find((item) => item.id === brief.accountId);
  const profile = platformProfiles[brief.platform] || platformProfiles.note;
  const audienceText = brief.customAudience || account?.audience || "未入力";

  const researchSummary = [
    `確認対象: ${brief.researchTargets.join(" / ") || "指定なし"}`,
    `出力先: ${profile.label}`,
    `キーワード: ${brief.keywords || "未入力"}`,
    `ターゲット読者: ${audienceText}`,
    `文字数目安: ${profile.lengthGuide || "未設定"}`,
    `調査メモ: ${brief.researchNotes || "未入力"}`,
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
    researchNotes: els.researchNotesInput.value.trim(),
    researchTargets: [
      els.trendCheck.checked ? "Googleトレンド" : "",
      els.officialNewsCheck.checked ? "公式ニュース" : "",
      els.competitorCheck.checked ? "周辺事例" : "",
    ].filter(Boolean),
  };
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
  const summaryLine = brief.researchNotes || brief.sourceNotes || "調査メモを踏まえて";
  const audienceText = brief.customAudience || account?.audience || "読者";
  const hashtagLine = buildHashtagLine(brief, profile);
  const ctaLine = buildCtaLine(account?.goal, profile.ctaStrength, brief.platform);

  let draft = "";

  if (brief.platform === "note" || brief.platform === "wordpress" || brief.platform === "ameblo") {
    const titlePrefix = brief.platform === "wordpress"
      ? `${brief.keywords || "テーマ"}について、${audienceText}向けに整理しました`
      : brief.platform === "ameblo"
        ? `${brief.keywords || "今日のテーマ"}について、いま感じていること`
        : `${brief.keywords || "テーマ整理"}から見えた、いま発信で押さえたいこと`;

    draft = [
      `# ${titlePrefix}`,
      "",
      `目安: ${profile.lengthGuide || "未設定"} / 見出し: ${profile.headingCount || "未設定"}`,
      "",
      `${summaryLine}、今日は ${audienceText} に向けて、いま押さえておきたいポイントを整理します。`,
      "",
      "## まず見えてきたこと",
      `${brief.topic || "話題の輪郭はまだ粗くても"}、Googleトレンドや公式ニュースを確認すると、注目されている理由と実際の使われ方の差が見えてきます。`,
      "",
      "## 発信に落とし込むときの考え方",
      `${planText.split("\n").slice(0, 6).join(" ")}`,
      "",
      `${brief.mustInclude ? `特に今回は ${brief.mustInclude} を軸にすると、読者が自分ごと化しやすくなります。` : "単なる情報整理で終わらせず、読者が次にどう動けるかまで落とし込むのがポイントです。"}`,
      "",
      "## まとめ",
      `${account?.goal || "反応を得ること"} を意識するなら、最新情報の確認と自分なりの視点をセットで出すのが有効です。`,
      `${notes || ctaLine}`,
      hashtagLine,
    ].join("\n");
  } else if (brief.platform === "x") {
    draft = [
      `目安: ${profile.lengthGuide || "未設定"}`,
      "",
      `${brief.keywords || "このテーマ"}、いま発信に乗せるなら早めに見ておく価値があります。`,
      "",
      `理由はシンプルで、${summaryLine} と実際の現場感を並べると、読者にとっての解像度が一気に上がるからです。`,
      "",
      `${brief.topic || "ざっくりした着想"} の段階でも、トレンド確認と公式ニュース確認を入れるだけで、切り口がかなり安定します。`,
      "",
      `${brief.mustInclude ? `今回は特に ${brief.mustInclude} を入れると伝わりやすいです。` : "大事なのは、情報を並べるだけでなく自分の判断を一言入れること。"}`,
      "",
      `${account?.goal || "反応獲得"} を狙うなら、最後は一歩踏み込んだ問いやCTAで締めるのがおすすめです。`,
      `${notes || ctaLine}`,
      hashtagLine,
    ].join("\n");
  } else {
    draft = [
      `目安: ${profile.lengthGuide || "未設定"} / ハッシュタグ: ${profile.hashtags || "未設定"}`,
      "",
      `${brief.keywords || "このテーマ"}、${profile.label} で出すならこうまとめると伝わりやすいです。`,
      "",
      `${summaryLine} を見ながら、${audienceText} に向けて必要なポイントだけを残します。`,
      "",
      `${brief.topic || "ざっくりした着想"} をそのまま広げるより、最初に共感できる導入を置いてから要点を短く見せるほうが反応されやすいです。`,
      "",
      `${brief.mustInclude ? `今回は ${brief.mustInclude} を入れることで保存価値と具体性を両立できます。` : "情報を詰め込みすぎず、読み手がすぐ理解できる量に絞るのがコツです。"}`,
      "",
      `${account?.goal || "反応獲得"} を狙うなら、最後はコメントしやすい問いかけや軽いCTAで閉じます。`,
      `${notes || ctaLine}`,
      hashtagLine,
    ].join("\n");
  }

  els.draftPreview.textContent = draft;
  els.draftPreview.classList.remove("empty-state");
  els.draftStatus.textContent = "生成済み";
  els.planStatus.textContent = "確定";
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
