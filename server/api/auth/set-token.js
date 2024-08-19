import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserByToken(token) {
  // Since we don't store the token in the database, validate it on the client-side

  // Fetch the customer associated with the session cutoff timestamp
  const customer = await prisma.mgtn_customer_entity.findFirst({
    where: {
      session_cutoff: {
        not: null,
      },
    },
  });

  return customer || null;
}
