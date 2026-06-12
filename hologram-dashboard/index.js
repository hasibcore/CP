/* 
  hasibcore // Hologram Developer Profile JavaScript
  Dynamic API Integrations and Sci-Fi Animations (No AI Version)
*/

// --- STATE MANAGEMENT ---
const AppState = {
  githubUser: 'hasibcore',
  cfUser: 'hasibcore',
  githubToken: '',
  cacheDuration: 60 * 60 * 1000, // 1 hour in ms
  githubData: null,
  cfData: null,
  activities: []
};

// Global typewriter state
const TypewriterState = {
  snippets: [],
  currentSnippetIdx: 0,
  timer: null,
  lineTimer: null
};

// Global heatmap flash interval
let heatmapFlashInterval = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  loadConfigFromStorage();
  initTimezoneClock();
  initLaptopTypewriter();
  initProjectorParticles();
  initHologramBackgroundCanvas();
  initSidebarAlgoTree();
  initUIEventListeners();
  
  // Initial Fetch
  fetchDashboardData();
});

// --- UI INTERACTIONS & EVENT LISTENERS ---
function initUIEventListeners() {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      moonIcon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>`;
    } else {
      moonIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    }
  });

  // Config Panel Open/Close
  const configPanel = document.getElementById('config-panel');
  const configToggle = document.getElementById('config-toggle');
  
  configToggle.addEventListener('click', () => {
    configPanel.classList.toggle('open');
  });

  // Close config panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!configPanel.contains(e.target) && configPanel.classList.contains('open')) {
      configPanel.classList.remove('open');
    }
  });

  // Config Apply Button
  const configApply = document.getElementById('config-apply');
  configApply.addEventListener('click', () => {
    const ghInput = document.getElementById('config-github').value.trim();
    const cfInput = document.getElementById('config-cf').value.trim();
    const tokenInput = document.getElementById('config-token').value.trim();
    
    if (ghInput) AppState.githubUser = ghInput;
    if (cfInput) AppState.cfUser = cfInput;
    AppState.githubToken = tokenInput;
    
    // Save to LocalStorage
    localStorage.setItem('hologram_githubUser', AppState.githubUser);
    localStorage.setItem('hologram_cfUser', AppState.cfUser);
    localStorage.setItem('hologram_token', AppState.githubToken);
    
    // Clear caches to force refetch
    localStorage.removeItem(`hologram_gh_cache_${AppState.githubUser}`);
    localStorage.removeItem(`hologram_cf_cache_${AppState.cfUser}`);
    
    configPanel.classList.remove('open');
    fetchDashboardData();
  });
  
  // Heatmap Dropdown Toggle
  const heatmapSelect = document.getElementById('heatmap-data-select');
  heatmapSelect.addEventListener('change', () => {
    renderHeatmap(heatmapSelect.value);
  });
}

function loadConfigFromStorage() {
  const gh = localStorage.getItem('hologram_githubUser');
  const cf = localStorage.getItem('hologram_cfUser');
  const token = localStorage.getItem('hologram_token');
  
  if (gh) {
    AppState.githubUser = gh;
    document.getElementById('config-github').value = gh;
  }
  if (cf) {
    AppState.cfUser = cf;
    document.getElementById('config-cf').value = cf;
  }
  if (token) {
    AppState.githubToken = token;
    document.getElementById('config-token').value = token;
  }
}

// --- DYNAMIC CLOCK ---
function initTimezoneClock() {
  const timeVal = document.getElementById('sidebar-time');
  
  function updateClock() {
    // Dhaka Time is UTC+6
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dhakaTime = new Date(utc + (3600000 * 6));
    
    let hours = dhakaTime.getHours();
    const minutes = String(dhakaTime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');
    
    timeVal.textContent = `${hoursStr}:${minutes} ${ampm} (UTC +06:00)`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

// --- FLOATING PARTICLES ---
function initProjectorParticles() {
  const container = document.getElementById('projector-particles');
  container.innerHTML = '';
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.classList.add('p-dot');
  
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const duration = Math.random() * 2 + 2;
  const delay = Math.random() * 3;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${left}%`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `-${delay}s`;
  
  container.appendChild(particle);
}

// --- LAPTOP SCREEN TYPEWRITER ---
function initLaptopTypewriter() {
  const defaultSnippets = [
    [
      `<div class="code-line"><span class="c-purple">const</span> dev = {</div>`,
      `<div class="code-line">&nbsp;&nbsp;name: <span class="c-green">'Hasibul Hasan'</span>,</div>`,
      `<div class="code-line">&nbsp;&nbsp;role: <span class="c-green">'Competitive Programmer'</span>,</div>`,
      `<div class="code-line">&nbsp;&nbsp;skills: [<span class="c-orange">'C++'</span>, <span class="c-orange">'Python'</span>, <span class="c-orange">'JS'</span>],</div>`,
      `<div class="code-line">&nbsp;&nbsp;solve: () => <span class="c-blue">"Optimize. Innovate."</span></div>`,
      `<div class="code-line">};</div>`,
      `<div class="code-line cursor-line">> hasibcore.init() <span class="typing-cursor"></span></div>`
    ],
    [
      `<div class="code-line"><span class="c-blue">#include</span> <span class="c-green">&lt;iostream&gt;</span></div>`,
      `<div class="code-line"><span class="c-purple">int</span> <span class="c-blue">main</span>() {</div>`,
      `<div class="code-line">&nbsp;&nbsp;std::ios_base::sync_with_stdio(<span class="c-orange">0</span>);</div>`,
      `<div class="code-line">&nbsp;&nbsp;std::cin.tie(<span class="c-orange">NULL</span>);</div>`,
      `  std::cout &lt;&lt; <span class="c-green">"Hologram Sync Active\n"</span>;</div>`,
      `  <span class="c-purple">return</span> <span class="c-orange">0</span>;</div>`,
      `<div class="code-line cursor-line">> g++ solver.cpp <span class="typing-cursor"></span></div>`
    ]
  ];
  
  TypewriterState.snippets = defaultSnippets;
  TypewriterState.currentSnippetIdx = 0;
  startTypewriterLoop();
}

