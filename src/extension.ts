'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-erase-formatter" is now active!');

    const editProvider = new RemoveEditProvider();

    console.log('bs =', count(vscode.window.activeTextEditor.document.getText()));

    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('*', editProvider));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('*', editProvider));
    context.subscriptions.push(vscode.languages.registerOnTypeFormattingEditProvider('*', editProvider, '}', ';', '\n'))

}

// this method is called when your extension is deactivated
export function deactivate() {
}

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLineId = document.lineCount - 1;
    return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

class RemoveEditProvider
    implements vscode.DocumentRangeFormattingEditProvider,
        vscode.DocumentFormattingEditProvider,
        vscode.OnTypeFormattingEditProvider {
    
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
        provideOnTypeFormattingEdits(
            document: vscode.TextDocument,
            position: vscode.Position,
            ch: string,
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

function count(text: string): any {
    try {
        // console.log("bs =", (text.match(/[\b]/gm) || []).length);
        return (text.match(/[\b]/gm) || []).length;
    } catch (e) {
        return text;
    }
}


