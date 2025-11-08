# Next.js Serverless Lambda Deployment

A simple Next.js application with 2 pages (Home and About) deployed on AWS Lambda using the Serverless Framework.

## 🚀 Features

- Next.js 14 with App Router
- TypeScript support
- Deployed on AWS Lambda
- Serverless Framework for deployment
- Public Lambda function URL

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher) installed
2. **AWS Account** with appropriate permissions
3. **AWS CLI** configured with your credentials
4. **Serverless Framework** installed globally (or use npx)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Credentials

Make sure your AWS CLI is configured. If not, run:

```bash
aws configure
```

You'll need:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `me-south-1` (recommended for Saudi Arabia)
- Default output format: `json`

### 3. Install Serverless Framework (if not installed globally)

```bash
npm install -g serverless
```

Or use npx (no global installation needed):
```bash
npx serverless deploy
```

## 🚀 Deployment

### Deploy to AWS Lambda

```bash
npm run deploy
```

Or using serverless directly:

```bash
serverless deploy
```

### Deploy to a specific stage

```bash
serverless deploy --stage prod
```

## 📍 Access Your Application

After deployment, Serverless Framework will output the CloudFront distribution URL. You can access your application at:

```
https://<distribution-id>.cloudfront.net
```

The URL will be displayed in the terminal after successful deployment. The deployment uses CloudFront and Lambda@Edge for optimal performance.

## 🗑️ Remove Deployment

To remove all AWS resources:

```bash
npm run remove
```

Or:

```bash
serverless remove
```

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── about/
│   │   └── page.tsx     # About page
│   └── globals.css      # Global styles
├── serverless.yml       # Serverless configuration
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🔧 Configuration

### AWS Region

The default region is set to `me-south-1` (Bahrain) in `serverless.yml`. You can change it if needed.

### Deployment Architecture

This setup uses `@sls-next/lambda-at-edge` which deploys Next.js to:
- **CloudFront** - CDN for static assets and edge caching
- **Lambda@Edge** - Serverless functions at the edge for dynamic content
- **S3** - Storage for static assets

The deployment automatically handles:
- Static page optimization
- API routes
- Image optimization
- Automatic code splitting

## 📝 Local Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 GitHub Repository Setup

### Option 1: Using the setup script

```bash
./setup-github.sh
```

Then follow the instructions to add your GitHub remote and push.

### Option 2: Manual setup

1. Create a new repository on GitHub
2. Initialize git and push code:

```bash
git init
git add .
git commit -m "Initial commit: Next.js serverless app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 📦 What You Need from AWS

1. **AWS Account** - Create one at [aws.amazon.com](https://aws.amazon.com)
2. **IAM User** with permissions for:
   - Lambda (create, update, delete functions)
   - Lambda@Edge (for edge functions)
   - CloudFront (create, update, delete distributions)
   - API Gateway (create, update, delete APIs)
   - CloudFormation (create, update, delete stacks)
   - S3 (for deployment artifacts and static assets)
   - IAM (for creating execution roles)

3. **Access Keys** - Create IAM user access keys for AWS CLI configuration

## 🔐 AWS IAM Permissions

Your IAM user needs these permissions (or use `AdministratorAccess` for testing):

- `AWSLambda_FullAccess`
- `CloudFrontFullAccess` (for CloudFront distributions)
- `AmazonAPIGatewayAdministrator`
- `CloudFormationFullAccess`
- `IAMFullAccess` (for creating Lambda execution roles)
- `AmazonS3FullAccess` (for deployment artifacts and static assets)

## 🐛 Troubleshooting

### Deployment fails with permission errors

Ensure your AWS credentials have the necessary permissions listed above.

### Region issues

Make sure the region in `serverless.yml` matches your AWS CLI default region or specify it:

```bash
serverless deploy --region me-south-1
```

### Build errors

Make sure all dependencies are installed:

```bash
npm install
```

## 📄 License

MIT

