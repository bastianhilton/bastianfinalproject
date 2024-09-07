import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.entity_id);

  const deletedProduct = await prisma.mgtn_catalog_product_entity.delete({
    where: { id },
  });

  return deletedProduct;
});