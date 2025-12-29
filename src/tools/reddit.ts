import z from "zod";
import type { Tool, ToolFn } from "../../types";

export const redditToolDefinition = {
    name: "get_reddit_posts",
    description: "Use this tool to get the latest posts from Reddit",
    parameters: z.object({})
} satisfies Tool

export const redditToolFunction: ToolFn<z.infer<typeof redditToolDefinition.parameters>> = async () => {
    const res = await fetch('https://www.reddit.com/.json', {
        headers: {
            // Format: platform:app_id:version (by /u/your_username)
            'User-Agent': 'web:my-test-app:v1.0.0 (by /u/YourRedditUsername)'
        }
    });

    if (!res.ok) {
        console.error(`Reddit API error: ${res.status} ${res.statusText}`);
        return `Error fetching Reddit posts: ${res.status} ${res.statusText}`
    }

    const { data } = await res.json() as any

    const relevantInfo = data.children.map((child: any) => ({
        title: child.data.title,
        link: child.data.url,
        subreddit: child.data.subreddit_name_prefixed,
        author: child.data.author,
        upvotes: child.data.ups,
    }))

    return JSON.stringify(relevantInfo, null, 2)
}

