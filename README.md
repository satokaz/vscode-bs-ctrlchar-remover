# vscode-bs-ctrlchar-remover README

# vscode-erase-formatter README

## Features

テキストの中から、バックスペース制御文字を取り除く formatter です。

拡張機能をインストールし、`ドキュメントのフォーマット` コマンドを実行するか、`"editor.formatOnSave": true` が設定されている場合は、保存時に発動します。

* この拡張機能を使わないで、VS Code の基本機能で対応するには、`⌥⌘F` して検索に `[\b]` を入力し、`.* (正規表現を仕様する ⌥⌘R)` をクリックすることでドキュメント中のバックスペースを検索することができます。さらに、`すべて置換(⌥⌘Enter)` を押すと削除してくれます

