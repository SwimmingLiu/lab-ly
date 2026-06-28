import fs from "node:fs";

const replacements = [
  {
    file: "node_modules/@devdojo/static/src/dev.js",
    from: "assets.buildTailwindCSS();\n            assets.buildTailwindCSS();",
    to: "assets.buildTailwindCSS();",
  },
  {
    file: "node_modules/@devdojo/static/src/assets.js",
    from: "npx @tailwindcss/cli -i ./assets/css/main.css",
    to: "npx tailwindcss -i ./assets/css/main.css",
  },
  {
    file: "node_modules/@devdojo/static/src/dev.js",
    from: "if(moveAssets){\n            assets.buildJSFile();",
    to: "if(moveAssets){\n            assets.buildTailwindCSS();\n            assets.buildJSFile();",
  },
  {
    file: "node_modules/@devdojo/static/src/parser.js",
    from: "let tailwindReplacement = build ? '<link href=\"' + assetURL + '/assets/css/main.css\" rel=\"stylesheet\">' : '<script src=\"https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4?plugins=forms,typography,aspect-ratio,line-clamp\"></script>';",
    to: "let tailwindReplacement = '<link href=\"' + assetURL + '/assets/css/main.css\" rel=\"stylesheet\">';",
  },
];

for (const replacement of replacements) {
  if (!fs.existsSync(replacement.file)) {
    continue;
  }

  const source = fs.readFileSync(replacement.file, "utf8");

  if (!source.includes(replacement.from)) {
    continue;
  }

  fs.writeFileSync(
    replacement.file,
    source.replace(replacement.from, replacement.to),
  );
}
