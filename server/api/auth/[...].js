import { NuxtAuthHandler } from '#auth'

import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Cognito from "next-auth/providers/cognito"

import Facebook from "next-auth/providers/facebook"
import Twitter from "next-auth/providers/twitter"
import LinkedIn from "next-auth/providers/linkedin"

const prisma = new PrismaClient()

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  adapter: PrismaAdapter(prisma),
  providers: [
    Cognito,
    Google,
    LinkedIn,
    Facebook,
    Twitter
  ],
})