import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const prisma = new PrismaClient();

export async function registerUser({ email, password, firstname, lastname }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.mgtn_customer_entity.create({
    data: {
      email,
      password_hash: hashedPassword,
      firstname,
      lastname,
      is_active: 1,
    },
  });
}

export async function loginUser({ email, password }) {
  const user = await prisma.mgtn_customer_entity.findFirst({
    where: { email, is_active: 1 },
  });

  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    throw new Error('Invalid credentials');
  }

  const token = uuidv4(); // Generate token using uuid
  const sessionCutoff = new Date();

  await prisma.mgtn_customer_entity.update({
    where: { entity_id: user.entity_id },
    data: {
      session_cutoff: sessionCutoff,
    },
  });

  return { user, token };
}

export async function getUserByToken(token) {
  // Fetch the user associated with the session cutoff timestamp
  const user = await prisma.mgtn_customer_entity.findFirst({
    where: {
      session_cutoff: {
        not: null,
      },
    },
  });

  return user || null;
}

export async function logoutUser(entity_id) {
  return prisma.mgtn_customer_entity.update({
    where: { entity_id },
    data: { session_cutoff: null },
  });
}

export async function resetPassword(email, newPassword) {
  const user = await prisma.mgtn_customer_entity.findFirst({ where: { email } });
  if (!user) throw new Error('User not found');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return prisma.mgtn_customer_entity.update({
    where: { entity_id: user.entity_id },
    data: { password_hash: hashedPassword, rp_token: null, rp_token_created_at: null },
  });
}
