import { z } from "zod";
import type { AIMessage, Tool } from "../types";
import { runLLM } from "./llm";
import { addMessages, getMessages } from "./memory";
import { logMessage, showLoader } from "./ui";
import { runTool } from "./toolRunner";
import { toolDefinitions } from "./tools/tools";

const MAX_TURNS = 10;

export async function runAgent({ userMessage: userInput }: { userMessage: string }) {
    const loader = showLoader("Thinking...")

    // Retrieve conversation history
    const history = await getMessages()

    // New messages to add during this run
    const newMessages: AIMessage[] = [{ role: "user", content: userInput }]
    const turnCounter = 0

    while (turnCounter < MAX_TURNS) {
        // Call the LLM with the combined messages and available tools
        const llmResponse = await runLLM({ messages: [...history, ...newMessages], tools: toolDefinitions })

        console.log("\nOutput: ", JSON.stringify(llmResponse, undefined, 2))
        logMessage(llmResponse)

        // Add the LLM response to the new messages
        newMessages.push(llmResponse)

        // If there are tool calls, execute them
        if (llmResponse.tool_calls?.length) {
            loader.update(`executing: ${llmResponse.tool_calls.length} tools`)

            // Run all tool calls in parallel
            const toolResponses = await Promise.all(llmResponse.tool_calls.map(async toolCall => {
                const result = await runTool(toolCall)
                return {
                    result,
                    toolCallId: toolCall.id
                }
            }))

            // Add tool responses to new messages
            const toolResponseMessages = toolResponses.map((response) => (
                { role: "tool", content: response.result, tool_call_id: response.toolCallId } as const
            ))
            newMessages.push(...toolResponseMessages)

            loader.update(`finished: ${llmResponse.tool_calls.length} tools`)
        }

        // if there is content, we are done.
        if (llmResponse.content) {
            // Save all new messages to memory
            await addMessages(newMessages)
            loader.stop()
            return
        }
    }

    throw new Error("MAX TURNS REACHED")
}