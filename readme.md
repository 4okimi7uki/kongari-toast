# kongari-toast 🍞

軽量でスタイリッシュなトースト通知ライブラリ "**こんがりトースト**"  
進捗バー付きで自動非表示。アイコン・カラーもタイプごとに変化。Vanilla JS 対応！

![MIT License](https://img.shields.io/badge/license-MIT-green.svg)
![Made with TypeScript](https://img.shields.io/badge/TypeScript-checked-blue.svg)

---

## ✅ 特徴

-   🔥 複数タイプ：`default`, `success`, `error`, `info`, `warning`, `promise`
-   ⏳ プログレスバー付き

-   📦 `.promise()` メソッドで非同期に対応

-   🧼 メッセージ非表示モード（アイコンだけ）

## 📥 インストール方法

### npm 経由で使う場合

```bash
npm install kongari-toast
```

```js
import { Toast } from "kongari-toast";

new Toast("保存しました", "success");
```

### ✅ CDN で直接読み込む（Vanilla JS / HTML で使用）

以下のように CDN 経由で読み込めます：

```html
<!-- スタイル -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/kongari-toast/dist/toast.css" />

<!-- モジュール本体（ESM形式） -->
<script type="module">
    import { Toast } from "https://cdn.jsdelivr.net/npm/kongari-toast/dist/toast.js";

    new Toast("保存しました！", "success");
</script>
```

---

## 📦 使用方法

```js
import { Toast } from "kongari-toast";

// Normal(+options)
new Toast("comment!", (toastType = "success"), {
    duration: 3000,
    position: "top-right",
    withoutMsg: true,
});
// FYI) position: "top-right" | "top-left" | "bottom-right" | "bottom-right"

// 非同期処理中のトースト
Toast.promise(fetch("/api/something"), {
    loading: "loading comment!",
    success: "success comment!",
    error: "error comment!",
});
```

## 🎨 カスタマイズ

-   toastIconMap.js を編集すればアイコン・色を変更可能

-   toast.css でアニメーションやレイアウトも自由に調整

---

🄯 2025 Aoki Mizuki – Developed with 🍭 and a sense of fun.
