import { Classifier } from "./application/classifier";
import { TreeLoader } from "./application/treeLoader";
import { printTree } from "./utils/printTree";
import * as path from "path";

(async () => {
  const jsonPath = path.join(__dirname, "../dicts/animais.json");

  const tree = await new TreeLoader(jsonPath).loadTree();

  const classifier = new Classifier("Eu vi gorilas e papagaios", false);

	console.log(classifier.classify(tree, 3));

  // printTree(tree, "", false, 0);
})();