function startTypewriterLoop() {
  const screen = document.getElementById('laptop-screen-content');
  if (!screen) return;
  
  if (TypewriterState.timer) clearTimeout(TypewriterState.timer);
  if (TypewriterState.lineTimer) clearTimeout(TypewriterState.lineTimer);
  
  function typeSnippet() {
    screen.innerHTML = '';
    const lines = TypewriterState.snippets[TypewriterState.currentSnippetIdx];
    if (!lines) return;
    let lineIdx = 0;
    
    function showNextLine() {
      if (lineIdx < lines.length) {
        screen.innerHTML += lines[lineIdx];
        lineIdx++;
        TypewriterState.lineTimer = setTimeout(showNextLine, 400);
      } else {
        TypewriterState.timer = setTimeout(() => {
          TypewriterState.currentSnippetIdx = (TypewriterState.currentSnippetIdx + 1) % TypewriterState.snippets.length;
          typeSnippet();
        }, 5000);
      }
    }
    
    showNextLine();
  }
  
  typeSnippet();
}

function updateLaptopTypewriter(gh, cf) {
  const topLangs = getTopLanguages(gh.repos).slice(0, 3);
  const langStr = topLangs.length > 0 ? topLangs.map(l => `'${l}'`).join(', ') : "'C++', 'Python'";
  
  const rating = cf.info.rating || 0;
  const rank = cf.info.rank || 'specialist';
  
  const dynamicSnippets = [
    [
      `<div class="code-line"><span class="c-purple">const</span> dev = {</div>`,
      `<div class="code-line">&nbsp;&nbsp;user: <span class="c-green">'${gh.user.login}'</span>,</div>`,
      `<div class="code-line">&nbsp;&nbsp;cfRating: <span class="c-orange">${rating}</span>,</div>`,
      `<div class="code-line">&nbsp;&nbsp;cfRank: <span class="c-green">'${rank}'</span>,</div>`,
      `<div class="code-line">&nbsp;&nbsp;languages: [${langStr}],</div>`,
      `<div class="code-line">&nbsp;&nbsp;repos: <span class="c-orange">${gh.user.public_repos || 0}</span></div>`,
      `<div class="code-line">};</div>`,
      `<div class="code-line cursor-line">> ${gh.user.login}.sync() <span class="typing-cursor"></span></div>`
    ],
    [
      `<div class="code-line"><span class="c-purple">import</span> sys, time</div>`,
      `<div class="code-line"><span class="c-purple">def</span> <span class="c-blue">sync_nodes</span>(user):</div>`,
      `  print(<span class="c-green">"Accessing GitHub API..."</span>)</div>`,
      `  print(<span class="c-green">"Synchronizing repo commits"</span>)</div>`,
      `  print(<span class="c-green">"Solved: ${cf.submissions ? cf.submissions.filter(s => s.verdict === 'OK').length : 0} problems."</span>)</div>`,
      `  return <span class="c-orange">"SUCCESS"</span></div>`,
      `<div class="code-line cursor-line">> python run_sync.py <span class="typing-cursor"></span></div>`
    ]
  ];
  
  TypewriterState.snippets = dynamicSnippets;
  TypewriterState.currentSnippetIdx = 0;
  startTypewriterLoop();
}

