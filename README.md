# Colloid Archive Portal

Colloidの創作・技術活動をまとめたGatsby製ポートフォリオ。
[公開サイト](https://mwu966.github.io/Colloid-Profile/)

## 開発・ビルド

Node.js 24を使用します（`nvm use`）。

```sh
npm ci
npm run develop            # http://localhost:8000/
npm run build             # 通常ビルド
npm run deploy            # GitHub Pages用ビルド（これだけでは公開しません）
```

`main`へのpush、週次、手動実行でGitHub Actionsが検証・ビルド・Pagesへデプロイします。
ブログはビルド時にはてなRSSから取得するため、ネットワーク接続が必要です。取得失敗時はビルドが失敗します。
Google Analyticsは`GA_MEASUREMENT_ID`で変更できます（未設定時は設定ファイルの既定値）。

## コンテンツ更新

- 頒布・参加履歴：[`history.md`](history.md)。JSの二重編集は不要です。
- プロフィール・リンク・スキル：[`src/data/homeContent.js`](src/data/homeContent.js)
- デザイン：Pencilの採用案とレビュー時の調整を反映しています。`.pen`はコミット対象外です。

履歴は1イベント1行、新しい順で記載します。年のみ・日付・日付範囲、複数作品リンク、既刊参加に対応します。

```markdown
2026 Arts in Sanity #5 [ポグラニチニクの休暇に三人](https://blueparticles.booth.pm/items/9093305)を頒布
2025/01/01 イベント名 既刊で参加
```

## 検証

```sh
npm run test:dependencies
node --test scripts/creative-history.test.cjs
```

依存関係の`overrides`更新時は互換性テストを実行してください。
ブラウザー検証は`scripts/portal-*-check.mjs`（Playwrightが必要）。`PLAYWRIGHT_MODULE`で既存モジュール、`PORTAL_URL`で対象URLを指定できます。
Safari・スマホ実機・NVDA／VoiceOverの検証は未実施です。

## アイコン

Font Awesome Free 6.7.2 © 2024 Fonticons, Inc. のアイコンを形状変更なしで使用。
[出典](https://github.com/FortAwesome/Font-Awesome/tree/6.x/sprites)・[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)・[ライセンス](https://fontawesome.com/license/free)。SVGデータは`src/components/fontawesome-icons.json`に同梱しています。
