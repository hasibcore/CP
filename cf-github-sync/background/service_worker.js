// ============================================================
// CF × GitHub Sync — Service Worker (Background)
// ============================================================

const GITHUB_API = 'https://api.github.com';

// ── Storage helpers ──────────────────────────────────────────
async function getSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(
      ['githubToken', 'githubRepo', 'githubBranch', 'autoSync', 'syncHistory'],
      resolve
    );
  });
}

async function saveSyncHistory(entry) {
  const { syncHistory = [] } = await getSettings();
  syncHistory.unshift(entry);
  // keep last 100 entries
  const trimmed = syncHistory.slice(0, 100);
  chrome.storage.sync.set({ syncHistory: trimmed });
}

// ── GitHub API helpers ────────────────────────────────────────
async function getFileSHA(token, repo, branch, path) {
  const url = `${GITHUB_API}/repos/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha || null;
}

async function pushToGitHub({ token, repo, branch, filename, content, commitMsg }) {
  const path = filename;
  const sha = await getFileSHA(token, repo, branch, path);

  const encoded = btoa(unescape(encodeURIComponent(content)));

  const body = {
    message: commitMsg,
    content: encoded,
    branch: branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'GitHub API error');
  return data;
}

// ── Language → file extension map ────────────────────────────
function getExtension(lang) {
  const map = {
    'GNU C++17': 'cpp',
    'GNU C++17 (64)': 'cpp',
    'GNU C++20 (64)': 'cpp',
    'GNU C++14': 'cpp',
    'GNU C++11': 'cpp',
    'GNU C': 'c',
    'Java 17': 'java',
    'Java 11': 'java',
    'Java 8': 'java',
    'PyPy 3': 'py',
    'PyPy 3-64': 'py',
    'Python 3': 'py',
    'Python 2': 'py',
    'Kotlin': 'kt',
    'Rust 2021': 'rs',
    'Go': 'go',
    'JavaScript': 'js',
    'TypeScript': 'ts',
    'Haskell': 'hs',
    'D': 'd',
    'C#': 'cs',
    'Ruby': 'rb',
    'Scala': 'scala',
  };
  for (const key of Object.keys(map)) {
    if (lang.includes(key) || key.includes(lang)) return map[key];
  }
  // try partial matches
  if (lang.toLowerCase().includes('c++')) return 'cpp';
  if (lang.toLowerCase().includes('python') || lang.toLowerCase().includes('pypy')) return 'py';
  if (lang.toLowerCase().includes('java')) return 'java';
  if (lang.toLowerCase().includes('rust')) return 'rs';
  return 'txt';
}

// ── Filename builder ──────────────────────────────────────────
function buildFilename(problemId, problemName, lang, rating) {
  const ext = getExtension(lang);
  // sanitize problem name
  const safe = (problemName || 'unknown')
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .substring(0, 50);
  return `CP/Codeforces/${rating}/${problemId}_${safe}.${ext}`;
}

// ── Fetch problem rating ──────────────────────────────────────
async function getProblemRating(contestId, problemId) {
  if (!contestId || !problemId) return 'unrated';
  const index = problemId.replace(contestId, '');
  if (!index) return 'unrated';

  try {
    const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
    const res = await fetch(url);
    if (!res.ok) return 'unrated';
    const html = await res.text();
    const match = html.match(/title=["']Difficulty["'][^>]*>\s*\*(\d+)\s*</) || 
                  html.match(/class=["']tag-box["'][^>]*>\s*\*(\d+)\s*</);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    console.error('Error fetching rating:', e);
  }
  return 'unrated';
}

// ── Main sync handler ─────────────────────────────────────────
async function handleSync(submission) {
  const { githubToken, githubRepo, githubBranch = 'main', autoSync } = await getSettings();

  if (!githubToken || !githubRepo) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon48.png'),
      title: 'CF × GitHub Sync',
      message: '⚠️ Please set your GitHub token & repo in Options first!',
    });
    return { ok: false, error: 'Not configured' };
  }

  // Fetch rating in background
  const rating = await getProblemRating(submission.contestId, submission.problemId);
  const filename = buildFilename(submission.problemId, submission.problemName, submission.lang, rating);
  const commitMsg = `✅ AC: ${submission.problemId} — ${submission.problemName} (Rating: ${rating})`;

  try {
    const result = await pushToGitHub({
      token: githubToken,
      repo: githubRepo,
      branch: githubBranch,
      filename,
      content: submission.code,
      commitMsg,
    });

    const entry = {
      problemId: submission.problemId,
      problemName: submission.problemName,
      lang: submission.lang,
      filename,
      githubUrl: result.content?.html_url || `https://github.com/${githubRepo}/blob/${githubBranch}/${filename}`,
      timestamp: Date.now(),
      contestId: submission.contestId || '',
      rating
    };

    await saveSyncHistory(entry);

    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon48.png'),
      title: '✅ Synced to GitHub!',
      message: `${submission.problemId} pushed to ${githubRepo}`,
    });

    return { ok: true, entry };
  } catch (err) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon48.png'),
      title: '❌ Sync Failed',
      message: err.message,
    });
    return { ok: false, error: err.message };
  }
}

// ── Fetch submission code from CF API ─────────────────────────
async function fetchSubmissionCode(contestId, submissionId) {
  // Use CF API to get submission details
  // Note: This fetches from the submission page directly
  try {
    const url = `https://codeforces.com/contest/${contestId}/submission/${submissionId}`;
    const res = await fetch(url, { credentials: 'include' });
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const codeEl = doc.querySelector('#program-source-text');
    if (codeEl) return codeEl.textContent;
    return null;
  } catch {
    return null;
  }
}

// ── Message listener ──────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SYNC_SUBMISSION') {
    handleSync(msg.data).then(sendResponse);
    return true; // keep channel open for async
  }

  if (msg.type === 'GET_HISTORY') {
    getSettings().then(({ syncHistory = [] }) => {
      sendResponse({ history: syncHistory });
    });
    return true;
  }

  if (msg.type === 'CHECK_SYNCED') {
    getSettings().then(({ syncHistory = [] }) => {
      const entry = syncHistory.find(e => e.problemId === msg.problemId);
      sendResponse({ synced: !!entry, entry: entry || null });
    });
    return true;
  }

  if (msg.type === 'GET_SETTINGS') {
    getSettings().then(sendResponse);
    return true;
  }

  if (msg.type === 'FETCH_CODE') {
    fetchSubmissionCode(msg.contestId, msg.submissionId).then(code => {
      sendResponse({ code });
    });
    return true;
  }
});

// ── Install handler ───────────────────────────────────────────
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.sync.set({ 
      autoSync: true, 
      githubBranch: 'main', 
      syncHistory: [],
      githubToken: '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',
      githubRepo: 'Hasib/CP'
    });
    // Open settings page on first install
    if (details.reason === 'install') {
      chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html') });
    }
  }
});
