'use strict';

const fs = require('fs');

let vscode;
switch (process.platform) {
    case 'win32':
        vscode = `C:\\Program Files\\Microsoft VS Code\\resources\\app\\out\\vs\\workbench\\workbench.main.js`;
        break;
    case 'darwin':
        vscode = `/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/workbench/workbench.main.js`;
        break;
    default:
        process.exit(-1);
}

let vscode_orig = `${vscode}.orig`;

if (fs.existsSync(vscode_orig)) {
    console.log('Already patched!');
    process.exit(-1);
}
    
fs.copyFileSync(vscode, vscode_orig);

let content = fs.readFileSync(vscode).toString();
content = content.replace(/e\.equals\(9\)&&i\.hide\(\)/g, '(e.equals(9)||(e.ctrlKey&&37==e.keyCode))&&i.hide()');
fs.writeFileSync(vscode, content);
console.log('Patched!');