const nodemailer = require("nodemailer");
const { email: emailConfig, clientUrl } = require("../config/env");

function createTransport() {
  return nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.port === 465,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  });
}

/**
 * Sends an email verification link to the user.
 * @param {string} to  - recipient email
 * @param {string} token - raw (unhashed) verification token
 */
async function sendVerificationEmail(to, token) {
  const verifyUrl = `${clientUrl}/verify-email?token=${token}`;

  const transporter = createTransport();

  await transporter.sendMail({
    from: emailConfig.from,
    to,
    subject: "Verify your DevLadder account",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#09090b;color:#f4f4f5;border-radius:12px;">
        <h2 style="margin:0 0 8px;font-size:20px;color:#f4f4f5;">Verify your email</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#a1a1aa;">
          Click the button below to verify your DevLadder account. This link expires in <strong>24 hours</strong>.
        </p>
        <a href="${verifyUrl}"
           style="display:inline-block;padding:12px 24px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
          Verify email
        </a>
        <p style="margin:24px 0 0;font-size:12px;color:#52525b;">
          If you didn't create an account, you can ignore this email.
        </p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };
