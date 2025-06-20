import { useState, useCallback, useRef, useEffect } from 'react';
import { executeCommand } from '../utils/commands';
import { typeText } from '../utils/typing';

const DEFAULT_USERNAME = 'user';

export const useTerminal = () => {
  const [promptUser, setPromptUser] = useState(DEFAULT_USERNAME);
  const prompt = `${promptUser}:~$`;

  const [state, setState] = useState({
    lines: [{
      id: 'welcome',
      type: 'output',
      content: `Welcome to Terminal Emulator v0.0.0

Type 'help' to see available commands.`,
      timestamp: new Date(),
    }],
    history: [],
    historyIndex: -1,
    currentInput: '',
    isTyping: false,
  });

  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever output lines update
  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.lines, scrollToBottom]);

  // Add a new line to the terminal output
  const addLine = useCallback((line) => {
    setState(prev => ({
      ...prev,
      lines: [...prev.lines, {
        ...line,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      }]
    }));
  }, []);

  // Clear all terminal output
  const clearTerminal = useCallback(() => {
    setState(prev => ({
      ...prev,
      lines: []
    }));
  }, []);

  // Handle command execution with optional typing animation
  const executeCommandWithTyping = useCallback(async (input) => {
    setState(prev => ({ ...prev, isTyping: true }));

    addLine({ type: 'input', content: input, prompt });

    const { output, type } = await executeCommand(input, { setPromptUser });

    // Handle 'clear' command separately
    if (output === 'CLEAR_TERMINAL') {
      clearTerminal();
      setState(prev => ({ ...prev, isTyping: false }));
      return;
    }

    // Add empty line and simulate typing output
    if (output) {
      const outputLineId = Math.random().toString(36).substr(2, 9);

      setState(prev => ({
        ...prev,
        lines: [...prev.lines, {
          id: outputLineId,
          type,
          content: '',
          timestamp: new Date(),
        }]
      }));

      await typeText(output, (char) => {
        setState(prev => ({
          ...prev,
          lines: prev.lines.map(line =>
            line.id === outputLineId
              ? { ...line, content: line.content + char }
              : line
          )
        }));
      });
    }

    setState(prev => ({ ...prev, isTyping: false }));
  }, [addLine, clearTerminal, prompt]);

  // Handles when user presses Enter
  const handleCommand = useCallback(async (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setState(prev => ({
      ...prev,
      history: [...prev.history, trimmedInput],
      historyIndex: -1,
      currentInput: ''
    }));

    await executeCommandWithTyping(trimmedInput);
  }, [executeCommandWithTyping]);

  // Navigate through command history with up/down arrow keys
  const navigateHistory = useCallback((direction) => {
    setState(prev => {
      const newIndex = direction === 'up'
        ? Math.min(prev.historyIndex + 1, prev.history.length - 1)
        : Math.max(prev.historyIndex - 1, -1);

      const newInput = newIndex === -1
        ? ''
        : prev.history[prev.history.length - 1 - newIndex];

      return {
        ...prev,
        historyIndex: newIndex,
        currentInput: newInput
      };
    });
  }, []);

  // Update current input when typing
  const updateCurrentInput = useCallback((input) => {
    setState(prev => ({
      ...prev,
      currentInput: input,
      historyIndex: -1
    }));
  }, []);

  // Handle keydown events (up/down arrow, Ctrl+C)
  const handleKeyDown = useCallback((e) => {
    if (state.isTyping) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        navigateHistory('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateHistory('down');
        break;
      case 'c':
      case 'C':
        if (e.ctrlKey) {
          e.preventDefault();
          addLine({ type: 'output', content: '^C' });
          setState(prev => ({ ...prev, currentInput: '', historyIndex: -1 }));
        }
        break;
    }
  }, [state.isTyping, navigateHistory, addLine]);

  return {
    lines: state.lines,
    currentInput: state.currentInput,
    isTyping: state.isTyping,
    outputRef,
    inputRef,
    handleCommand,
    updateCurrentInput,
    handleKeyDown,
    prompt,
    setPromptUser
  };
};
