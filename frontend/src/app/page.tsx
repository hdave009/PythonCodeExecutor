"use client";

import React, { useRef, useState, MouseEvent } from 'react';
import Editor from "@monaco-editor/react";

const App: React.FC = () => {
  const code = "# Write your code below!\nprint('Hello World!');";
  const [outputHeight, setOutputHeight] = useState<number>(100);
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

  const handleRun = () => {
    console.log('Run button clicked');
    // Add your run logic here
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
    // Add your submit logic here
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
        Online Python Editor
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Editor
          height={`calc(100% - ${outputHeight}px)`}
          language="python"
          theme="vs-dark"
          value={code}
        />
        <div
          style={{
            height: `${outputHeight}px`,
            position: 'relative',
            backgroundColor: '#282c34',
            color: '#fff',
            overflow: 'auto'
          }}
        >
          <div
            onMouseDown={handleMouseDown}
            style={{
              height: '10px',
              backgroundColor: '#444',
              cursor: 'row-resize',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0'
            }}
          ></div>
          <div style={{ padding: '10px', paddingTop: '20px', fontFamily:"Courier New"}}>
            Read-only output will appear here.
          </div>
        </div>
      </div>
      <div style={{ padding: '10px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button onClick={handleRun} style={{ padding: '10px 20px', backgroundColor: '#555', color: '#fff', borderRadius: '5px', border: 'none' }}>
          Test Code
        </button>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: 'green', color: '#fff', borderRadius: '5px', border: 'none' }}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
