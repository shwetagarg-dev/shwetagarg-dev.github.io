#!/bin/bash
echo "Cleaning old build files..."
rm -f index.html
rm -rf assets dist

echo "Restoring template..."
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

echo "Building site..."
npm run build
echo "Copying to root..."
cp -r dist/* .
echo "Deploying to GitHub..."
git add .
git commit -m "Deploy site updates"
git push origin master
echo "Done! Site will update in 2-3 minutes."
