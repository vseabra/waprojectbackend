import { Tree, TreeNode, ClassificationResult } from "../domain";

/**
 * Classifier
 *
 * Classifier é responsável por fazer a classificação de frases de acordo com uma árvore de classificação.
 *
 * @param sentence - Frase a ser classificada
 * @param caseSensitive - Se a classificação deve considerar caixa alta e baixa, por padrão false
 *
 */
export class Classifier {
  private sentence: string;
  private caseSensitive: boolean;
  private result: ClassificationResult;

  constructor(sentence: string, caseSensitive = false) {
    this.result = {};
    this.caseSensitive = caseSensitive;
    this.sentence = caseSensitive ? sentence : sentence.toLowerCase();
  }

  /**
   * classify
   *
   * Classifica uma árvore de acordo com a frase passada no constructor.
   *
   * @param tree - Árvore de classíficação
   * @param targetDepth - Profundiade de referência. A classificação será feita a partir desta profundidade
   *
   * @returns ClassificationResult
   */
  public classify(tree: Tree, targetDepth: number): ClassificationResult {
    this.result = {};
    this.classifyTree(tree.root, targetDepth);
    return this.result;
  }

  private classifyTree(
    node: TreeNode,
    targetDepth: number,
    resultName?: string,
  ): void {
    const { children } = node;

    // percorre a árvore em profundidade
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      // quando atigirmos a profundiade desejada, setamos o valor do resultado para o nome do vértice
      if (child.depth === targetDepth) {
        resultName = child.name;
      }

      // para vertices com a profundade >= a desejada, fazemos a verificação de correspondência com a frase
      if (child.depth >= targetDepth) {
        const matchCount = this.countMatches(child.name);
        this.incrementResult(resultName as string, matchCount);
      }

      this.classifyTree(child, targetDepth, resultName);
    }
  }

  private countMatches(nodeName: string): number {
    const nodeNameToCheck = this.caseSensitive
      ? nodeName
      : nodeName.toLowerCase();

    return this.sentence.split(nodeNameToCheck).length - 1;
  }

  private incrementResult(resultName: string, amount: number): void {
    if (!this.result[resultName]) {
      this.result[resultName] = 0;
    }
    this.result[resultName] += amount;
  }
}
