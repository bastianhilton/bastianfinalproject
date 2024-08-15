// composables/usePrisma.ts - composable that encapsulate common Prisma operations, making it easier to use them throughout the application.
import { getPrismaClient } from '~/server/api/prisma'

export const usePrisma = () => {
    const prisma = getPrismaClient()
  
    const findMany = async <T extends object>(model: string, options?: any) => {
      return await prisma[model].findMany(options)
    }
  
    const findUnique = async <T extends object>(model: string, options: any) => {
      return await prisma[model].findUnique(options)
    }
  
    const create = async <T extends object>(model: string, data: any) => {
      return await prisma[model].create({ data })
    }
  
    const update = async <T extends object>(model: string, options: any) => {
      return await prisma[model].update(options)
    }
  
    const upsert = async <T extends object>(model: string, options: any) => {
      return await prisma[model].upsert(options)
    }
  
    const deleteRecord = async <T extends object>(model: string, options: any) => {
      return await prisma[model].delete(options)
    }
  
    const count = async <T extends object>(model: string, options?: any) => {
      return await prisma[model].count(options)
    }
  
    const aggregate = async <T extends object>(model: string, options?: any) => {
      return await prisma[model].aggregate(options)
    }
  
    const groupBy = async <T extends object>(model: string, options?: any) => {
      return await prisma[model].groupBy(options)
    }
  
    return { findMany, findUnique, create, update, upsert, deleteRecord, count, aggregate, groupBy }
  }
  
