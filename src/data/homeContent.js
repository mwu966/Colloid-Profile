import historyMarkdown from "../../history.md"
import { parseCreativeHistory } from "../lib/creativeHistory.cjs"

export const INTRO_BLOCKS = [
  {
    key: "profile",
    title: "Profile",
    body: "Colloidの自己紹介。",
  },
  {
    key: "creative",
    title: "Creative",
    body: "Colloidの個人同人活動のサークル｢ミルク蒼屋｣の活動履歴。",
  },
  {
    key: "engineering",
    title: "Engineering",
    body: "エンジニアColloidの技術スキルの紹介。",
  },
]

const LINK_CARDS = [
  {
    title: "SNS",
    tone: "base",
    links: [
      {
        label: "X",
        id: "@colloidgel",
        icon: "x",
        url: "https://twitter.com/ColloidGel",
      },
      {
        label: "Bluesky",
        id: "@colloidgel",
        icon: "bluesky",
        url: "https://bsky.app/profile/colloidgel.bsky.social",
      },
      {
        label: "mixi2",
        id: "@ColloidGel",
        icon: "mixi2",
        url: "https://mixi.social/@ColloidGel",
      },
    ],
  },
  {
    title: "お絵かき系",
    tone: "orange",
    links: [
      {
        label: "pixiv",
        id: "colloidgel",
        icon: "pixiv",
        url: "https://www.pixiv.net/users/1965562",
      },
      {
        label: "Xfolio(クロスフォリオ)",
        id: "ColloidGel",
        icon: "xfolio",
        url: "https://xfolio.jp/portfolio/ColloidGel",
      },
    ],
  },
  {
    title: "技術系",
    tone: "green",
    links: [
      {
        label: "Qiita",
        id: "ColloidGel",
        icon: "qiita",
        url: "https://qiita.com/ColloidGel",
      },
      {
        label: "Zenn",
        id: "Colloid",
        icon: "zenn",
        url: "https://zenn.dev/colloidgel",
      },
      {
        label: "GitHub",
        id: "mwu966",
        icon: "github",
        url: "https://github.com/mwu966",
      },
    ],
  },
  {
    title: "同人通販",
    tone: "blue",
    links: [
      {
        label: "BOOTH",
        id: "ミルク蒼屋.com",
        icon: "booth",
        url: "https://blueparticles.booth.pm/",
      },
      {
        label: "メロンブックス",
        id: "ミルク蒼屋の同人誌",
        icon: "melon",
        url: "https://www.melonbooks.co.jp/circle/index.php?circle_id=100689",
      },
    ],
  },
]

export const LINK_CARD_COLUMNS = [LINK_CARDS.slice(0, 2), LINK_CARDS.slice(2, 4)]

export const PROFILE_TIMELINE = [
  "平成一桁台に誕生。\n幼少期に Windows95 に触れたのをきっかけに PC に興味を持ち、以降そこから IT に関わる道を歩む。",
  "学生時代は趣味で二次創作のイラストを描いたりする。\n大学はコンピューター・サイエンスを専攻。",
  "社会人になってからは、システムエンジニアとして主にバックエンド開発に携わる。\n片手間に二次創作で同人誌を作ったり、イラストを描いたりしている。",
]

export const PROFILE_HOBBIES = [
  "ゲーム（東方Project / アークナイツ / DDR）",
  "読書（ジャンル雑多）",
  "旅行(国内メイン)",
  "お絵かき",
]

export const CREATIVE_WORKS_BY_YEAR = parseCreativeHistory(historyMarkdown)

export const ENGINEERING_CERTIFICATIONS = [
  "2026年 Microsoft認定資格 AI-900 取得",
  "2024年 AWS Certified Cloud Practitioner 取得",
  "2023年 Microsoft認定資格 AZ-104 取得",
  "2021年 Microsoft認定資格 AZ-900 取得",
]

export const ENGINEERING_SKILL_ITEMS = [
  { title: "C#", experience: 5, specialty: 4 },
  { title: "Java", experience: 5, specialty: 4 },
  { title: "VB.NET", experience: 2, specialty: 2 },
  { title: "WebForms", experience: 1, specialty: 2 },
  { title: "HTML/CSS/JS", experience: 1, specialty: 2 },
  { title: "自動テスト", experience: 1, specialty: 2 },
  { title: "Web API", experience: 5, specialty: 3 },
  { title: "WPF", experience: 3, specialty: 2 },
  { title: "Blazor", experience: 3, specialty: 2 },
  { title: "Spring Boot", experience: 2, specialty: 2 },
  { title: "Git", experience: 5, specialty: 3 },
  { title: "AWS", experience: 3, specialty: 3 },
  { title: "Oracle DB", experience: 2, specialty: 1 },
  { title: "PostgreSQL", experience: 4, specialty: 2 },
  { title: "ETL", experience: 3, specialty: 3 },
]

export const SKILL_AXIS_LEVELS = [1, 2, 3, 4, 5]
export const SKILL_SPECIALTY_LEVELS = [5, 4, 3, 2, 1]

export const ENGINEERING_CAREER_SUMMARY = [
  "人生初の仕事は保守とかでVB.NETとかWebFormsとか触っていた。",
  "その後自社製品を扱う会社に転職したら即吸収合併になり消滅。",
  "入りたかった会社が消滅したので落ち込む中、合併先で新規サービスを立ち上げることになり、そこでC#とかAWSを触る。また仕事のやり取りで英語の洗礼を受けてなんとか生き延びる。",
  "新規サービス立ち上げ後に職場を変え、今はJavaやC#を使ったWeb系の開発をしたり、AWSをいじったり、時には指導したり色々やってる。",
  "今後のAIの発展に怯えながらなんとか生きている。",
]

export const ENGINEERING_TALKS = [
  {
    date: "2020/11/21",
    label: "VS Code Conference Japan 2020",
    url: "https://vscode.connpass.com/event/184441/",
    note: "LT枠",
  },
  {
    date: "2017/01/28",
    label: "JXUGC #22 最新事例＆お前のアプリを説明してもらおうの会",
    url: "https://jxug.connpass.com/event/47941/",
    note: "LT枠",
  },
]

export const LINKS_SECTION_LEAD =
  "各種SNSや同人通販サイトなどへのリンクをまとめています。"

export const BLOG_URL = "https://colloidgel.hatenablog.com/"
export const BLOG_LINK_LABEL = "ブログ｢ミルク蒼屋のチラシ｣へ"

export const WAVEBOX_URL = "https://wavebox.me/wave/axm2c8waalgd8m70/"
export const WAVEBOX_SECTION_LEAD = "ひとこと感想や、軽いリアクション用の拍手置き場です。"
export const WAVEBOX_BODY =
  "読んだよ、見たよ、くらいの軽いリアクションから、同人誌の感想等、短いメッセージまでどうぞ。"
export const WAVEBOX_BUTTON_LABEL = "👋 Wave を送る"
