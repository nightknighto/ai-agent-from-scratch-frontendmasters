# AI Agent from Scratch

A learning project from the Frontend Masters course on building AI agents from scratch using TypeScript and Bun.

## What I Built

A command-line AI agent that can:
- Have conversations with users via CLI
- Execute tools/functions to perform tasks
- Maintain conversation history across interactions
- Run multiple tools in parallel when needed
- Generate images using DALL-E
- Fetch Reddit posts
- Tell dad jokes

## What I Learned

### Core Concepts
- **LLM Integration**: Direct API calls to OpenAI's GPT models without using frameworks
- **Function Calling**: Implementing tool/function calling from scratch
- **Agent Loop**: Building an agentic loop that continues until the task is complete
- **Memory Management**: Managing chat history and context in conversations
- **Tool Design**: Creating reusable tool definitions and execution handlers

### Implementation Details
- Setting up structured LLM responses with tool definitions
- Handling parallel tool execution
- Managing conversation state across multiple turns
- Building a terminal UI with loaders and message logging
- Type-safe tool definitions using Zod schemas
- Implementing system prompts to guide agent behavior

### Tools Implemented
1. **Dad Joke Tool** - Fetches random dad jokes from an API
2. **Reddit Tool** - Retrieves posts from specified subreddits
3. **Image Generation** - Creates images using DALL-E based on prompts

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **LLM**: OpenAI GPT-4
- **Validation**: Zod

## Running the Agent

```bash
bun index.ts "your message here"
```

## Project Structure

```
src/
├── agent.ts         # Main agent loop
├── llm.ts          # LLM API calls
├── memory.ts       # Chat history management
├── toolRunner.ts   # Tool execution logic
├── systemPrompt.ts # System instructions
├── ui.ts           # Terminal interface
└── tools/          # Tool implementations
```
