# 🚀 Deployment Guide - Railway

Deploy your Phone Tracker app to the cloud for **worldwide access**!

## Prerequisites
- GitHub account (free)
- Railway account (free, [railway.app](https://railway.app))

---

## Step 1: Push to GitHub

```powershell
cd "d:\Project Website\Phone Track"
git init
git add .
git commit -m "Initial commit - Phone Tracker App"
```

Create a new repository on GitHub, then:
```powershell
git remote add origin https://github.com/YOUR-USERNAME/Phone-Track.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your `Phone-Track` repository
4. In Railway dashboard:
   - Go to **Settings** → **Root Directory**
   - Set to: `backend`
   - Click **Deploy**
5. Wait for build to complete (2-3 minutes)
6. Note your backend URL: `https://phone-tracker-XXXX.railway.app`

### Environment Variables for Backend
In Railway Dashboard → Variables:
```
PORT=5000
NODE_ENV=production
```

---

## Step 3: Deploy Frontend to Railway

1. Click **"New Project"** → **"Deploy from GitHub"**
2. Select same repository
3. In Railway dashboard:
   - Go to **Settings** → **Root Directory**
   - Set to: `frontend`
   - Go to **Deploy** → **Build Command**
   - Set to: `npm run build`
   - Go to **Deploy** → **Start Command**
   - Set to: `npm start`

### Environment Variables for Frontend
In Railway Dashboard → Variables:
```
REACT_APP_API_URL=https://phone-tracker-XXXX.railway.app
```
(Replace XXXX with your backend subdomain)

---

## Step 4: Connect Services (Optional but Recommended)

1. Frontend project → **Settings** → **Environment**
2. Set `REACT_APP_API_URL` to your backend URL
3. Redeploy frontend (this will pick up the new URL)

---

## Step 5: Access Your App from Anywhere

### Desktop Manager:
```
https://phone-tracker-YYYY.railway.app
```

### Track Phone Location:
On any phone, anywhere in the world:
```
https://phone-tracker-YYYY.railway.app/tracker.html
```

Done! 🎉

---

## Troubleshooting

### Frontend shows "Failed to fetch devices"
**Fix:** Check that `REACT_APP_API_URL` environment variable is set correctly
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Backend build fails
**Fix:** Ensure `Node.js version` is set to `18+` in Railway settings

### Blank page on frontend
**Fix:** Clear browser cache (Ctrl+Shift+Delete) and reload

### Location not updating
**Fix:** Check browser console for CORS errors - backend URL must be correct

---

## Monitoring & Logs

In Railway Dashboard:
- **Deployments** - see build status
- **Logs** - view runtime errors
- **Metrics** - check performance

---

## Cost
- **Railway Free Tier:** $5/month free credits (enough for small usage)
- No credit card required to start
- Pay-as-you-go after free credits

---

## Updating Your App

After making changes locally:

```powershell
git add .
git commit -m "Update features"
git push
```

Railway automatically redeploys! ✨

---

## FAQ

**Q: Can I use a custom domain?**
A: Yes, Railway supports custom domains (paid feature)

**Q: Can I add a database?**
A: Yes, Railway supports PostgreSQL, MySQL, MongoDB

**Q: How do I stop paying?**
A: Just delete the Railway projects - no charges accrue

---

**Your app is now live worldwide!** 🌍
