// /server/services/aws/upload.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import fs from "fs";

// Initialize the S3 client
const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIA25O5OIF6PHRRL5PM",
        secretAccessKey: "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",
    },    
});

export async function UploadFile(fileBuffer: Buffer, mimeType: string, fileName: string) {
    console.log("Starting file upload to S3");
  
    const params = {
      Bucket: 'piquette-app',
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };
  
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      return `https://piquette-app.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error during file upload to S3:", error);
      throw error;
    }
  }