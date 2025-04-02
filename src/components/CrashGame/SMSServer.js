const express = require("express");
const twilio = require("twilio");
const app = express();

// Replace these with your actual Twilio credentials
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const twilioNumber = "YOUR_TWILIO_PHONE_NUMBER";  // The Twilio number you own

const client = new twilio(accountSid, authToken);

// Middleware to parse the JSON request body
app.use(express.json());

// Route to handle withdrawal and send message
app.post("/withdraw", (req, res) => {
  const { withdrawAmount, clientNumber } = req.body; // Amount to withdraw and client number
  const balance = 1000; // Example initial balance

  if (withdrawAmount > balance) {
    return res.status(400).send("Insufficient balance");
  }

  // Generate the withdrawal message
  const message = `You have requested to withdraw Rs. ${withdrawAmount} via JazzCash/Easypaisa. Please confirm this transaction by replying to this message.`;

  // Send the SMS to your mobile number (replace with your mobile number)
  const yourMobileNumber = "+92300XXXXXXX"; // Replace this with your own number

  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: yourMobileNumber, // Your mobile number
    })
    .then((message) => {
      console.log("Message sent:", message.sid);
      res.status(200).send("Withdrawal processed. SMS sent.");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Failed to send SMS.");
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
