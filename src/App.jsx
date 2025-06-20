import React, { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  // Apply theme class and save preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'
          :'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'
      }`}
    >
      {/* Theme toggle button (top-right) */}
      <div className="absolute top-3 right-9 z-10">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded-full shadow"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Terminal UI */}
      <div
        className={`w-full flex items-center justify-center p-4 text-yellow-200 flex-col`}
      >
        <Terminal />

        {/* Tips section below terminal */}
        <div className="mt-5 text-center">
          <p className="text-sm">
            Use{' '}
            <kbd className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">↑</kbd> /
            <kbd className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs mx-1">↓</kbd> for history,
            <kbd className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">Ctrl+C</kbd> to cancel,
            type <code className=" text-green-400 font-semibold">'help'</code> for commands
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
