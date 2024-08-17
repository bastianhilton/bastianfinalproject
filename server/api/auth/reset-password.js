import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token, newPassword } = body;

  try {
    // Find the user by the reset token and ensure the token is still valid
    const user = await prisma.mgtn_customer_entity.findFirst({
      where: {
        reset_token: token,
        reset_token_expiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return {
        statusCode: 400,
        body: 'Invalid or expired token',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token fields
    await prisma.mgtn_customer_entity.update({
      where: { entity_id: user.entity_id },
      data: {
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expiry: null,
      },
    });

    return {
      statusCode: 200,
      body: 'Password reset successfully',
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
});
