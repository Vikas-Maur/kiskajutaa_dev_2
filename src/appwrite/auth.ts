import { account } from "./config";
import { ID } from "appwrite";
import conf from "@/conf/config";

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}

export class AuthService {
    async createUserAccount({email, password, name}: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }    
        } catch (error:any) {
            throw error
        }

    
    }

    async login( { email, password }: LoginUserAccount) {
       try {
            return await account.createEmailSession(email, password)
       } catch (error:any) {
         throw error
       }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) {}

        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("getcurrentUser error: " + error)
            
        }

        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }

    async startVerification(){
        try {
            return await account.createVerification(conf.verifyRedirectUrl)            
        } catch (error) {
            throw error
        }
    }

    async verifyUser(userId:string, secret: string){
        try {
            return await account.updateVerification(userId, secret)            
        } catch (error) {
            throw error
        }
    }
    
}

const authService = new AuthService()

export default authService