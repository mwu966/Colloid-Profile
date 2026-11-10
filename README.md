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

Node.js 24 系を想定しています。`.nvmrc` を用意しているため、nvm を使う場合は `nvm use` で切り替えられます。

```bash
npm ci
```

React / React DOM は 18.3.1、Theme UI は 0.17.4 系を使用しています。
フォント読み込みプラグインが依存する `react-side-effect` の対応範囲に合わせ、React 19 への更新は保留しています。
Theme UI プラグインの peer dependencies は `package.json` に明示しています。

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
- `npm run test:dependencies`: セキュリティ修正で差し替えた依存APIの互換性テスト
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

## 依存関係の更新状況（2026-11-10）

- React / React DOM: 18.2.0 → 18.3.1
- Theme UI と関連パッケージ: 0.16.2 → 0.17.4
- gh-pages: 6.1.1 → 6.3.0
- その他の間接依存は、各パッケージの互換範囲内で更新しています。
- ロックファイルは npm 11 による形式（lockfileVersion 3）に更新しています。
- `npm ci --no-audit --no-fund` と GitHub Pages 向けの `npm run deploy` の成功を確認しています。

通常の依存更新で `npm audit` の指摘を 87 件から 58 件に減らした後、
`overrides` で間接依存の修正版を指定し、29 件（High 0、Moderate 14、Low 15、Critical 0）まで減らしています。
Gatsby 3 へのダウングレードなどが提示される `npm audit fix --force` は適用していません。

| 差し替え対象 | 指定バージョン | 対応内容 |
| --- | --- | --- |
| `@graphql-tools/utils` / `schema` / `merge` | 13.2.2 / 11.0.9 / 10.0.9 | プロトタイプ汚染の修正と、コード生成APIの互換性維持 |
| `query-string` | 10.0.0 | 脆弱な `decode-uri-component` に依存しない版へ更新 |
| `immutable` / `lodash` | 3.8.4 / 4.18.1 | プロトタイプ汚染、処理停止、コード注入の修正 |
| `path-to-regexp` | 0.1.13 | 正規表現による処理停止の修正 |
| `serialize-javascript` | 7.1.4 | コード注入・XSS・処理停止の修正 |
| `sharp` | 0.35.5 | 同梱画像処理ライブラリの脆弱性修正 |
| `tmp` | 0.2.7 | 一時ファイル作成時のパストラバーサル修正 |
| `webpack-dev-middleware` | 7.4.6 | 開発サーバーのパストラバーサル修正 |

一部は Gatsby が指定するバージョン範囲を超えるため、Node.js 24 系で使用してください。
互換性テストは開発用404ページのクエリ文字列、GraphQLコード生成、GatsbyのSharpラッパー経由の画像変換、
Webpackが使うJavaScriptシリアライズを確認します。
GitHub Actions でも本番ビルドの前に互換性テストを実行します。
開発サーバーの起動、トップ・自己紹介ページ・開発用404のデータ・JavaScript配信、GraphQLでのRSS記事30件取得も確認しています。
今後 Gatsby の依存指定が更新された際は、監査と互換性テストを実行して各 override の解除を検討してください。

インストール時には Gatsby 内部の実験的な `react-server-dom-webpack` の peer dependency 警告や、
間接依存の非推奨警告が引き続き表示されます。
