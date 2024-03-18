import { Client, Account, ID } from "appwrite";
import  config  from "../config/config"

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
    }


    async createAccount( {email,password,name} ) {
        try {

            const user  = await this.account.create(ID.unique() , email , name , password)

            if (user) {
                // return login
                return this.login({email , password})
            } else {
                return user
            }
            
        } catch (error) {
            throw error
        }
    }

    async login( {email , password} ){
        try {
            const user = await this.account.createEmailSession(email , password)
            return user
            
        } catch (error) {
            throw error
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService


