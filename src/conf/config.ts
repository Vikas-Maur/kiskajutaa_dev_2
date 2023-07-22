const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    ordersDbId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ORDERS_ID),
    productsDbId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PRODUCTS_ID),
    newDesignOrderCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_NEW_DESIGN_ID),
    existingDesignOrderCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_EXISTING_DESIGN_ID),
    productCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_PRODUCT_ID),
    newDesignBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_NEW_DESIGNS_BUCKET_ID),
    existingDesignBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_EXISTING_DESIGNS_BUCKET_ID),
    verifyRedirectUrl: String(process.env.NEXT_PUBLIC_VERIFY_REDIRECT_URL),
    kiskajutaaTeamId: String(process.env.NEXT_PUBLIC_APPWRITE_KISKAJUTAA_TEAM_ID),
}

export default conf
