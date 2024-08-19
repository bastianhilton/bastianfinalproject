// server/api/auth/resetPassword.js

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function resetPassword(req, res) {
  const { email, resetToken, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await prisma.mgtn_customer_entity.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the token has expired
    if (new Date() > user.rp_token_created_at) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Compare the provided token with the stored hashed token
    const isTokenValid = await bcrypt.compare(resetToken, user.rp_token);

    if (!isTokenValid) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    // Update the user's password (after hashing it)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.mgtn_customer_entity.update({
      where: { email },
      data: {
        password_hash: hashedPassword,
        rp_token: null, // Clear the reset token
        rp_token_created_at: null, // Clear the token expiry
      },
    });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
