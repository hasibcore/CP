// ============================================================
// CF × GitHub Sync — Popup Script
// ============================================================

// ── Helpers ───────────────────────────────────────────────────
function sendMsg(msg) {
  return new Promise(resolve => chrome.runtime.sendMessage(msg, resolve));
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function getExt(filename) {
  return (filename || '').split('.').pop().toUpperCase() || '?';
}

function isToday(ts) {
  const d = new Date(ts);
  const n = new Date();
  return d.getDate() === n.getDate() &&
         d.getMonth() === n.getMonth() &&
         d.getFullYear() === n.getFullYear();
}

// ── Status bar ────────────────────────────────────────────────
async function updateStatus() {
  const { githubToken, githubRepo } = await sendMsg({ type: 'GET_SETTINGS' });
  const bar    = document.getElementById('status-bar');
  const dot    = document.getElementById('status-indicator');
  const text   = document.getElementById('status-text');
  const warn   = document.getElementById('warning-box');

  if (!githubToken || !githubRepo) {
    dot.className   = 'status-indicator error';
    text.textContent = 'Not configured — setup required';
    warn.style.display = 'flex';
    return false;
  }

  // Quick GitHub API check
  dot.className   = 'status-indicator loading';
  text.textContent = 'Connecting to GitHub...';

  try {
    const res = await fetch(`https://api.github.com/repos/${githubRepo}`, {
      headers: { Authorization: `token ${githubToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      dot.className   = 'status-indicator connected';
      text.textContent = `Connected · ${githubRepo}`;
      warn.style.display = 'none';
      return true;
    } else {
      dot.className   = 'status-indicator error';
      text.textContent = res.status === 401 ? 'Invalid token!' : `Error ${res.status}`;
      warn.style.display = 'flex';
      return false;
    }
  } catch {
    dot.className   = 'status-indicator error';
    text.textContent = 'Network error';
    return false;
  }
}

// ── Stats ─────────────────────────────────────────────────────
async function updateStats() {
  const { syncHistory = [], autoSync = true } = await sendMsg({ type: 'GET_SETTINGS' });

  document.getElementById('stat-total').textContent = syncHistory.length;
  document.getElementById('stat-today').textContent = syncHistory.filter(e => isToday(e.timestamp)).length;

  const toggle = document.getElementById('auto-sync-chk');
  toggle.checked = autoSync;
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ autoSync: toggle.checked });
  });
}

// ── History list ──────────────────────────────────────────────
function renderHistory(history) {
  const list  = document.getElementById('history-list');
  const empty = document.getElementById('empty-state');

  // Remove old items (keep empty state)
  list.querySelectorAll('.history-item').forEach(el => el.remove());

  if (!history.length) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  history.slice(0, 20).forEach(entry => {
    const item = document.createElement('a');
    item.className    = 'history-item';
    item.href         = entry.githubUrl || '#';
    item.target       = '_blank';
    item.rel          = 'noopener noreferrer';
    item.title        = entry.filename;

    const ext   = getExt(entry.filename);
    const name  = entry.problemName || entry.problemId;

    item.innerHTML = `
      <div class="history-item-icon">${entry.problemId || '?'}</div>
      <div class="history-item-info">
        <div class="history-item-name">${name}</div>
        <div class="history-item-meta">
          <span class="history-item-lang">${ext}</span>
          <span class="history-item-time">${timeAgo(entry.timestamp)}</span>
        </div>
      </div>
      <span class="history-item-arrow">›</span>
    `;

    list.appendChild(item);
  });
}

async function loadHistory() {
  const { history } = await sendMsg({ type: 'GET_HISTORY' });
  renderHistory(history || []);
}

// ── Clear history ─────────────────────────────────────────────
document.getElementById('clear-history').addEventListener('click', async () => {
  if (!confirm('Clear all sync history?')) return;
  chrome.storage.sync.set({ syncHistory: [] });
  renderHistory([]);
  document.getElementById('stat-total').textContent = '0';
  document.getElementById('stat-today').textContent = '0';
});

// ── Navigation ────────────────────────────────────────────────
document.getElementById('open-settings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

document.getElementById('go-setup').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

document.getElementById('view-repo').addEventListener('click', async (e) => {
  e.preventDefault();
  const { githubRepo } = await sendMsg({ type: 'GET_SETTINGS' });
  if (githubRepo) {
    chrome.tabs.create({ url: `https://github.com/${githubRepo}` });
  } else {
    chrome.runtime.openOptionsPage();
  }
});

// ── Init ──────────────────────────────────────────────────────
async function init() {
  await Promise.all([
    updateStatus(),
    updateStats(),
    loadHistory(),
  ]);
}

init();
