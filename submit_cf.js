const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
puppeteer.use(StealthPlugin());

async function submit() {
    const problemId = process.argv[2];
    const filePath = process.argv[3];
    if (!problemId || !filePath) { process.exit(1); }
    const m = problemId.match(/^(\d+)([A-Za-z])$/);
    if (!m) { process.exit(1); }
    const contestId = m[1], problemLetter = m[2].toUpperCase();

    const exe = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe']
                 .find(p => fs.existsSync(p));
    if (!exe) { process.exit(1); }

    const browser = await puppeteer.launch({
        executablePath: exe, headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36');
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    try {
        // Get Cloudflare clearance
        await page.goto('https://codeforces.com', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
        await new Promise(r => setTimeout(r, 3000));

        // Login via fetch (bypasses /enter CF challenge)
        const loginOk = await page.evaluate(async (handle, pass) => {
            try {
                const r = await fetch('https://codeforces.com/enter');
                const html = await r.text();
                const csrf = (html.match(/csrf='([^']+)'/) || [])[1] || '';
                if (!csrf) return false;
                const fd = new URLSearchParams({
                    csrf_token: csrf, action: 'enter', handleOrEmail: handle,
                    password: pass, remember: 'on', _tta: '176'
                });
                const r2 = await fetch('https://codeforces.com/enter', {
                    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: fd, credentials: 'include',
                });
                const html2 = await r2.text();
                return !html2.includes('href="/enter"');
            } catch(e) { return false; }
        }, 'hasibcore', 'obak@valobasha');
        console.log('Login:', loginOk ? 'OK' : 'Failed');

        // Open submit page
        await page.goto(`https://codeforces.com/contest/${contestId}/submit`, {
            waitUntil: 'domcontentloaded', timeout: 20000
        }).catch(() => {});
        await new Promise(r => setTimeout(r, 3000));

        const html = await page.content();
        if (html.includes('submittedProblemIndex')) {
            await page.select('select[name="submittedProblemIndex"]', problemLetter);
            await page.select('select[name="programTypeId"]', '54');
            const source = fs.readFileSync(filePath, 'utf-8');
            await page.evaluate((code) => {
                const ta = document.querySelector('textarea[name="source"]');
                if (ta) ta.value = code;
            }, source);
            await new Promise(r => setTimeout(r, 1500));
            await page.click('input[type="submit"]');
            await new Promise(r => setTimeout(r, 5000));
            const result = await page.content();
            const ok = result.toLowerCase().includes('submitted successfully');
            console.log('Submit:', ok ? 'Success!' : 'Failed');
            if (!ok) {
                const err = result.match(/error[^>]*>([^<]+)/i);
                if (err) console.log('Error:', err[1]);
            }
        } else {
            console.log('Submit page blocked (Cloudflare).');
            console.log('Please submit manually: https://codeforces.com/contest/' + contestId + '/submit');
        }
    } catch (e) {
        console.error('Error:', e.message);
    }

    await browser.close();
    process.exit(0);
}

submit();
