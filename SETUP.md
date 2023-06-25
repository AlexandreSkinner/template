# Criar a pasta da aplicação.
Cria a pasta do Projeto como uma subpasta de **projeto**.

```
~/projeto
» mkdir compras
» cd compras
compras on  master [?]
```
# Inicializar o GIT
Este comando inicia o controle de versão do código fonte em repositório local

```
~/projeto/compras
» git init
```
# Inicializar o projeto
  Este comando cria um arquivo do projeto denominado **package.json** que
  controla as dependências das bibliotecas utilizadas no projeto.

```
~/projeto/compras
» npm init -y
```
# Instalar biblioteca git-commit-msg-linter
Esta biblioteca é responsavel por padronizar as mensagens dos nossos commit. Segue o padrão do conventional commit, bloqueando commit que não estiverem em conformidade com este padrão.
 _"Conventional Commit"_.
  [Site conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)

```
~/projeto/compras
» npm i -D git-commit-msg-linter
```
# Instalar o Typescript
Instala o compilador da linguagem de programação Typescript e os types do *node* que adicina tipagem ao mesmo, ajudando no intellisence dos comandos

```
~/projeto/compras
» npm i -D typescript @types/node
```
# Inicializando projeto Typescript.
  Cria o arquivo de configuração do compilador typescript (tsconfig.json)
```
  ~/projeto/compras
  » npx tsc --init
```
Como o typescript foi instalado como dependencia de desenvolvimento temos que utilizar o comando **npx** para executar o compilador **tsc**

## Arquivo de configuração do Typescript (tsconfig.json)

Este arquivo é inspecionado pelo typescript no momento da compilação
```
{
  "compilerOptions": {
    "incremental": true,                       // Compilação incremental
    "target": "es2016",                        // Versão do javascript gerada pelo tsc
    "module": "commonjs",                      // Para rodar sobre node
    "sourceMap": true,                         // Mapeia código js p/ ts (viabiliza debug em TS)
    "removeComments": true,                    // Remove comentários
    "rootDirs": ["src","test"],                //
    "outDir": "./dist",                        // Armazena o código javascript (build)
    "moduleResolution": "node",                //
    "strict": true,                            //
    "skipLibCheck": true,                      //
    "forceConsistentCasingInFileNames": true,  //
    "paths": {
      "@/*": ["*"],
      "@/test/*": ["../test/*"]
    },
    "baseUrl": "src"
  },
  "include": ["src", "test"]
}
```

# Instalando o ESLINT
Realiza a instalação do eslint, bem como configura o padrão da sintaxe do typescript tendo por base as regras definidas no style standard-with-typescript.
```
  ~/projeto/compras
  » npm i --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint eslint-plugin-node

```
```
npm install --save-dev eslint eslint-plugin-stanrd eslint-pluging-promise eslint-plugin-import eslint-plugin-node @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
  ## Inicializando o eslint
  O eslint serve para pontuar erros de sintaxe e formatar o código fonte que estiver fora da especificação standard javascript style.
```
  ~/projeto/compras
  » npm init @eslint/config

```
Abaixo temos um exemplo do arquivo de configuração do eslint **.eslintrc.json**

## Arquivo de configuração do lint (.eslintrc.json)
```
{
    "env": {
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "rules": {
        "@typescript-eslint/semi": "off",
        "semi": [2, "always"]
    },
    "include": [
      "jest.config.js"
    ]
}
```
# Instalando o husky
  Permite utilizarmos os hook do git para garantir que não iremos commitar código fora das
  diretrizes parametrizadas no eslint e que não estiverem passando no teste de unit do jest
```
    ~/projeto/compras
    » npm install husky -D
    » npm install -D lint-staged
```
  A biblioteca lint-stage determina que o lint e jest atuem apenas nos arquivos que se encontram na staged area do git.

    O primeiro comando instala o husky, criando a pasta de mesmo nome.
    O segundo comando cria arquivo de pre-commit com o comando que está entre aspas dentro dele.
    Fazendo com que um commit que não passe no teste realizado pelo Jest não seja efetivado.
```
    ~/projeto/compras
    » npx husky install
    » npx husky add .husky/pre-commit "npx lint-staged"
```
## Arquivo do lintstaged (lintstagedrc.json)
```
{
  "*.ts": [
    "eslint 'src/**' --fix",
    "npm run test:staged"
  ]
}
```
# Instalando o Jest.
  Instala o Jest, a biblioteca de tipos para o typescript. Instala também
  o ts-jest porque o jest com typescript necessita trabalhar em conjunto com o ts-node

```
  ~/projeto/compras
  » npm i jest -D
  » npm i @types/jest -D
  » npm i ts-jest -D
```
  ## Inicializando o jest.
  A inicialização do Jest cria um arquivo de configuração **jest.config.js**
```
    ~/projeto/compras
    » npm jest --init
```
Abaixo temos um exemplo de arquivo de configuração do jest

## Arquivo de configuração do Jest (jest.config.js)
```
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/test/(.+)': '<rootDir>/test/$1',
  },
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
};
```
  ## Executando os teste.
  Para executar o jest direto ou através de um script
```
  ~/projeto/compras
  » npx jest
  » npm run <script>
```

  ## Snippet para Jest.
  Abaixo temos um snippet para evitarmos digitar código repetido toda vez
  que formos elaborar um teste. O texto do prefixo é chave para "buscar" o snippet.
```
{
  "Jest Test": {
    "prefix": ["test"],
      "body": [
        "describe('$1', () => {",
        "  test('$2', () => {",
        "$3",
        "  });",
        "});",
        ""
      ],
    "description": "A describe block for Jest"
  }
}
```
## Script para execução do Jest
```
"scripts": {
   "test": "jest --passWithNoTests --runInBand --no-cache",
   "test:unit": "npm test -- --watchAll",
   "test:staged": "jest --passWithNoTests",
   "test:coverage": "npm test -- --coverage"
}
```
# Videos do YouTube de referencia
https://www.youtube.com/watch?v=RO3l_xy7GeM
