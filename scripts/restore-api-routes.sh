#!/bin/bash
# Script to restore API routes after successful build
# This is needed because API routes can't be included in a static export

echo "Restoring API routes from backup..."

if [ -d "src/disabled_api/api" ]; then
  # Ensure the API directory exists
  mkdir -p src/app/api
  
  # Copy all API routes back
  cp -r src/disabled_api/api/* src/app/api/
  
  # Create a README explaining the situation
  cat > src/app/api/README.md << EOF
# API Routes in Static Exports

This folder contains API routes that are **not used** in the static export build.

Instead, we use client-side authentication handled by \`src/utils/clientAuth.ts\`.

These files are kept for reference and potential future use with a server-based deployment.
EOF
  
  echo "API routes have been restored for reference."
else
  echo "Error: Backup API routes not found at src/disabled_api/api"
  exit 1
fi
