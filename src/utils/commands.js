// Utility to get the current date and time in a formatted string
const getCurrentDateTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };
  
  // All supported terminal commands
  export const commands = {
    help: {
      name: 'help',
      description: 'Display available commands',
      execute: () => {
        const commandList = Object.values(commands)
          .map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
          .join('\n');
  
        return `Available commands:\n${commandList}\n\nType a command and press Enter to execute it.\nUse Up/Down arrows to navigate command history.`;
      }
    },
  
    about: {
      name: 'about',
      description: 'Show information about this terminal',
      execute: () => {
        return `Terminal Emulator v1.0.0
  
  Built with React, JavaScript, and Tailwind CSS
  A realistic terminal interface simulation
  
  Features:
  • Command history navigation
  • Typing animations
  • Keyboard shortcuts (Ctrl+C)
  • Responsive design
  • Accessibility support
  
  Created by Kunal Meshram`;
      }
    },
  
    clear: {
      name: 'clear',
      description: 'Clear the terminal screen',
      execute: () => 'CLEAR_TERMINAL'
    },
  
    echo: {
      name: 'echo',
      description: 'Display a line of text',
      execute: (args) => args.join(' ')
    },
  
    date: {
      name: 'date',
      description: 'Display current date and time',
      execute: () => getCurrentDateTime()
    },
  
    whoami: {
      name: 'whoami',
      description: 'Display current user information',
      execute: () => 'user@localhost'
    },
  
    setuser: {
      name: 'setuser',
      description: 'Change terminal username (usage: setuser [name])',
      execute: (args, context) => {
        if (args.length !== 1) return 'Usage: setuser [username]';
        const newUser = args[0];
        context.setPromptUser?.(newUser);
        return `Username changed to ${newUser}`;
      }
    },
  
    ls: {
      name: 'ls',
      description: 'List directory contents (simulated)',
      execute: (args) => {
        const showHidden = args.includes('-a') || args.includes('--all');
        const longFormat = args.includes('-l') || args.includes('--long');
  
        const files = ['Documents', 'Downloads', 'Desktop', 'Pictures', 'Videos', 'Music', 'projects', 'README.md', 'package.json'];
        const hiddenFiles = ['.bashrc', '.profile', '.gitconfig'];
        const allFiles = showHidden ? [...hiddenFiles, ...files] : files;
  
        if (longFormat) {
          return allFiles.map(file => {
            const isDir = !file.includes('.');
            const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = Math.floor(Math.random() * 10000) + 1000;
            const date = new Date().toLocaleDateString();
            return `${permissions}  1 user user ${size.toString().padStart(8)} ${date} ${file}`;
          }).join('\n');
        }
  
        return allFiles.join('  ');
      }
    },
  
    pwd: {
      name: 'pwd',
      description: 'Print working directory',
      execute: () => '/home/user'
    },
  
    uname: {
      name: 'uname',
      description: 'System information',
      execute: (args) => {
        if (args.includes('-a')) {
          return 'Linux terminal 5.15.0 #1 SMP x86_64 GNU/Linux';
        }
        return 'Linux';
      }
    }
  };
  
  // Executes the given input command with optional context (like setPromptUser)
  export const executeCommand = async (input, context = {}) => {
    const trimmed = input.trim();
    if (!trimmed) {
      return { output: '', type: 'output' };
    }
  
    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
  
    const command = commands[commandName];
  
    if (!command) {
      return {
        output: `bash: ${commandName}: command not found`,
        type: 'error'
      };
    }
  
    try {
      const result = await command.execute(args, context);
      return { output: result, type: 'output' };
    } catch (error) {
      return {
        output: `Error executing command: ${error.message || error}`,
        type: 'error'
      };
    }
  };
  