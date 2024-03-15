const config = {
    appwriteUrl : String( import.meta.env.VITE_APPWRITE_URL ),
    appwriteProjectId : String( import.meta.env.VITE_APPWRITE_PROJECT_ID ),
    appwriteCollectionId : String ( import.meta.env.VITE_APPWRITE_COLLECTION_ID  ),
    appwriteDatabaseId : String( import.meta.env.VITE_APPWRITE_DATABASE_ID ),
    appwriteBuckectId : String( import.meta.env.VITE_BUCKECT_ID  )

}

export default config