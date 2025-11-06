/**
 * NextAuth v5 Configuration
 *
 * Simple credentials-based authentication for blog admin access.
 * Uses bcrypt for password hashing and JWT for session management.
 */

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "rodrigo.anst@gmail.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Validate against environment variables
        if (
          email === process.env.ADMIN_EMAIL &&
          await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
        ) {
          return {
            id: "admin",
            email: process.env.ADMIN_EMAIL,
            name: process.env.ADMIN_NAME || "Admin",
            role: "admin"
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin"
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  }
})
