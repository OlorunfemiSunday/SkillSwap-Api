const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your 16-character Google App Password
      },
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
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
