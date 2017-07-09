# vscode-bs-ctrlchar-remover README

## Features

開いているドキュメントからバックスペース制御文字を取り除くフォーマッタです。

下記の Issue にある問題を一時的に解決するものです。

* [Backspace can not erase the last one character during Chinese/Japanese IME conversion (macOS) · Issue #24981 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/24981)

すでに、本家 chromium では、修正がマージされているので、8 月初旬にリリースされる vscode 1.15 あたりで直るかと思います。

* [714771 - Two backspaces required to delete last character in webview input -  chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=714771)

## 使い方

拡張機能をインストールし、

* `ドキュメントのフォーマット` コマンドを実行するか、
* `"editor.formatOnSave": true` が設定されている場合は、保存時(⌘S)に発動
* `"editor.formatOnType": true` が設定されている場合は、改行時か `;` を入力時に発動

いずれも、気が付いたら消えているという感じです。ｖ

## Tips

* `制御文字の切り替え (Toggle Control Characters)` コマンドか `表示 -> 制御文字の切り替え` で可視化することが可能
* この拡張機能を使わないで、VS Code の基本機能で対応するには、`⌥⌘F` して検索に `[\b]` を入力し、`.* (正規表現を仕様する ⌥⌘R)` をクリックすることでドキュメント中のバックスペースを検索できます。さらに、`すべて置換(⌥⌘Enter)` を押すと削除してくれます
* `"files.autoSave"` に `"afterDelay"` が設定されていると、自動保存時にフォーマットが適用されないことに注意

## References

* [jrieken/vscode-formatter-sample](https://github.com/jrieken/vscode-formatter-sample)
* [ThisIsManta/vscode-stylus-supremacy](https://github.com/ThisIsManta/vscode-stylus-supremacy)
* [HookyQR/VSCodeBeautify](https://github.com/HookyQR/VSCodeBeautify)
* [esbenp/prettier-vscode](https://github.com/esbenp/prettier-vscode)

## Markdown モードにのみ適用する方法

この拡張機能自体は、特に言語モードは指定されていません。
そのため、全ての言語モードに適用されるため、`"[language-mode]":{}` で囲んで設定すると、指定された `language-mode` にのみ適用される。

```json
    "[markdown]": {
        "editor.wordWrap": "on",
        "editor.quickSuggestions": false,
        "editor.formatOnSave": true,
        "editor.formatOnType": true
    }
```

## formatOnType について

formatOnType の発動にはトリガとなる文字入力が必要になる。

> Yes - format on type only works on certain trigger characters. Extension define what those characters are, for instance TypeScript uses \n, ;, and }.

* [formatOnType does not work when you navigate away from the edited line · Issue #12064 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/12064)

