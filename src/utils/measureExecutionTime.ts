/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * measureExecutionTime
 *
 * Mede o tempo de execução de uma função
 *
 * @param func - A função a ser medida. Pode aceitar qualquer número de argumentos e retornar um valor do tipo T.
 * @param args - Os argumentos a serem passados para a função.
 *
 * @returns Um array contendo o resultado da função e o tempo de execução em milissegundos.
 *
 */
export async function measureExecutionTime<T>(
  func: (...args: any[]) => T | Promise<T>,
  ...args: any[]
): Promise<[T, number]> {
  const startTime = performance.now();

  // Espera o resultado se a função retornar uma Promise
  const result = await Promise.resolve(func(...args));

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return [result, executionTime];
}
