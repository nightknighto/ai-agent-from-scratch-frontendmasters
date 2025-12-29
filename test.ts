// Make the request
const response = await fetch("https://subnp.com/api/free/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: "A beautiful sunset over mountains",
    model: "turbo"
  })
});

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

if (!response.body) {
  throw new Error("No response body");
}

// Read the response as a stream
const reader = response.body.getReader();
const decoder = new TextDecoder("utf-8");
let done = false;
while (!done) {
  const { value, done: doneReading } = await reader.read();
  done = doneReading;
  const chunkValue = decoder.decode(value);
  process.stdout.write(chunkValue); // Output the chunk to the console
}

console.log("\nGeneration complete.");
