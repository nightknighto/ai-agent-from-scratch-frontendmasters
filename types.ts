import OpenAI from 'openai'
import type { ZodType, ZodTypeDef } from 'zod';

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export interface ToolFn<A = any> {
  (input: { toolArgs: A }): Promise<string>
}

export interface Tool {
  name: string;
  parameters: ZodType<any, ZodTypeDef, any>;
  function?: ((args: any) => unknown | Promise<unknown>) | undefined;
  description?: string | undefined;
}