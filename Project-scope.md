# Employee Manager

## Documento de Especificação do Projeto

**Versão:** 1.0
**Duração:** 4 semanas
**Tecnologia:** React + TypeScript

---

# Objetivo

O objetivo deste projeto é desenvolver uma aplicação web para gerenciamento de colaboradores de uma empresa fictícia.

Durante o desenvolvimento serão avaliados aspectos técnicos, organização de código, boas práticas, capacidade de resolver problemas, comunicação e evolução ao longo da mentoria.

O projeto simula um ambiente corporativo real, onde os requisitos serão entregues em sprints e haverá revisões semanais de código.

---

# Objetivos da Mentoria

Ao final das quatro semanas espera-se que o desenvolvedor seja capaz de:

- Desenvolver aplicações React utilizando TypeScript
- Consumir APIs REST
- Criar componentes reutilizáveis
- Organizar um projeto Front-end de forma escalável
- Trabalhar com formulários complexos
- Aplicar boas práticas de UX
- Implementar validações
- Trabalhar com Git de forma organizada
- Defender decisões técnicas durante o Code Review

---

# Stack Obrigatória

- React
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- React Hook Form
- Zod
- Styled Components (ou Tailwind CSS)
- ESLint
- Prettier

---

# Restrições

Não será permitido utilizar ferramentas de IA para geração de código.

---

# API

A aplicação deverá consumir a API pública:

https://dummyjson.com

Documentação:

https://dummyjson.com/docs/users

Endpoints principais:

```
GET     /users
GET     /users/{id}
POST    /users/add
PUT     /users/{id}
DELETE  /users/{id}
```

---

# Funcionalidades

## 1. Login

Criar uma tela de autenticação.

Campos:

- Email
- Senha

Validações obrigatórias.

Credenciais para testes:

```
Email:
admin@empresa.com

Senha:
123456
```

Não será necessário autenticação real.

Após login, armazenar um token fictício.

