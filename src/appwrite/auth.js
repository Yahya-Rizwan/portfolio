import config from "../config/config";
import {Client,Account,ID} from "appwrite";
export class AuthService{
      client = new Client();
      account;
      constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account(this.client)
      }
      async createAccount({email,password,name}){
        try{
          console.log("hello");
           const useracc = await this.account.create(ID.unique(),email,password,name);
           if(useracc){
             return this.login({email,password});
            } else{
               return useracc;
            }
        }catch(error){
           throw error;
        }
      }
      async login({email,password}){
        try{
          return await this.account.createEmailPasswordSession(email,password);
        
        }catch(error){
            throw error;
        }
      }
   async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        console.error("Appwrite service :: getCurrentUser :: error", error);

    }
    return null;
}

      async logout(){
           try{
            await this.account.deleteSessions();
           }catch(error){
            throw(error)
           }
      }

}
const authService = new AuthService();

export default authService;