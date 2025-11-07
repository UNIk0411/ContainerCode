import React, { useEffect, useRef } from 'react';

function OutputConsole({ output }) {
  const consoleRef = useRef(null);
  
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);
  
  return (
    <div className="console-container">
      <div className="console-header">📤 Output Console</div>
      <div ref={consoleRef} className="console-content">
        {output || '⚪ Output will appear here...'}
      </div>
    </div>
  );
}

export default OutputConsole;