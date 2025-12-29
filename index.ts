import 'dotenv/config'
import { runAgent } from './src/agent'

async function main() {

  const userContent = process.argv[2]

  if (!userContent) {
    console.error('Please provide a message')
    process.exit(1)
  }

  await runAgent({
    userMessage: userContent,
  })
}

main()
