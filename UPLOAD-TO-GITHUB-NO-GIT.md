# Upload to GitHub WITHOUT Git (Web Upload)

Since Git is not installed, use this method:

---

## Step 1: Open your repo

1. Go to **https://github.com/gccheck-balance/gc-check**
2. Make sure you're signed in

---

## Step 2: Upload files

1. Click **"Add file"** → **"Upload files"**
2. Open folder: `c:\Projects\Gift Card checker`
3. Select ALL files and folders EXCEPT:
   - **.env** (DO NOT upload - has your secret token!)
   - **node_modules** (if visible - skip it)
4. Drag them into the GitHub upload area
5. Scroll down, type message: **GC Check site**
6. Click **"Commit changes"**

---

## Files to upload

✅ index.html  
✅ package.json  
✅ README.md  
✅ run.js  
✅ vercel.json  
✅ api folder (with check-balance.js)  
✅ standalone folder (with index.html)  
✅ server folder  
✅ src folder  
✅ public folder  

❌ .env (DO NOT UPLOAD)  
❌ node_modules (DO NOT UPLOAD)

---

## Step 3: Deploy on Vercel

1. Go to **https://vercel.com**
2. Sign up with **GitHub**
3. **Add New** → **Project**
4. Select **gc-check**
5. Click **Deploy**

Done! Your site will be live.
