import conf from "@/conf/config";
import {Client, Account, Databases, Storage} from 'appwrite'

export const client = new Client()

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

// auth
export const account = new Account(client)

// database
export const databases = new Databases(client);

// storage 
export const storage = new Storage(client);