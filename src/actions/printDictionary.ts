import * as path from "path";
import * as fs from "fs";
import { TreeLoader } from "../application/treeLoader";
import { printTree } from "../utils";

interface printDictionaryOptions {
  dictionary: string;
}

export const printDictionaryAction = async (
  options: printDictionaryOptions,
) => {
  const { dictionary } = options;

  const jsonPath = path.join(__dirname, `../../dicts/${dictionary}`);

  if (!fs.existsSync(jsonPath)) {
    console.error(`Dicionário não existe: ${jsonPath}`);
    process.exit(1);
  }

  const treeLoader = new TreeLoader(jsonPath);
  const tree = await treeLoader.loadTree();

  console.log(`Árvore: ${dictionary} (${jsonPath})\n`);
  printTree(tree);
};
