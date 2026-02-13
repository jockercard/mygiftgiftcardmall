import { useState } from 'react'
import BalanceForm from './components/BalanceForm'
import BalanceResult from './components/BalanceResult'
import TrustBadges from './components/TrustBadges'
import Header from './components/Header'
import './App.css'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheckBalance = async (formData) => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/check-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          expiryMonth: formData.expiryMonth,
          expiryYear: formData.expiryYear,
          cvv: formData.cvv
        })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ success: false, error: 'Connection failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const [formKey, setFormKey] = useState(0)
  const handleReset = () => {
    setResult(null)
    setFormKey(k => k + 1) // Reset form fields
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <section className="hero">
          <h1>Manage Your Gift Card</h1>
          <p>Check your balance and access your account</p>
        </section>

        <div className="content-grid">
          <div className="form-section">
            <div className="card-form">
              <BalanceForm 
                key={formKey}
                onSubmit={handleCheckBalance} 
                loading={loading}
                onReset={handleReset}
                showReset={!!result}
              />
              {result && <BalanceResult result={result} onCheckAnother={handleReset} />}
            </div>
          </div>

          <aside className="badges-section">
            <TrustBadges />
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logos">
          <span className="card-logo visa">Visa</span>
          <span className="card-logo mastercard">Mastercard</span>
        </div>
        <p>Use anywhere Visa or Mastercard are accepted</p>
      </footer>
    </div>
  )
}

export default App
