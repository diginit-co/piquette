import type { NextRequest } from "next/server"; // Change here for type import
import { NextResponse } from "next/server";
import { generateAutocompleteContent, generateAssistantContent } from "~/server/services/openai";

// Define the types for the expected request body
interface RequestBody {
  assistantId?: string;
  threadId?: string;
  prompt: string;
  fields?: Record<string, string>;
}

// Define the POST method handler explicitly
export async function POST(req: NextRequest) {

  
  try {
    const body: RequestBody = await req.json() as RequestBody;

    // Extract the path from the request URL
    const path = new URL(req.url).pathname;
    // Get the last segment of the path
    const endpointType = path.split('/').pop(); 

    
    
    const { prompt, fields, assistantId, threadId } = body;

    switch (endpointType) {
      /**
       * Autocomplete
       */
      case "autocomplete":
      
        if (!prompt || !fields) {
          return NextResponse.json({ error: "Prompt and JSON data are required" }, { status: 400 });
        }

        const autocompleteContent = await generateAutocompleteContent(fields, prompt);
        
        return NextResponse.json({ autocompleteContent }, { status: 200 });

      /**
       * Ask Assistant
       */
      case "ask-assistant":

        if (!assistantId || !prompt) {
          return NextResponse.json({ error: "Assistant ID and prompt are required." }, { status: 400 });
        }

        // Fetch response from OpenAI assistant service, using or creating a thread
        const { content, newThreadId } = await generateAssistantContent(assistantId, prompt, threadId);

          // Respond with the generated content and updated thread ID
          return NextResponse.json({
            content,
            threadId: newThreadId ?? threadId, // Return the existing or newly created thread ID
          });
        break;
      /** 
       * Chat
       */
      case "chat":
        return  "Response from chat"; // Replace with the actual logic
        break;
      default:
        return NextResponse.json({ error: "Invalid endpoint type" }, { status: 400 });
    }

    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

// (Optional) You can define other handlers, e.g., GET, PUT, DELETE if needed.