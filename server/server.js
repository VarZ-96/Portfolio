const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config(); // Import and configure dotenv

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// This is the main function that will run our server
async function startServer() {

  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // This comes from your .env file
    pass: process.env.EMAIL_PASS, // This comes from your .env file
  },
});
  // --- ROUTES ---

  app.get('/', (req, res) => {
    res.send('Hello from the portfolio backend server!');
  });

  // API endpoint for the contact form
  app.post('/api/contact', async (req, res) => {
    console.log('Contact form data received:');
    console.log(req.body);

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    // Define the email options
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`, // Subject line
      text: message, // plain text body
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `, // html body
    };

    // Send the email
    try {
      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      // Log the URL to preview the sent email in Ethereal
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({ success: true, message: 'Message received successfully!' });
    
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Run the main server function
startServer().catch(console.error);