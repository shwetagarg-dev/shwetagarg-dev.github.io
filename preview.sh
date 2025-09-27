#!/bin/bash
echo "Building for preview..."
npm run build

echo "Starting local preview server..."
echo "Preview at: http://localhost:4173"
echo "Press Ctrl+C to stop"

npx vite preview --port 4173
