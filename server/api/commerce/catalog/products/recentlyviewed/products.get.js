import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
  const recentlyviewed = await prisma.mgtn_widget.findMany();
  return recentlyviewed;
});