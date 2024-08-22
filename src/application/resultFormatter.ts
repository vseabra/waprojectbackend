import { ClassificationResult } from "../domain";

/**
 * ResultFormatter
 *
 * ResultFormatter é responsável por formatar resultados.
 *
 */
export class ResultFormatter {
  /**
   * toTable
   *
   * Converte o resultado de classificação em uma tabela formatada.
   *
   * @param result - O resultado da classificação a ser formatado como tabela.
   * @returns Uma string representando o resultado como uma tabela.
   *
   */
  public static toTable(result: ClassificationResult): string {
    const entries = Object.entries(result);

    const maxWidth = Math.max(...entries.map(([key]) => key.length));

    const horizontalBorder = `+${"-".repeat(maxWidth + 2)}+${"-".repeat(maxWidth + 2)}+`;

    const tableRows = entries.map(([key, value]) => {
      const paddedKey = key.padEnd(maxWidth, " ");
      const paddedValue = String(value).padEnd(maxWidth, " ");

      return `| ${paddedKey} | ${paddedValue} |`;
    });

    const table = [
      horizontalBorder,
      ...tableRows.map((row) => `${row}\n${horizontalBorder}`),
    ].join("\n");

    return table;
  }

  /**
   * ToList
   *
   * Converte o resultado de classificação em uma lista formatada.
   * chaves com valores = 0 são omitidas.
   * uma lista vazia é representada por "0".
   *
   * @param result - O resultado da classificação a ser formatado como lista.
   *
   * @returns Uma string representando o resultado como uma lista.
   */
  public static toList(result: ClassificationResult): string {
    const entries = Object.entries(result).filter(([, value]) => value !== 0);

    if (entries.length === 0) {
      return "0";
    }

    return entries.map(([key, value]) => `${key} = ${value}`).join("; ");
  }
}
