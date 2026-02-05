const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Ensure spaces are removed in Render Env
      },
      // This helps bypass some network restrictions on cloud hosts
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `"Skill Swap" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Email sending failed:", error);
    // We throw the error so the controller knows it failed, 
    // but your updated controller will handle it gracefully.
    throw error; 
  }
};

module.exports = sendEmail;
