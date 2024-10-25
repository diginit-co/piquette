import type { NextRequest } from "next/server"; // Change here for type import
import { NextResponse } from "next/server";
import { generateAutocompleteContent } from "~/server/services/openai/autocomplete";

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
    
    // Ensure generateAutocompleteContent returns the correct type
    const content: string = await generateAutocompleteContent(fields, prompt);

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

// (Optional) You can define other handlers, e.g., GET, PUT, DELETE if needed.