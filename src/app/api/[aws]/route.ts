// /app/api/aws/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UploadFile } from "~/server/services/aws/upload";
import { nanoid } from "nanoid";
import { fileTypeFromBuffer } from "file-type";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const fileBlob = await req.blob();
    const fileBuffer = Buffer.from(await fileBlob.arrayBuffer());

    // Detect file type and extension
    const detectedType = await fileTypeFromBuffer(fileBuffer);
    const mimeType = detectedType ? detectedType.mime : req.headers.get("content-type") || "application/octet-stream";
    const extension = detectedType ? `.${detectedType.ext}` : "";

    // Retrieve the original file name from the headers
    const originalFileName = req.headers.get("x-original-filename") || "uploaded-file";
    const sanitizedFileName = originalFileName.replace(/\s+/g, "-"); // Replace spaces with hyphens for S3
    const fileType = req.headers.get("x-original-type") || mimeType;

    // Construct the new file name with `nanoid` prefix
    const fileName = `${nanoid()}-${sanitizedFileName}${extension}`;

    // Upload the file buffer to S3
    const fileUrl = await UploadFile(fileBuffer, mimeType, fileName);

    return NextResponse.json({ fileUrl, mimeType, fileType }, { status: 200 });
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}