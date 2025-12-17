# Publishing Guide

How to publish a new version of md2adf to Homebrew.

## 1. Update Version

Edit `package.json` and bump the version:
```json
{
  "version": "1.1.0"
}
```

## 2. Commit Changes

```bash
git add .
git commit -m "Bump version to 1.1.0"
git push
```

## 3. Create GitHub Release

```bash
# Create and push tag
git tag v1.1.0
git push origin v1.1.0

# Create release with gh CLI
gh release create v1.1.0 \
  --title "v1.1.0 - Release Title" \
  --notes "Release notes here"
```

## 4. Get Tarball SHA256

```bash
curl -sL https://github.com/bengry/md2adf/archive/refs/tags/v1.1.0.tar.gz | shasum -a 256
```

Copy the hash (first part before the dash).

## 5. Update Homebrew Formula

Edit `~/bin/homebrew-tap/Formula/md2adf.rb`:

```ruby
class Md2adf < Formula
  desc "Convert Markdown to Atlassian Document Format (ADF) for Jira/Confluence"
  homepage "https://github.com/bengry/md2adf"
  url "https://github.com/bengry/md2adf/archive/refs/tags/v1.1.0.tar.gz"  # Update version
  sha256 "NEW_HASH_HERE"  # Update hash
  license "MIT"
  version "1.1.0"  # Update version

  # ... rest stays the same
end
```

## 6. Test Formula Locally

```bash
# Uninstall current version
brew uninstall md2adf

# Install from local tap
brew install --build-from-source ~/bin/homebrew-tap/Formula/md2adf.rb

# Test it works
echo '# Test' | md2adf
```

## 7. Push Formula Update

```bash
cd ~/bin/homebrew-tap
git add Formula/md2adf.rb
git commit -m "Update md2adf to v1.1.0"
git push
```

## 8. Users Update

Users can now update:
```bash
brew update
brew upgrade md2adf
```

## Quick Reference

**Repos:**
- Main: https://github.com/bengry/md2adf
- Tap: https://github.com/bengry/homebrew-tap

**Installation:**
```bash
brew tap bengry/tap
brew install md2adf
```
