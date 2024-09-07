import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
  const bestsellers = await prisma.mgtn_sales_bestsellers_aggregated_daily.findMany();
  return bestsellers;
});