// app.js

const express = require('express');
const twilio = require('twilio');
const app = express();
const port = 3000;

// Twilio credentials from your Twilio account
const accountSid = 'your_account_sid';  // Replace with your Twilio Account SID
const authToken = 'your_auth_token';    // Replace with your Twilio Auth Token
const twilioPhoneNumber = 'your_twilio_phone_number'; // Your Twilio phone number (e.g. +1234567890)

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to simulate a deposit action
app.post('/deposit', (req, res) => {
    const { phoneNumber, amount } = req.body;

    // Send SMS notification for deposit
    client.messages.create({
        body: `You have successfully deposited ${amount}. Thank you for using our service.`,
        to: phoneNumber,  // Recipient phone number
        from: twilioPhoneNumber,  // Your Twilio phone number
    })
    .then((message) => {
        console.log("Deposit SMS sent: ", message.sid);
        res.status(200).send('Deposit notification sent!');
    })
    .catch((error) => {
        console.error("Error sending SMS: ", error);
        res.status(500).send('Failed to send deposit notification');
    });
});

// Endpoint to simulate a withdrawal action
app.post('/withdrawal', (req, res) => {
    const { phoneNumber, amount } = req.body;

    // Send SMS notification for withdrawal
    client.messages.create({
        body: `You have successfully withdrawn ${amount}. Thank you for using our service.`,
        to: phoneNumber,  // Recipient phone number
        from: twilioPhoneNumber,  // Your Twilio phone number
    })
    .then((message) => {
        console.log("Withdrawal SMS sent: ", message.sid);
        res.status(200).send('Withdrawal notification sent!');
    })
    .catch((error) => {
        console.error("Error sending SMS: ", error);
        res.status(500).send('Failed to send withdrawal notification');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

 // Make sure to initialize the app here
