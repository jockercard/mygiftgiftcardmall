# GC Check

Gift card balance checker. Uses the [Check Balance API](https://github.com/lusinenasib/apidoc/wiki) at bot.pc.am.

## Setup

1. Copy `.env.example` to `.env`
2. Add your API token (from your checker BOT settings):
   ```
   API_TOKEN=your_token_here
   ```

## Run the site

```bash
cd "c:\Projects\Gift Card checker"
node run.js
```

Then open **http://localhost:3000** in your browser.

## Branding

Site name is **GC Check**. Edit `index.html` or `standalone/index.html` to change the header text.

## Bank API

When you have your bank's API, you'll integrate it into the backend. The form and design are ready.
