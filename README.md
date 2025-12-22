# Portfolio React

React + Vite + TypeScriptで構築した個人ポートフォリオサイト

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF)

## ポートフォリオサイト

https://sakutohata.github.io/portfolio_react_test/

## 主な機能

- **静的GitHub言語データ**: 事前生成された言語統計を表示（セキュアな実装）
- **プロジェクトカルーセル**: スワイプ/ドラッグ対応のプロジェクト表示
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **ダークテーマ**: 目に優しいダークモードUI
- **パーティクルアニメーション**: 背景の動的アニメーション効果
- **カスタムアイコン**: AI/MLツール用のSVGアイコンコンポーネント

## プロジェクト構成

```
portfolio_react_test/
├── public/                      # 静的ファイル
│   ├── github-languages.json   # GitHub言語統計データ
│   ├── *.svg                   # SVGアイコン
│   └── *.png                   # 画像ファイル
├── src/
│   ├── components/
│   │   ├── ui/                 # 再利用可能なUIコンポーネント
│   │   │   ├── carousel.tsx   # カルーセルコンポーネント
│   │   │   ├── card.tsx       # カードコンポーネント
│   │   │   └── button.tsx     # ボタンコンポーネント
│   │   └── icons/              # カスタムアイコンコンポーネント
│   │       ├── OpenAIIcon.tsx
│   │       ├── ClaudeIcon.tsx
│   │       ├── BedrockIcon.tsx
│   │       └── ...
│   ├── hooks/                  # カスタムフック
│   ├── lib/                    # ユーティリティ関数
│   ├── pages/
│   │   └── Portfolio.tsx       # メインポートフォリオページ
│   ├── App.tsx                 # アプリケーションルート
│   ├── main.tsx                # エントリーポイント
│   └── index.css               # グローバルスタイル
├── scripts/
│   └── generate-languages.ts   # GitHub言語データ生成スクリプト
├── .env.example                # 環境変数サンプル
├── .gitignore                  # Git除外設定
├── package.json                # 依存関係とスクリプト
├── vite.config.ts              # Vite設定
└── tsconfig.json               # TypeScript設定
```

## 技術スタック

### フロントエンド
- **React** 18.3.1 - UIライブラリ
- **TypeScript** 5.7.2 - 型安全性
- **Vite** 6.0.3 - 高速ビルドツール
- **React Router** 7.1.0 - ルーティング

### スタイリング
- **Tailwind CSS** 3.4.17 - ユーティリティファーストCSS
- **Radix UI** - アクセシブルなUIプリミティブ
- **Lucide React** - アイコンライブラリ
- **React Icons** 5.5.0 - 追加アイコン

### UIコンポーネント
- **Embla Carousel** 8.6.0 - カルーセル機能
- **class-variance-authority** - スタイルバリアント管理
- **tailwind-merge** - Tailwindクラスのマージ

### 開発ツール
- **gh-pages** 6.2.0 - GitHub Pagesデプロイ
- **tsx** 4.20.6 - TypeScript実行環境

## カスタマイズ

### 個人情報の更新

[src/pages/Portfolio.tsx](src/pages/Portfolio.tsx) を編集:

```typescript
// 基本情報
const GITHUB_USERNAME = 'YourGitHubUsername'

// プロフィール
<h1>Your Name</h1>
<p>Your Title / Role</p>

// SNSリンク
<a href="https://github.com/yourusername">

// スキル
const programmingLanguages = { ... }
const toolIcons = { ... }

// 資格
const certifications = [ ... ]
```

### カスタムアイコンの追加

1. SVGファイルを `public/` に配置
2. `src/components/icons/` に新しいアイコンコンポーネントを作成:

```typescript
export function YourIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="..." />
    </svg>
  )
}
```

3. `Portfolio.tsx` の `toolIcons` に追加

### カラーテーマの変更

[src/index.css](src/index.css) を編集:

```css
:root {
  --background: ...;
  --foreground: ...;
  /* その他のカラー変数 */
}
```

## セキュリティ

### 環境変数の保護

- `.env.local` は `.gitignore` で除外されています
- フロントエンドコードでは環境変数を使用していません
- GitHub Personal Access Tokenはビルド時のスクリプトのみで使用
- デプロイされたコードに機密情報は含まれません

### 依存関係のセキュリティ

```bash
npm audit
```

## 作成者

SakutoHata ([@SakutoHata](https://github.com/SakutoHata))
