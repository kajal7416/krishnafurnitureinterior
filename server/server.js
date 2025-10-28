// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint for contact form
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter with Gmail App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "coderkajal@gmail.com",           // your Gmail
      pass: "your_16_char_app_password_here", // Gmail App Password
    },
  });

  const mailOptions = {
    from: "coderkajal@gmail.com",            // must be your Gmail
    to: "coderkajal@gmail.com",              // recipient
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message");
  }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
