# Quick Start Guide

## 🚀 What You Have

A complete Next.js application with 2 pages (Home and About) ready to deploy on AWS Lambda using Serverless Framework.

## ✅ Current Status

- ✅ AWS CLI is installed and configured
- ✅ Current AWS region: `ap-south-1` (will use `me-south-1` for deployment)
- ✅ Project structure is complete
- ⏳ Dependencies need to be installed
- ⏳ GitHub repository needs to be created
- ⏳ AWS deployment needs to be done

## 📋 Next Steps

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Serverless Framework
- @sls-next/lambda-at-edge (for Next.js on Lambda)

### Step 2: Test Locally (Optional)

```bash
npm run dev
```

Visit http://localhost:3000 to see your app locally.

### Step 3: Update AWS Region (if needed)

Your current AWS CLI region is `ap-south-1`. The deployment is configured for `me-south-1` (Bahrain - closest to Saudi Arabia).

If you want to use a different region, update `serverless.yml`:

```yaml
provider:
  region: me-south-1  # Change this if needed
```

Or update your AWS CLI default region:

```bash
aws configure set region me-south-1
```

### Step 4: Set Up GitHub Repository

#### Option A: Using the script

```bash
./setup-github.sh
```

Then:
1. Go to https://github.com/new
2. Create a new repository (don't initialize with README)
3. Run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

#### Option B: Manual setup

1. Create a new repository on GitHub
2. Run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Next.js serverless app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 5: Verify AWS Permissions

Make sure your AWS IAM user has these permissions:
- `AWSLambda_FullAccess`
- `CloudFrontFullAccess`
- `AmazonAPIGatewayAdministrator`
- `CloudFormationFullAccess`
- `IAMFullAccess`
- `AmazonS3FullAccess`

Or use `AdministratorAccess` for testing.

### Step 6: Deploy to AWS

```bash
npm run deploy
```

Or:

```bash
serverless deploy
```

**First deployment may take 5-10 minutes** as it creates:
- CloudFront distribution
- Lambda@Edge functions
- S3 buckets
- IAM roles

After deployment, you'll see a CloudFront URL like:
```
https://<distribution-id>.cloudfront.net
```

### Step 7: Access Your Application

Open the CloudFront URL in your browser. You should see:
- Home page at `/`
- About page at `/about`

## 🆘 Troubleshooting

### If deployment fails:

1. **Check AWS credentials:**
   ```bash
   aws sts get-caller-identity
   ```

2. **Check permissions:**
   Make sure your IAM user has all required permissions.

3. **Check region:**
   Make sure the region in `serverless.yml` is available in your AWS account.

4. **Check Node.js version:**
   ```bash
   node --version  # Should be 18 or higher
   ```

### If you get build errors:

```bash
rm -rf node_modules .next
npm install
npm run build
```

## 📝 Important Notes

1. **First deployment is slow** - This is normal. Subsequent deployments are faster.

2. **CloudFront propagation** - After deployment, it may take a few minutes for CloudFront to fully propagate.

3. **Costs** - AWS Lambda and CloudFront have free tiers. You should be within free tier limits for this simple app.

4. **Region** - `me-south-1` (Bahrain) is closest to Saudi Arabia. If this region is not available, you can use `eu-south-1` or `ap-south-1`.

## 🎯 What You'll Get

After successful deployment:
- ✅ Public CloudFront URL (accessible from anywhere)
- ✅ Two working pages (Home and About)
- ✅ Serverless architecture (scales automatically)
- ✅ Fast global CDN delivery

## 📞 Need Help?

Check the main `README.md` for detailed documentation.

