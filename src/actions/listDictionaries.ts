import * as fs from "fs";
import * as path from "path";

export const listDictionariesAction = () => {
  const dictDir = path.join(__dirname, "../../dicts");

  if (!fs.existsSync(dictDir)) {
    console.error("Pasta de dicionários não encontrada.");
    process.exit(1);
  }

  const files = fs.readdirSync(dictDir);
  const jsonFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".json",
  );

  if (jsonFiles.length === 0) {
    console.log("Não há dicionários disponíveis.");
  } else {
    console.log("Dicionários disponíveis:");
    jsonFiles.forEach((file) => {
      console.log(`- ${file}`);
    });
  }
};
