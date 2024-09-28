// utils/auth.ts
import { serialize, parse } from 'cookie';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COOKIE_NAME = 'session';
const COOKIE_SECRET = process.env.SESSION_SECRET;

export function createSession(userId: string) {
  const session = { userId };
  const cookie = serialize(COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'strict',
    path: '/',
  });
  return cookie;
}

export function getSession(req) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies[COOKIE_NAME];
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}