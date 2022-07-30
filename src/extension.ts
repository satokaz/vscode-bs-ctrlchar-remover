'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-erase-formatter" is now active!');
    
    // console.log('bs =', count(vscode.window.activeTextEditor.document.getText()));

    const editProvider = new RemoveEditProvider();

    vscode.languages.registerDocumentRangeFormattingEditProvider('*', editProvider);
    vscode.languages.registerDocumentFormattingEditProvider('*', editProvider);
    vscode.languages.registerOnTypeFormattingEditProvider('*', editProvider, '}', ';', '\n');

    // Manual replace
    // if(vscode.workspace.getConfiguration('ctrlchar-remover')['enable'] === true) {
    let disposable = vscode.commands.registerCommand('extension.remover', async () => {
        const {activeTextEditor} = vscode.window;
        if (activeTextEditor) {
            const {document} = activeTextEditor;
            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, fullDocumentRange(document), format(document.getText()));
            vscode.workspace.applyEdit(edit);
        }
    });
    context.subscriptions.push(disposable);
    // }
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
        const config = vscode.workspace.getConfiguration('ctrlchar-remover');
        const defRegex: RegExp = /[\u0000]|[\u0001]|[\u0002]|[\u0003]|[\u0004]|[\u0005]|[\u0006]|[\u0007]|[\u0008]|[\u000b]|[\u000c]|[\u000d]|[\u000e]|[\u000f]|[\u0010]|[\u0011]|[\u0012]|[\u0013]|[\u0014]|[\u0015]|[\u0016]|[\u0017]|[\u0018]|[\u0019]|[\u001a]|[\u001b]|[\u001c]|[\u001d]|[\u001e]|[\u001f]|[\u007f]/gm;

        const userRegex = new RegExp(config.inspect<string>('pattern').globalValue, 'gm');
        // console.log(userRegex.toString());
        
        return text.replace(config.inspect<string>('pattern').globalValue === undefined ? defRegex : userRegex, '');
        
    } catch (e) {
        return text;
    }
}
