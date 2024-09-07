import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.entity_id);
    const product = await prisma.mgtn_catalog_product_entity.findUnique({
      where: { id },
    });
  
    return product;
  });