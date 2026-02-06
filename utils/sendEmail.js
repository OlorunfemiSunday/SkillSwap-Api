const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, htmlContent) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.EMAIL_USER, // verified sender in SendGrid
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("SENDGRID ERROR:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;
