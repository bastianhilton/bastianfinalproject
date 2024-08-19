import { NuxtAuthHandler } from '#auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "~/lib/prisma";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import { compare } from "bcrypt";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider.default({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Find customer by email
        const customer = await prisma.mgtn_customer_entity.findUnique({
          where: { email: credentials.email },
        });

        if (!customer) {
          throw new Error("No customer found with the provided email.");
        }

        const isPasswordValid = await compare(credentials.password, customer.password_hash);

        if (!isPasswordValid) {
          throw createError({
            statusCode: 403,
            statusMessage: "Credentials not working",
          });
        }

        return customer;
      },
    }),
    GoogleProvider,
    LinkedInProvider,
    FacebookProvider,
    TwitterProvider,
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NUXT_AUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  },

  callbacks: {
    async jwt({ token, customer }) {
      if (customer) { 
        token.id = customer.id;
        token.nombre = customer.name;
        token.email = customer.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.customer.id = token.id;
      session.customer.nombre = token.nombre;
      session.customer.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    signOut: '/auth/logout',
    signUp: '/auth/register',
  },
});
