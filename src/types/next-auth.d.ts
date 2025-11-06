/**
 * NextAuth type extensions
 * Adds custom fields to User and Session types
 */

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    id?: string
  }
}
