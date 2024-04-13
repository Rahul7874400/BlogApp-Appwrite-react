import { Client , ID , Databases , Query , Storage } from "appwrite";
import config  from "../config/config"


export class DatabaseService {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost( {title , slug , content , status  , featuredImage} ){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Error during create post",error)
        }
    }

    async updatePost(slug ,  {title , content,status , featuredImage} ){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            )
        } catch (error) {
            console.log("Error during update post",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Error during delete post",error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error during get post",error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBuckectId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error during upload file",error)
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                config.appwriteBuckectId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error during delete file",error)
            return false
        }
    }

    getFilePreview(fileId){
        return  this.bucket.getFilePreview(
            config.appwriteBuckectId,
            fileId
        )
    }
}

const databaseService = new DatabaseService

export default databaseService