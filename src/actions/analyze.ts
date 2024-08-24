import * as path from "path";
import * as fs from "fs";
import { Classifier } from "../application/classifier";
import { TreeLoader } from "../application/treeLoader";
import { ResultFormatter } from "./resultFormatter";
import { measureExecutionTime } from "../utils";

interface AnalyzeOptions {
  depth: number;
  verbose: boolean;
  dictionary: string;
  caseSensitive: boolean;
}

export const analyzeAction = async (
  sentence: string,
  options: AnalyzeOptions,
) => {
  const { depth, verbose, dictionary, caseSensitive } = options;

  const jsonPath = path.join(__dirname, `../../dicts/${dictionary}`);

  if (!fs.existsSync(jsonPath)) {
    console.error(`Dicionário não existe: ${jsonPath}`);
    process.exit(1);
  }

	if (depth < 1) {
		console.error("Profundidade deve ser maior que 0.");
    process.exit(1);
	}

  const treeLoader = new TreeLoader(jsonPath);
  const classifier = new Classifier(sentence, caseSensitive);

  const [tree, treeLoadingMetrics] = await measureExecutionTime(
    treeLoader.loadTree.bind(treeLoader),
  );

  const [classificationResult, classificationMetrics] =
    await measureExecutionTime(
      classifier.classify.bind(classifier),
      tree,
      depth,
    );

  const resultList = ResultFormatter.toList(classificationResult);
  console.log(resultList);

  if (verbose) {
    const metricsTable = ResultFormatter.toTable({
      "Tempo de carregamento dos parâmetros(ms)": treeLoadingMetrics,
      "Tempo de verificação da frase(ms)": classificationMetrics,
    });
    console.log(metricsTable);
  }
};
