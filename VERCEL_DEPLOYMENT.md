# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Secret Carbon Trade application to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Node.js 18+ installed locally
- Git configured

## Step 1: Prepare the Repository

1. **Initialize Git repository** (if not already done):
```bash
cd /Users/nithon/Desktop/Zama/secret-carbon-trade
git init
```

2. **Add all files to Git**:
```bash
git add .
git commit -m "Initial commit: Secret Carbon Trade platform with FHE integration"
```

3. **Create GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name: `secret-carbon-trade`
   - Make it public
   - Don't initialize with README (we already have one)

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/soulhunterXY/secret-carbon-trade.git
git branch -M main
git push -u origin main
```

## Step 2: Vercel Setup

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

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

In the Vercel dashboard, go to your project settings and add these environment variables:

### Required Variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### Optional Variables:
```
NEXT_PUBLIC_APP_NAME=Secret Carbon Trade
NEXT_PUBLIC_APP_DESCRIPTION=Encrypted Carbon Derivatives Trading Platform
```

## Step 4: Build Configuration

1. **Create `vercel.json`** in the project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
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

2. **Update `package.json`** build script (if needed):
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Step 5: Deploy

1. **Trigger Deployment**:
   - In Vercel dashboard, click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

2. **Verify Deployment**:
   - Check the deployment URL provided by Vercel
   - Test wallet connection
   - Verify all pages load correctly

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

## Step 7: Monitoring & Updates

1. **Monitor Deployments**:
   - Check Vercel dashboard for deployment status
   - Monitor function logs for any errors

2. **Automatic Deployments**:
   - Every push to main branch triggers automatic deployment
   - Preview deployments for pull requests

3. **Environment Management**:
   - Use different environment variables for production vs development
   - Test changes in preview deployments first

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

4. **Performance Issues**:
   - Enable Vercel Analytics
   - Optimize images and assets
   - Use Vercel's Edge Functions if needed

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

**Deployment completed successfully! 🚀**

Your Secret Carbon Trade platform is now live and ready for encrypted carbon derivatives trading.
