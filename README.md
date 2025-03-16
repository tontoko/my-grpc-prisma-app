<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## 概要

このプロジェクトはNestJSフレームワークを使用して構築されたTypeScriptのスターターリポジトリです。ユーザー管理機能を提供するREST APIを実装しています。

## 開発ワークフロー

1. **プロジェクトのセットアップ**
   ```bash
   $ pnpm install
   ```

2. **プロジェクトのコンパイルと実行**
   ```bash
   # 開発モード
   $ pnpm run start

   # ワッチモード
   $ pnpm run start:dev

   # 本番モード
   $ pnpm run start:prod
   ```

3. **テストの実行**
   ```bash
   # ユニットテスト
   $ pnpm run test

   # E2Eテスト
   $ pnpm run test:e2e

   # テストカバレッジ
   $ pnpm run test:cov
   ```

## デプロイメント

NestJSアプリケーションを本番環境にデプロイする際は、以下の手順に従ってください。詳細については[NestJSデプロイメントドキュメント](https://docs.nestjs.com/deployment)を参照してください。

クラウドベースのプラットフォームを使用してデプロイメントすることも可能です。[NestJS Mau](https://mau.nestjs.com)を使用するとAWS上でのデプロイメントが簡単に行えます。

```bash
$ pnpm install -g mau
$ mau deploy
```

## Prisma マイグレーション

1. **マイグレーションの作成**
   ```bash
   $ npx prisma migrate dev --name init
   ```

2. **マイグレーションの適用**
   ```bash
   $ npx prisma migrate deploy
   ```

## リソース

NestJSで作業する際の役立つリソースをいくつか紹介します。

- [NestJSドキュメンテーション](https://docs.nestjs.com)を参照して、フレームワークについて学びましょう。
- 質問やサポートが必要な場合は、[Discordチャンネル](https://discord.gg/G7Qnnhy)を利用してください。
- より詳しく学びたい場合は、公式の[ビデオコース](https://courses.nestjs.com/)をご覧ください。
- AWSにデプロイメントする場合は、[NestJS Mau](https://mau.nestjs.com)を使用してください。
- アプリケーションのグラフを視覚化し、リアルタイムでNestJSアプリケーションと対話するには、[NestJS Devtools](https://devtools.nestjs.com)を利用してください。
- プロジェクトのサポートが必要な場合は、[エンタープライズサポート](https://enterprise.nestjs.com)を利用してください。
- 最新の情報を得るには、[X](https://x.com/nestframework)と[LinkedIn](https://linkedin.com/company/nestjs)をフォローしてください。
- ジョブを探すか、ジョブを提供する場合は、[ジョブボード](https://jobs.nestjs.com)を参照してください。

## サポート

NestはMITライセンスで公開されているオープンソースプロジェクトです。スポンサーとバックヤードのサポートにより成長しています。参加したい場合は、[こちら](https://docs.nestjs.com/support)を参照してください。

## 連絡先

- 作者 - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- ウェブサイト - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## ライセンス

Nestは[MIT ライセンス](https://github.com/nestjs/nest/blob/master/LICENSE)でライセンスされています。
