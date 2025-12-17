# md2adf

CLI tool to convert Markdown to Atlassian Document Format (ADF) for use with Jira/Confluence via `acli`.

Compiled as a standalone binary (~57MB) with Bun.

## Usage

### From stdin:
```bash
echo '# Heading
**Bold** text' | md2adf-cli
```

### From file:
```bash
md2adf-cli input.md
```

### With acli (example):
```bash
cat description.md | md2adf-cli | jq -c '.' | acli jira workitem create --project WZ --type "Dev Task" --description-adf -
```

## Build

Compile standalone binary:
```bash
cd ~/bin/md2adf
bun install
bun build --compile ./index.ts --outfile md2adf
cp md2adf ~/bin/md2adf-cli
```

Binary location: `~/bin/md2adf-cli`
