# リニューアル実装・検証記録

確認日：2026-11-11（日本時間）
作業ブランチ：`feat/pencil-archive-renewal`

Pencilの採用フレームとの対応は [pencil-renewal.md](pencil-renewal.md) を参照。

## 実装

- 既存Gatsby、GraphQLのブログクエリ、ビルド時のはてなRSS取得を維持。
- Righteous、Zen Kaku Gothic New、Noto Sans JPと、既存モックで確定した名前用Dela Gothic Oneを使用。👋は1文字にサブセット化したNoto Color Emojiを追加して表示を補完。Engineeringの見出しサイズもProfile／Creativeと統一。狭い幅では配置を調整して文字を収める。
- TOPの7文字を独立要素とし、スクロール量に連動して上下に移動。説明文はフェードアウトし、アイボリー領域が左から入場。
- プレビュー時の指示に従い、Intro以降は背景・ヘッダー・データブロックを固定。セクションの見出し・本文だけを切り替える。
- Introの3種類、Linksの4カテゴリ、詳細カテゴリの切り替えを実装。IntroとLinksは方向に応じた横スライドで入れ替わる。Linksの進捗数値は削除。Introは番号・英字・日本語の下線付きタブで選択し、数値だけの進捗表示を削除。詳細メニューのアイボリー背景は選択位置へ移動する。
- 下／上キーおよびホイール1操作で次／前セクションへ720msで遷移。背景は固定し、内容のフェードと移動をスクロール位置に同期。長いモバイル本文や詳細画面では本文のスクロールを維持。
- リンクのホバーは文字色・背景色で表現。ブログ行はPC24px／モバイル16px、Links行はPC20px／モバイル12pxの左右余白を確保。
- 詳細の戻る操作はPCでは左下固定、モバイルでは上部タブ直下の本文内リンクに統一。末尾余白はPC32px、モバイル24pxに整理。
- 元データで一組だった2016年と2014年の活動履歴を、表示上は別の年見出しに分割。
- スマホのスキルは技術名を見出しにし、実務経験／得意分野それぞれ5個の長方形と数値で表示。アクティブは#72AEC9、非アクティブは#385164。PCの5×5マップは維持。
- 詳細はネイビーパネルが拡張する遷移。閉じた際は元のIntro選択、スクロール位置、操作ボタンへのフォーカスを復元。
- 詳細のヘッダー・左上タイトルは本文のスクロール領域から分離し、最下部でも表示。スマホの詳細カテゴリ切り替えもヘッダー内に固定。デスクトップの縦線は本文最下部まで表示。
- 既存コンテンツデータ、全作品リンク、経歴、趣味、資格、15項目のスキル数値、登壇情報を引き継ぐ。
- Linksは現行サイトと同じFont AwesomeのSVGをローカル同梱。外部キットの取得は不要。出典は [icon-attribution.md](icon-attribution.md)。
- Introの「詳しく見る」は本文から36px下・左揃えの300×68pxアイボリーCTAに変更。
- WaveBoxの大見出し上の装飾アイコンは削除し、👋は送信ボタン内だけに表示。
- WaveBoxは300×68px、18px Medium、アイボリー背景、左側22pxの👋・右側22pxの外部リンク矢印。狭い画面では利用可能幅に縮小。
- モバイルのメニュー、詳細の読みやすいスキルゲージ、長文スクロールに対応。メニューは開閉フェードと項目の順次入場を加え、各セクションへアニメーションで移動する。
- スマホの戻る操作は本文上部の通常リンクとし、下部固定を廃止。リンクのクリックで復帰を検証。
- 水色データブロックは点灯する四角と間隔をランダムに選び、淡く点灯。モーション軽減設定では停止。
- ネイティブdialog、キーボード操作、フォーカス表示、prefers-reduced-motionに対応。
- スマホ／PC切り替え時にセクション位置と内部スクロールを補正。PC幅ではスマホメニューを閉じ、遷移中断後の操作ロックを解除。詳細からの復帰位置も新しい画面高さに合わせる。
- アニメーション用ライブラリ・依存パッケージの追加なし。Pencilの採用フレームは変更していない。

## 検証

- `npm run build` 成功。
- `npm run build -- --prefix-paths` 成功。デプロイ操作は実施していない。
- RSSを30件取得し、既存クエリから最新4件を表示。記事のハードコードなし。
- `npm run develop -- --host 0.0.0.0` 起動成功。
- `npm run test:dependencies` 成功。
- `git diff --check` 成功。
- Chromium・Firefoxで1440×900、390×844、320×740、768×1024、1024×768を確認。
- TOPの移動方向、セクション間の背景固定、カルーセル、カテゴリ切り替え、詳細の全コンテンツ、Escによる復帰、選択・スクロール・フォーカス復元を確認。
- Linksの全10 URL、作品URL、外部リンクのnoopener/noreferrer、WaveBox CTAの寸法を確認。
- `/Colloid-Profile/` 配下で本番ビルドを配信し、同じ操作とabout/404からホームへのGatsby遷移を確認。
- モーション軽減設定、横方向のはみ出し、JavaScriptのpageerrorを確認。
- 詳細本文の絶対最下部でもヘッダー位置が0pxのまま維持されること、戻るボタンの表示が1つであることを確認。
- Engineering末尾の余白がPC34px以内（モバイルも34px以内）であることを実寸検証。PCでは非表示のスキル表をクリップするコンテナ内に収め、表の高さがスクロール範囲に漏れないよう修正。
- 下／上キーとホイールで1セクションずつ遷移すること、背景が移動しないこと、ブログ行の左右余白がホバー中も変わらないことを検証。

