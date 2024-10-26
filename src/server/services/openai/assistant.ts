// src/server/services/openai/assistant.ts
import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});


export async function generateAssistantContent(assistantId: string, prompt: string) {

  console.log(`received assistantId: ${assistantId}`);
  console.log(`received prompt: ${prompt}`);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: `You are an assistant helping with form autocomplete.  Create a short response to describe the business that will be used as a public description on the website.  Refrain from adding any contact information or suggestions that sounds overly sales oriented.  The goal is to describe the organization and not offer a sales pitch.` },
        { role: "user", content: `Please generate random content for testing purposes` }
      ]
    });

    // Return the generated content
    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error generating autocomplete content:", error);
    throw new Error("Autocomplete generation failed");
  }
}