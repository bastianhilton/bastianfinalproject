import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
  const bestsellers = await prisma.mgtn_sales_bestsellers_aggregated_daily.findMany();
  return bestsellers;
});