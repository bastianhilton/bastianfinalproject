import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  const sortField = query.sortField || 'createdAt';
  const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

  const filters = JSON.parse(query.filters || '{}');

  const where = {
    AND: [
      filters.name ? { name: { contains: filters.name } } : {},
      filters.category ? { category: filters.category } : {},
    ],
  };

  const products = await prisma.mgtn_catalog_product_entity.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: {
      [sortField]: sortOrder,
    },
  });

  const total = await prisma.mgtn_catalog_product_entity.count({ where });

  return {
    products,
    total,
    page,
    pageSize,
  };
});
