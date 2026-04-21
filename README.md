# Colloid Profile

Colloid の創作活動と技術活動をまとめたポートフォリオサイトです。  
Gatsby 5 で構築しており、GitHub Pages へデプロイしています。

- 本番URL: `https://mwu966.github.io/Colloid-Profile/`
- フレームワーク: `Gatsby 5`
- デプロイ先: `GitHub Pages`

## 概要

このサイトは以下の情報をまとめるための個人ポートフォリオです。

- Profile
- Creative
- Engineering
- Links
- Blog
- Wavebox

Blog 一覧は Hatena Blog の RSS を元に生成しています。RSS 取得に失敗した場合は一覧を表示せず、ブログへのリンク導線のみ残します。

## セットアップ

Node.js 24 系を想定しています。

```bash
npm ci
```

## 開発

ローカル開発サーバーを起動します。

```bash
npm run develop
```

起動後は `http://localhost:8000` で確認できます。

## ビルド

本番ビルドを作成します。

```bash
npm run build
```

ビルド結果をローカルで確認する場合:

```bash
npm run serve
```

GitHub Pages 用の `pathPrefix` 付きビルドを作る場合:

```bash
npm run deploy
```

## スクリプト

- `npm run develop`: 開発サーバー起動
- `npm run start`: `develop` のエイリアス
- `npm run build`: 本番ビルド
- `npm run serve`: ビルド済みファイルの確認
- `npm run clean`: Gatsby キャッシュ削除
- `npm run deploy`: GitHub Pages 向けビルド

## Analytics

Google Analytics には `gatsby-plugin-google-gtag` を使用しています。  
`GA_MEASUREMENT_ID` を設定するとその値を使い、未設定時は `gatsby-config.js` 内の既定値を使います。

```bash
export GA_MEASUREMENT_ID=G-XXXXXXXXXX
npm run build
```

## デプロイ

`.github/workflows/gatsby-runner.yml` で GitHub Pages へ自動デプロイしています。

- トリガー: `main` ブランチ push
- 定期実行: 毎週
- 手順: `npm ci --no-audit --no-fund` → `npm run deploy` → Pages へ反映

## 主なファイル

- [src/pages/index.js](./src/pages/index.js): トップページ
- [src/data/homeContent.js](./src/data/homeContent.js): トップページの文言・リンク定義
- [src/components/home/IntroOverlayContent.js](./src/components/home/IntroOverlayContent.js): Intro モーダル内容
- [src/components/home/EngineeringSkillMatrix.js](./src/components/home/EngineeringSkillMatrix.js): Engineering のスキルマップ
- [gatsby-config.js](./gatsby-config.js): Gatsby 設定
- [gatsby-node.js](./gatsby-node.js): RSS 取得とデータ生成

## メモ

- GitHub Pages 向けに `pathPrefix: "/Colloid-Profile"` を設定しています。
- フォントは Google Fonts を `gatsby-omni-font-loader` 経由で読み込んでいます。
