import { Tree } from "../domain";

export function printTree(
  tree: Tree,
  indent: string = "",
  isLast: boolean = true,
  currentDepth: number = 0,
  maxDepth: number = 0,
): void {
  if (maxDepth > 0 && currentDepth > maxDepth) {
    return;
  }

  const rootNode = tree.root;
  console.log(
    `${indent}${isLast ? "└─" : "├─"}${rootNode.name}(${rootNode.depth})`,
  );

  const children = rootNode.children;
  const lastChildIndex = children.length - 1;

  const childIndent = indent + (isLast ? "  " : "│ ");

  // Busca em profundidade
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const isLastChild = i === lastChildIndex;

    printTree(
      { root: child },
      childIndent,
      isLastChild,
      currentDepth + 1,
      maxDepth,
    );
  }
}
