import NextAuth from 'next-auth'
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";


const handler=NextAuth({
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})
export {handler as GET,handler as POST}