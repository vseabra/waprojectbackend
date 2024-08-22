import { Classifier } from "./application/classifier";
import { TreeLoader } from "./application/treeLoader";
import { ResultFormatter } from "./application/resultFormatter";
import { printTree, measureExecutionTime } from "./utils";
import * as path from "path";

(async () => {
  const jsonPath = path.join(__dirname, "../dicts/animais.json");
  const treeLoader = new TreeLoader(jsonPath);
  const classifier = new Classifier("Eu vi gorilas e papagaios");

  const [tree, treeLoadingMetrics] = await measureExecutionTime(
    treeLoader.loadTree.bind(treeLoader),
  );
  const [classificationResult, classificationMetrics] =
    await measureExecutionTime(classifier.classify.bind(classifier), tree, 3);

  const metricsTable = ResultFormatter.toTable({
    "Tempo de carregamento dos parâmetros(ms) ": treeLoadingMetrics,
    "Tempo de verificação da frase(ms) ": classificationMetrics,
  });

	const resultList = ResultFormatter.toList(classificationResult);

  console.log(metricsTable);
	console.log(resultList);
})();
