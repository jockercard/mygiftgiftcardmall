import './BalanceResult.css'

function BalanceResult({ result, onCheckAnother }) {
  if (result.success) {
    return (
      <div className="balance-result success">
        <div className="result-icon">✓</div>
        <h2>Your Balance</h2>
        <div className="balance-amount">
          <span className="currency">{result.currency || 'USD'}</span>
          <span className="amount">{typeof result.balance === 'number' 
            ? result.balance.toFixed(2) 
            : result.balance}</span>
        </div>
        {result.cardLast4 && (
          <p className="card-info">Card ending in •••• {result.cardLast4}</p>
        )}
        {result.cardNetwork && (
          <p className="card-network">{result.cardNetwork}</p>
        )}
      </div>
    )
  }

  return (
    <div className="balance-result error">
      <div className="result-icon">!</div>
      <h2>Unable to Check Balance</h2>
      <p className="error-message">{result.error || 'Please verify your card details and try again.'}</p>
    </div>
  )
}

export default BalanceResult
