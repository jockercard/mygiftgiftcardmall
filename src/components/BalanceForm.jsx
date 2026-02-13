import { useState } from 'react'
import './BalanceForm.css'

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 19)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function BalanceForm({ onSubmit, loading, onReset, showReset }) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState({})

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2)
    if (field === 'month') {
      const num = parseInt(value, 10)
      setExpiryMonth(num >= 1 && num <= 12 ? value : value)
      if (value.length === 2 && (num < 1 || num > 12)) setErrors(prev => ({ ...prev, expiryMonth: 'Invalid month' }))
      else setErrors(prev => ({ ...prev, expiryMonth: null }))
    } else {
      setExpiryYear(value)
    }
  }

  const validate = () => {
    const newErrors = {}
    const digits = cardNumber.replace(/\s/g, '')
    if (digits.length < 15 || digits.length > 19) newErrors.cardNumber = 'Enter a valid card number'
    if (!expiryMonth || expiryMonth.length !== 2) newErrors.expiryMonth = 'Required'
    else if (parseInt(expiryMonth, 10) < 1 || parseInt(expiryMonth, 10) > 12) newErrors.expiryMonth = 'Invalid'
    if (!expiryYear || expiryYear.length !== 2) newErrors.expiryYear = 'Required'
    if (!cvv || cvv.length < 3) newErrors.cvv = 'Enter 3-4 digit CVV'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate() || loading) return

    onSubmit({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv: cvv.replace(/\D/g, '')
    })
  }

  if (showReset) {
    return (
      <div className="form-actions-only">
        <button type="button" className="btn btn-secondary" onClick={onReset} disabled={loading}>
          Check Another Card
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="balance-form">
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className={errors.cardNumber ? 'error' : ''}
          maxLength={23}
        />
        {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiryMonth">Expiration Date</label>
          <div className="expiry-inputs">
            <input
              id="expiryMonth"
              type="text"
              inputMode="numeric"
              placeholder="MM"
              value={expiryMonth}
              onChange={(e) => handleExpiryChange(e, 'month')}
              className={errors.expiryMonth ? 'error' : ''}
              maxLength={2}
            />
            <span className="expiry-sep">/</span>
            <input
              id="expiryYear"
              type="text"
              inputMode="numeric"
              placeholder="YY"
              value={expiryYear}
              onChange={(e) => handleExpiryChange(e, 'year')}
              className={errors.expiryYear ? 'error' : ''}
              maxLength={2}
            />
          </div>
          {(errors.expiryMonth || errors.expiryYear) && (
            <span className="field-error">{errors.expiryMonth || errors.expiryYear}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cvv">
            CVV
            <span className="tooltip-trigger" title="3-digit code on the back of your card">ⓘ</span>
          </label>
          <input
            id="cvv"
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="•••"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className={errors.cvv ? 'error' : ''}
            maxLength={4}
          />
          {errors.cvv && <span className="field-error">{errors.cvv}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Checking...
          </>
        ) : (
          'Check Balance'
        )}
      </button>
    </form>
  )
}

export default BalanceForm
