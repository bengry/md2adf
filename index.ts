#!/usr/bin/env bun

import { markdownToAdf } from 'marklassian';

const HELP_TEXT = `md2adf - Convert Markdown to Atlassian Document Format (ADF)

Usage:
  md2adf [markdown-text]           Convert markdown text to ADF
  md2adf <file>                    Convert markdown file to ADF
  echo "# Title" | md2adf          Convert from stdin to ADF
  md2adf --help                    Show this help message

Examples:
  md2adf '# Heading\n**Bold** text'
  md2adf input.md
  cat description.md | md2adf

Output:
  JSON formatted ADF document to stdout

For more info: https://github.com/bengry/md2adf`;

async function main() {
  const arg = Bun.argv[2];

  // Show help
  if (arg === '--help' || arg === '-h') {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  let markdown = '';

  if (arg) {
    // Check if argument is a file that exists
    const file = Bun.file(arg);
    const exists = await file.exists();

    if (exists) {
      // Read from file
      markdown = await file.text();
    } else {
      // Treat as markdown text
      markdown = arg;
    }
  } else {
    // Read from stdin
    for await (const chunk of Bun.stdin.stream()) {
      markdown += new TextDecoder().decode(chunk);
    }
  }

  if (!markdown.trim()) {
    console.error('Error: No markdown input provided');
    console.error('Run "md2adf --help" for usage information');
    process.exit(1);
  }

  const adf = markdownToAdf(markdown);
  console.log(JSON.stringify(adf, null, 2));
}

main();
