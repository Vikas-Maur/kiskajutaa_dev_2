import { databases } from "./config";
import { ID, Models } from "appwrite";
import conf from "@/conf/config";
import { ExistingDesignOrderCollection, NewDesignOrderCollection } from "@/utils/types";

export class DatabaseService {
    async orderNewDesignShoe(order: NewDesignOrderCollection) {
        try {
            await databases.createDocument(conf.ordersDbId, conf.newDesignOrderCollectionId, ID.unique(), order)
            return { message: "Successfully placed the order!" }
        } catch (error) {
            throw error
        }
    }

    async orderExisitingDesignShoe(order: ExistingDesignOrderCollection) {
        try {
            await databases.createDocument(conf.ordersDbId, conf.existingDesignOrderCollectionId, ID.unique(), order)
            return { message: "Successfully placed the order!" }
        } catch (error) {
            throw error
        }
    }

    async readAllNewDesignOrders() {
        try {
            return await databases.listDocuments(conf.ordersDbId, conf.newDesignOrderCollectionId)
        } catch (error) {
            console.log("readNewDesignOrders error:", error)
        }
        return null
    }

    async readAllExistingDesignOrders() {
        try {
            return await databases.listDocuments(conf.ordersDbId, conf.existingDesignOrderCollectionId)
        } catch (error) {
            console.log("readExistingDesignOrders error:", error)
        }
        return null
    }

    async readProduct(productId: string) {
        try {
            return await databases.getDocument(conf.productsDbId, conf.productCollectionId, productId)
        } catch (error) {
            console.log("readProduct error: ", error);
        }
        return null
    }

    async readAllProducts() {
        try {
            return await databases.listDocuments(conf.productsDbId, conf.productCollectionId)
        } catch (error) {
            console.log("readProduct error: ", error);
        }
        return null
    }

    async updateNewDesignOrder(id: string, data?: Partial<Omit<Models.Document, keyof Models.Document>>) {
        try {
            return await databases.updateDocument(conf.ordersDbId, conf.newDesignOrderCollectionId, id, data)
        } catch (error) {
            throw error
        }
        return null
    }

    async updateExistingDesignOrder(id: string, data?: Partial<Omit<Models.Document, keyof Models.Document>>) {
        try {
            return await databases.updateDocument(conf.ordersDbId, conf.existingDesignOrderCollectionId, id, data)
        } catch (error) {
            throw error
        }
        return null
    }
}

const databaseService = new DatabaseService()

export default databaseService
