'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-erase-formatter" is now active!');

    const editProvider = new RemoverEditProvider();

    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('*', editProvider));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('*', editProvider));
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLineId = document.lineCount - 1;
    return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

class RemoverEditProvider implements vscode.DocumentRangeFormattingEditProvider, vscode.DocumentFormattingEditProvider {
    provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        return [vscode.TextEdit.replace(range, format(document.getText(range)))];
    }
    provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        return [vscode.TextEdit.replace(fullDocumentRange(document), format(document.getText()))];
    }
}

function format(text: string): string {
    try {
        return text.replace(/[\b]/gm, '');
    } catch (e) {
        return text;
    }
}