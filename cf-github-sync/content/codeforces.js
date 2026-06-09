// ============================================================
// CF × GitHub Sync — Content Script
// Injects into all Codeforces pages
// ============================================================

(function () {
  'use strict';

  const CF_ORIGIN = location.origin; // https://codeforces.com

  // ── Utility ───────────────────────────────────────────────
  function waitForEl(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      const observer = new MutationObserver(() => {
        const found = document.querySelector(selector);
        if (found) { observer.disconnect(); resolve(found); }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => { observer.disconnect(); reject(new Error('timeout')); }, timeout);
    });
  }

  function getCurrentUrl() { return location.href; }

  // ── Page type detection ───────────────────────────────────
  function getPageType() {
    const path = location.pathname;
    // Submission page: /contest/XXXX/submission/YYYY or /problemset/submission/XXXX/YYYY
    if (/\/submission\/\d+$/.test(path)) return 'submission';
    // My submissions list: /contest/XXXX/my or /problemset/my
    if (/\/my$/.test(path)) return 'my_submissions';
    // Problem page: /contest/XXXX/problem/A or /problemset/problem/XXXX/A
    if (/\/problem\/[A-Z0-9]+$/.test(path)) return 'problem';
    // Status page after submitting
    if (/\/status$/.test(path)) return 'status';
    return 'other';
  }

  // ── Extract problem info ──────────────────────────────────
  function extractProblemInfo() {
    const path = location.pathname;
    // from URL: /contest/1234/problem/A → { contestId: '1234', index: 'A' }
    const contestMatch = path.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/i);
    if (contestMatch) {
      return { contestId: contestMatch[1], index: contestMatch[2] };
    }
    // from URL: /problemset/problem/1234/A
    const problemsetMatch = path.match(/\/problemset\/problem\/(\d+)\/([A-Z0-9]+)/i);
    if (problemsetMatch) {
      return { contestId: problemsetMatch[1], index: problemsetMatch[2] };
    }
    return null;
  }

  function getProblemId(contestId, index) {
    return `${contestId}${index}`;
  }

  function getProblemName() {
    // Try to get problem title from page
    const titleEl = document.querySelector('.problem-statement .title, .header .title, h1');
    if (titleEl) return titleEl.textContent.trim().replace(/^\w+\.\s*/, '');
    // fallback: document title
    return document.title.split(' - ')[0].trim();
  }

  // ── Extract code from submission page ─────────────────────
  function extractCode() {
    const codeEl = document.querySelector(
      '#program-source-text, .roundbox pre, pre.prettyprint, .source-code'
    );
    if (codeEl) return codeEl.textContent;
    return null;
  }

  function extractLanguage() {
    // Submission page shows language in table
    const langEl = document.querySelector(
      'table.status-frame-datatable td:nth-child(5), .info td'
    );
    if (langEl) return langEl.textContent.trim();
    // Try meta info in verdict table
    const rows = document.querySelectorAll('table tr');
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 4) {
        // language is usually 4th or 5th col
        const text = cells[3]?.textContent?.trim();
        if (text && (text.includes('C++') || text.includes('Python') || text.includes('Java'))) {
          return text;
        }
      }
    }
    return 'Unknown';
  }

  // ── Submission row parser (from status/my pages) ──────────
  function parseSubmissionRow(row) {
    const cells = row.querySelectorAll('td');
    if (cells.length < 6) return null;

    const verdictEl = row.querySelector('.verdict-accepted');
    if (!verdictEl) return null; // not AC

    const submIdEl = row.querySelector('td:first-child a, .id-cell a');
    const submId = submIdEl?.textContent?.trim() || '';
    const submHref = submIdEl?.href || '';

    const problemEl = row.querySelector('.problem-cell a, td:nth-child(4) a');
    const problemHref = problemEl?.href || '';
    const problemText = problemEl?.textContent?.trim() || '';

    const langEl = row.querySelector('.lang-cell, td:nth-child(5)');
    const lang = langEl?.textContent?.trim() || 'Unknown';

    // Extract contest and problem index from href
    const contestMatch = problemHref.match(/\/contest\/(\d+)\/problem\/([A-Z0-9]+)/i);
    const problemsetMatch = problemHref.match(/\/problemset\/problem\/(\d+)\/([A-Z0-9]+)/i);
    const match = contestMatch || problemsetMatch;

    if (!match) return null;

    return {
      submissionId: submId,
      submissionUrl: submHref,
      contestId: match[1],
      index: match[2],
      problemId: `${match[1]}${match[2]}`,
      problemName: problemText.replace(/^\w+\.\s*/, '').trim(),
      lang,
    };
  }

  // ── Inject GitHub badge on problem page ───────────────────
  async function injectProblemBadge() {
    const info = extractProblemInfo();
    if (!info) return;

    const { contestId, index } = info;
    const problemId = getProblemId(contestId, index);

    // Check if already synced
    const response = await chrome.runtime.sendMessage({
      type: 'CHECK_SYNCED',
      problemId,
    });

    // Find insertion point
    const titleEl = await waitForEl('.problem-statement .title, .header .title').catch(() => null);
    if (!titleEl) return;

    // Remove existing badge if any
    document.querySelector('.cf-gh-badge')?.remove();

    const badge = document.createElement('a');
    badge.className = 'cf-gh-badge';

    if (response?.synced && response.entry) {
      badge.href = response.entry.githubUrl;
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.innerHTML = `
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
            .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
            -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
            .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
            .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span>Synced ✓</span>
      `;
      badge.title = `View on GitHub: ${response.entry.filename}`;
    } else {
      badge.href = '#';
      badge.innerHTML = `
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
            .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
            -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
            .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
            .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span>Not synced</span>
      `;
      badge.title = 'Solve and AC to sync to GitHub';
      badge.style.opacity = '0.5';
      badge.style.cursor = 'default';
      badge.addEventListener('click', e => e.preventDefault());
    }

    titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
  }

  // ── Watch verdict page (after submission) ─────────────────
  function watchVerdictPage() {
    const path = location.pathname;
    // We're on a status-like page, watch for AC verdict in our submissions
    const observer = new MutationObserver(async () => {
      const acRows = document.querySelectorAll('tr:not([data-cf-synced]) .verdict-accepted');
      for (const verdict of acRows) {
        const row = verdict.closest('tr');
        if (!row || row.dataset.cfSynced) continue;
        row.dataset.cfSynced = 'processing';

        const sub = parseSubmissionRow(row);
        if (!sub) continue;

        // We need the code — open submission in background
        injectSyncButtonToRow(row, sub);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also check existing rows immediately
    setTimeout(() => observer.takeRecords && observer.takeRecords(), 1000);
  }

  // ── Inject sync button into a verdict row ─────────────────
  function injectSyncButtonToRow(row, sub) {
    if (row.querySelector('.cf-sync-btn')) return;

    const lastCell = row.querySelector('td:last-child');
    if (!lastCell) return;

    const btn = document.createElement('button');
    btn.className = 'cf-sync-btn';
    btn.title = 'Sync to GitHub';
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
          -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
          .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
          -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
          .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
          .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
          0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    `;

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.title = 'Fetching code...';

      // Navigate to submission page to get code
      if (sub.submissionUrl) {
        const res = await chrome.runtime.sendMessage({
          type: 'FETCH_CODE',
          contestId: sub.contestId,
          submissionId: sub.submissionId,
        });

        if (res?.code) {
          const syncRes = await chrome.runtime.sendMessage({
            type: 'SYNC_SUBMISSION',
            data: { ...sub, code: res.code },
          });
          if (syncRes?.ok) {
            btn.style.color = '#4ade80';
            btn.title = `Synced: ${syncRes.entry?.filename}`;
          } else {
            btn.style.color = '#f87171';
            btn.title = syncRes?.error || 'Failed';
            btn.disabled = false;
          }
        } else {
          btn.style.color = '#f87171';
          btn.title = 'Could not fetch code. Open submission manually.';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      }
    });

    lastCell.appendChild(btn);
  }

  // ── Submission page: auto-sync if AC ─────────────────────
  async function handleSubmissionPage() {
    // Check if this is an AC submission
    const verdictEl = document.querySelector('.verdict-accepted');
    if (!verdictEl) return;

    const { autoSync } = await new Promise(resolve =>
      chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, resolve)
    );

    // Get problem info from page
    const path = location.pathname;
    // /contest/1234/submission/567890
    const contestMatch = path.match(/\/contest\/(\d+)\/submission\/(\d+)/);
    if (!contestMatch) return;

    const contestId = contestMatch[1];
    const submissionId = contestMatch[2];

    // Extract code and lang from submission page
    await waitForEl('#program-source-text, .roundbox pre').catch(() => null);
    const code = extractCode();
    const lang = extractLanguage();

    if (!code) return;

    // Get problem info from verdict table
    const problemLinkEl = document.querySelector('table a[href*="/problem/"]');
    const problemHref = problemLinkEl?.href || '';
    const problemText = problemLinkEl?.textContent?.trim() || '';
    const problemMatch = problemHref.match(/\/problem\/([A-Z0-9]+)/i);
    const index = problemMatch ? problemMatch[1] : 'A';
    const problemId = getProblemId(contestId, index);
    const problemName = problemText.replace(/^\w+\.\s*/, '').trim() || `Problem ${index}`;

    // Inject a "Sync" banner
    injectSyncBanner({ contestId, submissionId, problemId, problemName, lang, code, autoSync });
  }

  function injectSyncBanner({ contestId, submissionId, problemId, problemName, lang, code, autoSync }) {
    if (document.querySelector('.cf-gh-sync-banner')) return;

    const banner = document.createElement('div');
    banner.className = 'cf-gh-sync-banner';
    banner.innerHTML = `
      <div class="cf-banner-inner">
        <div class="cf-banner-left">
          <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
              .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span class="cf-banner-title">Accepted! Push to GitHub?</span>
          <span class="cf-banner-problem">${problemId} — ${problemName}</span>
        </div>
        <div class="cf-banner-right">
          <button class="cf-banner-btn cf-banner-sync" id="cf-sync-now">Push Now</button>
          <button class="cf-banner-btn cf-banner-dismiss" id="cf-dismiss">×</button>
        </div>
      </div>
    `;

    const content = document.querySelector('#pageContent, .content-with-sidebar, .content');
    if (content) content.insertBefore(banner, content.firstChild);
    else document.body.insertBefore(banner, document.body.firstChild);

    document.getElementById('cf-sync-now')?.addEventListener('click', async () => {
      const btn = document.getElementById('cf-sync-now');
      if (btn) { btn.textContent = 'Pushing...'; btn.disabled = true; }

      const res = await chrome.runtime.sendMessage({
        type: 'SYNC_SUBMISSION',
        data: { contestId, submissionId, problemId, problemName, lang, code },
      });

      if (res?.ok) {
        banner.querySelector('.cf-banner-inner').innerHTML = `
          <div class="cf-banner-left" style="color:#4ade80">
            ✅ Pushed to GitHub! 
            <a href="${res.entry.githubUrl}" target="_blank" style="color:#86efac;margin-left:8px">
              View on GitHub →
            </a>
          </div>
          <button class="cf-banner-btn cf-banner-dismiss" id="cf-dismiss2">×</button>
        `;
        document.getElementById('cf-dismiss2')?.addEventListener('click', () => banner.remove());
      } else {
        const inner = banner.querySelector('.cf-banner-inner');
        inner.style.borderColor = '#f87171';
        if (btn) { btn.textContent = 'Retry'; btn.disabled = false; btn.style.background = '#f87171'; }
      }
    });

    document.getElementById('cf-dismiss')?.addEventListener('click', () => banner.remove());

    // Auto-sync if enabled
    if (autoSync) {
      setTimeout(() => document.getElementById('cf-sync-now')?.click(), 1500);
    }
  }

  // ── Init ──────────────────────────────────────────────────
  async function init() {
    const pageType = getPageType();

    if (pageType === 'problem') {
      injectProblemBadge();
    } else if (pageType === 'submission') {
      handleSubmissionPage();
    } else if (pageType === 'my_submissions' || pageType === 'status') {
      watchVerdictPage();
      // Process existing AC rows
      document.querySelectorAll('.verdict-accepted').forEach(v => {
        const row = v.closest('tr');
        if (row) {
          const sub = parseSubmissionRow(row);
          if (sub) injectSyncButtonToRow(row, sub);
        }
      });
    }
  }

  // Run on page load and SPA navigation
  init();

  // Handle CF's SPA-like navigation
  let lastUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(init, 500);
    }
  }).observe(document, { subtree: true, childList: true });
})();
