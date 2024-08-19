import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function requestReset(req, res) {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.mgtn_customer_entity.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique token using UUID and then hash it with bcrypt
    const resetToken = uuidv4(); // Generate a unique identifier
    const hashedResetToken = await bcrypt.hash(resetToken, 10); // Hash the token with bcrypt

    // Set the expiration date for the reset token (e.g., 1 hour from now)
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Update the user's record with the hashed reset token and expiry
    await prisma.mgtn_customer_entity.update({
      where: { email },
      data: {
        rp_token: hashedResetToken,
        rp_token_created_at: resetTokenExpiry,
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
};
