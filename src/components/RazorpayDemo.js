import React, { useState, useEffect } from 'react';
import './RazorpayDemo.css';

const METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Cards', icon: '💳' },
  { id: 'netbanking', label: 'Netbanking', icon: '🏦' },
  { id: 'wallet', label: 'Wallets', icon: '👛' },
  { id: 'paylater', label: 'Pay Later', icon: '⏰' },
];

const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'];
const WALLETS = [
  { name: 'Paytm', icon: '💙' },
  { name: 'PhonePe', icon: '💜' },
  { name: 'Amazon Pay', icon: '🛒' },
  { name: 'Mobikwik', icon: '🔵' },
];

function RazorpayDemo({ amount, onSuccess, onClose }) {
  const [method, setMethod] = useState('upi');
  const [stage, setStage] = useState('select'); // select | processing | success
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  // Lock scroll while modal open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  const formatCard = (v) =>
    v
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ');

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const canPay = () => {
    if (method === 'upi') return /^[\w.-]+@[\w]+$/.test(upiId);
    if (method === 'card')
      return cardNumber.replace(/\s/g, '').length === 16 && cardName && cardExpiry.length === 5 && cardCvv.length >= 3;
    if (method === 'netbanking') return !!selectedBank;
    if (method === 'wallet') return !!selectedWallet;
    if (method === 'paylater') return true;
    return false;
  };

  const handlePay = () => {
    setStage('processing');
    setTimeout(() => {
      setStage('success');
      setTimeout(() => {
        onSuccess();
      }, 1400);
    }, 1800);
  };

  const total = amount;
  const merchantName = 'MindSpa India';

  return (
    <div className="rzp-overlay" onClick={(e) => e.target === e.currentTarget && stage === 'select' && onClose()}>
      <div className="rzp-modal">
        {/* Header */}
        <div className="rzp-header">
          <div className="rzp-header__merchant">
            <div className="rzp-header__logo">M</div>
            <div>
              <div className="rzp-header__name">{merchantName}</div>
              <div className="rzp-header__sub">mindspaindia.in</div>
            </div>
          </div>
          {stage === 'select' && (
            <button className="rzp-header__close" onClick={onClose} aria-label="Close">✕</button>
          )}
        </div>

        {/* Amount bar */}
        <div className="rzp-amount-bar">
          <span>Amount</span>
          <strong>₹ {total.toLocaleString('en-IN')}</strong>
        </div>

        {stage === 'success' ? (
          <div className="rzp-success">
            <div className="rzp-success__check">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" />
                <path d="M22 42 L36 56 L60 28" />
              </svg>
            </div>
            <h3>Payment Successful!</h3>
            <p>Your payment of ₹{total.toLocaleString('en-IN')} was successful</p>
            <small>Order ID: rzp_demo_{Date.now().toString().slice(-8)}</small>
          </div>
        ) : stage === 'processing' ? (
          <div className="rzp-processing">
            <div className="rzp-spinner" />
            <h3>Processing payment...</h3>
            <p>Please do not refresh or close this window</p>
          </div>
        ) : (
          <>
            {/* Method tabs */}
            <div className="rzp-methods">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  className={`rzp-method ${method === m.id ? 'active' : ''}`}
                  onClick={() => setMethod(m.id)}
                >
                  <span className="rzp-method__icon">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Method form */}
            <div className="rzp-form">
              {method === 'upi' && (
                <>
                  <h4>Pay using UPI</h4>
                  <p className="rzp-form__hint">
                    Enter your UPI ID. You'll receive a payment request on your UPI app.
                  </p>
                  <div className="rzp-field">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="rzp-upi-icons">
                    <span>Pay with</span>
                    <div>
                      <span className="rzp-upi-badge">GPay</span>
                      <span className="rzp-upi-badge">PhonePe</span>
                      <span className="rzp-upi-badge">Paytm</span>
                      <span className="rzp-upi-badge">BHIM</span>
                    </div>
                  </div>
                </>
              )}

              {method === 'card' && (
                <>
                  <h4>Pay using Card</h4>
                  <p className="rzp-form__hint">All major credit & debit cards accepted</p>
                  <div className="rzp-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    />
                  </div>
                  <div className="rzp-field">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name as on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="rzp-field-row">
                    <div className="rzp-field">
                      <label>Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      />
                    </div>
                    <div className="rzp-field">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                  </div>
                </>
              )}

              {method === 'netbanking' && (
                <>
                  <h4>Select Your Bank</h4>
                  <div className="rzp-bank-list">
                    {BANKS.map((b) => (
                      <button
                        key={b}
                        className={`rzp-bank ${selectedBank === b ? 'active' : ''}`}
                        onClick={() => setSelectedBank(b)}
                      >
                        <span className="rzp-bank__icon">🏦</span>
                        <span>{b}</span>
                        <span className="rzp-bank__radio">
                          {selectedBank === b ? '●' : '○'}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {method === 'wallet' && (
                <>
                  <h4>Select Wallet</h4>
                  <div className="rzp-wallet-grid">
                    {WALLETS.map((w) => (
                      <button
                        key={w.name}
                        className={`rzp-wallet ${selectedWallet === w.name ? 'active' : ''}`}
                        onClick={() => setSelectedWallet(w.name)}
                      >
                        <span>{w.icon}</span>
                        <span>{w.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {method === 'paylater' && (
                <>
                  <h4>Pay Later</h4>
                  <p className="rzp-form__hint">
                    Get this course now and pay in easy instalments later. EMI starts at ₹{Math.round(total / 6)}/month for 6 months.
                  </p>
                  <div className="rzp-emi-options">
                    <div className="rzp-emi">
                      <strong>3 months</strong>
                      <span>₹{Math.round(total / 3)}/mo</span>
                    </div>
                    <div className="rzp-emi rzp-emi--popular">
                      <span className="rzp-emi__tag">Popular</span>
                      <strong>6 months</strong>
                      <span>₹{Math.round(total / 6)}/mo</span>
                    </div>
                    <div className="rzp-emi">
                      <strong>12 months</strong>
                      <span>₹{Math.round(total / 12)}/mo</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Pay button */}
            <button
              className="rzp-pay-btn"
              disabled={!canPay()}
              onClick={handlePay}
            >
              Pay ₹ {total.toLocaleString('en-IN')}
            </button>

            {/* Demo notice */}
            <div className="rzp-demo-notice">
              🧪 <strong>Demo Mode</strong> — No real payment will be processed. Use any test value
              (e.g. UPI: <code>test@upi</code>, Card: <code>4111 1111 1111 1111</code>)
            </div>

            {/* Footer */}
            <div className="rzp-footer">
              <span>Secured by</span>
              <strong className="rzp-brand">Razorpay</strong>
              <span className="rzp-footer__lock">🔒</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RazorpayDemo;
