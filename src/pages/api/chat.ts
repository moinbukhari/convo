/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a Native Spanish speaker and teach it to English Students. 
        Respond to them in Spanish, but only give corrections in English when necessary.`,
      },
      {
        role: "user",
        content:
          "Help me practice my skills in Spanish by having a conversation as if we are in a cafe.",
      },
      {
        role: "assistant",
        content: `¡Claro que sí! Comenzaré.`,
      },
      ...messages,
    ],
  });
  
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
