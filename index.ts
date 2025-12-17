#!/usr/bin/env bun

import { markdownToAdf } from 'marklassian';

async function main() {
  let markdown = '';

  // Read from file argument or stdin
  if (Bun.argv[2]) {
    const file = Bun.file(Bun.argv[2]);
    markdown = await file.text();
  } else {
    // Read from stdin
    for await (const chunk of Bun.stdin.stream()) {
      markdown += new TextDecoder().decode(chunk);
    }
  }

  if (!markdown.trim()) {
    console.error('Error: No markdown input provided');
    process.exit(1);
  }

  const adf = markdownToAdf(markdown);
  console.log(JSON.stringify(adf, null, 2));
}

main();
