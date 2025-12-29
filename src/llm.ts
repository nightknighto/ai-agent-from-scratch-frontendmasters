import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { openai } from "./ai";
import { zodFunction } from "openai/helpers/zod.mjs";
import type { Tool } from "../types";
import { systemPrompt } from "./systemPrompt";

export async function runLLM({ messages, tools }: { messages: ChatCompletionMessageParam[], tools: Tool[] }) {

    const formattedTools = tools.map(zodFunction)

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.1,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    })

    return response.choices[0].message
}