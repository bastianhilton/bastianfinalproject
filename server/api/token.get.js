import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  if (token) {
    res.status(200).json(token);
  } else {
    res.status(200).json('no token present');
  }
}
