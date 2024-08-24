#!/usr/bin/env ts-node

import { Command } from "commander";
import {
  printDictionaryAction,
  analyzeAction,
  listDictionariesAction,
} from "./actions";

const program = new Command();

program
  .name("classifier")
  .description("Analisador de Hierarquia de Palavras")
  .version("1.0.0");

program
  .command("analyze")
  .description("Analisa uma frases")
  .requiredOption(
    "-d, --depth <number>",
    "Profundidade da classíficação",
    parseInt,
  )
  .option("-v, --verbose", "Exibe métricas de execução")
  .option(
    "-i, --case-sensitive",
    "Considera letras maiúsculas e minúsculas na comparação das palavras",
  )
  .option(
    "-dict, --dictionary <name>",
    "Nome do arquivo de dicionário na pasta /dicts",
    "animais.json",
  )
  .argument("<sentence>", "Frase a ser analisada")
  .action(analyzeAction);

program
  .command("view")
  .description("Visualiza o dicionário")
  .requiredOption(
    "-dict, --dictionary <name>",
    "Nome do arquivo de dicionário na pasta /dicts",
  )
  .action(printDictionaryAction);

program
  .command("list-dicts")
  .description("Lista dicionários disponíveis")
  .action(listDictionariesAction);

program.parse(process.argv);
