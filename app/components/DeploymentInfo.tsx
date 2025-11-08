export default function DeploymentInfo() {
  return (
    <div className="deployment-info">
      <h3>🚀 Deployment Status</h3>
      <div className="status-grid">
        <div className="status-item">
          <span className="status-label">Platform:</span>
          <span className="status-value">AWS Lambda</span>
        </div>
        <div className="status-item">
          <span className="status-label">Framework:</span>
          <span className="status-value">Serverless</span>
        </div>
        <div className="status-item">
          <span className="status-label">Status:</span>
          <span className="status-badge">Live</span>
        </div>
        <div className="status-item">
          <span className="status-label">Region:</span>
          <span className="status-value">us-east-1</span>
        </div>
      </div>
    </div>
  )
}

