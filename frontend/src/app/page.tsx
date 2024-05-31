"use client";

import React, { useRef, useState, MouseEvent } from 'react';
import Editor from "@monaco-editor/react";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("# Write your code below!\nprint('Hello World!')");
  const [outputHeight, setOutputHeight] = useState<number>(100);
  const [outputContent, setOutputContent] = useState<string>("Read-only output will appear here.");
  const isResizing = useRef<boolean>(false);
  const lastY = useRef<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    lastY.current = e.clientY;
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp as EventListener);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isResizing.current) return;
    const deltaY = e.clientY - lastY.current;
    setOutputHeight((prevHeight) => Math.max(prevHeight - deltaY, 50));
    lastY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp as EventListener);
  };

  const handleTestCode = () => {
    console.log('Test Code button clicked');
    // Add your run logic here
    console.log('Code to run:', code);
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
    // Add your submit logic here
  };

  const handleClearBuffer = () => {
    setOutputContent('');
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    const outputDiv = document.getElementById('output');
    if (outputDiv && outputDiv.contains(e.target as Node)) {
      e.preventDefault();
      const menu = document.getElementById('context-menu');
      if (menu) {
        menu.style.top = `${e.clientY}px`;
        menu.style.left = `${e.clientX}px`;
        menu.style.display = 'block';
      }
    }
  };

  const handleDocumentClick = () => {
    const menu = document.getElementById('context-menu');
    if (menu) {
      menu.style.display = 'none';
    }
  };
  
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  }

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }} onContextMenu={handleContextMenu}>
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
        Online Python Editor
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Editor
          height={`calc(100% - ${outputHeight}px)`}
          language="python"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
        />
        <div
          style={{
            height: '20px', // Thicker divider
            backgroundColor: '#444',
            cursor: 'row-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // Right justify the link
            color: '#fff',
            padding: '0 10px', // Add padding for better spacing
          }}
          onMouseDown={handleMouseDown}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClearBuffer();
            }}
            style={{ color: '#fff', textDecoration: 'none' }}
          >
            Clear Output
          </a>
        </div>
        <div
          id="output"
          style={{
            height: `${outputHeight}px`,
            position: 'relative',
            backgroundColor: '#282c34',
            color: '#fff',
            overflow: 'auto'
          }}
        >
          <div style={{ padding: '40px 10px 10px 10px', fontFamily: "Courier New" }}>
            {outputContent}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          onClick={handleTestCode}
          style={{
            padding: '10px 20px',
            backgroundColor: '#555',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.1s'
          }}
        >
          Test Code
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.1s'
          }}
        >
          Submit
        </button>
      </div>
      <div
        id="context-menu"
        style={{
          display: 'none',
          position: 'absolute',
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}
      >
        <div
          onClick={handleClearBuffer}
          style={{
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          Clear Output
        </div>
      </div>
    </div>
  );
}

export default App;
