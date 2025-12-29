import z from "zod";
import type { Tool, ToolFn } from "../../types";

export const dadJokeToolDefinition = {
    name: "dad_joke",
    description: "Gets a random dad joke",
    parameters: z.object({})
} satisfies Tool

export const dadJokeToolFunction: ToolFn<z.infer<typeof dadJokeToolDefinition.parameters>> = async () => {
    const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })

  return (await res.json() as any).joke
}
