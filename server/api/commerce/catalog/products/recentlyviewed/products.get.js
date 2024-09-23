import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const recentlyviewed = await prisma.mgtn_widget.findMany();
  return recentlyviewed;
});