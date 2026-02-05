const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Increased timeouts to prevent ETIMEDOUT on Render's network
      connectionTimeout: 15000, 
      greetingTimeout: 15000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: false,
      }
    });

    // Verify connection before sending
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
    // Throw error so the controller can catch it, but the user creation still succeeds
    throw error; 
  }
};

module.exports = sendEmail;
