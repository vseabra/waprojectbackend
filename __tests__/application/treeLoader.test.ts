import { TreeLoader } from "../../src/application/treeLoader";
import { TreeNode } from "../../src/domain/tree";
import fs from "fs";
import path from "path";

jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
  },
}));
jest.mock("path");

describe("TreeLoader", () => {
  const mockFilePath = "/path/to/mock/file.json";
  let treeLoader: TreeLoader;

  beforeEach(() => {
    treeLoader = new TreeLoader(mockFilePath);
    jest.resetAllMocks();
  });

  it("should create a TreeLoader instance", () => {
    expect(treeLoader).toBeInstanceOf(TreeLoader);
  });

  it("should load a tree from a JSON file", async () => {
    const mockJsonData = {
      root: {
        child1: {
          grandchild1: {},
          grandchild2: {},
        },
        child2: {},
      },
    };

    (path.resolve as jest.Mock).mockReturnValue(mockFilePath);
    (fs.promises.readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockJsonData),
    );

    const tree = await treeLoader.loadTree();

    expect(tree).toBeInstanceOf(Object);
    expect(tree.root).toBeInstanceOf(TreeNode);
    expect(tree.root.name).toBe("root");
    expect(tree.root.depth).toBe(1);
    expect(tree.root.children.length).toBe(2);

    const child1 = tree.root.children[0];
    expect(child1.name).toBe("child1");
    expect(child1.depth).toBe(2);
    expect(child1.children.length).toBe(2);

    const grandchild1 = child1.children[0];
    expect(grandchild1.name).toBe("grandchild1");
    expect(grandchild1.depth).toBe(3);
    expect(grandchild1.children.length).toBe(0);
  });

  it("should handle errors when reading JSON file", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error(`Process exited with code 1`);
    });

    (fs.promises.readFile as jest.Mock).mockRejectedValue(
      new Error("File read error"),
    );

    await expect(treeLoader.loadTree()).rejects.toThrow(
      "Process exited with code 1",
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao ler arquivo JSON: Error: File read error",
    );
    expect(mockExit).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    mockExit.mockRestore();
  });

  it("should handle empty JSON data", async () => {
    (fs.promises.readFile as jest.Mock).mockResolvedValue("{}");

    const tree = await treeLoader.loadTree();

    expect(tree).toBeInstanceOf(Object);
    expect(tree.root).toBeInstanceOf(TreeNode);
    expect(tree.root.name).toBe(undefined);
    expect(tree.root.depth).toBe(1);
    expect(tree.root.children.length).toBe(0);
  });
});
