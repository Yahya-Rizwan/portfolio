import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new post with updated attributes, 'Phone' instead of 'Number'
    async createPost({ name, slug, featuredImage, status, userId, skills, about, Education, Phone, email }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    name,
                    featuredImage,
                    status,
                    userId,
                    skills,
                    about,
                    Education,
                    Phone,
                    email
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Update an existing post with updated attributes, 'Phone' instead of 'Number'
    async updatePost(slug, { name, featuredImage, status, skills, about, Education, Phone, email }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    name,
                    featuredImage,
                    status,
                    skills,
                    about,
                    Education,
                    Phone,
                    email
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Delete a post
    async deletePost(slug) {
        try {
            this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    async downloadPost(slug) {
        try {
            this.databases.downloadPost(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get a single post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    // Get multiple posts with the updated queries
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, config.appwriteCollectionId
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // Upload a file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete a file
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Get file preview
    getFile(fileId) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
    async downloadFile(fileId) {
        try {
            return await this.bucket.downloadFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: downloadFile :: error", error);
            return false;
        }
    }
}
  

const service = new Service();
export default service;
