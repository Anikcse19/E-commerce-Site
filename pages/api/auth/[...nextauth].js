import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import NextAuth from "next-auth/next"
import bcrypt from "bcryptjs"
// import { CredentialsProvider } from "next-auth/providers/credentials"
import CredentialsProvider from "next-auth/providers/credentials";

 const authOptions={
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{},


            async authorize(credentials){

               try {
                const {email,password}=credentials
                console.log('login details',email)

                await mongooseConnect()
                const userDoc=await User.findOne({email})

                console.log(userDoc)

                if(!userDoc){
                    console.log('hii')
                    return null
                }

                const passwordMatch=await bcrypt.compare(password,userDoc.password)
                console.log('password match?',passwordMatch)

                if(!passwordMatch){
                    console.log('hi')
                    return null
                }
                return userDoc
               } catch (error) {
                console.log('error',error)
               }
                
            }
        })
    ],

    session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/login",
      },
}


// const handler= NextAuth(authOptions)

export default NextAuth(authOptions)

// export {handler as GET, handler as POST}