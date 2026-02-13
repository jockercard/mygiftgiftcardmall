import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static files in production
app.use(express.static(path.join(__dirname, '../dist')));

/**
 * Balance Check API - Replace this with your bank's API integration
 * 
 * Your bank API will likely need:
 * - Card number (PAN)
 * - Expiration date (MM/YY)
 * - CVV
 * 
 * Response format expected by frontend:
 * { success: boolean, balance?: number, currency?: string, error?: string }
 */
app.post('/api/check-balance', async (req, res) => {
  const { cardNumber, expiryMonth, expiryYear, cvv } = req.body;

  try {
    // Basic validation
    const cleanedCardNumber = (cardNumber || '').replace(/\s/g, '');
    if (cleanedCardNumber.length < 15 || cleanedCardNumber.length > 19) {
      return res.json({
        success: false,
        error: 'Please enter a valid card number'
      });
    }
    if (!expiryMonth || !expiryYear || !cvv) {
      return res.json({
        success: false,
        error: 'Please fill in all required fields'
      });
    }

    // ============================================
    // TODO: Replace with your bank's API call
    // ============================================
    // Example:
    // const response = await fetch('YOUR_BANK_API_URL/balance', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.BANK_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     cardNumber: cleanedCardNumber,
    //     expiryDate: `${expiryMonth}/${expiryYear}`,
    //     cvv
    //   })
    // });
    // const data = await response.json();
    // return res.json(data);

    // Mock response for demo - remove when bank API is connected
    await new Promise(r => setTimeout(r, 800)); // Simulate API delay
    
    res.json({
      success: true,
      balance: 125.50,
      currency: 'USD',
      cardLast4: cleanedCardNumber.slice(-4),
      cardNetwork: cleanedCardNumber.startsWith('4') ? 'Visa' : 'Mastercard'
    });

  } catch (err) {
    console.error('Balance check error:', err);
    res.json({
      success: false,
      error: 'Unable to check balance. Please try again later.'
    });
  }
});

// Serve SPA for production
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
