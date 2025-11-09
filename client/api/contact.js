import nodemailer from 'nodemailer';

// This is our serverless function handler
export default async function handler(req, res) {
  // We only want to process POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill out all fields.' });
  }

  // --- NODEMAILER GMAIL TRANSPORTER ---
  // This is the same logic from your server.js
  // It uses the Environment Variables we will set in Vercel
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Vercel environment variable
      pass: process.env.EMAIL_PASS, // Vercel environment variable
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: "legend.varz@gmail.com", // Your real email address
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
    await transporter.sendMail(mailOptions);
    // Send a success response back to the React app
    res.status(200).json({ success: true, message: 'Message received successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
}