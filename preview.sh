#!/bin/bash
echo "Cleaning for local preview..."
rm -f index.html
rm -rf assets dist node_modules/.vite

echo "Restoring dev template..."
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shweta Garg - AI Research Lead</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

echo "Starting dev server..."
echo "Preview at: http://localhost:5173"
echo "Press Ctrl+C to stop"
PATH="/opt/homebrew/bin:$PATH" npm run dev
