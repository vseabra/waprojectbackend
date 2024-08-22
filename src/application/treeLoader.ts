import fs from "fs";
import path from "path";
import { Tree, TreeNode } from "../domain/tree";

interface JsonData {
  [key: string]: JsonData | string | number | boolean | null;
}

/* TreeLoader
 *
 * TreeLoader lê um arquivo JSON e cria um objeto de Arvore a partir dele.
 * Cada nó da árvore é anotado com sua profundidade.
 *
 * @param filePath: string
 *
 */
export class TreeLoader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /* loadTree
   *
   * loadTree carrega uma árvore na memoria.
   *
   */
  public async loadTree(): Promise<Tree> {
    let treeData: JsonData;

    try {
      treeData = await this.readJsonFile();
    } catch (err) {
      console.error(`Erro ao ler arquivo JSON: ${err}`);
      process.exit(1);
    }

    const tree = this.buildTree(treeData);

    return tree;
  }

  private async readJsonFile(): Promise<JsonData> {
    const fullPath = path.resolve(this.filePath);
    const data = await fs.promises.readFile(fullPath, "utf-8");
    return JSON.parse(data);
  }

  private buildTree(data: JsonData): Tree {
    const root = this.createNode(data, 1);
    this.populateChildren(root, data, 2);
    return { root };
  }

  private createNode(data: JsonData, depth: number): TreeNode {
    return new TreeNode(Object.keys(data)[0], depth);
  }

  private populateChildren(
    node: TreeNode,
    data: JsonData,
    depth: number,
  ): void {
    const childData = Object.values(data)[0];

    if (typeof childData === "object" && childData !== null) {
      for (const [childName, childValue] of Object.entries(childData)) {
        const childNode = this.createNode({ [childName]: childValue }, depth);
        node.addChild(childNode);
        this.populateChildren(
          childNode,
          { [childName]: childValue },
          depth + 1,
        );
      }
    }
  }
}
