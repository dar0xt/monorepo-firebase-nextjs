# プロジェクト名

プロジェクトの簡単な説明。

## はじめに

Firebase FunctionsのCRUDコードジェネレーターを備えたモノレポのテンプレートです。  
jsonファイルで定義したスキーマから、フロントエンド、バックエンドで共有可能なTypeScriptの型定義とFirebase Functionsのコードを自動生成します。  
また、Firebase Hosting Frameworksを利用したNext.jsのHosting環境も構築しています。

## インストール

```zsh
git clone https://github.com/dar0xt/monorepo-firebase-nextjs
cd monorepo-firebase-nextjs
npm i
```

## 環境構築

1. フロントエンド(/web)、バックエンド(/functions)ともに.envに環境変数を入力する。
2. /emulators, /functions, /webにおいて、.firebasercのプロジェクト名を入力する。

## コード生成の使い方

xxxはuserやpostなどのようなドメイン名を想定しています。

1. `/packages/generators/xxx.json`にスキーマを定義する
2. `npm run generate`でコードを生成する

## 生成されるコード

- xxx.controller.ts (/functions)
- xxx.dto.ts (/functions)
- xxx.service.ts (/functions)
- xxx.model.ts (/functions)
- xxx.collection.ts (/functions)
- xxx.validation.ts (/shared)

/functionsに生成されるコードは、xxxのCRUDを行うためのコードです。  
/sharedに生成されるコードは、フロントエンドとバックエンドから参照可能なxxxの型定義とバリデーションのためのコードです。

## ディレクトリ構成

```tree
.
├── README.md
└───packages
    ├── emulators (ローカルでFirebaseのエミュレーターを起動するためのコード)
    ├── functions (Firebase Functionsのコード)
    ├── generators (コードジェネレーター)
    ├── shared (フロントエンドとバックエンドで共有するコード)
    └── web (フロントエンドのコード)
```

## 使用ライブラリ(抜粋)

/functions

- tsyringe: 依存性注入ライブラリを用いて、コードをテストしやすくする。
- esbuild: 高速なビルドツール

/generators

- plop: テンプレート(.hbs)からコードを自動生成する。

/shared

- zod: アプリケーション全体のバリデーションを担う。functionsのRequestおよびResponseのバリデーションと、型生成に利用する。

/web

- next: Next.js 13でAppRouterを使用

## お問い合わせ

不明点等ございましたら、[Twitter](https://twitter.com/conaxam)までお問い合わせください。
PRもお待ちしております。
