import type { NextRequest } from "next/server"; // Change here for type import
import { NextResponse } from "next/server";
import { generateAutocompleteContent } from "~/server/services/openai";

// Define the types for the expected request body
interface RequestBody {
  prompt: string;
  fields: Record<string, string>;
}

// Define the POST method handler explicitly
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json() as RequestBody;

    const { prompt, fields } = body;

    if (!prompt || !fields) {
      return NextResponse.json({ error: "Prompt and JSON data are required" }, { status: 400 });
    }

    // Extract the path from the request URL
    const path = new URL(req.url).pathname;
    // Get the last segment of the path
    const endpointType = path.split('/').pop(); 

    
    let content: string;

    switch (endpointType) {
      case "autocomplete":
        content = await generateAutocompleteContent(fields, prompt);
        break;
      case "ask-assistant":
        // Here implement the logic for ask-assistant
        content = "Response from ask-assistant"; // Replace with the actual logic
        break;
      case "chat":
        content = "Response from chat"; // Replace with the actual logic
        break;
      default:
        return NextResponse.json({ error: "Invalid endpoint type" }, { status: 400 });
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

// (Optional) You can define other handlers, e.g., GET, PUT, DELETE if needed.