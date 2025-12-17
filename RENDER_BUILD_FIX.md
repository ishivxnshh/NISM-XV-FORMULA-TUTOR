# Render Configuration Instructions

## 🚨 Current Issue: Build Failing

Your deployments are failing during the build phase. Here's how to fix it:

---

## ✅ Solution: Update Render Settings

### Option 1: Update via Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your service: `nism-xv-formula-tutor`
3. Click **Settings** tab
4. Update these settings:

**Build & Deploy Section:**

| Setting | Current Value | New Value |
|---------|--------------|-----------|
| **Build Command** | `npm install && npm run build` | `npm ci && npm install --save-dev typescript && npm run build` |
| **Start Command** | `npm start` | `node dist/index.js` |
| **Root Directory** | `server` | `server` ✓ |
| **Node Version** | Auto | `18` (specify) |

5. Click **Save Changes**
6. Click **Manual Deploy** → **Clear build cache & deploy**

---

### Option 2: Common Build Issues & Fixes

#### Issue 1: TypeScript Not Found

**Error:** `tsc: command not found`

**Fix:** TypeScript is in devDependencies, need to install for build:

```bash
# Update Build Command to:
npm ci && npm install --save-dev typescript @types/node @types/express @types/cors && npm run build
```

#### Issue 2: Missing dist/ Directory

**Error:** `Cannot find module './dist/index.js'`

**Fix:** Ensure TypeScript compiles correctly:

1. Check `tsconfig.json` exists in `server/` folder ✓
2. Verify build command runs `tsc` ✓
3. Ensure `outDir` is set to `./dist` ✓

#### Issue 3: ES Module Issues

**Error:** `Cannot use import statement outside a module`

**Fix:** Already configured correctly in `package.json`:
```json
"type": "module"
```

---

### Option 3: Use Alternative Build Command

If issues persist, try this simplified approach:

**Build Command:**
```bash
npm install && npm run build
```

**package.json scripts:** (already correct)
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## 🔍 Debug: Check Build Logs

In Render Dashboard → Your Service → Logs:

**Look for:**
1. ❌ `npm ERR!` - Package installation issue
2. ❌ `error TS` - TypeScript compilation error
3. ❌ `Cannot find module` - Missing dependencies
4. ❌ `ENOENT` - File not found

**Common fixes:**
- Clear build cache and redeploy
- Verify all files are committed to Git
- Check environment variables are set

---

## 🧪 Test Build Locally First

Before redeploying to Render:

```bash
cd server

# Clean build
rm -rf dist node_modules
npm install
npm run build

# Should create dist/index.js
ls -la dist

# Test start
npm start
```

If local build works but Render fails, it's likely:
- Missing environment variables during build
- Different Node version
- Build cache issue

---

## 📋 Pre-Deployment Checklist

Before clicking "Deploy":

- [ ] All changes committed and pushed to GitHub
- [ ] TypeScript compiles locally without errors
- [ ] `dist/index.js` is created after build
- [ ] Environment variables set in Render:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `PORT` (set to 3000)
- [ ] Build command includes TypeScript installation
- [ ] Start command is `node dist/index.js`

---

## 🎯 Quick Fix (Copy-Paste)

**Go to Render Dashboard → Your Service → Settings:**

1. **Build Command:**
   ```
   npm ci && npm install typescript @types/node @types/express @types/cors && npm run build
   ```

2. **Start Command:**
   ```
   node dist/index.js
   ```

3. **Environment Variables:** (must be set)
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_ANON_KEY` = Your Supabase anon key
   - `PORT` = 3000

4. Click **"Save Changes"**

5. Go to **Manual Deploy** → **"Clear build cache & deploy"**

---

## 🆘 Still Failing?

**Check these:**

1. **Node Version Mismatch**
   - Local: Check with `node --version`
   - Render: Specify in dashboard (18.x recommended)

2. **TypeScript Configuration**
   - Verify `tsconfig.json` is in `server/` folder
   - Check `outDir` points to `./dist`

3. **Missing Files**
   - Ensure all `.ts` files are committed
   - Check `.gitignore` isn't excluding needed files

4. **Dependencies**
   ```bash
   # Ensure these are in package.json:
   "devDependencies": {
     "typescript": "^5.7.2",
     "@types/node": "^20.17.9",
     "@types/express": "^4.17.21",
     "@types/cors": "^2.8.17"
   }
   ```

---

## ✅ Expected Successful Build Log

```
==> Cloning from https://github.com/your-repo...
==> Checking out commit b98c071...
==> Running build command 'npm ci && npm install typescript && npm run build'...
added 250 packages
Building TypeScript...
Build completed successfully
==> Build successful!
==> Starting service with 'node dist/index.js'...
Server running on port 3000
```

---

Once you see the successful build log, your API will be live at:
`https://nism-xv-formula-tutor.onrender.com` ✅
