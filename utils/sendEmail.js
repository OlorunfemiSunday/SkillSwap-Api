const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey", // This must be exactly the string "apikey"
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    await transporter.sendMail({
      from: `"Skill Swap" <${process.env.EMAIL_USER}>`, // Must be your verified email
      to: email,
      subject: subject,
      html: htmlContent,
    });
    
    console.log("Email sent successfully via SendGrid to:", email);
  } catch (error) {
    console.error("SENDGRID ERROR:", error.message);
    throw error; 
  }
};

module.exports = sendEmail;
