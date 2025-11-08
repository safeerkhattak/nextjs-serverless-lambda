import DeploymentInfo from '../components/DeploymentInfo'

export default function About() {
  return (
    <div className="container">
      <div className="card">
        <h1>About This Project</h1>
        
        <div className="info-section">
          <h2>Hey Hussain Alaidarous! 👋</h2>
          <p>
            This Next.js application has been successfully deployed on AWS Lambda using the Serverless Framework. 
            The deployment demonstrates a modern, production-ready setup that is both scalable and cost-effective.
          </p>
        </div>

        <div className="info-section">
          <h2>Technologies Used</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <strong>Next.js 14</strong>
              <span>App Router</span>
            </div>
            <div className="tech-item">
              <strong>React 18</strong>
              <span>Latest Features</span>
            </div>
            <div className="tech-item">
              <strong>TypeScript</strong>
              <span>Type Safety</span>
            </div>
            <div className="tech-item">
              <strong>AWS Lambda</strong>
              <span>Serverless</span>
            </div>
            <div className="tech-item">
              <strong>Serverless Framework</strong>
              <span>Deployment</span>
            </div>
            <div className="tech-item">
              <strong>API Gateway</strong>
              <span>HTTP API</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h2>Deployment Details</h2>
          <p>
            This application is running on AWS infrastructure with the following benefits:
          </p>
          <ul className="feature-list">
            <li>🚀 Automatic scaling based on traffic</li>
            <li>💰 Cost-effective (within AWS Free Tier)</li>
            <li>⚡ Fast response times with serverless architecture</li>
            <li>🔒 Secure HTTPS endpoint</li>
            <li>📦 Easy deployment and updates</li>
            <li>🌐 Global availability</li>
          </ul>
        </div>

        <DeploymentInfo />
      </div>
    </div>
  )
}

