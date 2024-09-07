import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const { firstname, lastname, email, password_hash, website_id, is_seller, created_in } = body;

  // Check if website_id is provided
  if (!website_id) {
    return {
      statusCode: 400,
      body: 'website_id is required',
    };
  }

  try {
    // Check if the user already exists using the correct unique constraint
    const existingUser = await prisma.mgtn_customer_entity.findUnique({
      where: {
        MGTN_CUSTOMER_ENTITY_EMAIL_WEBSITE_ID: {
          email,
          website_id
        }
      }
    });

    if (existingUser) {
      return {
        statusCode: 400,
        body: 'User already exists',
      };
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password_hash, 10);

    // Create a new customer entity
    const newUser = await prisma.mgtn_customer_entity.create({
      data: {
        firstname,
        lastname,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: 1, // Set the user as active
        group_id: 1,  // Default group ID, adjust as needed
        store_id: 1,  // Default store ID, adjust as needed
        website_id,   // Use the provided website ID
        is_seller,
        created_in
      }
    });

    return {
      statusCode: 201,
      body: 'User created successfully',
      user: newUser,
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
});
