import { TreeLoader } from "./application/treeLoader";
import { printTree } from "./utils/printTree";
import * as path from "path";

(async () => {
  const jsonPath = path.join(__dirname, "../dicts/animais.json");

  const tree = await new TreeLoader(jsonPath).loadTree();
  printTree(tree, "", false, 0);
})();
