import { databases } from "./config";
import { ID } from "appwrite";
import conf from "@/conf/config";
import { CartType, NewDesignOrderCollection } from "@/utils/types";


export class DatabaseService {
    async orderNewDesignShoe(order: NewDesignOrderCollection) {
        try {
            await databases.createDocument(conf.ordersDbId, conf.newDesignOrderCollectionId, ID.unique(), order)
            return { message: "Successfully placed the order!" }
        } catch (error) {
            throw error
        }
    }

    async orderExisitingDesignShoe(order: CartType) {
        try {
            await databases.createDocument(conf.ordersDbId, conf.existingDesignOrderCollectionId, ID.unique(), order)
            return { message: "Successfully placed the order!" }
        } catch (error) {
            throw error
        }
    }

    async readOrders(email: string) {
        try {
            return { newDesignOrders: await databases.listDocuments(conf.ordersDbId, conf.newDesignOrderCollectionId), exisitingDesignOrders:  databases.listDocuments(conf.ordersDbId, conf.existingDesignOrderCollectionId)}
        } catch (error) {
            console.log("readOrders error:", error)
        }
        return null
    }

    async readProduct(productId: string){
        try {
            return await databases.getDocument(conf.productsDbId, conf.productCollectionId, productId)
        } catch (error) {
            console.log("readProduct error: ", error);
        }
        return null
    }    

    async readAllProducts(){
        try {
            return await databases.listDocuments(conf.productsDbId, conf.productCollectionId)
        } catch (error) {
            console.log("readProduct error: ", error);   
        }
        return null
    }
}

const databaseService = new DatabaseService()

export default databaseService
