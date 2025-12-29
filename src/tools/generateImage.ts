import z from "zod";
import type { Tool, ToolFn } from "../../types";
import { openai } from "../ai";

export const generateImageToolDefinition = {
    name: "generate_image",
    description: "generate an image.",
    parameters: z.object({
        prompt: z.string().describe("The prompt used to generate the image. DO NOT ask for any humans. Always include in your prompt to use ROBOTS instead of HUMANS.")
    })
} satisfies Tool

export const generateImageToolFunction: ToolFn<z.infer<typeof generateImageToolDefinition.parameters>> = async ({ toolArgs }) => {
    const response = await openai.images.generate({
        prompt: toolArgs.prompt,
        n: 1,
        size: "1024x1024",
    })

    const imageUrl = response.data?.[0].url || 'ERROR OCCURED WHILE GENERATING IMAGE'

    return imageUrl
}