// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode  = require("vscode");
let tabular = require("./tabular.js");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log("Congratulations, your extension \"tabular\" is now active!");

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("extension.tabular", function () {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;                                                    // RETURN
        }
        let selection = editor.selection;
        if (selection.isEmpty) {
            return;                                                    // RETURN
        }
        vscode.window.showInputBox({
            prompt : "Character to align"
        })
        .then(delimiter => {
            if (!delimiter) {
                return;                                                // RETURN
            }
            return editor.edit(editBuilder => {
                let text        = editor.document.getText(selection);
                let replacement = tabular.tabularize(text, delimiter);
                editBuilder.replace(selection, replacement);
            });
        })
        .catch(error => {
            vscode.window.showErrorMessage(error.message);
        });
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
