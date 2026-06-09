// ============================================================
// CF × GitHub Sync — Options Page Script
// ============================================================

// ── Helpers ───────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function showSaveStatus(msg, type = 'saved') {
  const el = $('save-status');
  el.textContent = msg;
  el.className = `save-status ${type}`;
  setTimeout(() => { el.textContent = ''; el.className = 'save-status'; }, 3000);
}

// ── Load saved settings ───────────────────────────────────────
async function loadSettings() {
  const settings = await new Promise(resolve =>
    chrome.storage.sync.get(
      ['githubToken', 'githubRepo', 'githubBranch', 'autoSync', 'showBtn', 'showBadge'],
      resolve
    )
  );

  if (settings.githubToken) $('github-token').value = settings.githubToken;
  if (settings.githubRepo)  $('github-repo').value  = settings.githubRepo;
  $('github-branch').value = settings.githubBranch || 'main';
  $('auto-sync').checked  = settings.autoSync  !== false;
  $('show-btn').checked   = settings.showBtn   !== false;
  $('show-badge').checked = settings.showBadge !== false;
}

// ── Save GitHub config ────────────────────────────────────────
$('save-github').addEventListener('click', async () => {
  const token  = $('github-token').value.trim();
  const repo   = $('github-repo').value.trim();
  const branch = $('github-branch').value.trim() || 'main';

  if (!token) { showSaveStatus('⚠️ Token is required', 'error'); return; }
  if (!repo)  { showSaveStatus('⚠️ Repo is required', 'error'); return; }
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    showSaveStatus('⚠️ Repo must be owner/name', 'error'); return;
  }

  showSaveStatus('Saving…', 'saving');
  await new Promise(resolve =>
    chrome.storage.sync.set({ githubToken: token, githubRepo: repo, githubBranch: branch }, resolve)
  );
  showSaveStatus('✅ Saved!', 'saved');
});

// ── Save preferences ──────────────────────────────────────────
$('save-prefs').addEventListener('click', async () => {
  const prefs = {
    autoSync:  $('auto-sync').checked,
    showBtn:   $('show-btn').checked,
    showBadge: $('show-badge').checked,
  };
  showSaveStatus('Saving…', 'saving');
  await new Promise(resolve => chrome.storage.sync.set(prefs, resolve));
  showSaveStatus('✅ Preferences saved!', 'saved');
});

// ── Test connection ───────────────────────────────────────────
$('test-connection').addEventListener('click', async () => {
  const token = $('github-token').value.trim();
  const repo  = $('github-repo').value.trim();

  const section = $('test-section');
  const result  = $('test-result');

  section.style.display = 'block';
  result.className = 'test-result loading';
  result.textContent = '⏳ Testing connection...';

  if (!token || !repo) {
    result.className = 'test-result error';
    result.textContent = '❌ Please fill in token and repository first.';
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      result.className = 'test-result success';
      result.innerHTML = `✅ Connected! <strong>${data.full_name}</strong> — ${data.private ? '🔒 Private' : '🌐 Public'} repo`;
    } else if (res.status === 401) {
      result.className = 'test-result error';
      result.textContent = '❌ Invalid token. Make sure it has "repo" scope.';
    } else if (res.status === 404) {
      result.className = 'test-result error';
      result.textContent = `❌ Repository "${repo}" not found. Check name or create it on GitHub.`;
    } else {
      result.className = 'test-result error';
      result.textContent = `❌ GitHub API error: ${res.status}`;
    }
  } catch (err) {
    result.className = 'test-result error';
    result.textContent = `❌ Network error: ${err.message}`;
  }
});

// ── Toggle token visibility ───────────────────────────────────
$('toggle-token').addEventListener('click', () => {
  const input = $('github-token');
  const icon  = $('eye-icon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    `;
  } else {
    input.type = 'password';
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
});

// ── Clear all data ────────────────────────────────────────────
$('clear-all').addEventListener('click', async () => {
  const confirmed = confirm(
    '⚠️ This will delete all saved settings and sync history.\nAre you sure?'
  );
  if (!confirmed) return;

  await new Promise(resolve => chrome.storage.sync.clear(resolve));
  showSaveStatus('🗑️ All data cleared', 'error');

  // Reset UI
  $('github-token').value  = '';
  $('github-repo').value   = '';
  $('github-branch').value = 'main';
  $('auto-sync').checked   = true;
  $('show-btn').checked    = true;
  $('show-badge').checked  = true;
});

// ── Init ──────────────────────────────────────────────────────
loadSettings();
