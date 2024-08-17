import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Optional, if using JWT for sessions

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password_hash } = body;

  try {
    // Fetch the user from the database using their email
    const user = await prisma.mgtn_customer_entity.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        statusCode: 404,
        body: 'User not found',
      };
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: 'Invalid credentials',
      };
    }

    // Optional: Generate a JWT token for the user
    const token = jwt.sign({ userId: user.entity_id }, 'your-secret-key', {
      expiresIn: '24h', // Token expiration time
    });

    // Return success response with token
    return {
      statusCode: 200,
      body: 'Login successful',
      token: token, // Include the token if using JWT
      user: {
        id: user.entity_id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
});
