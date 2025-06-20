import React, { useEffect } from 'react';

export const TerminalInput = ({
  currentInput,
  prompt,
  isTyping,
  inputRef,
  onInputChange,
  onSubmit,
  onKeyDown
}) => {
  // Listen for keyboard events globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      onKeyDown(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onKeyDown]);

  // Auto-focus input unless typing animation is happening
  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping, inputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTyping) {
      onSubmit(currentInput);
    }
  };

  const handleInputChange = (e) => {
    if (!isTyping) {
      onInputChange(e.target.value);
    }
  };

  return (
    <div className="p-4 border-t border-gray-900  dark:border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center">
        {/* CLI prompt */}
        <span className="text-green-800 dark:text-green-400 font-semibold text-base mr-2 flex-shrink-0">
          {prompt}
        </span>

        {/* Text input field */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          disabled={isTyping}
          className={`
            flex-1 bg-transparent font-mono text-sm outline-none
            ${isTyping ? 'opacity-90 cursor-not-allowed' : ''}
            text-gray-900 dark:text-white font-semibold
          `}
          placeholder={isTyping ? "Processing..." : "Type a command..."}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Blinking green cursor bar */}
        <div className="ml-2">
          <div className={`w-2 h-5 bg-green-600 dark:bg-green-400 ${isTyping ? 'opacity-30' : 'animate-pulse'}`} />
        </div>
      </form>
    </div>
  );
};
