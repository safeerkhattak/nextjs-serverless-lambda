import DeploymentInfo from './components/DeploymentInfo'

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <div className="welcome-section">
          <h1>Welcome, Hussain Alaidarous! 👋</h1>
        </div>
        
        <div className="info-section">
          <h2>About This Deployment</h2>
          <p>
            This is a modern Next.js 14 application with App Router, running serverlessly on AWS Lambda. 
            The application scales automatically and you only pay for what you use, making it cost-effective 
            and efficient.
          </p>
          <p>
            The deployment demonstrates a production-ready setup with:
          </p>
          <ul className="feature-list">
            <li>✅ Next.js 14 with App Router</li>
            <li>✅ TypeScript support</li>
            <li>✅ Serverless architecture</li>
            <li>✅ Automatic scaling</li>
            <li>✅ Cost-effective (AWS Free Tier)</li>
          </ul>
        </div>

        <DeploymentInfo />
      </div>
    </div>
  )
}

