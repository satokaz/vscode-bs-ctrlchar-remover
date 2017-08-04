# vscode-bs-ctrlchar-remover README

vscode Formatter for deleting control character.

## Features

開いているドキュメントに含まれている制御文字を削除するフォーマッタです。
デフォルトで削除対象となる制御文字は、下記となります。

```typescript
\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u000b|\u000c|\u000d|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u001c|\u007f
```
> * https://ja.wikipedia.org/wiki/制御文字

このまま利用するか、ユーザー定義として設定された正規表現のパターンを利用することが可能です。

経緯としては、下記の Issue にある backspace 制御文字が紛れ込んでしまう問題に対応するために作成しました。

* [Backspace can not erase the last one character during Chinese/Japanese IME conversion (macOS) · Issue #24981 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/24981)

すでに、本家 chromium では、修正がマージされているので、8 月初旬にリリースされる vscode 1.15 あたりで直るかと思います(vscode 1.15 では、Electron 1.7.4 を採用予定)

* [714771 - Two backspaces required to delete last character in webview input -  chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=714771)

## 使い方

拡張機能をインストールし、

* `ドキュメントのフォーマット` コマンドを実行するか、
* `"editor.formatOnSave": true` が設定されている場合は、保存時(⌘S)に発動
* `"editor.formatOnType": true` が設定されている場合は、改行時か `;` を入力時に発動

いずれも、何かのアクションをトリガとし、制御文字を削除します。

### 手動での実行

`ドキュメントのフォーマット` コマンドや `editor.formatOnSave`, `editor.formatOnType` は、`*FormattingEditProvide` が定義されているフォーマッタ全てを発動させてしまいます。
そのため、これらを利用せずに単一の機能として利用したい場合は、`Remove control characters` コマンドを利用してください。

### ユーザー定義

デフォルトの制御文字で問題がある場合は、`ctrlchar-remover.pattern` 設定を利用してカスタマイズすることが可能です。
指定された正規表現のパターンに一致した文字を削除します。(`\u0008` と指定する場合は、`\\u0008` のように `\` によるエスケープが必要)

* `ctrlchar-remover.pattern`: 

backspace (\u0008) を削除対象とする例:

```json
    "ctrlchar-remover.pattern": "[\\u0008]"
```

backspace (\u0008) と Line Feed (\u000a) を削除対象とする例:

```json
    "ctrlchar-remover.pattern": "[\\u0008]|[\\u000a]"
```

当然、制御文字以外のパターンも指定できるのので注意してください。

## Tips

* `制御文字の切り替え (Toggle Control Characters)` コマンドか `表示 -> 制御文字の切り替え` で可視化することが可能
* この拡張機能を使わないで、VS Code の基本機能で対応するには、`⌥⌘F` して検索に `[\b]` を入力し、`.* (正規表現を仕様する ⌥⌘R)` をクリックすることでドキュメント中のバックスペースを検索できます。さらに、`すべて置換(⌥⌘Enter)` を押すと削除してくれます
* `"files.autoSave"` に `"afterDelay"` が設定されていると、自動保存時にフォーマットが適用されないことに注意
* https://en.wikipedia.org/wiki/Control_Pictures
* https://unicode-table.com/en/
* https://ja.wikipedia.org/wiki/制御文字
* https://en.wikipedia.org/wiki/C0_and_C1_control_codes

## References

* [jrieken/vscode-formatter-sample](https://github.com/jrieken/vscode-formatter-sample)
* [ThisIsManta/vscode-stylus-supremacy](https://github.com/ThisIsManta/vscode-stylus-supremacy)
* [HookyQR/VSCodeBeautify](https://github.com/HookyQR/VSCodeBeautify)
* [esbenp/prettier-vscode](https://github.com/esbenp/prettier-vscode)

## formatOnSave および formatOnType を特定の言語モードにのみ適用する方法

この拡張機能は、言語モードは指定されていないため、全ての言語モードに適用されます。
特定の言語モードでのみ有効にしたい場合は、`"[language-mode]":{}` で囲んで設定することで、指定された `language-mode` にのみ有効になります。

下記は、Markdown モードにのみ適用する例です: 

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

