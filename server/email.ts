import nodemailer from "nodemailer";

// For development, we'll use ethereal email (fake SMTP service)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "larissa.waelchi75@ethereal.email",
    pass: "hK7xuCwGDgs89BrAK7",
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  console.log(`Attempting to send verification email to ${email} with code ${code}`);

  const info = await transporter.sendMail({
    from: '"SecureNet" <noreply@securenet.com>',
    to: email,
    subject: "تایید حساب کاربری",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>به SecureNet خوش آمدید</h2>
        <p>برای تکمیل ثبت نام خود، لطفاً کد زیر را وارد کنید:</p>
        <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 2px;">${code}</h1>
        <p>این کد به مدت 15 دقیقه معتبر است.</p>
        <p style="color: #666; margin-top: 20px;">
          توجه: در حالت توسعه، ایمیل‌ها به صندوق Ethereal ارسال می‌شوند.<br>
          برای مشاهده ایمیل به آدرس زیر مراجعه کنید:<br>
          <a href="https://ethereal.email/messages">https://ethereal.email/messages</a>
        </p>
      </div>
    `,
  });

  console.log("Email sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  return info;
}

export async function sendPasswordResetEmail(email: string, code: string) {
  console.log(`Attempting to send password reset email to ${email} with code ${code}`);

  const info = await transporter.sendMail({
    from: '"SecureNet" <noreply@securenet.com>',
    to: email,
    subject: "بازیابی رمز عبور",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>بازیابی رمز عبور</h2>
        <p>برای بازیابی رمز عبور خود، لطفاً کد زیر را وارد کنید:</p>
        <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 2px;">${code}</h1>
        <p>این کد به مدت 15 دقیقه معتبر است.</p>
        <p style="color: #666; margin-top: 20px;">
          توجه: در حالت توسعه، ایمیل‌ها به صندوق Ethereal ارسال می‌شوند.<br>
          برای مشاهده ایمیل به آدرس زیر مراجعه کنید:<br>
          <a href="https://ethereal.email/messages">https://ethereal.email/messages</a>
        </p>
      </div>
    `,
  });

  console.log("Password reset email sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  return info;
}