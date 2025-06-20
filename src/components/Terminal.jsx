import React from 'react';
import { Terminal as TerminalIcon, Minimize2, Square, X } from 'lucide-react';
import { useTerminal } from '../hooks/useTerminal';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';

export const Terminal = () => {
  const {
    lines,
    currentInput,
    isTyping,
    outputRef,
    inputRef,
    handleCommand,
    updateCurrentInput,
    handleKeyDown,
    prompt
  } = useTerminal();

  return (
    <div className="w-full mt-8 max-w-screen-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-400 dark:border-gray-700 overflow-hidden">
      {/* Terminal header with icon and fake window controls */}
      <div className="bg-gray-600 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <TerminalIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
          <span className="text-gray-800 dark:text-gray-300 font-medium">kunal@localhost: ~</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Fake window buttons */}
          <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400" aria-label="Minimize">
            <Minimize2 className="w-2 h-2 text-gray-900 opacity-0" />
          </button>
          <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400" aria-label="Maximize">
            <Square className="w-2 h-2 text-gray-900 opacity-0" />
          </button>
          <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400" aria-label="Close">
            <X className="w-2 h-2 text-gray-900 opacity-0" />
          </button>
        </div>
      </div>

      {/* Terminal body with output + input */}
      <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[500px] flex flex-col font-mono text-sm bg-stone-300 dark:bg-black">
        <TerminalOutput lines={lines} outputRef={outputRef} />
        <TerminalInput
          currentInput={currentInput}
          prompt={prompt}
          isTyping={isTyping}
          inputRef={inputRef}
          onInputChange={updateCurrentInput}
          onSubmit={handleCommand}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
