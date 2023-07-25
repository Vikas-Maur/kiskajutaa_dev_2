import { storage } from "./config";
import databaseService from "./database";
import { ID } from "appwrite";
import conf from "@/conf/config";

export class StorageService {
    async uploadNewDesignFile(file: File) {
        try {
            const response = await storage.createFile(conf.newDesignBucketId, ID.unique(), file)
            return { imageId: response.$id, imageSrc: await this.readNewDesignFile(response.$id) }
        } catch (error) {
            throw error
        }
    }

    async readNewDesignFile(id: string) {
        try {
            return storage.getFileView(conf.newDesignBucketId, id).href
        } catch (error) {
            throw error
        }
    }

    async readExistingDesignFile(id: string) {
        try {
            return storage.getFileView(conf.existingDesignBucketId, id).href
        } catch (error) {
            throw error
        }
    }

    async readAllExisitngDesignFiles() {
        try {
            return await storage.listFiles(conf.existingDesignBucketId)
        } catch (error) {
            throw error
        }
    }

    async readProductImage(productId: string) {
        try {
            const document = await databaseService.readProduct(productId)
            if (!document) return null
            return await this.readExistingDesignFile(document.image)
        } catch (error) {
            throw error
        }
    }
}

const storageService = new StorageService

export default storageService