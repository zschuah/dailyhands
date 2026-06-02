// clean-data.cjs
const fs = require("fs");

// Paste your absolute path from "Copy Path" here
const FILE_PATH =
  "C:\\Users\\zschu\\OneDrive\\Desktop\\dailyhands\\app\\data\\letterG.ts";

function migrateFile() {
  if (!fs.existsSync(FILE_PATH)) {
    console.error(`❌ Could not find file at: ${FILE_PATH}`);
    return;
  }

  const content = fs.readFileSync(FILE_PATH, "utf-8");

  // Matches the entire object block
  const blockRegex =
    /\{\s*id:\s*generateId\((['"`])(.*?)\1\),\s*name:\s*(['"`])(.*?)\3,[\s\S]*?\}/g;

  const updatedContent = content.replace(
    blockRegex,
    (match, idQuote, idValue, nameQuote, nameValue) => {
      // 1. Parse getUnits("name", count, ".ext") or getUnits("name", count)
      const unitsMatch = match.match(
        /getUnits\(\s*(['"`])(.*?)\1\s*,\s*\d+\s*(?:,\s*(['"`])(.*?)\3)?\s*\)/,
      );

      let imageName = nameValue
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      let extension = "jpg"; // Default fallback if no extension is indicated

      if (unitsMatch) {
        imageName = unitsMatch[2]; // Captured asset name
        if (unitsMatch[4]) {
          extension = unitsMatch[4].replace(".", ""); // Strips the dot from ".png" -> "png"
        }
      }

      // 2. Extract the tags field if it exists
      const tagsMatch = match.match(/tags:\s*\[[\s\S]*?\],?/);
      const tagsLine = tagsMatch
        ? `\n    ${tagsMatch[0].trim().replace(/,$/, "")},`
        : "";

      // 3. Reconstruct the block with the dynamic extension and tags at the bottom
      return `{
    id: generateId("${idValue}"),
    name: "${nameValue}",
    images: getImages("${imageName}", "${extension}"),${tagsLine}
  }`;
    },
  );

  fs.writeFileSync(FILE_PATH, updatedContent, "utf-8");
  console.log("✅ File successfully migrated!");
}

migrateFile();
