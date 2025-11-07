const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

async function executeCode({ executionId, code, language, timeout, memory, io }) {
  try {
    const execDir = path.join(__dirname, 'tmp', `exec_${executionId}`);
    await fs.mkdir(execDir, { recursive: true });

    const codeFile = path.join(execDir, `code.${language === 'python' ? 'py' : 'js'}`);
    await fs.writeFile(codeFile, code);

    const command = language === 'python'
      ? `python "${codeFile}"`
      : `node "${codeFile}"`;

    const process = exec(command, { timeout: timeout * 1000 });

    process.stdout.on('data', (data) => {
      io.emit(`execution:${executionId}`, { type: 'output', data });
    });

    process.stderr.on('data', (data) => {
      io.emit(`execution:${executionId}`, { type: 'error', data });
    });

    process.on('close', (code) => {
      io.emit(`execution:${executionId}`, {
        type: 'complete',
        status: code === 0 ? 'SUCCESS' : 'ERROR',
        executionTime: 0, // optional
      });
    });

  } catch (err) {
    io.emit(`execution:${executionId}`, {
      type: 'complete',
      status: 'ERROR',
      error: err.message
    });
  }
}

module.exports = { executeCode };
