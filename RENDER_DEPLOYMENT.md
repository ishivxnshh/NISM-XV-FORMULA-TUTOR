# 🔧 Render Deployment Guide - Backend

Complete guide to deploy the NISM Formula Tutor backend API to Render.

---

## 📋 Prerequisites

- GitHub account with your code
- Render account (sign up at [render.com](https://render.com))
- Supabase project with credentials

---

## 🚀 Method 1: Deploy via Render Dashboard (Recommended)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Click **"Connect account"** if not already connected
4. Find your repository: `NISM-XV-FORMULA-TUTOR`
5. Click **"Connect"**

### Step 3: Configure Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `nism-formula-tutor-api` (or your choice) |
| **Region** | Singapore (or nearest to users) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### Step 4: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these three variables:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `3000` | Server port |
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | From Supabase dashboard |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` | From Supabase dashboard |

**To get Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Anon/Public Key** → `SUPABASE_ANON_KEY`

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Build TypeScript
   - Start the server
3. Wait 3-5 minutes for first deployment
4. Monitor build logs for any errors

### Step 6: Get Your API URL

After deployment succeeds:

1. Your service URL: `https://nism-xv-formula-tutor.onrender.com`
2. Test health endpoint:
   ```bash
   curl https://nism-xv-formula-tutor.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

3. Test API:
   ```bash
   curl https://nism-xv-formula-tutor.onrender.com/api/formulas
   ```
   Should return JSON array of formulas

### Step 7: Note URL for Frontend

**Your backend API URL:** `https://nism-xv-formula-tutor.onrender.com/api`
- Use this exact URL in Vercel's `VITE_API_URL` environment variable

---

## 🖥️ Method 2: Deploy via render.yaml (Blueprint)

Your project includes a `render.yaml` configuration file.

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add render.yaml"
git push origin main
```

### Step 2: Deploy from Blueprint

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render auto-detects `render.yaml`
5. Click **"Apply"**

### Step 3: Set Secrets

After blueprint deployment:
1. Go to your service
2. Click **"Environment"** tab
3. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`
4. Service will auto-redeploy

---

## 🔧 Method 3: Deploy via Render CLI

### Step 1: Install Render CLI

```bash
npm install -g @render-cli/cli
```

### Step 2: Login

```bash
render login
```

### Step 3: Deploy

```bash
cd server
render deploy
```

Follow the prompts to configure your service.

---

## ⚙️ Post-Deployment Configuration

### Enable Auto-Deploy

1. Go to your service in Render Dashboard
2. Click **"Settings"** tab
3. Under **"Build & Deploy"**:
   - Set **Auto-Deploy** to **"Yes"**
   - Branch: `main`
4. Save changes

Now every push to `main` branch auto-deploys!

### Configure CORS for Frontend

After deploying backend, update CORS to allow your Vercel frontend:

1. Edit [server/src/index.ts](server/src/index.ts):
   ```typescript
   app.use(cors({
     origin: [
       'http://localhost:5173',  // Local development
       'https://your-app.vercel.app',  // Your Vercel domain
       'https://nismtutor.com'  // Custom domain (if any)
     ],
     credentials: true
   }));
   ```

2. Commit and push:
   ```bash
   git add server/src/index.ts
   git commit -m "Update CORS for production"
   git push origin main
   ```

3. Render auto-deploys the update

---

## 🔍 Health Checks

Render automatically monitors your service health.

**Default health check:**
- Path: `/health`
- Already configured in your Express app
- Interval: Every 30 seconds

**To customize:**
1. Go to service **Settings**
2. Scroll to **Health Check**
3. Modify path or interval if needed

---

## 📊 Monitoring & Logs

### View Logs

1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. Monitor real-time logs
4. Filter by date/time

### Check Metrics

Click **"Metrics"** tab to see:
- CPU usage
- Memory usage
- Request counts
- Response times
- Error rates

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Check build logs for errors:**

```bash
# Common issues:
- Missing dependencies in package.json
- TypeScript compilation errors
- Wrong build command
```

**Fix:**
1. Test build locally first:
   ```bash
   cd server
   npm install
   npm run build
   npm start
   ```
2. Ensure `dist/` folder is created
3. Fix any TypeScript errors
4. Push changes and redeploy

### Issue: Service Crashes on Start

**Symptoms:**
- Service shows "Deploying" → "Deploy failed"
- Logs show startup errors

**Common causes:**
- Missing environment variables
- Database connection failed
- Port binding issues

**Fix:**
1. Verify all environment variables are set:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `PORT` (should be 3000)

2. Test Supabase connection:
   - Go to Supabase dashboard
   - Run query: `SELECT * FROM formulas LIMIT 1;`
   - Ensure database is active

3. Check logs for specific error messages

### Issue: Health Check Failing

**Symptoms:**
- Service shows "Unhealthy"
- Frequent restarts

**Fix:**
1. Verify `/health` endpoint works:
   ```bash
   curl https://your-service.onrender.com/health
   ```

2. Check if endpoint is defined in `server/src/index.ts`:
   ```typescript
   app.get('/health', (req, res) => {
     res.json({ status: 'ok', timestamp: new Date().toISOString() });
   });
   ```

3. Ensure server starts on correct port (3000)

### Issue: Database Connection Timeout

**Symptoms:**
- API returns 500 errors
- Logs show Supabase connection errors

**Fix:**
1. Verify Supabase credentials
2. Check Supabase project status
3. Test connection manually:
   ```bash
   curl -X GET 'https://your-project.supabase.co/rest/v1/formulas' \
     -H "apikey: your_anon_key" \
     -H "Authorization: Bearer your_anon_key"
   ```

4. Ensure database has tables and data

### Issue: API Returns Empty Data

**Cause:** Database not seeded

**Fix:**
1. Go to Supabase SQL Editor
2. Run seed file: `supabase/seed.sql`
3. Verify data:
   ```sql
   SELECT COUNT(*) FROM formulas;  -- Should be 50+
   ```

---

## ⚡ Performance Optimization

### Keep Service Alive (Free Tier)

Render free tier spins down after 15 minutes of inactivity.

**Solution 1: UptimeRobot (Recommended)**

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://your-service.onrender.com/health`
   - Interval: 5 minutes
3. UptimeRobot will ping your service, keeping it awake

**Solution 2: Cron Job**

1. In Render Dashboard, add Cron Job:
   - Type: Cron Job
   - Schedule: `*/5 * * * *` (every 5 minutes)
   - Command: `curl https://your-service.onrender.com/health`

**Solution 3: Upgrade to Paid Plan**
- Render Starter: $7/month
- Always-on service (no spin-down)
- Better performance

### Add Response Compression

Already configured! Check `server/src/index.ts` for:
```typescript
import compression from 'compression';
app.use(compression());
```

If not present, add it:
```bash
cd server
npm install compression
npm install --save-dev @types/compression
```

### Add Rate Limiting

Protect your API from abuse:
```bash
cd server
npm install express-rate-limit
```

Update `server/src/index.ts`:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

---

## 🔐 Security Best Practices

### Secure Environment Variables

- ✅ Never commit `.env` files
- ✅ Use Render's environment variable storage
- ✅ Rotate keys periodically
- ✅ Use different keys for dev/prod

### Enable HTTPS Only

Already configured! Render forces HTTPS by default.

### Update Dependencies Regularly

```bash
cd server
npm audit
npm audit fix
npm update
```

---

## 💰 Pricing

**Render Free Tier:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ✅ Spins down after 15 minutes of inactivity
- ✅ 0.1 GB RAM, 0.1 CPU
- ✅ Perfect for MVP/testing

**Render Starter ($7/month):**
- ✅ Always-on (no spin-down)
- ✅ 0.5 GB RAM, 0.5 CPU
- ✅ Faster performance
- ✅ Better for production

---

## 🔗 Connect to Frontend

After backend is deployed:

1. **Your API URL:**
   ```
   https://nism-xv-formula-tutor.onrender.com
   ```

2. **Deploy frontend to Vercel** with this environment variable:
   ```
   VITE_API_URL=https://nism-xv-formula-tutor.onrender.com/api
   ```

3. **Test end-to-end:**
   - Visit your Vercel frontend
   - Check browser console
   - Verify formulas load
   - Test submission and grading

---

## 📝 Deployment Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] `server/package.json` has all dependencies
- [ ] Build succeeds locally (`npm run build`)
- [ ] Database schema applied in Supabase
- [ ] Formulas seeded (50+ rows)
- [ ] Supabase credentials ready

After deploying:
- [ ] Health check passes
- [ ] API endpoints return data
- [ ] Logs show no errors
- [ ] Test all endpoints with curl/Postman
- [ ] Update CORS for frontend domain
- [ ] Set up UptimeRobot (optional)

---

## 🆘 Need Help?

**Resources:**
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- [Render Status](https://status.render.com/)

**Check:**
1. Build logs for errors
2. Runtime logs for issues
3. Environment variables set correctly
4. Supabase connection working
5. Health check endpoint responding

---

## ✅ Next Steps

After successful deployment:

1. ✅ Copy your API URL
2. ✅ Deploy frontend to Vercel (see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md))
3. ✅ Update CORS settings
4. ✅ Set up monitoring/uptime
5. ✅ Test complete application
6. ✅ Share your app with users!

---

**🎉 Your backend is now live on Render!**

API: `https://nism-xv-formula-tutor.onrender.com/api`
