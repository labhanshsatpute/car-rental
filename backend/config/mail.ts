import nodemailer from 'nodemailer';
require("dotenv").config();

 const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    logger: true
});

export const sendPasswordResetMail = (to: string, otp: string) => {
    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.MAIL_USERNAME,
        to: to,
        subject: 'Password Reset OTP',
        text: `You are receiving this email because a password reset request was initiated for your account. If you did not request this, you can safely ignore this email.
        \nTo reset your password, please use the following One-Time Password (OTP):
        \nOTP: ${otp}
        \nPlease enter this OTP on the password reset page to proceed. Please note that this OTP is valid for 5 minutes.
        \nIf you have any questions or need further assistance, please don't hesitate to contact our support team at [support email or contact information].
        `,
    };
    transporter.sendMail(mailOptions);
}
