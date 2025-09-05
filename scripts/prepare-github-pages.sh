#!/bin/bash
# Script to fix build issues and prepare for GitHub Pages

echo "Preparing repository for static site deployment..."

# 1. Backup and clean API routes
echo "Cleaning API routes..."
if [ -d "src/app/api" ]; then
  # Create backup directory
  mkdir -p src/disabled_api
  
  # Copy API routes to backup location
  cp -r src/app/api/* src/disabled_api/
  
  # Remove API routes
  rm -rf src/app/api
  
  echo "API routes backed up and removed for build."
else
  echo "No API routes found to backup."
fi

# 2. Create .nojekyll file to prevent Jekyll processing
echo "Creating .nojekyll file..."
touch .nojekyll

# 3. Ensure the out directory exists
echo "Checking output directory..."
mkdir -p out

# 4. Copy .nojekyll to the out directory
echo "Copying .nojekyll to output directory..."
cp .nojekyll out/

# 4. Create .nojekyll in output directory
echo "Adding .nojekyll to output directory..."
touch out/.nojekyll

# 5. Create API placeholder
echo "Creating API placeholder..."
mkdir -p out/api
cat > out/api/index.html << EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>API Not Available</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 650px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { color: #e53e3e; }
    code { background: #f5f5f5; padding: 2px 5px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>API Routes Not Available</h1>
  <p>API endpoints are not available in the static site build.</p>
  <p>This site is hosted on GitHub Pages which only serves static content.</p>
</body>
</html>
EOF

# 6. Restore API routes for reference
echo "Restoring API routes for reference..."
mkdir -p src/app/api
cat > src/app/api/README.md << EOF
# API Routes in Static Exports

This folder contains API routes that are **not used** in the static export build.

Instead, we use client-side authentication handled by \`src/utils/clientAuth.ts\`.

These files are kept for reference and potential future use with a server-based deployment.
EOF

# Only attempt to restore if the backup directory exists and is not empty
if [ -d "src/disabled_api" ]; then
  # Check if there are any files in the directory
  if [ -n "$(find src/disabled_api -mindepth 1 -print -quit 2>/dev/null)" ]; then
    echo "Copying files from backup..."
    cp -r src/disabled_api/* src/app/api/ 2>/dev/null || echo "No files to copy"
    echo "API routes restored from backup."
  else
    echo "Backup directory exists but is empty."
  fi
else
  echo "No API route backups found to restore."
fi

echo "Preparation complete! Your site is ready for GitHub Pages."
