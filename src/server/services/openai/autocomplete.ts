// src/server/services/openai/autocomplete.ts
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function generateAutocompleteContent(fields: Record<string, string>) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant helping with form autocomplete.  Create a short response to describe the business that will be used as a public description on the website.  Refrain from adding any contact information or suggestions that sounds overly sales oriented.  The goal is to describe the organization and not offer a sales pitch." },
        { role: "user", content: `Please generate content based on the following fields: ${JSON.stringify(fields)}` }
      ]
    });

    // Return the generated content
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating autocomplete content:", error);
    throw new Error("Autocomplete generation failed");
  }
}