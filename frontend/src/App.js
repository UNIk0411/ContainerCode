import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import CodeEditor from './components/CodeEditor';
import OutputConsole from './components/OutputConsole';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [code, setCode] = useState('print("Hello from ContainerCode!")');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const sampleCode = {
    python: 'print("Hello from ContainerCode!")\\nfor i in range(5):\\n    print(f"Number: {i}")',
    nodejs: 'console.log("Hello from ContainerCode!");\\nfor (let i = 0; i < 5; i++) {\\n  console.log(`Number: ${i}`);\\n}'
  };
  
  useEffect(() => {
    setCode(sampleCode[language]);
  }, [language]);
  
  const handleExecute = async () => {
    try {
      setIsExecuting(true);
      setOutput('Executing...\\n');
      
      const response = await axios.post('http://localhost:3001/api/execute', {
        code, language, timeout: 10, memory: 256
      });
      
      const { executionId } = response.data;
      setOutput(`Execution ID: ${executionId}\\n\\n`);
      
      socket.on(`execution:${executionId}`, (message) => {
        if (message.type === 'output') {
          setOutput(prev => prev + message.data);
        } else if (message.type === 'error') {
          setOutput(prev => prev + 'ERROR: ' + message.data);
        } else if (message.type === 'complete') {
          setIsExecuting(false);
          if (message.status === 'SUCCESS') {
            setOutput(prev => prev + `\\n\\n Completed in ${message.executionTime}s`);
          } else {
            setOutput(prev => prev + '\\n\\n Execution failed');
          }
          socket.off(`execution:${executionId}`);
        }
      });
      
    } catch (error) {
      setOutput('Error: ' + error.message);
      setIsExecuting(false);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>ContainerCode</h1>
        <p>Secure Multi-Language Code Execution Platform</p>
      </header>
      
      <div className="container">
        <div className="controls">
          <div className="control-group">
            <label>Language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={isExecuting}>
              <option value="python">Python 3.11</option>
              <option value="nodejs">Node.js 20</option>
            </select>
          </div>
          
          <button onClick={handleExecute} disabled={isExecuting} className="execute-btn">
            {isExecuting ? 'Executing...' : '▶Execute Code'}
          </button>
        </div>
        
        <CodeEditor code={code} language={language} onChange={setCode} />
        <OutputConsole output={output} />
      </div>
    </div>
  );
}

export default App;