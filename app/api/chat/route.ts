import { OpenAI } from "@langchain/openai";
import { query } from "@/lib/db";

export const POST = async (req) => {
    const { user_id, message } = await req.json();

    await query("INSERT INTO messages (user_id, message, sender) VALUES ($1, $2, 'user')", [user_id, message]);


    // connect gpt-4 though LangChain
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
    const aiResponse = await model.call(message);

    // save to DB
    await query("INSERT INTO messages (user_id, message, sender) VALUES ($1, $2, 'ai')", [user_id, aiResponse]);

    return Response.json({ reply: aiResponse });
}