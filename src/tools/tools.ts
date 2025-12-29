import { dadJokeToolDefinition, dadJokeToolFunction } from "./dadJoke";
import { generateImageToolDefinition } from "./generateImage";
import { redditToolDefinition } from "./reddit";

export const toolDefinitions = [
    dadJokeToolDefinition,
    redditToolDefinition,
    generateImageToolDefinition
]