// --- DATA FETCHING & API INTEGRATION ---
async function fetchDashboardData() {
  showLoadingStates();
  
  const ghHeaders = {};
  if (AppState.githubToken) {
    ghHeaders['Authorization'] = `token ${AppState.githubToken}`;
  }
  
  // 1. Fetch GitHub data
  try {
    const ghCache = localStorage.getItem(`hologram_gh_cache_${AppState.githubUser}`);
    const ghCacheTime = localStorage.getItem(`hologram_gh_cache_time_${AppState.githubUser}`);
    
    if (ghCache && ghCacheTime && (Date.now() - ghCacheTime < AppState.cacheDuration)) {
      AppState.githubData = JSON.parse(ghCache);
      updateRateLimitInfo(true);
    } else {
      const userRes = await fetch(`https://api.github.com/users/${AppState.githubUser}`, { headers: ghHeaders });
      if (!userRes.ok) throw new Error("GitHub User fetch failed");
      
      const user = await userRes.json();
      
      const reposRes = await fetch(`https://api.github.com/users/${AppState.githubUser}/repos?per_page=100&sort=updated`, { headers: ghHeaders });
      const repos = reposRes.ok ? await reposRes.json() : [];
      
      const eventsRes = await fetch(`https://api.github.com/users/${AppState.githubUser}/events/public`, { headers: ghHeaders });
      const events = eventsRes.ok ? await eventsRes.json() : [];
      
      // Let's get the contributions calendar
      let scraperCalendar = [];
      let graphqlCalendar = [];
      
      if (AppState.githubToken) {
        try {
          const gqlQuery = {
            query: `
              query($username: String!) {
                user(login: $username) {
                  contributionsCollection {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: { username: AppState.githubUser }
          };
          const gqlRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Authorization': `token ${AppState.githubToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(gqlQuery)
          });
          if (gqlRes.ok) {
            const gqlData = await gqlRes.json();
            if (gqlData.data && gqlData.data.user) {
              const weeks = gqlData.data.user.contributionsCollection.contributionCalendar.weeks;
              weeks.forEach(w => {
                w.contributionDays.forEach(d => {
                  graphqlCalendar.push({ date: d.date, count: d.contributionCount });
                });
              });
            }
          }
        } catch (e) {
          console.error("GQL fetch error:", e);
        }
      }
      
      // If we don't have GQL data, try the scraper
      if (graphqlCalendar.length === 0) {
        try {
          const scraperRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${AppState.githubUser}`);
          if (scraperRes.ok) {
            const scraperData = await scraperRes.json();
            if (scraperData.contributions && Array.isArray(scraperData.contributions)) {
              scraperCalendar = scraperData.contributions;
            }
          }
        } catch (e) {
          console.warn("Scraper fetch error:", e);
        }
      }
      
      const limit = userRes.headers.get('x-ratelimit-remaining');
      const total = userRes.headers.get('x-ratelimit-limit');
      if (limit && total) {
        document.getElementById('rate-limit-info').textContent = `GitHub API: ${limit}/${total} remaining`;
      }
      
      AppState.githubData = { user, repos, events, scraperCalendar, graphqlCalendar };
      
      // Store in Cache
      localStorage.setItem(`hologram_gh_cache_${AppState.githubUser}`, JSON.stringify(AppState.githubData));
      localStorage.setItem(`hologram_gh_cache_time_${AppState.githubUser}`, Date.now().toString());
    }
  } catch (err) {
    console.error("GitHub API Error:", err);
    loadMockGitHubData();
  }
  
  // 2. Fetch Codeforces data
  try {
    const cfCache = localStorage.getItem(`hologram_cf_cache_${AppState.cfUser}`);
    const cfCacheTime = localStorage.getItem(`hologram_cf_cache_time_${AppState.cfUser}`);
    
    if (cfCache && cfCacheTime && (Date.now() - cfCacheTime < AppState.cacheDuration)) {
      AppState.cfData = JSON.parse(cfCache);
    } else {
      const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${AppState.cfUser}`);
      const infoData = await infoRes.json();
      
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${AppState.cfUser}&from=1&count=100`); // increased count for richer heatmap details
      const statusData = await statusRes.json();
      
      if (infoData.status === 'OK' && statusData.status === 'OK') {
        AppState.cfData = { 
          info: infoData.result[0], 
          submissions: statusData.result 
        };
        
        localStorage.setItem(`hologram_cf_cache_${AppState.cfUser}`, JSON.stringify(AppState.cfData));
        localStorage.setItem(`hologram_cf_cache_time_${AppState.cfUser}`, Date.now().toString());
      } else {
        throw new Error("CF API returned error status");
      }
    }
  } catch (err) {
    console.error("Codeforces API Error:", err);
    loadMockCodeforcesData();
  }
  
  // Render everything
  renderDashboard();
}

function showLoadingStates() {
  document.getElementById('sidebar-time').textContent = 'Loading...';
  document.getElementById('timeline-list').innerHTML = `
    <div class="timeline-item">
      <div class="timeline-badge timeline-badge-now">Now</div>
      <div class="timeline-content">
        <p>Connecting to holographic database...</p>
      </div>
    </div>`;
}

function updateRateLimitInfo(isCache) {
  if (isCache) {
    document.getElementById('rate-limit-info').textContent = 'GitHub API: Loading cached data';
  }
}

// --- FALLBACK MOCK DATA ---
function loadMockGitHubData() {
  const mockScraper = [];
  const today = new Date();
  // seed random active coding days in the last year
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (Math.random() > 0.6) {
      mockScraper.push({
        date: d.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 8) + 1
      });
    }
  }

  AppState.githubData = {
    user: {
      name: "Hasibul Hasan",
      login: AppState.githubUser,
      bio: '"Code. Optimize. Innovate." Building solutions, one algorithm at a time.',
      followers: 8,
      following: 7,
      location: "Dhaka, Bangladesh",
      blog: "godhuli.me",
      public_repos: 8,
      avatar_url: `https://github.com/${AppState.githubUser}.png`
    },
    repos: [
      { name: "algorithms", stargazers_count: 3, updated_at: "2026-06-12", language: "C++", commits_mock: 23 },
      { name: "cp-library", stargazers_count: 1, updated_at: "2026-06-11", language: "C++", commits_mock: 15 },
      { name: "web-tools", stargazers_count: 2, updated_at: "2026-06-10", language: "JavaScript", commits_mock: 12 },
      { name: "awesome-project", stargazers_count: 4, updated_at: "2026-06-08", language: "Python", commits_mock: 8 },
      { name: "notes", stargazers_count: 0, updated_at: "2026-06-05", language: "HTML", commits_mock: 5 }
    ],
    events: [
      { type: "PushEvent", repo: { name: `${AppState.githubUser}/algorithms` }, payload: { size: 4 }, created_at: new Date(Date.now() - 120000).toISOString() },
      { type: "PullRequestEvent", repo: { name: `${AppState.githubUser}/awesome-project` }, payload: { action: "opened" }, created_at: new Date(Date.now() - 3600000).toISOString() },
      { type: "WatchEvent", repo: { name: `google/antigravity` }, payload: { action: "started" }, created_at: new Date(Date.now() - 10800000).toISOString() }
    ],
    scraperCalendar: mockScraper,
    graphqlCalendar: []
  };
}

function loadMockCodeforcesData() {
  AppState.cfData = {
    info: {
      handle: AppState.cfUser,
      rating: 1420,
      maxRating: 1510,
      rank: "specialist",
      maxRank: "specialist",
      contribution: 12
    },
    submissions: [
      { problem: { index: "B", name: "Preparing for Merge" }, verdict: "OK", creationTimeSeconds: (Date.now() - 900000) / 1000 },
      { problem: { index: "A", name: "Watermelon" }, verdict: "OK", creationTimeSeconds: (Date.now() - 86400000) / 1000 }
    ]
  };
}

// --- LANGUAGES PARSER ---
function getTopLanguages(repos) {
  const counts = {};
  repos.forEach(r => {
    if (r.language) {
      counts[r.language] = (counts[r.language] || 0) + 1;
    }
  });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

// --- RENDER DYNAMIC LANGUAGES GRID ---
function renderLanguagesAndTools(repos) {
  const topLangs = getTopLanguages(repos);
  const container = document.getElementById('tools-grid');
  if (!container) return;
  container.innerHTML = '';
  
  const langMeta = {
    'C++': { color: '#1f8acb', short: 'C++' },
    'Python': { color: '#3776ab', short: 'Py' },
    'JavaScript': { color: '#f7df1e', short: 'JS' },
    'HTML': { color: '#e34f26', short: 'H5' },
    'CSS': { color: '#1572b6', short: 'C3' },
    'TypeScript': { color: '#3178c6', short: 'TS' },
    'Go': { color: '#00add8', short: 'Go' },
    'Java': { color: '#b07219', short: 'Java' },
    'C': { color: '#555555', short: 'C' },
    'Shell': { color: '#89e051', short: 'Sh' },
    'Rust': { color: '#deeafd', short: 'Rust' },
    'Ruby': { color: '#701516', short: 'Ruby' },
    'PHP': { color: '#4f5d95', short: 'PHP' }
  };
  
  let renderedCount = 0;
  
  topLangs.slice(0, 5).forEach(lang => {
    const meta = langMeta[lang] || { color: '#00d4ff', short: lang.slice(0, 3) };
    const card = document.createElement('div');
    card.classList.add('tool-card');
    card.setAttribute('data-tool', lang);
    card.style.setProperty('--color', meta.color);
    card.innerHTML = `
      <div class="tool-icon-wrapper">
        <span class="tool-logo-text">${meta.short}</span>
      </div>`;
    container.appendChild(card);
    renderedCount++;
  });
  
  const fallbackTools = [
    { name: 'Git', color: '#f05032', short: 'Git' },
    { name: 'GitHub', color: '#ffffff', short: 'GH' },
    { name: 'VS Code', color: '#007acc', short: 'VS' },
    { name: 'HTML5', color: '#e34f26', short: 'H5' },
    { name: 'CSS3', color: '#1572b6', short: 'C3' }
  ];
  
  for (let i = 0; i < fallbackTools.length && renderedCount < 8; i++) {
    const tool = fallbackTools[i];
    if (topLangs.includes(tool.name) || (tool.name === 'HTML5' && topLangs.includes('HTML')) || (tool.name === 'CSS3' && topLangs.includes('CSS'))) {
      continue;
    }
    
    const card = document.createElement('div');
    card.classList.add('tool-card');
    card.setAttribute('data-tool', tool.name);
    card.style.setProperty('--color', tool.color);
    card.innerHTML = `
      <div class="tool-icon-wrapper">
        <span class="tool-logo-text">${tool.short}</span>
      </div>`;
    container.appendChild(card);
    renderedCount++;
  }
}

// --- RENDER FUNCTIONS ---
function renderDashboard() {
  const gh = AppState.githubData;
  const cf = AppState.cfData;
  
  // 1. Profile Sidebar Updates
  document.getElementById('profile-img').src = gh.user.avatar_url || `https://github.com/${AppState.githubUser}.png`;
  document.getElementById('user-name').textContent = gh.user.name || gh.user.login;
  document.getElementById('user-username').innerHTML = `${gh.user.login} <span class="pronouns">he/him</span>`;
  document.getElementById('user-bio').innerHTML = gh.user.bio ? gh.user.bio.replace(/\. /g, '.<br/>') : '"Code. Optimize. Innovate."';
  document.getElementById('sidebar-followers').textContent = gh.user.followers;
  document.getElementById('sidebar-following').textContent = gh.user.following;
  document.getElementById('sidebar-location').textContent = gh.user.location || "Dhaka, Bangladesh";
  
  if (gh.user.blog) {
    const blog = gh.user.blog.startsWith('http') ? gh.user.blog : `https://${gh.user.blog}`;
    document.getElementById('sidebar-website').href = blog;
    document.getElementById('sidebar-website').textContent = gh.user.blog;
  }
  
  document.getElementById('sidebar-github').href = `https://github.com/${gh.user.login}`;
  document.getElementById('sidebar-github').textContent = `github.com/${gh.user.login}`;
  document.getElementById('header-user').textContent = gh.user.login;
  
  document.getElementById('social-github').href = `https://github.com/${gh.user.login}`;
  document.getElementById('social-instagram').href = `https://www.instagram.com/${gh.user.login}/`;
  document.getElementById('social-facebook').href = `https://www.facebook.com/${gh.user.login}/`;
  document.getElementById('social-twitter').href = gh.user.twitter_username ? `https://x.com/${gh.user.twitter_username}` : `https://x.com/Hasibul1Hasan`;
  
  // Role badges updates based on CF rank
  const badgeContainer = document.querySelector('.role-badges');
  let cfRankText = cf.info.rank ? cf.info.rank.toUpperCase() : "COMPETITIVE PROGRAMMER";
  badgeContainer.innerHTML = `
    <span class="badge badge-purple">${cfRankText}</span>
    <span class="badge badge-magenta">Software Developer</span>`;

  // 2. Hero Area updates
  document.getElementById('hero-name').textContent = gh.user.name || gh.user.login;
  document.getElementById('hero-username').textContent = `(${gh.user.login})`;
  if (gh.user.bio) {
    document.getElementById('hero-desc').textContent = gh.user.bio;
  }
  document.getElementById('hero-btn-cf').href = `https://codeforces.com/profile/${cf.info.handle}`;
  document.getElementById('hero-btn-cf').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
    CODEFORCES (${cf.info.handle.toUpperCase()})`;

  document.getElementById('hero-btn-github').href = `https://github.com/${gh.user.login}`;
  document.getElementById('hero-btn-github').innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
    GITHUB (${gh.user.login.toUpperCase()})`;

  // 3. Stats widgets
  let totalStars = 0;
  gh.repos.forEach(r => totalStars += r.stargazers_count);
  document.getElementById('stats-stars').textContent = totalStars;
  document.getElementById('metric-repos').textContent = gh.user.public_repos || gh.repos.length;
  
  let prs = 3;
  let commits = 375;
  let issues = 1;
  let contributed = 1;
  if (gh.user.login !== 'hasibcore') {
    commits = Math.min(2500, (gh.user.public_repos || 5) * 45);
    prs = Math.max(1, Math.round((gh.user.public_repos || 5) * 0.4));
    issues = Math.round(prs * 0.3);
    contributed = Math.max(1, Math.round(prs * 0.5));
  }
  document.getElementById('stats-commits').textContent = commits;
  document.getElementById('stats-prs').textContent = prs;
  document.getElementById('stats-issues').textContent = issues;
  document.getElementById('stats-contributions').textContent = contributed;
  
  document.getElementById('metric-total-contribs').textContent = commits + prs + issues;
  document.getElementById('metric-prs').textContent = prs;
  document.getElementById('metric-streak').textContent = Math.max(1, Math.round(commits / 100));

  // Dynamic Grade Calculation
  calculateProfileGrade(commits, totalStars, prs);

  // 4. Orbit Activity updates
  updateOrbitNodes(gh.repos);

  // 5. Heatmap Generation
  renderHeatmap('commits');

  // 6. Timeline Rendering (Combine Github + Codeforces activities)
  buildTimeline();

  // 7. Dynamic Typewriter terminal code refresh
  updateLaptopTypewriter(gh, cf);

  // 8. Dynamic Languages Grid populating
  renderLanguagesAndTools(gh.repos);

  // 9. Start Flashing heatmap cells
  initHeatmapFlashes();
}

function calculateProfileGrade(commits, stars, prs) {
  const score = (commits * 0.5) + (stars * 10) + (prs * 8);
  let grade = 'C+';
  let offset = 180;
  
  if (score > 1000) {
    grade = 'S+';
    offset = 10;
  } else if (score > 500) {
    grade = 'A+';
    offset = 40;
  } else if (score > 300) {
    grade = 'A';
    offset = 80;
  } else if (score > 150) {
    grade = 'B+';
    offset = 120;
  } else if (score > 80) {
    grade = 'B';
    offset = 150;
  } else if (score > 40) {
    grade = 'C+';
    offset = 180;
  } else {
    grade = 'C';
    offset = 210;
  }
  
  document.getElementById('grade-letter').textContent = grade;
  document.getElementById('grade-ring-fill').style.strokeDashoffset = offset;
}

function updateOrbitNodes(repos) {
  const sortedRepos = [...repos].sort((a, b) => {
    return (b.stargazers_count || 0) - (a.stargazers_count || 0);
  });
  
  const ids = ['orbit-node-1', 'orbit-node-2a', 'orbit-node-2b', 'orbit-node-3a', 'orbit-node-3b'];
  
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]);
    if (el) {
      if (sortedRepos[i]) {
        const repoName = sortedRepos[i].name;
        const commits = sortedRepos[i].commits_mock || Math.round(Math.random() * 20 + 2);
        
        el.style.display = 'flex';
        el.querySelector('.orbit-label').textContent = repoName;
        el.querySelector('.orbit-badge').textContent = `${commits} cmt`;
      } else {
        el.style.display = 'none';
      }
    }
  }
}

// --- TIMELINE BUILDER ---
function buildTimeline() {
  const gh = AppState.githubData;
  const cf = AppState.cfData;
  
  const list = [];
  
  if (gh.events && Array.isArray(gh.events)) {
    gh.events.slice(0, 10).forEach(e => {
      let desc = '';
      if (e.type === 'PushEvent') {
        const count = e.payload.size || 1;
        desc = `Pushed ${count} commit${count > 1 ? 's' : ''} to <a href="https://github.com/${e.repo.name}" class="activity-repo" target="_blank">${e.repo.name.split('/')[1]}</a>`;
      } else if (e.type === 'PullRequestEvent') {
        desc = `${e.payload.action.charAt(0).toUpperCase() + e.payload.action.slice(1)} pull request in <a href="https://github.com/${e.repo.name}" class="activity-repo" target="_blank">${e.repo.name.split('/')[1]}</a>`;
      } else if (e.type === 'WatchEvent') {
        desc = `Starred repository <a href="https://github.com/${e.repo.name}" class="activity-repo" target="_blank">${e.repo.name.split('/')[1]}</a>`;
      } else if (e.type === 'CreateEvent') {
        desc = `Created ${e.payload.ref_type} <span class="activity-repo">${e.payload.ref || e.repo.name.split('/')[1]}</span>`;
      }
      
      if (desc) {
        list.push({
          time: new Date(e.created_at),
          type: 'github',
          content: desc
        });
      }
    });
  }
  
  if (cf.submissions && Array.isArray(cf.submissions)) {
    cf.submissions.slice(0, 5).forEach(s => {
      if (s.verdict === 'OK') {
        list.push({
          time: new Date(s.creationTimeSeconds * 1000),
          type: 'codeforces',
          content: `Solved problem <a href="https://codeforces.com/problemset/problem/${s.problem.contestId}/${s.problem.index}" class="activity-repo" target="_blank">${s.problem.contestId}${s.problem.index} - ${s.problem.name}</a> on Codeforces`
        });
      }
    });
  }
  
  list.sort((a, b) => b.time - a.time);
  
  const container = document.getElementById('timeline-list');
  if (list.length === 0) {
    container.innerHTML = `<div class="timeline-item"><div class="timeline-content"><p>No recent activity synced.</p></div></div>`;
    return;
  }
  
  container.innerHTML = '';
  list.forEach(item => {
    const relTime = formatRelativeTime(item.time);
    
    const div = document.createElement('div');
    div.classList.add('timeline-item');
    div.innerHTML = `
      <div class="timeline-badge">${relTime}</div>
      <div class="timeline-content">
        <p>${item.content}</p>
      </div>`;
    container.appendChild(div);
  });
}

function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.round(diff / 60000);
  const hours = Math.round(diff / 3600000);
  const days = Math.round(diff / 86400000);
  
  if (mins < 1) return 'Now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return '1d ago';
  return `${days}d ago`;
}

// --- HEATMAP RENDER & FLASH PACKETS ---
function renderHeatmap(dataType) {
  const cellsContainer = document.getElementById('heatmap-cells');
  if (!cellsContainer) return;
  cellsContainer.innerHTML = '';
  
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);
  // Align grid start to the nearest preceding Sunday
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  
  const cellCount = 371; // 53 weeks x 7 days
  let totalContributions = 0;
  
  // Create mapping of YYYY-MM-DD -> contribution count
  const contributionMap = {};
  
  // 1. Fill from GraphQL calendar if populated
  if (AppState.githubData && AppState.githubData.graphqlCalendar && AppState.githubData.graphqlCalendar.length > 0) {
    AppState.githubData.graphqlCalendar.forEach(day => {
      contributionMap[day.date] = day.count;
    });
  } 
  // 2. Fill from scraper calendar if populated
  else if (AppState.githubData && AppState.githubData.scraperCalendar && AppState.githubData.scraperCalendar.length > 0) {
    AppState.githubData.scraperCalendar.forEach(day => {
      contributionMap[day.date] = day.count;
    });
  }
  
  // 3. Merge Codeforces solved submissions (verdict == OK)
  if (AppState.cfData && AppState.cfData.submissions) {
    AppState.cfData.submissions.forEach(sub => {
      if (sub.verdict === 'OK') {
        const subDate = new Date(sub.creationTimeSeconds * 1000);
        // Offset to Dhaka timezone
        const offsetDate = new Date(subDate.getTime() + (3600000 * 6));
        const dateStr = offsetDate.toISOString().split('T')[0];
        
        if (dataType === 'codeforces') {
          contributionMap[dateStr] = (contributionMap[dateStr] || 0) + 1;
        } else {
          // In "commits" view, show them combined so all coding activity is visible
          contributionMap[dateStr] = (contributionMap[dateStr] || 0) + 1;
        }
      }
    });
  }
  
  // 4. Merge recent GitHub public events (ensures real-time push visibility)
  if (AppState.githubData && AppState.githubData.events && dataType === 'commits') {
    AppState.githubData.events.forEach(e => {
      const eventDate = new Date(e.created_at);
      const offsetDate = new Date(eventDate.getTime() + (3600000 * 6));
      const dateStr = offsetDate.toISOString().split('T')[0];
      
      let countToAdd = 1;
      if (e.type === 'PushEvent' && e.payload && e.payload.size) {
        countToAdd = e.payload.size;
      }
      contributionMap[dateStr] = Math.max(contributionMap[dateStr] || 0, countToAdd);
    });
  }
  
  // Render grid cells
  for (let i = 0; i < cellCount; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    const dateStr = cellDate.toISOString().split('T')[0];
    
    const count = contributionMap[dateStr] || 0;
    totalContributions += count;
    
    const cell = document.createElement('div');
    cell.classList.add('heatmap-cell');
    cell.setAttribute('data-date', dateStr);
    
    let level = 0;
    if (count > 0) {
      if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;
    }
    
    let bg = 'rgba(6, 10, 36, 0.4)'; // empty cell structure
    if (level === 1) bg = '#0a2d54';
    if (level === 2) bg = '#0052a3';
    if (level === 3) bg = '#007fff';
    if (level === 4) bg = 'var(--neon-cyan)';
    
    cell.style.setProperty('--bg', bg);
    cell.style.backgroundColor = bg;
    
    const formattedDate = cellDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    cell.title = `${count} contribution${count !== 1 ? 's' : ''} on ${formattedDate}`;
    
    cellsContainer.appendChild(cell);
  }
  
  const summaryText = dataType === 'commits' 
    ? `${totalContributions} contributions in the last year`
    : `${totalContributions} Codeforces solves in the last year`;
  
  document.getElementById('heatmap-summary').textContent = summaryText;
}

function initHeatmapFlashes() {
  if (heatmapFlashInterval) clearInterval(heatmapFlashInterval);
  
  heatmapFlashInterval = setInterval(() => {
    // Only flash cells that actually have contributions (non-empty)
    const cells = Array.from(document.querySelectorAll('.heatmap-cell')).filter(c => {
      const bg = c.style.backgroundColor;
      return bg && bg !== 'rgba(6, 10, 36, 0.4)' && !bg.includes('rgba(6, 10, 36, 0.4)');
    });
    
    if (cells.length === 0) return;
    
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * cells.length);
      const cell = cells[idx];
      
      cell.classList.add('flash');
      setTimeout(() => {
        cell.classList.remove('flash');
      }, 1500);
    }
  }, 4000);
}

// --- DYNAMIC BACKGROUND HOLOGRAM CANVAS ---
function initHologramBackgroundCanvas() {
  const canvas = document.getElementById('hologram-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  // Mouse position tracker
  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Floating particle setup
  const codeStrings = [
    '0', '1', 'nullptr', 'std::cout', 'int main()', 'lambda', '0x7FFF', 
    'sys.argv', 'push_back', 'while(true)', 'def sync()', 'hasibcore', 
    'rating', 'status:ok', 'dhaka_node', 'C++', 'Python', 'Go', 'Rust'
  ];
  
  class BackgroundParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    reset() {
      // Place near margins (empty screen space)
      if (Math.random() > 0.5) {
        this.x = Math.random() * (width * 0.18);
      } else {
        this.x = width - Math.random() * (width * 0.18);
      }
      this.y = height + 30;
      this.speed = Math.random() * 0.4 + 0.15;
      this.text = codeStrings[Math.floor(Math.random() * codeStrings.length)];
      this.opacity = Math.random() * 0.05 + 0.015;
      this.fontSize = Math.floor(Math.random() * 4) + 9;
    }
    update() {
      this.y -= this.speed;
      if (this.y < -30) this.reset();
    }
    draw() {
      ctx.font = `${this.fontSize}px 'Fira Code', monospace`;
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fillText(this.text, this.x, this.y);
    }
  }
  
  const particles = [];
  const particleCount = 35;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new BackgroundParticle());
  }
  
  // Rotating Dials Setup
  const hudDials = [
    { x: () => width * 0.08, y: () => height * 0.2, r: 80, speed: 0.0004, dir: 1 },
    { x: () => width * 0.08, y: () => height * 0.8, r: 120, speed: 0.0002, dir: -1 },
    { x: () => width * 0.92, y: () => height * 0.4, r: 100, speed: 0.0003, dir: 1 }
  ];
  
  function drawHUDRing(x, y, radius, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
    ctx.lineWidth = 1;
    
    // Outer arc
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 1.4);
    ctx.stroke();
    
    // Inner dotted arc
    ctx.beginPath();
    ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
    ctx.setLineDash([2, 12]);
    ctx.stroke();
    
    // Outer tick indicator
    ctx.beginPath();
    ctx.moveTo(radius + 2, 0);
    ctx.lineTo(radius + 10, 0);
    ctx.stroke();
    
    ctx.restore();
  }
  
  function drawTechGrid() {
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.01)';
    ctx.lineWidth = 0.5;
    const crossSize = 3;
    
    // draw subtle grid crosses
    for (let x = 60; x < width; x += 60) {
      for (let y = 60; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(x - crossSize, y);
        ctx.lineTo(x + crossSize, y);
        ctx.moveTo(x, y - crossSize);
        ctx.lineTo(x, y + crossSize);
        ctx.stroke();
      }
    }
  }
  
  // Animation Loop
  function tick(timestamp) {
    ctx.clearRect(0, 0, width, height);
    
    drawTechGrid();
    
    hudDials.forEach(dial => {
      const angle = timestamp * dial.speed * dial.dir;
      drawHUDRing(dial.x(), dial.y(), dial.r, angle);
    });
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    if (mouseX > 0) {
      ctx.save();
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
      grad.addColorStop(0, 'rgba(0, 212, 255, 0.035)');
      grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    
    requestAnimationFrame(tick);
  }
  
  requestAnimationFrame(tick);
}

// --- ALGORITHMIC BST TREE HOLOGRAM ---
function initSidebarAlgoTree() {
  const canvas = document.getElementById('sidebar-algo-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const statusTag = document.getElementById('algo-status-tag');
  
  const width = canvas.width = 280;
  const height = canvas.height = 150;
  
  const nodes = [
    { id: 1, x: 140, y: 22, label: "root", val: "50", hex: "0x7F80" },
    { id: 2, x: 80, y: 68, label: "L", val: "30", hex: "0x3A20", parent: 1 },
    { id: 3, x: 200, y: 68, label: "R", val: "70", hex: "0x9E40", parent: 1 },
    { id: 4, x: 40, y: 115, label: "LL", val: "15", hex: "0x1210", parent: 2 },
    { id: 5, x: 110, y: 115, label: "LR", val: "40", hex: "0x5C80", parent: 2 },
    { id: 6, x: 170, y: 115, label: "RL", val: "60", hex: "0x8D30", parent: 3 },
    { id: 7, x: 240, y: 115, label: "RR", val: "85", hex: "0xC6A0", parent: 3 }
  ];
  
  let path = [];
  let pathIndex = 0;
  let targetNodeId = null;
  let particle = { x: 140, y: 22, tx: 140, ty: 22, progress: 1 };
  let nodePulses = {};
  let lastStateTime = Date.now();
  let state = 'idle'; // 'idle', 'traversing', 'success'
  
  function getPathToNode(id) {
    if (id === 1) return [1];
    const node = nodes.find(n => n.id === id);
    if (!node) return [];
    return [...getPathToNode(node.parent), id];
  }
  
  function startNewSearch() {
    const targets = [4, 5, 6, 7];
    targetNodeId = targets[Math.floor(Math.random() * targets.length)];
    path = getPathToNode(targetNodeId);
    pathIndex = 0;
    state = 'traversing';
    
    particle.x = nodes[0].x;
    particle.y = nodes[0].y;
    particle.tx = nodes[0].x;
    particle.ty = nodes[0].y;
    particle.progress = 1;
    
    lastStateTime = Date.now();
    
    if (statusTag) {
      statusTag.textContent = `LOOKUP: ${nodes.find(n => n.id === targetNodeId).val}`;
      statusTag.className = 'panel-status-tag status-searching';
    }
  }
  
  function updateSearch() {
    if (state === 'idle') {
      if (Date.now() - lastStateTime > 1500) {
        startNewSearch();
      }
    } else if (state === 'traversing') {
      if (particle.progress >= 1) {
        const currNodeId = path[pathIndex];
        nodePulses[currNodeId] = 20;
        
        pathIndex++;
        if (pathIndex < path.length) {
          const nextNodeId = path[pathIndex];
          const nextNode = nodes.find(n => n.id === nextNodeId);
          particle.tx = nextNode.x;
          particle.ty = nextNode.y;
          particle.progress = 0;
        } else {
          state = 'success';
          lastStateTime = Date.now();
          if (statusTag) {
            statusTag.textContent = `KEY FOUND [${nodes.find(n => n.id === targetNodeId).hex}]`;
            statusTag.className = 'panel-status-tag status-success';
          }
        }
      } else {
        particle.progress += 0.04; // traversal speed
        const prevNodeId = path[pathIndex - 1];
        const prevNode = nodes.find(n => n.id === prevNodeId);
        particle.x = prevNode.x + (particle.tx - prevNode.x) * particle.progress;
        particle.y = prevNode.y + (particle.ty - prevNode.y) * particle.progress;
      }
    } else if (state === 'success') {
      nodePulses[targetNodeId] = 5;
      if (Date.now() - lastStateTime > 2500) {
        state = 'idle';
        lastStateTime = Date.now();
        if (statusTag) {
          statusTag.textContent = 'COMPILING';
          statusTag.className = 'panel-status-tag';
        }
      }
    }
  }
  
  function drawAlgoTree() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw tree background crosses grid (subtle)
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.02)';
    ctx.lineWidth = 0.5;
    for (let gx = 20; gx < width; gx += 40) {
      for (let gy = 20; gy < height; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(gx - 2, gy); ctx.lineTo(gx + 2, gy);
        ctx.moveTo(gx, gy - 2); ctx.lineTo(gx, gy + 2);
        ctx.stroke();
      }
    }
    
    // Draw connections
    ctx.lineWidth = 1.2;
    nodes.forEach(node => {
      if (node.parent) {
        const parent = nodes.find(n => n.id === node.parent);
        
        let isActive = false;
        if (state !== 'idle') {
          const idxParent = path.indexOf(parent.id);
          const idxNode = path.indexOf(node.id);
          if (idxParent !== -1 && idxNode !== -1 && idxNode === idxParent + 1) {
            if (pathIndex >= idxNode) {
              isActive = true;
            }
          }
        }
        
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(node.x, node.y);
        if (isActive) {
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
          ctx.shadowColor = 'rgba(0, 212, 255, 0.7)';
          ctx.shadowBlur = 4;
        } else {
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;
    
    // Draw Nodes
    nodes.forEach(node => {
      const pulse = nodePulses[node.id] || 0;
      if (nodePulses[node.id] > 0) nodePulses[node.id]--;
      
      const isTarget = node.id === targetNodeId;
      const isPath = path.includes(node.id);
      
      let radius = 6.5;
      let fillStyle = 'rgba(2, 6, 26, 0.95)';
      let strokeStyle = 'rgba(0, 212, 255, 0.2)';
      
      if (isPath) {
        strokeStyle = 'rgba(0, 212, 255, 0.5)';
      }
      if (pulse > 0) {
        radius = 6.5 + (pulse * 0.2);
        strokeStyle = 'rgba(0, 212, 255, 0.85)';
      }
      if (state === 'success' && isTarget) {
        strokeStyle = 'rgba(57, 255, 20, 0.8)';
      }
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1.2;
      ctx.fill();
      ctx.stroke();
      
      // Node value
      ctx.font = "7px 'Fira Code', monospace";
      ctx.fillStyle = isPath ? 'rgba(0, 212, 255, 0.85)' : 'rgba(0, 212, 255, 0.25)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.val, node.x, node.y);
      
      // Node Metadata info
      if (pulse > 0 || (state === 'success' && isTarget)) {
        ctx.font = "6px 'Fira Code', monospace";
        ctx.fillStyle = (state === 'success' && isTarget) ? '#39ff14' : 'rgba(0, 212, 255, 0.85)';
        ctx.textAlign = 'left';
        ctx.fillText(node.hex, node.x + radius + 3, node.y - 3);
        ctx.fillStyle = 'rgba(138, 43, 226, 0.85)';
        ctx.fillText(`*${node.label}`, node.x + radius + 3, node.y + 4);
      }
    });
    
    // Draw particle searcher
    if (state === 'traversing') {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  function tick() {
    updateSearch();
    drawAlgoTree();
    requestAnimationFrame(tick);
  }
  
  startNewSearch();
  tick();
}
