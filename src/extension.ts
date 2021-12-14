/* eslint-disable consistent-return */
import vscode from 'vscode';
import siteMap from './siteMap';

const DOC = 'https://panel-docs.tuyacn.com/docs';
const EN_DOC = 'https://panel-docs.tuyacn.com/en/docs';
const LINK_RE = /(?<=<)([\w]+)/g;

function provideHover(document: vscode.TextDocument, position: vscode.Position) {
  if (document.getText().indexOf('tuya-panel-kit')) {
    const line = document.lineAt(position);
    const linkComponent = line.text.match(LINK_RE) ? line.text.match(LINK_RE)!.toString() : '';
    const hasKey = siteMap.has(linkComponent);
    if (hasKey) {
      const content = `\
[Tuya Panel Kit -> 查看 ${linkComponent} 组件官方文档](${DOC}${siteMap.get(linkComponent)})\n
[Tuya Panel Kit -> Watch ${linkComponent} component documentation](${EN_DOC}${siteMap.get(
        linkComponent
      )})`;
      return new vscode.Hover(content);
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      ['typescript', 'javascript', 'javascriptreact', 'typescriptreact'],
      {
        provideHover,
      }
    )
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
