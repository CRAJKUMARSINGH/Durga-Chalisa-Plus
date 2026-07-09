# Netlify Deployment Guide

This guide explains how to deploy the Durga Chalisa Plus app to Netlify using your existing Netlify credits.

## Prerequisites

- Netlify account with available credits
- Git repository with this code
- Node.js 18+ installed locally

## Deployment Methods

### Method 1: Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in the project**
   ```bash
   cd artifacts/durga-chalisa
   netlify init
   ```

4. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Git Integration (Automatic)

1. **Push code to Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select this repository

3. **Configure build settings**
   - **Build command**: `pnpm install && pnpm run build:netlify`
   - **Publish directory**: `dist/public`
   - **Node version**: 18

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

### Method 3: Drag & Drop

1. **Build locally**
   ```bash
   cd artifacts/durga-chalisa
   pnpm install
   pnpm run build:netlify
   ```

2. **Deploy to Netlify**
   - Go to https://app.netlify.com
   - Drag the `dist/public` folder to the deployment area

## Configuration Files

### netlify.toml
- Build command: Uses `build:netlify` script
- Publish directory: `dist/public`
- SPA routing: All routes redirect to index.html
- Security headers: XSS protection, frame options
- Cache headers: Optimized for JS/CSS files

### vite.config.netlify.ts
- Simplified Vite config for Netlify
- Removes Replit-specific plugins
- Sets base path to `/`
- Maintains same build output structure

## Environment Variables

If you need environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add any required variables
3. Redeploy for changes to take effect

## Custom Domain

To use a custom domain (e.g., durga-chalisa.netlify.app):

1. Go to Domain settings in Netlify
2. Add custom domain or use default Netlify subdomain
3. Update DNS if using custom domain

## Performance Optimization

The Netlify configuration includes:

- **Asset caching**: JS/CSS files cached for 1 year
- **SPA routing**: Client-side routing works correctly
- **Security headers**: XSS and clickjacking protection
- **HTTP/2**: Automatic on Netlify
- **CDN**: Global edge network

## Troubleshooting

### Build fails with pnpm errors
```bash
# Use the build:netlify script which handles pnpm properly
pnpm run build:netlify
```

### Routes not working
- Check that `netlify.toml` has the SPA redirect rule
- Ensure `base: '/'` in vite.config.netlify.ts

### Assets not loading
- Verify publish directory is `dist/public`
- Check build output locally first

## Monitoring

Netlify provides:
- Build logs
- Deploy previews
- Analytics (with paid plan)
- Function logs
- Form handling

## Cost

- **Free tier**: 100GB bandwidth/month, 300 build minutes/month
- **Pro tier**: $19/month for higher limits
- Your existing credits can be applied to any tier

## Reference

Current deployments:
- Replit: https://durga-chalisa-plus--crajkumarsingh.replit.app
- Reference: https://sundarkand-display.netlify.app/
