// /app/api/aws/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UploadFile } from "~/server/services/aws/upload";
import { nanoid } from "nanoid";


export async function POST(req: NextRequest) {
    try {
        const fileBlob = await req.blob();
        const fileBuffer = Buffer.from(await fileBlob.arrayBuffer());

        // Detect file type and extension
        const originalName  = req.headers.get("x-original-filename") ?? "uploaded-file";
        
        // Fetch and print the headers to console
        const headers = Object.fromEntries(req.headers.entries());
        // console.log(`headers: ${JSON.stringify(headers, null, 2)}`);

        const fileName = `${nanoid(6)}-${originalName}`;


    // Upload the file buffer to S3
    const fileUrl = await UploadFile(fileBuffer, fileName);
    

    return NextResponse.json({ fileUrl }, { status: 200 });
    
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}