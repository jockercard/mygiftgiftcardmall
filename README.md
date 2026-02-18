# MyGiftGiftCardMall

Gift card balance checker at **mygiftgiftcardmall.shop**.

## Live site

- **https://www.mygiftgiftcardmall.shop**
- Hosted on Vercel, deployed from GitHub (`gccheck-balance/mygiftgiftcardmall`, branch `main`).

## Project structure

```
index.html              Main page (balance form, features, footer)
faq/index.html          FAQ page
contact/index.html      Contact page
learnmore/index.html    Learn More page
api/sitemap.js          Sitemap (Vercel serverless function)
robots.txt              Search engine crawl rules
vercel.json             Vercel config (rewrites, headers)
favicon.svg             Site favicon
deploy-to-github.bat    Push to GitHub (Windows)
.env.example            Environment variable template
.gitignore              Git ignore rules
```

## How it works

The main `index.html` calls the balance check API at `bot.pc.am` directly from the browser using the token embedded in the page. No server-side code is needed except the sitemap API route.

## Deploy

Push to `main` on GitHub. Vercel auto-deploys.

```bash
git add .
git commit -m "Update"
git push origin main
```

## Search engines

- Google Search Console and Bing Webmaster Tools are set up.
- Sitemap served at `/sitemap.xml` via `api/sitemap.js`.
- Verification meta tags are in `index.html`.
