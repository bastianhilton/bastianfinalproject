import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Extract query parameters
  const query = getQuery(event)
  const modelName = query.model || 'post'  // Default to 'post' if not specified

  // Make sure the model is valid
  if (!prisma[modelName]) {
    return { error: 'Invalid model name' }
  }

  const searchQuery = query.search?.toString() || ''
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 10
  const sortBy = query.sortBy || 'createdAt'
  const sortOrder = query.sortOrder || 'desc'
  const filters = query.filters ? JSON.parse(query.filters) : {}

  // Calculate pagination parameters
  const skip = (page - 1) * pageSize
  const orderBy = { [sortBy]: sortOrder }

  // Build the dynamic `where` clause
  const where = {
    AND: [
      {
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      ...Object.keys(filters).map(key => ({
        [key]: filters[key]
      }))
    ]
  }

  // Fetch results from Prisma dynamically
  const results = await prisma[modelName].findMany({
    where,
    skip,
    take: pageSize,
    orderBy,
  })

  // Count total results for pagination
  const totalResults = await prisma[modelName].count({ where })
  const totalPages = Math.ceil(totalResults / pageSize)

  return {
    results,
    page,
    totalPages,
    totalResults,
  }
})
