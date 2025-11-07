import React from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, language, onChange }) {
  const monacoLanguage = {
    python: 'python',
    nodejs: 'javascript'
  }[language] || 'python';
  
  return (
    <div className="editor-container">
      <div className="editor-header">📝 Code Editor</div>
      <Editor
        height="400px"
        language={monacoLanguage}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>
  );
}

export default CodeEditor;