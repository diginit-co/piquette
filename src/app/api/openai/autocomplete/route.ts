import { NextRequest, NextResponse } from "next/server";
import { generateAutocompleteContent } from "~/server/services/openai/autocomplete";

// Define the POST method handler explicitly
export async function POST(req: NextRequest) {
  try {
    const { prompt, fields } = await req.json();

    if (!prompt || !fields) {
      return NextResponse.json({ error: "Prompt and JSON data are required" }, { status: 400 });
    }
    const content = await generateAutocompleteContent(fields, prompt);

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

// (Optional) You can define other handlers, e.g., GET, PUT, DELETE if needed.