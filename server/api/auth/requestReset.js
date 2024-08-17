import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; // For sending emails

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  try {
    // Find the user by email
    const user = await prisma.mgtn_customer_entity.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        statusCode: 404,
        body: 'User not found',
      };
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // Store the reset token and expiry in the database
    await prisma.mgtn_customer_entity.update({
      where: { email },
      data: {
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry,
      },
    });

    // Send the reset email (configure your SMTP settings)
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    const resetUrl = `https://www.meeovi.com/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      to: email,
      from: 'no-reply@meeovi.com',
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    return {
      statusCode: 200,
      body: 'Password reset email sent',
    };
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
});
