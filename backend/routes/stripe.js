const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-donation-session', async (req, res) => {

  try {
    const { amount } = req.body;
    
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/paiement/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/paiement/donation-cancel`,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Don volontaire',
              description: 'Merci pour votre soutien ❤️',
            },
            unit_amount: amount * 100, // Convertir en centimes
          },
          quantity: 1,
        },
      ],
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
