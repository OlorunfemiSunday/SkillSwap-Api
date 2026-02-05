const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // This is critical for cloud providers like Render
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
      }
    });

    // Verify the connection configuration before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"Skill Swap" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("NODEMAILER ERROR:", error.message);
    throw error; 
  }
};

module.exports = sendEmail;
