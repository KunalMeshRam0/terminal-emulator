import React from 'react';

export const TerminalOutput = ({ lines, outputRef }) => {
  return (
    <div
      ref={outputRef}
      className="p-4 space-y-1 overflow-y-scroll scroll-smooth h-[400px] sm:h-[500px] md:h-[500px]"
    >
      {lines.map((line) => (
        <div key={line.id} className="flex flex-col">

          {/* User Input Line */}
          {line.type === 'input' && line.prompt && (
            <div className="flex items-start">
              {/* Prompt */}
              <span className="text-green-800 dark:text-green-400 font-semibold mr-2 flex-shrink-0">
                {line.prompt}
              </span>
              {/* User-typed command */}
              <span className="text-gray-900 dark:text-white break-all">
                {line.content}
              </span>
            </div>
          )}

          {/* Output Line */}
          {line.type === 'output' && (
            <pre className="text-yellow-600 dark:text-yellow-200 font-medium whitespace-pre-wrap break-words font-mono text-base leading-relaxed">
              {line.content}
            </pre>
          )}

          {/* Error Line */}
          {line.type === 'error' && (
            <pre className="text-red-600 dark:text-red-400 font-semibold whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
              {line.content}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};
