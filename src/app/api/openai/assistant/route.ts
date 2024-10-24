import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
apiKey: process.env['OPENAI_API_KEY'],
});

export async function POST(req: NextRequest, res: NextResponse) {
const formData = (await req.formData()) as any;
const prompt = (formData.get("prompt") as string) ?? '';
const thread = await openai.beta.threads.create();
await openai.beta.threads.messages.create(
thread.id,
{
role: "user",
content: prompt,
}
);
const result = await openai.beta.threads.runs.create(thread.id, {
assistant_id: process.env['OPENAI_ASSISTANT_ID'] as string,
stream: true,
});
const response = result.toReadableStream();

return new Response(response, {
headers: {
'Content-Type': 'text/plain',
'Transfer-Encoding': 'chunked',
'Connection': 'keep-alive',
},
});
}