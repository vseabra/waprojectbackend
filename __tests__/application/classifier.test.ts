import { Classifier } from "../../src/application/classifier";
import { Tree, TreeNode } from "../../src/domain";

describe("Classifier", () => {
  let tree: Tree;

  beforeEach(() => {
    const root = new TreeNode("root", 0);
    const animal = new TreeNode("animal", 1);
    const mammal = new TreeNode("mamífero", 2);
    const dog = new TreeNode("cão", 3);
    const cat = new TreeNode("gato", 3);
    const bird = new TreeNode("pássaro", 2);
    const parrot = new TreeNode("papagaio", 3);

    root.addChild(animal);
    animal.addChild(mammal);
    animal.addChild(bird);
    mammal.addChild(dog);
    mammal.addChild(cat);
    bird.addChild(parrot);

    tree = { root };
  });

  it("should classify a sentence correctly", () => {
    const classifier = new Classifier("Vi um cão e um gato");
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 1,
      gato: 1,
      papagaio: 0,
    });
  });

  it("should handle sentences over 5000 characters", () => {
    const filler = "qwertyuiopasdfghjklzxcvbnm Lorem ipsum dolor sit amet";
    let longSentence = "";

    while (longSentence.length < 5000) {
      longSentence += `gato ${filler} `;
    }

    const classifier = new Classifier(longSentence);
    const result = classifier.classify(tree, 2);

    const expectedCatCount = (longSentence.match(/gato/g) || []).length;

    expect(result).toEqual({
      mamífero: expectedCatCount,
      pássaro: 0,
    });
  });

  it("should be case-insensitive by default", () => {
    const classifier = new Classifier("Vi um cãO e um gAtO");
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 1,
      gato: 1,
      papagaio: 0,
    });
  });

  it("should be case-sensitive when specified", () => {
    const classifier = new Classifier("Vi um Cão e um GATO", true);
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 0,
      gato: 0,
      papagaio: 0,
    });
  });

  it("should count multiple occurrences", () => {
    const classifier = new Classifier("Vi um cão, um gato e outro cão");
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 2,
      gato: 1,
      papagaio: 0,
    });
  });

  it("should classify at different depths", () => {
    const classifier = new Classifier("Vi um pássaro e um mamífero");
    const result = classifier.classify(tree, 2);

    expect(result).toEqual({
      mamífero: 1,
      pássaro: 1,
    });
  });

  it("should handle empty sentences", () => {
    const classifier = new Classifier("");
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 0,
      gato: 0,
      papagaio: 0,
    });
  });

  it("should handle sentences with no matches", () => {
    const classifier = new Classifier("Vi um disco-voador");
    const result = classifier.classify(tree, 3);

    expect(result).toEqual({
      cão: 0,
      gato: 0,
      papagaio: 0,
    });
  });

  it("should handle classification at root level", () => {
    const classifier = new Classifier(
      "root animal mamífero cão gato pássaro papagaio",
    );
    const result = classifier.classify(tree, 0);

    expect(result).toEqual({
      root: 7,
    });
  });
});
