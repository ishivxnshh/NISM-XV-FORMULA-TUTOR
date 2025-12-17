# 🚀 Vercel Deployment Guide - Frontend

Complete guide to deploy the NISM Formula Tutor frontend to Vercel.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Backend API deployed (see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md))

---

## 🎯 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

Ensure your code is on GitHub:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select **"Import Git Repository"**
4. Choose your repository: `NISM-XV-FORMULA-TUTOR`
5. Click **"Import"**

### Step 3: Configure Build Settings

Vercel should auto-detect Vite, but verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node Version** | 18.x |

### Step 4: Set Environment Variables

Before deploying, add this environment variable:

1. Click on **"Environment Variables"** section
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://nism-xv-formula-tutor.onrender.com/api`
3. Make sure it's enabled for **Production**, **Preview**, and **Development**

> ⚠️ **Important**: Replace `your-backend-url` with your actual Render backend URL

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. Your app will be live at: `https://your-project.vercel.app`

### Step 6: Verify Deployment

1. Visit your deployed URL
2. Open browser console (F12)
3. Check for any API connection errors
4. Test functionality:
   - ✅ Formulas load
   - ✅ Can select category
   - ✅ Can submit answers
   - ✅ Grading works

---

## 🖥️ Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Navigate to Client Folder

```bash
cd client
```

### Step 4: Deploy

```bash
# First deployment (preview)
vercel

# Production deployment
vercel --prod
```

### Step 5: Set Environment Variable

During the deployment prompts:

```bash
? Set up and deploy "~/client"? [Y/n] y
? Which scope do you want to deploy to? Your Account
? Link to existing project? [y/N] n
? What's your project's name? nism-formula-tutor
? In which directory is your code located? ./
? Want to override the settings? [y/N] n

# After deployment, set environment variable
vercel env add VITE_API_URL production
# Enter: https://nism-xv-formula-tutor.onrender.com/api
```

Or set it via dashboard after deployment.

---

## 🔧 Method 3: Using vercel.json Config

Your project already has `vercel.json` configured. Just:

```bash
# From project root
vercel --prod

# Or from client folder
cd client
vercel --prod
```

Vercel will use the configuration in `vercel.json`.

---

## 🌐 Custom Domain Setup (Optional)

### Add Custom Domain

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `nismtutor.com`)
4. Follow DNS configuration instructions

### Update DNS Records

Add these records at your domain provider:

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

- Vercel automatically provisions SSL certificate
- HTTPS enabled within 5-60 minutes

---

## ⚙️ Environment Variables

### Production Environment

Set in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `https://nism-xv-formula-tutor.onrender.com/api` | Production, Preview, Development |

### Preview/Development Environment

Optionally set different URLs for preview branches:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `http://localhost:3000/api` | Development |

---

## 🔄 Automatic Deployments

### Enable Auto-Deploy

Vercel automatically deploys on every push to `main` branch.

**Default behavior:**
- Push to `main` → Production deployment
- Push to other branches → Preview deployment
- Pull requests → Preview deployment with unique URL

### Deploy Hooks

Create deploy hooks for manual/programmatic deployments:

1. Go to **Settings** → **Git**
2. Scroll to **Deploy Hooks**
3. Create new hook
4. Copy webhook URL

Trigger deployment:
```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/xxx/xxx
```

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Check:**
- Build logs in Vercel dashboard
- Ensure `client/package.json` has all dependencies
- Verify build command: `npm run build`
- Check TypeScript errors

**Fix:**
```bash
# Test build locally first
cd client
npm install
npm run build
```

### Issue: Environment Variable Not Working

**Symptoms:**
- API calls failing
- "Failed to fetch" errors

**Fix:**
1. Verify `VITE_API_URL` is set in Vercel dashboard
2. Ensure variable starts with `VITE_` prefix
3. Redeploy after adding variables
4. Check browser console for the API URL being used

### Issue: Blank Page After Deployment

**Causes:**
- JavaScript errors
- Missing build files
- Incorrect base path

**Fix:**
1. Check browser console for errors
2. Verify `dist` directory is set as output
3. Check Vercel function logs
4. Ensure all assets are in `client/public/`

### Issue: API CORS Errors

**Symptoms:**
```
Access to fetch at 'https://api.onrender.com/api/formulas' from origin 'https://app.vercel.app' 
has been blocked by CORS policy
```

**Fix:**
Update backend CORS configuration to include your Vercel domain:

```typescript
// server/src/index.ts
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

Then redeploy backend.

### Issue: 404 on Refresh

**Cause:** SPA routing not configured

**Fix:**
Already handled in `vercel.json` with rewrites:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

---

## 📊 Performance Optimization

### Enable Edge Caching

Already configured in `vercel.json`:
```json
"headers": [
  {
    "source": "/assets/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

### Enable Analytics

1. Go to **Analytics** tab in Vercel dashboard
2. Enable **Web Analytics**
3. Monitor:
   - Page views
   - Unique visitors
   - Performance metrics

### Enable Speed Insights

1. Install package:
   ```bash
   cd client
   npm install @vercel/speed-insights
   ```

2. Add to `client/src/main.tsx`:
   ```typescript
   import { SpeedInsights } from '@vercel/speed-insights/react';
   
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <App />
       <SpeedInsights />
     </React.StrictMode>
   );
   ```

3. Redeploy

---

## 🔐 Security Headers

Already configured in `vercel.json`:

```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]
  }
]
```

---

## 📝 Deployment Checklist

Before deploying:

- [ ] Code pushed to GitHub
- [ ] Backend deployed and URL ready
- [ ] `VITE_API_URL` environment variable set
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] ESLint passes (`npm run lint`)

After deploying:

- [ ] Visit deployed URL
- [ ] Check browser console for errors
- [ ] Test all major features
- [ ] Verify API connectivity
- [ ] Test on mobile devices
- [ ] Check performance scores

---

## 💰 Pricing

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL
- ✅ Preview deployments
- ✅ Analytics included
- ✅ Perfect for this project

**Upgrade needed if:**
- Bandwidth exceeds 100 GB/month
- Need team collaboration
- Custom deployment protection

---

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

## 📞 Support

**Issues?**
- Check [Vercel Status](https://www.vercel-status.com/)
- Review deployment logs
- Check [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## ✅ Next Steps

After successful deployment:

1. ✅ Deploy backend to Render (see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md))
2. ✅ Update CORS on backend
3. ✅ Test end-to-end functionality
4. ✅ Add custom domain (optional)
5. ✅ Enable analytics
6. ✅ Share your deployed app!

---

**🎉 Your frontend is now live on Vercel!**

Visit: `https://your-project.vercel.app`
