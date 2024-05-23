import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.addPhpLog', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            const selectedText = document.getText(selection);

            // Regular expression to match a PHP variable name
            const variableMatch = selectedText.match(/^\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$/);

            if (variableMatch) {
                let variableName = variableMatch[0];
				variableName = variableName.substring(1);
                const logText = `\ndd(${selectedText});`;

                editor.edit(editBuilder => {
                    editBuilder.insert(new vscode.Position(selection.end.line + 1, 0), logText + '\n');
                });
            } else {
                vscode.window.showInformationMessage('Select a valid PHP variable to generate the log.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