Depois adicionar o Login usando o [Dummy JSON](https://dummyjson.com/docs/auth)

---

## 2. Dashboard

Exibir indicadores da empresa.

Informações:

- Total de colaboradores
- Total de departamentos
- Funcionários ativos
- Funcionários inativos

Gráfico contendo colaboradores por departamento.

---

## 3. Colaboradores

Tela principal.

A tabela deverá apresentar:

- Foto
- Nome
- Cargo
- Departamento
- Cidade
- Status
- Ações

---

### Pesquisa

Permitir pesquisa por:

- Nome
- Departamento
- Cidade

---

### Ordenação

Permitir ordenar por:

- Nome
- Cidade
- Departamento

---

### Filtros

Criar filtros para:

- Todos
- Ativos
- Inativos

---

### Paginação

A tabela deverá possuir paginação.

Quantidade por página:

```
10 colaboradores
```

---

## 4. Cadastro

Criar formulário utilizando React Hook Form + Zod ou Yup.

Campos obrigatórios:

- Nome
- Sobrenome
- Email
- Telefone
- Departamento
- Cargo
- Cidade
- Estado
- Data de admissão
- Salário
- Status
- Foto

Todos os campos devem possuir validação.

---

## 5. Edição

Permitir alterar qualquer informação do colaborador.

O formulário deverá iniciar preenchido.

---

## 6. Exclusão

Ao excluir um colaborador deverá ser apresentado um modal de confirmação.

---

## 7. Detalhes

Criar uma página contendo todas as informações do colaborador.

Exemplo:

- Dados pessoais
- Contato
- Empresa
- Departamento
- Endereço
- Data de admissão
- Foto

---

# Requisitos Técnicos

## Arquitetura

O projeto deverá possuir separação de responsabilidades.

Exemplo:

```
src
│
├── api
├── assets
├── components
├── hooks
├── layouts
├── pages
├── routes
├── services
├── types
├── utils
└── App.tsx
```

---

## Componentização

Espera-se que sejam criados componentes reutilizáveis.

Exemplos:

- Button
- Input
- Modal
- Table
- Card
- Pagination
- Loader
- EmptyState

---

## Serviços

Nenhum componente poderá fazer chamadas HTTP diretamente.

Toda comunicação deverá acontecer através da camada de Services.

---

## Responsividade

A aplicação deverá funcionar em:

- Desktop
- Tablet
- Mobile

---

## UX

A aplicação deverá possuir:

- Loading nas requisições
- Loading em botões
- Skeleton Loading
- Toast de sucesso
- Toast de erro
- Mensagens amigáveis
- Estados vazios

---

## Tratamento de Erros

Toda chamada HTTP deverá tratar:

- Timeout
- Erro 404
- Erro 500
- Erro de conexão

---

## Performance

Espera-se utilização de boas práticas como:

- Lazy Loading
- Memoização quando necessário
- Debounce na pesquisa
- Evitar renders desnecessários

---

# Sprints

---

# Sprint 1

## Objetivo

Construção da base da aplicação.

## Entregas

- Configuração do projeto
- Estrutura de pastas
- ESLint
- Prettier
- React Router
- Login
- Rotas protegidas
- Layout
- Header
- Sidebar
- Componentes básicos

---

# Sprint 2

## Objetivo

Desenvolvimento do módulo de colaboradores.

## Entregas

- Listagem
- Paginação
- Pesquisa
- Ordenação
- Cadastro
- Edição
- Exclusão
- Detalhes

---

# Sprint 3

## Objetivo

Melhoria da experiência do usuário.

## Entregas

- Dashboard
- Indicadores
- Gráficos
- Skeleton Loading
- Toasts
- Responsividade
- Tratamento de erros

---

# Sprint 4

## Objetivo

Qualidade e refinamento.

## Entregas

- Testes
- Refatoração
- Melhorias de UX
- Documentação
- Deploy

---

# Critérios de Avaliação

| Critério               | Peso |
| ---------------------- | ---- |
| Organização do projeto | 15   |
| Componentização        | 15   |
| TypeScript             | 10   |
| React Hooks            | 10   |
| Consumo de API         | 10   |
| Clean Code             | 10   |
| Tratamento de erros    | 5    |
| Responsividade         | 5    |
| UX                     | 5    |
| Git                    | 5    |
| Testes                 | 5    |
| Performance            | 5    |

---

# Convenção de Branches

```
main
develop

feature/login
feature/dashboard
feature/employees
feature/forms
feature/details
feature/tests
```

---

# Convenção de Commits

Utilizar Conventional Commits.

Exemplos:

```
feat: create employee list

fix: adjust pagination

refactor: improve service layer

style: format login page

test: add employee service tests
```

---

# Definition of Done

Uma tarefa será considerada concluída quando:

- Funcionalidade implementada
- Código revisado
- Sem erros no console
- Responsiva
- Sem código comentado
- Sem duplicação desnecessária
- Tipagem correta
- Build funcionando
- Merge aprovado

---

# Desafios Extras (Bônus)

Os itens abaixo não são obrigatórios, mas contam como diferencial.

- Dark Mode
- Internacionalização (PT/EN)
- Favoritar colaboradores
- Exportação para CSV
- Persistência de filtros na URL
- Infinite Scroll
- Virtualização da tabela
- Sistema de permissões (Administrador/RH)
- Upload de avatar
- Testes de integração
- Type-safe search params state manager com a lib [nuqs](https://nuqs.dev/)

---

# Regras da Mentoria

- Haverá uma reunião de acompanhamento por sprint.
- Todo código será revisado.
- As decisões técnicas deverão ser justificadas durante o Code Review.
- O foco será qualidade, não apenas velocidade de entrega.
- É esperado que cada desenvolvedor pesquise soluções e proponha alternativas antes das reuniões.

---

# Objetivo Final

Ao final das quatro semanas, o projeto deverá estar pronto para ser apresentado como um MVP funcional, seguindo boas práticas de desenvolvimento Front-end e demonstrando domínio dos principais conceitos utilizados em aplicações React modernas.

Happy Coding!

---

Planejar adicionar o Husky com Commitizen

[Husky](https://typicode.github.io/husky/)
[Commitizen](https://commitizen-tools.github.io/commitizen/)
https://nuqs.dev - Cria query strings