- `scripts/portal-resize-check.mjs` でChromium・Firefoxのスマホ→PC／PC→スマホ、メニューを開いた状態、遷移途中、詳細を開いた状態の往復と復帰を確認。

未検証：Safari/WebKit、スマートフォン実機でのタッチ操作、スクリーンリーダーの読み上げ、Lighthouse等の性能測定。GitHub Pagesへの実デプロイは指示により未実施。

ブラウザー検証スクリプト：`scripts/portal-browser-check.mjs`。
Playwrightを利用可能な環境で `node scripts/portal-browser-check.mjs` を実行する。
必要なら `PLAYWRIGHT_MODULE` で既存Playwrightモジュール、`PORTAL_URL` で対象URLを指定する。
`PORTAL_BROWSERS=all` でChromiumとFirefoxを検証できる。テスト用依存はプロジェクトに追加していない。

## 変更ファイル

| ファイル | 役割 |
| --- | --- |
| `gatsby-config.js` | 採用フォント、サイト名 |
| `gatsby-ssr.js` | 日本語属性、テーマ色、外部アイコンキット削除 |
| `src/pages/index.js` | 1ページ構成、既存RSSクエリ |
| `src/styles/global.css` | 共通トークン、リセット、アクセシビリティ |
| `src/styles/portal.css` | 採用レイアウト、レスポンシブ、各アニメーション |
| `src/gatsby-plugin-theme-ui/index.js` | 共通テーマの整合 |
| `src/components/home/PortalPrimitives.js` | ヘッダー、装飾、ボタン、共通アイコン |
| `src/components/home/IntroSection.js` | TOP、固定背景、Introカルーセル |
| `src/hooks/useOpeningScroll.js` | スクロール監視、表示・操作対象の制御 |
| `src/hooks/useSectionNavigation.js` | キー・ホイール・タッチのセクション送り |
| `src/components/home/IntroDetail.js` | 詳細ダイアログ、拡張・復帰、追従タイトル |
| `src/components/home/IntroOverlayContent.js` | 既存詳細コンテンツの表示 |
| `src/components/home/EngineeringSkillMatrix.js` | PCマップ、モバイルゲージ |
| `src/components/home/PortalSections.js` | Links・Blog・WaveBox |
| `src/components/home/SlidingContent.js` | 横方向の入退場アニメーション |
| `src/components/Icon.tsx` | 現行アイコンのSVG表示 |
| `src/components/fontawesome-icons.json` | 既存10アイコンの公式SVGパス |
| `src/components/header.js` | 既存aboutページの共通ヘッダー・Gatsbyリンク |
| `src/components/header.module.css` | 同ヘッダーの配色・書体 |
| `src/pages/about.js` | 戻るリンクのpathPrefix対応 |
| `src/pages/about.module.css` | 共通トークンとの整合 |
| `src/pages/404.js` | 共通配色での可読性、狭い幅への対応 |
| `scripts/portal-browser-check.mjs` | 実ブラウザーでの回帰検証 |
| `scripts/portal-resize-check.mjs` | 画面サイズ切り替えの回帰検証 |
| `docs/pencil-renewal.md` | 採用フレームと実装の対応 |
| `docs/icon-attribution.md` | アイコンのライセンス・出典 |
| `docs/renewal-verification.md` | 本記録 |

`src/data/homeContent.js`、`gatsby-node.js`、依存定義・ロックファイル、デプロイワークフローは変更していない。
作業前から存在した未追跡ファイルは保持。コミット、push、PR作成、デプロイは実施していない。

## PRレビュー対応（High 2件）

リンク／メニュー起点のセクション移動完了後は見出しへフォーカスを移し、フラグメントをpushStateで同期。長い前景本文がその方向へスクロールできる場合は上下キー・PageUp/Downのネイティブ操作を優先し、リンク・ボタン・タブ等の操作部品ではキーを横取りしない。

`scripts/portal-keyboard-check.mjs` により、Chromium／Firefox・通常／モーション軽減設定で、Enterによる移動、見出しフォーカス、URL／履歴、本文スクロール、操作部品のキー保持を確認。レビューのMedium 2件（NVDA／VoiceOverの読み上げ・フォーカス実機確認）は未検証。

## 履歴Markdown連携

`history.md` に2026年の新刊を追加し、頒布・参加履歴の唯一の編集元に変更。Webpackのasset/sourceでMarkdownを読み込み、共通パーサーで年別に表示する。JavaScript内の履歴コピーと2016/2014専用の分割処理を削除した。既刊参加のみの行も表示する。

GHAの既存main push・定期・手動実行に履歴検証を追加。編集手順はREADMEを参照。パーサーの3テスト、パス付き本番ビルド、Firefoxの詳細画面における全作品URLと年別表示を検証済み。実際のGHAデプロイはmainマージ後。
