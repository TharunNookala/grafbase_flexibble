import {getServerSession} from "next-auth/next"
import {NextAuthOptions, User} from "next-auth"
import {AdapterUser} from "next-auth/adapters"
import GoogleProviders from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken"
import {JWT} from "next-auth/jwt"
import { SessionInterface, UserProfile } from "@/common.types"
import { createUser, getUser } from "./actions"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID!, //using '!' as it could be undefined as well
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    jwt: {
        encode: ({secret, token}) => {
            const encodedtoken = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret)
            return encodedtoken;
        },
        decode: async ({secret, token}) => {
            const decodetoken = jsonwebtoken.verify(token!, secret) as JWT;
            return decodetoken;
        },
    },
    theme : {
        colorScheme : 'light',
        logo: '/logo.svg'
    },
    callbacks: {
        async session({session}){
            const email = session?.user?.email as string;
            console.log("session :", session)
            
            try{
                const data = await getUser(email) as {user?: UserProfile}
                const newSession = {
                    ...session,
                    user : {
                    ...session.user,
                    ...data?.user
                    }
                }
                return newSession;
            } catch(error:any){
                console.log("Error retrieving user data: " + error.message)
                return session;
            }  
        },
        async signIn({user}: {user: AdapterUser | User}){
            try{
                const userExists = await getUser(user?.email as string) as {user?: UserProfile}
                
                if(!userExists) {
                    await createUser(user.name as string, user.email as string, user.image as string)
                }
                    return true;
            } catch(err: any){
                console.log("Error checking if user exists: ", err.message);
                return false;
            }
        }
    }
}

export async function getCurrentUser(){
    const session = await getServerSession(authOptions) as SessionInterface;
    return session;
}