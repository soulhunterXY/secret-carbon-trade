# Deployment Guide

This guide provides step-by-step instructions for deploying the CarbonTrade Pro application.

## Prerequisites

- GitHub account
- Vercel account
- Node.js 18+ installed locally
- Git configured

## Step 1: Repository Setup

1. **Initialize Git repository**:
```bash
cd /path/to/secret-carbon-trade
git init
```

2. **Add all files to Git**:
```bash
git add .
git commit -m "Initial commit: CarbonTrade Pro platform"
```

3. **Create GitHub repository**:
   - Go to GitHub
   - Click "New repository"
   - Name: `secret-carbon-trade`
   - Make it public
   - Don't initialize with README

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/soulhunterXY/secret-carbon-trade.git
git branch -M main
git push -u origin main
```

## Step 2: Vercel Configuration

1. **Go to Vercel Dashboard**:
   - Visit vercel.com
   - Sign in with GitHub account

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `soulhunterXY/secret-carbon-trade`
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Step 3: Environment Variables

In the Vercel dashboard, add these environment variables:

### Required Variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

### Optional Variables:
```
NEXT_PUBLIC_APP_NAME=CarbonTrade Pro
NEXT_PUBLIC_APP_DESCRIPTION=Carbon Derivatives Trading Platform
```

## Step 4: Build Configuration

1. **Create `vercel.json`**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Step 5: Deploy

1. **Trigger Deployment**:
   - In Vercel dashboard, click "Deploy"
   - Wait for build completion

2. **Verify Deployment**:
   - Check the deployment URL
   - Test wallet connection
   - Verify all pages load correctly

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS records

2. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - HTTPS enabled automatically

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify no extra spaces or quotes

3. **Wallet Connection Issues**:
   - Verify RPC URLs are accessible
   - Check WalletConnect project ID
   - Test with different wallets

### Debug Commands:

```bash
# Check build locally
npm run build

# Test production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint
```

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to Git
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Headers**:
   - Configure security headers in `vercel.json`
   - Enable CORS for API endpoints
   - Set up CSP (Content Security Policy)

3. **Monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking
   - Monitor performance metrics

## Support

For deployment issues:
- Check Vercel documentation
- Contact Vercel support
- Review project logs in dashboard

---

**Deployment completed successfully!** 🚀
