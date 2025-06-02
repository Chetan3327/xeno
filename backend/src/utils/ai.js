import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const client = new InferenceClient(process.env.HF_API_KEY);

export const getFilterFn = async (query) => {
  const response = await client.chatCompletion({
    provider: "nebius",
    model: "deepseek-ai/DeepSeek-V3",
    messages: [
      {
        role: "user",
        content: `Given this query: "${query}"

Only return a JavaScript arrow function to use with Array.prototype.filter.
No code blocks, no explanation. Only return a function like:
customer => customer.spent > 5000 && customer.visits < 3

Use only these fields: name, email, visits, lastVisit, spent.
The parameter name must be "customer".`,
      },
    ],
  });

  let code = response.choices[0].message.content.trim();

  // Remove code block markers if any
  code = code.replace(/^```(?:js|javascript)?|```$/g, "").trim();

  // Log for debugging
  console.log("AI raw response:", response.choices[0].message.content);
  console.log("Parsed function code:", code);

  if (!code.startsWith("customer =>")) {
    throw new Error("Invalid function format returned by AI");
  }

  try {
    return eval(`(${code})`);
  } catch (err) {
    throw new Error("Failed to evaluate function: " + err.message);
  }
};
