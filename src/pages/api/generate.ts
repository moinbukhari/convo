import type { NextRequest } from "next/server";
import { OpenAIStream, type OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};


const handler = async (req: NextRequest): Promise<Response> => {
  const { messages } = await req.json() as { messages: OpenAIStreamPayload["messages"] };


  if (!messages) {
    return new Response("No prompt in the request", { status: 400 });
  }

  console.log("The message is", messages)
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{
        role: "system",
        content: 
        `You are a Native Spanish speaker and teach it to English Students. 
        Respond to them in Spanish, but only give corrections in English when necessary.`,
      },
      {
        role: "user",
        content:"Help me practice my skills in Spanish by having a conversation as if we are in a cafe."
      },
      {
        role: "assistant",
        content: 
        `¡Claro que sí! Comenzaré.`
      }
      , 
      ...messages
    ],
    stream: true,
    n: 1,
  };
  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;

// messages: [
//     {"role": "system", "content": "You are an professional personal trainer that is an expert in health and fitness. You help people lose weight, get in shape and improve their health."},
//     {"role": "user", "content": "Hi, can you generate a workout plan for me."},
//     {"role": "assistant", "content": "Sure, tell me what your availability, goals and preferences."},
//     {"role": "user", "content": prompt }
// ],