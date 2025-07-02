import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        })

        if (!admin) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        )

        if (!isValid) return null

        return {
          id: admin.id.toString(),
          name: admin.name,
          email: admin.email,
          role: "admin",
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
  },
  pages: {
    signIn: "/admin-login", // halaman login custom
  },
  secret: process.env.NEXTAUTH_SECRET,
}
