"use client";

import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

// Define the shape of the output response
interface Output {
  output: string;
  stdout: string;
  stderr: string;
  execution_time: string;
}

// Define the shape of the error response
interface ExecutionError {
  error: string;
}

const App: React.FC = () => {
  const [code, setCode] = useState<string>("# Write your code below!\nprint('Hello World!')");
  const [outputHeight, setOutputHeight] = useState<number>(100);
  const [outputContent, setOutputContent] = useState<string>("Read-only output will appear here.");
  const [executionTime, setExecutionTime] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);
  const lastY = useRef<number>(0);

  // Handle mouse down event for resizing output area
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    lastY.current = e.clientY;
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp as EventListener);
  };

  // Handle mouse move event to resize the output area
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isResizing.current) return;
    const deltaY = e.clientY - lastY.current;
    setOutputHeight((prevHeight) => Math.max(prevHeight - deltaY, 50));
    lastY.current = e.clientY;
  };

  // Handle mouse up event to stop resizing
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp as EventListener);
  };

  // Handle the "Test Code" button click
  const handleTestCode = async () => {
    console.log('Test Code button clicked');
  
    try {
      const response = await axios.post<Output>("http://localhost:8000/test", { code });
      setOutputContent(prev => prev.trim() + "\n" + (response.data.stdout ? response.data.stdout.trim() + "\n" : '') + (response.data.stderr ? response.data.stderr.trim() + "\n" : ''));
      setExecutionTime(response.data.execution_time);
      console.log('Output:', response.data.output);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setOutputContent(prev => prev.trim() + "\n" + (error.response?.data.detail || 'Unknown error').trim() + "\n");
        console.error('Axios error:', error.response?.data);
        setExecutionTime(null); // Clear the execution time on error
      } else {
        console.error('Unexpected error:', error);
        setExecutionTime(null); // Clear the execution time on error
      }
    }
  };

  // Handle the "Submit" button click
  const handleSubmit = async () => {
    console.log('Submit button clicked');
    try {
      const response = await axios.post<Output>("http://localhost:8000/submit", { code });
      setOutputContent(prev => prev.trim() + "\n" + (response.data.stdout ? response.data.stdout.trim() : '') + "\n" + (response.data.stderr ? response.data.stderr.trim() : ''));
      setExecutionTime(response.data.execution_time);
      console.log('Output:', response.data.output);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setOutputContent(prev => prev.trim() + "\n" + (error.response?.data.detail || 'Unknown error').trim() + "\n");
        console.error('Axios error:', error.response?.data);
        setExecutionTime(null); // Clear the execution time on error
      } else {
        console.error('Unexpected error:', error);
        setExecutionTime(null); // Clear the execution time on error
      }
    }
  };

  // Clear the output buffer
  const handleClearBuffer = () => {
    setOutputContent('');
    setExecutionTime(null);
  };

  // Handle context menu event to show a custom context menu
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

  // Hide the custom context menu on document click
  const handleDocumentClick = () => {
    const menu = document.getElementById('context-menu');
    if (menu) {
      menu.style.display = 'none';
    }
  };

  // Handle changes in the code editor
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  // Add event listener for document clicks to hide context menu
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Scroll to the bottom of the output div whenever outputContent changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputContent]);

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
            justifyContent: 'space-between', // Space between the elements
            color: '#fff',
            padding: '0 10px', // Add padding for better spacing
          }}
          onMouseDown={handleMouseDown}
        >
          {executionTime ? (
            <span style={{ color: '#fff', fontSize: '12px' }}>
              Execution Time: {executionTime} seconds
            </span>
          ) : (
            <div style={{ width: '135px' }}></div> // Placeholder div with fixed width
          )}
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
          ref={outputRef}
          style={{
            height: `${outputHeight}px`,
            position: 'relative',
            backgroundColor: '#282c34',
            color: '#fff',
            overflow: 'auto',
            whiteSpace: 'pre-wrap', // Preserves whitespace and newlines
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
