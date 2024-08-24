# Analisador de Hierarquia de Palavras

## Sobre

Esse repositório contem um analisador de hierarquia de palavras. A análise é feita a partir de um dicionário definido na pasta `dicts/`. O analisador foi desenvolvido para o *runtime* node 21.2.0 em Typescript. Foi usada a biblioteca *[commander.js](https://www.npmjs.com/package/commander)* para o tratamento de flags e comandos CLI.

---

## Estrutura

A pasta `/src` contém o código-fonte do analisador. Os dicionários disponíveis ficam em `/dicts` O projeto segue um arquitetura Domain Driven Design simplificada. O *entrypoint* do programa é `src/index.ts`

* `/src/domain` - Contém as entidades da camada domain (Definições da classe de Árvore)
* `/src/application` - Contém as classes da camada de aplicação, responsáveis por carregar uma árvore de classificação na memória e efetuar uma análise de hierarquia de palavras nela.
* `/src/actions` - Contém as definições de ação (análise, exibição de dicionários e listagem de dicionários disponíveis) do programa. É análogo no Domain Driven Design a camada de interface do usuário.
* `/src/utils` - Pasta para funções utilitárias.
* `__tests__` - Pasta com testes unitários.
---

## Rodando o projeto

1. Instalar dependências: `npm install` na raiz do projeto.
2. Compilar o projeto: `npm run build`
3. Executar o programa com o *runtime node*: `node dist/src/index.js`

Se você tem o utilitário `ts-node` instalado, você pode rodar o  `src/index.ts` diretamente com `chmod +x src/index.ts` e `src/index.ts`

Se você tem o docker instalado basta rodar o comando:

`docker build -t analisador .`  Na raiz do projeto. Agora o programa pode ser rodado com
`docker run analisador [comandos]`.



---

## Comandos

Os comandos disponíveis podem ser listados chamando o programa com a flag `-h`.
O executável possui três modos de execução, passados como o primeiro argumento:

* `analyze` - Analisa uma frase.
  * `-d`, --depth <number>        Profundidade da classíficação
  * `-v,` --verbose               Exibe métricas de execução
  * `-i,` --case-sensitive        Considera letras maiúsculas e minúsculas na
                              comparação das palavras
  * `-dict`, --dictionary <name>  Nome do arquivo de dicionário na pasta /dicts (default: "animais.json")
* `view` - Visualiza um dicionário.
	* `-dict`, --dictionary <name>  Nome do arquivo de dicionário na pasta /dicts
* `list-dicts` - Lista dicionários disponíveis.

### Exemplos:

Análise de uma frase na profundidade 3 com métricas de desempenho: 
`docker run analisador analyze --depth 3 --verbose "Eu vi gorilas e papagaios"`
*output*:

    Primatas = 1; Pássaros = 1
    +------------------------------------------+------------------------------------------+
    | Tempo de carregamento dos parâmetros(ms) | 2.151843000203371                        |
    +------------------------------------------+------------------------------------------+
    | Tempo de verificação da frase(ms)        | 0.10022999998182058                      |
    +------------------------------------------+------------------------------------------+
Visualização da árvore animais.json:
`docker run analisador view --dictionary animais.json` 
*output*:
Árvore: animais.json (/app/dist/dicts/animais.json)

    └─Animais(1)
      ├─Mamíferos(2)
      │ ├─Carnívoros(3)
      │ │ └─Felinos(4)
      │ │   ├─Leões(5)
      │ │   ├─Tigres(5)
      │ │   ├─Jaguars(5)
      │ │   └─Leopardos(5)
      │ ├─Herbívoros(3)
      │ │ └─Equídeos(4)
      │ │   ├─Cavalos(5)
      │ │   ├─Zebras(5)
      │ │   └─Asnos(5)
      │ ├─Bovídeos(3)
      │ │ ├─Bois(4)
      │ │ ├─Búfalos(4)
      │ │ ├─Antílopes(4)
      │ │ └─Cabras(4)
      │ └─Primatas(3)
      │   ├─Gorilas(4)
      │   ├─Chimpanzés(4)
      │   └─Orangotangos(4)
      └─Aves(2)
        ├─Rapinas(3)
        │ ├─Águias(4)
        │ ├─Falcões(4)
        │ ├─Corujas(4)
        │ └─Milhafres(4)
        └─Pássaros(3)
          ├─Canários(4)
          ├─Papagaios(4)
          ├─Pardais(4)
          └─Rouxinóis(4)

---






