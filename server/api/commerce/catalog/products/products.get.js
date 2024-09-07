import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
  const products = await prisma.mgtn_catalog_product_entity.findMany();
  return products;
});