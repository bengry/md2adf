# md2adf

CLI tool to convert Markdown to Atlassian Document Format (ADF) for use with Jira/Confluence via `acli`.

## Installation

### Homebrew (recommended)

```bash
brew tap bengry/tap
brew install md2adf
```

### From source

```bash
git clone https://github.com/bengry/md2adf
cd md2adf
bun install
bun build --compile ./index.ts --outfile md2adf
cp md2adf /usr/local/bin/md2adf
```

## Usage

### Direct markdown text:
```bash
md2adf '# Heading
**Bold** text'
```

### From file:
```bash
md2adf input.md
```

### From stdin:
```bash
echo '# Heading' | md2adf
```

### Show help:
```bash
md2adf --help
```

### With acli:
```bash
# Create Jira issue with markdown description
cat description.md | md2adf | jq -c '.' | acli jira workitem create \
  --project WZ \
  --type "Dev Task" \
  --description-adf -
```

### Example workflow for LLMs:
```bash
# LLM generates markdown, converts to ADF, creates Jira ticket
llm_output="# Feature Request

## Description
Implement user authentication with OAuth2.

## Requirements
- Support Google and GitHub providers
- Store tokens securely
- Handle token refresh"

# Using positional argument
md2adf "$llm_output" | jq -c '.' | acli jira workitem create \
  --project MYPROJECT \
  --type Story \
  --description-adf -

# Or using stdin
echo "$llm_output" | md2adf | jq -c '.' | acli jira workitem create \
  --project MYPROJECT \
  --type Story \
  --description-adf -
```

## Output Format

Outputs ADF JSON to stdout:
```json
{
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 1 },
      "content": [{ "type": "text", "text": "Heading" }]
    }
  ]
}
```

## Development

Built with [Bun](https://bun.sh) and [marklassian](https://github.com/jamsinclair/marklassian).

```bash
bun install
bun run index.ts
```

## License

MIT © Ben Grynhaus
