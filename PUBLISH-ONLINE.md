# Publish GC Check Online – Step by Step

Your site is ready. Follow these steps to make it live on the internet and searchable in Google.

---

## Step 1: Restart your computer

After installing Git, restart your computer so it is available in the terminal.

---

## Step 2: Create a GitHub repository

1. Go to **https://github.com**
2. Sign in
3. Click the **+** icon (top right) → **New repository**
4. **Repository name:** `gc-check` (or `gccheck`)
5. **Public**
6. Do **not** check "Add a README file"
7. Click **Create repository**

---

## Step 3: Push your project to GitHub

1. Open **Command Prompt** (search "cmd" in Windows)
2. Run these commands one by one (replace `YOUR_USERNAME` with your GitHub username):

```
cd "c:\Projects\Gift Card checker"
git init
git add .
git commit -m "GC Check site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gc-check.git
git push -u origin main
```

3. If asked to sign in, use your GitHub email and password (or a personal access token).

---

## Step 4: Deploy on Vercel

1. Go to **https://vercel.com**
2. Click **Sign Up** → **Continue with GitHub**
3. Approve Vercel access to GitHub
4. Click **Add New** → **Project**
5. Select your **gc-check** repository
6. Click **Deploy** (keep all defaults)
7. Wait 1–2 minutes

Your site will be live at a URL like: **https://gc-check-xxxxx.vercel.app**

---

## Step 5: Connect a custom URL (optional)

On Vercel, go to **Settings** → **Domains** to add a custom domain or rename the default one.

---

## Step 6: Get GC Check to appear in Google

1. Go to **https://search.google.com/search-console**
2. Sign in with Google
3. Click **Add property**
4. Enter your site URL (e.g. `https://gc-check-xxxxx.vercel.app`)
5. Verify ownership (e.g. HTML file upload or DNS)
6. Click **Request indexing** for your homepage

Google usually indexes new sites within a few days.

---

## Summary checklist

- [ ] Restart computer (after installing Git)
- [ ] Create `gc-check` repo on GitHub
- [ ] Run git commands to push your code
- [ ] Deploy on Vercel
- [ ] Add site to Google Search Console
- [ ] Share your live URL
