const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection (ensure MongoDB is running on your local or use MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/secret_wallet', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Wallet schema
const walletSchema = new mongoose.Schema({
  userId: String, // User who owns the wallet
  balance: { type: Number, default: 0 }, // Wallet balance
  encryptedData: String, // Optional: Store encrypted data (e.g., wallet details)
});

const Wallet = mongoose.model('Wallet', walletSchema);

// JWT Authentication Middleware
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
  if (!token) return res.status(403).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'your-jwt-secret'); // Replace with your secret key
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

// Game outcome processing route
app.post('/game-outcome', verifyToken, async (req, res) => {
  const { userId, gameResult, betAmount } = req.body;

  // Check if the user is valid
  const userWallet = await Wallet.findOne({ userId });
  const adminWallet = await Wallet.findOne({ userId: 'admin' });  // Assuming 'admin' is the admin ID

  if (!userWallet || !adminWallet) {
    return res.status(404).send('User or Admin wallet not found');
  }

  // Handle win or loss logic
  if (gameResult === 'win') {
    // Transfer the bet amount from Admin's wallet to the user's wallet
    if (adminWallet.balance < betAmount) {
      return res.status(400).send('Admin does not have enough balance');
    }

    // Update Admin and User wallets
    adminWallet.balance -= betAmount;
    userWallet.balance += betAmount;
    
    await adminWallet.save();
    await userWallet.save();

    res.send('User won! Balance transferred');
  } else if (gameResult === 'loss') {
    // Transfer the bet amount from the user's wallet to Admin's wallet
    if (userWallet.balance < betAmount) {
      return res.status(400).send('User does not have enough balance');
    }

    // Update Admin and User wallets
    userWallet.balance -= betAmount;
    adminWallet.balance += betAmount;

    await adminWallet.save();
    await userWallet.save();

    res.send('User lost! Balance transferred to Admin');
  } else {
    res.status(400).send('Invalid game result');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
