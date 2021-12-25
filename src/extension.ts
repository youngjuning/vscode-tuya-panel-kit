/* eslint-disable consistent-return */
import vscode from 'vscode';
import linkMap from './linkMap';

const DOC = 'https://panel-docs.tuyacn.com/docs';
const EN_DOC = 'https://panel-docs.tuyacn.com/en/docs';

function provideHover(document: vscode.TextDocument, position: vscode.Position) {
  if (document.getText().indexOf('tuya-panel-kit') !== -1) {
    const line = document.lineAt(position);

    const componentName = line.text.match(/(?<=<)([\w]+)/g)
      ? line.text.match(/(?<=<)([\w]+)/g)!.toString()
      : '';
    const apiName = line.text.match(/([\w]+)/g) ? line.text.match(/([\w]+)/g)![0] : '';

    if (linkMap.has(componentName)) {
      const link = linkMap.get(componentName);
      const content =
        vscode.env.language === 'zh-cn'
          ? `\
[Tuya Panel Kit -> 查看 ${componentName} 组件官方文档](${DOC}${link})`
          : `[Tuya Panel Kit -> Watch ${componentName} component documentation](${EN_DOC}${link})`;
      return new vscode.Hover(content);
    }
    if (linkMap.has(apiName)) {
      const link = linkMap.get(apiName);
      const content =
        vscode.env.language === 'zh-cn'
          ? `\
[Tuya Panel Kit -> 查看 ${apiName} API 官方文档](${DOC}${link})`
          : `[Tuya Panel Kit -> Watch ${apiName} API documentation](${EN_DOC}${link})`;
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
