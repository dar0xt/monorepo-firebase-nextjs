# Monorepo-Firebase-Nextjs

[日本語はこちら](https://github.com/dar0xt/monorepo-firebase-nextjs/blob/main/README-ja.md)

## Introduction

This is a monorepo template equipped with a NestJS-like CRUD code generator for Firebase Functions.  
From a schema defined in a json file, it automatically generates TypeScript type definitions that can be shared in both frontend and backend, as well as code for Firebase Functions.  
Additionally, a hosting environment using Firebase Hosting Frameworks for Next.js is set up.

## Installation

```zsh
git clone <https://github.com/dar0xt/monorepo-firebase-nextjs>
cd monorepo-firebase-nextjs
npm i
```

## Environment Setup

1. Enter environment variables in `.env` for both frontend (`/web`) and backend (`/functions`).
2. For `/emulators`, `/functions`, and `/web`, enter the firebase project name in `.firebaserc`.

## How to Use Code Generation

"xxx" is assumed to be a domain name like "user" or "post".

1. Define a schema in `/packages/generators/xxx.json`.
2. Run the command:

```zsh
npm run generate
```

## Generated Code

- `xxx.controller.ts` (/functions)
- `xxx.dto.ts` (/functions)
- `xxx.service.ts` (/functions)
- `xxx.service.test.ts` (/functions)
- `xxx.model.ts` (/functions)
- `xxx.collection.ts` (/functions)
- `xxx.validation.ts` (/shared)

The code generated in `/functions` provides CRUD operations for xxx.  
The code in `/shared` provides type definitions and validations for xxx that can be referenced from both frontend and backend.

## Directory Structure

\```
.
├── README.md
└───packages
├── emulators (Code to start Firebase emulator locally)
├── functions (Code for Firebase Functions)
├── generators (Code generator)
├── shared (Code shared between frontend and backend)
└── web (Frontend code)
\```

## About Used Libraries (Selected)

/functions

- **tsyringe**: A dependency injection library making code testing easier.
- **esbuild**: Fast build tool.

/generators

- **plop**: Generates code from templates (.hbs).

/shared

- **zod**: Responsible for overall application validation. Used for functions' Request and Response validation, and for type generation.

/web

- **next**: Using AppRouter in Next.js 13.

## Contact

If you have any questions or clarifications, please [contact on Twitter](https://twitter.com/conaxam). PRs are also welcome.
