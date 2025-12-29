import type { ChatCompletionMessageToolCall } from "openai/resources.mjs";
import type { Tool } from "../types";
import z from "zod";
import { dadJokeToolDefinition, dadJokeToolFunction } from "./tools/dadJoke";
import { redditToolDefinition, redditToolFunction } from "./tools/reddit";
import { generateImageToolDefinition, generateImageToolFunction } from "./tools/generateImage";

export async function runTool(toolCall: ChatCompletionMessageToolCall) {

    const input = {
        toolArgs: JSON.parse(toolCall.function.arguments)
    }

    switch (toolCall.function.name) {
        case dadJokeToolDefinition.name:
            return await dadJokeToolFunction(input)
        case redditToolDefinition.name:
            return await redditToolFunction(input)
        case generateImageToolDefinition.name:
            return await generateImageToolFunction(input)
        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`)
    }
}