const { spawn } = require('child_process');
const path = require('path');

console.log('启动开发服务器...\n');

const projectPath = 'D:\\src\\TenProducts\\script-to-comic';
process.chdir(projectPath);

const npmPath = 'C:\\nvm4w\\nodejs\\npm.cmd';
const child = spawn(npmPath, ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: 'C:\\nvm4w\\nodejs;' + process.env.PATH
  }
});

child.on('error', (error) => {
  console.error('启动失败:', error);
});

child.on('exit', (code) => {
  console.log(`服务器已停止 (退出码: ${code})`);
});
