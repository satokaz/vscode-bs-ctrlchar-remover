# vscode-bs-ctrlchar-remover README

[Japanese README is here](https://github.com/satokaz/vscode-bs-ctrlchar-remover/blob/master/README_ja.md)



vscode Formatter for deleting control character.

## Features

A formatter that deletes the control characters contained in an open document. The control characters to be deleted by default are as follows:

```typescript
/[\u0000]|[\u0001]|[\u0002]|[\u0003]|[\u0004]|[\u0005]|[\u0006]|[\u0007]|[\u0008]|[\u000b]|[\u000c]|[\u000d]|[\u000e]|[\u000f]|[\u0010]|[\u0011]|[\u0012]|[\u0013]|[\u0014]|[\u0015]|[\u0016]|[\u0017]|[\u0018]|[\u0019]|[\u001a]|[\u001b]|[\u001c]|[\u001d]|[\u001e]|[\u001f]|[\u001c]|[\u007f]/gm
```

It is also possible to define the regular expression pattern as a user.

This extenstion was created to cope with the problem that the backspace control character in the Issue below:

* [Backspace can not erase the last one character during Chinese/Japanese IME conversion (macOS) · Issue #24981 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/24981)
* [714771 - Two backspaces required to delete last character in webview input -  chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=714771)

## How to use

Install extensions,

* Execute the `Format Document` command,
* If `"editor.formatOnSave": true` is set, invoke on save (⌘S)
* If `"editor.formatOnType": true` is set, invoked on `Enter (line break)` or `;` input

In either case, the action is triggered and the control character is deleted.

### Manual execution

The `Format Document` command and `editor.formatOnSave`, `editor.formatOnType` will trigger all formatter defined with `* FormattingEditProvide`.

Therefore, if you want to use them as a single function without using them, please use the `Remove control characters` command.

### User defined

If there is a problem with the default control character, you can customize it using the `ctrlchar-remover.pattern` setting.
Delete the character that matches the pattern of the specified regular expression. (If you specify `\u0008`, you must escape with`\`, like `\\u0008`)

* `ctrlchar-remover.pattern`: 

Example deletion of `backspace (\u0008)` only:

```json
    "ctrlchar-remover.pattern": "[\\u0008]"
```

Example of deletion of `backspace (\u0008)` and `Line Feed (\u000a)`:

```json
    "ctrlchar-remover.pattern": "[\\u0008]|[\\u000a]"
```

ATTENTION: Of course, you can also specify patterns other than control characters.


## Tips

* Can be visualized by `Toggle Control Characters` command or `View -> control character switching`.
* To handle with the basic function of VS Code without using this extension, input `[\b]` for search by typing `⌥⌘F` and using `.* (⌥⌘R)`, To search backspaces control character in the document. In addition, you can delete it by pressing `Replace All (⌥⌘Enter)`.
* if `afterDelay` is set as the value of `files.autoSave`, the format will not be applied during auto save.

## Control character reference

* https://en.wikipedia.org/wiki/Control_Pictures
* https://en.wikipedia.org/wiki/Control_character
* https://en.wikipedia.org/wiki/C0_and_C1_control_codes
* https://symbl.cc/en/

## References

* [jrieken/vscode-formatter-sample](https://github.com/jrieken/vscode-formatter-sample)
* [ThisIsManta/vscode-stylus-supremacy](https://github.com/ThisIsManta/vscode-stylus-supremacy)
* [HookyQR/VSCodeBeautify](https://github.com/HookyQR/VSCodeBeautify)
* [esbenp/prettier-vscode](https://github.com/esbenp/prettier-vscode)

## How to apply `formatOnSave` and `formatOnType` to specific language modes only

This extension is applied to all language modes because language mode is not specified.
If you want to enable it only in a specific language mode, enclosing it with `"[language-mode]":{}` enables it only for the specified `language-mode`.

Below is an example that applies only to `Markdown` mode:

```json
    "[markdown]": {
        "editor.wordWrap": "on",
        "editor.quickSuggestions": false,
        "editor.formatOnSave": true,
        "editor.formatOnType": true
    }
```

## About `formatOnType` 

In order for `formatOnType` to work, it is necessary to input a trigger character.

> Yes - format on type only works on certain trigger characters. Extension define what those characters are, for instance TypeScript uses \n, ;, and }.

* [formatOnType does not work when you navigate away from the edited line · Issue #12064 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/12064)

