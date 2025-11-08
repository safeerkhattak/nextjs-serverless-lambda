# AWS Cost Information - FREE TIER

## ✅ Your Deployment is FREE

Your Next.js app deployment uses:
- **AWS Lambda** - FREE (1M requests/month, 400K GB-seconds/month) - **PERMANENT FREE TIER**
- **API Gateway HTTP API** - FREE (1M API calls/month) - **12 MONTHS FREE**

## 📊 Free Tier Limits

### AWS Lambda (Permanent Free Tier)
- ✅ 1 million requests per month
- ✅ 400,000 GB-seconds of compute time per month
- **Your usage:** ~0.5 GB-seconds per request (with 512MB memory)
- **Safe limit:** ~800,000 requests/month before any charges

### API Gateway HTTP API (12 Months Free)
- ✅ 1 million API calls per month
- **Your usage:** 1 API call per page view
- **Safe limit:** 1 million page views/month

## 💰 Cost Estimate for Your Test

For a simple test with 2 pages:
- **Expected usage:** < 100 requests/day = ~3,000 requests/month
- **Cost:** **$0.00** (well within free tier)
- **Even with 10,000 requests/month:** Still **$0.00**

## 🚨 How to Monitor Costs

1. **AWS Billing Dashboard:**
   - Go to: https://console.aws.amazon.com/billing/
   - Check "Free Tier Usage" tab
   - Set up billing alerts

2. **Set Up Billing Alerts:**
   ```bash
   # In AWS Console:
   # Billing > Preferences > Receive Billing Alerts
   # Set alert at $1.00
   ```

3. **Check Current Usage:**
   - AWS Console > Lambda > Your function > Monitoring
   - AWS Console > API Gateway > Your API > Metrics

## 🗑️ Remove Deployment (If Needed)

If you want to remove everything to ensure no charges:

```bash
npm run remove
# or
npx serverless remove
```

This will delete:
- Lambda function
- API Gateway
- All associated resources
- **No charges after removal**

## ⚠️ Important Notes

1. **Free tier is per AWS account** - not per deployment
2. **Lambda free tier is PERMANENT** - never expires
3. **API Gateway free tier is 12 months** - then standard rates apply
4. **For testing:** You're using < 0.1% of free tier limits
5. **No hidden costs:** Only Lambda + API Gateway are used

## 📝 What You're Using

- **Lambda:** 512MB memory, 10s timeout
- **API Gateway:** HTTP API (cheaper than REST API)
- **No S3, CloudFront, or other services** = No additional costs

## ✅ Conclusion

**You will NOT be charged for this test deployment.**

The free tier limits are very generous, and your simple 2-page app will use less than 1% of the free tier limits.

