#!/bin/bash
echo "🧹 Cleaning ALL build files and caches..."
rm -f index.html
rm -rf assets dist node_modules/.vite

echo "📝 Restoring build template..."
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

echo "🔨 Building production site..."
PATH="/opt/homebrew/bin:$PATH" npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors and try again."
    exit 1
fi

echo "📁 Copying build files to root..."
cp -r dist/* .

echo "📤 Committing and deploying to GitHub..."
git add .
git commit -m "Deploy site updates - $(date '+%Y-%m-%d %H:%M')"
git push origin master

if [ $? -eq 0 ]; then
    echo "✅ Deployed successfully!"
    echo "🌐 Site will update at https://shwetagarg-dev.github.io/ in 2-3 minutes"
else
    echo "❌ Deploy failed! Check git status."
    exit 1
fi
