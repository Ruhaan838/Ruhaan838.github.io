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

# No additional files created; build step will create out/.nojekyll
echo "Preparation complete."
