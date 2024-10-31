// /app/api/aws/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UploadFile } from "~/server/services/aws/upload";
import { nanoid } from "nanoid";

// Disable body parser to handle raw file data in the request
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  console.log("Received request to upload file");

  try {
    // Read the request body as a Blob
    const fileBlob = await req.blob();

    // Convert Blob to Buffer for S3 upload
    const fileBuffer = Buffer.from(await fileBlob.arrayBuffer());

    // Set a unique file name and MIME type
    const fileName = `uploaded-file-${nanoid()}`;
    const mimeType = req.headers.get("content-type") || "application/octet-stream";

    // Upload the file buffer to S3
    const fileUrl = await UploadFile(fileBuffer, mimeType, fileName);

    console.log("File uploaded successfully:", fileUrl);

    // Return the file URL as JSON response using NextResponse
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}