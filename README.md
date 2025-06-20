# 🖥️ React Terminal Emulator

[![Live Demo](https://img.shields.io/badge/🚀%20Live-Demo-blue?style=flat-square)](https://terminal-emulator.vercel.app/)
<!-- [![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE) -->

---

## 📌 About This Project

**React Terminal Emulator** is a developer-themed fake terminal built with **React**, **Tailwind CSS**, and **custom hooks**.

It mimics a command-line interface and is perfect for:
- Portfolio websites
- Developer landing pages
- Geeky UI experiments ⚙️

---

## 🛠️ Tech Stack

- ⚛️ React + Vite  
- 🎨 Tailwind CSS  
- 🧠 Custom Hooks  
- 💻 Lucide Icons  

---

## 🌟 Features

- 🖋️ Typing animation effect for output  
- 🧪 Simulated terminal commands like `help`, `about`, `clear`  
- ⬆️⬇️ Command history with arrow keys  
- 🎨 Light/Dark theme toggle  
- 📱 Responsive & keyboard accessible  
- 🧩 Modular structure for easy extension  

---

## 🌍 Live Demo

> 🚀 Check out the live app here:  
**[terminal-emulator.vercel.app](https://terminal-emulator.vercel.app/)**

Try commands like:

```bash
help
about
echo
clear
date
```

---

## 📂 Project Structure

```text
📦 terminal-emulator
 ├── 📁 src/
 │   ├── 📁 components/             # Terminal JSX components
 │   │   ├── Terminal.jsx
 │   │   ├── TerminalInput.jsx
 │   │   └── TerminalOutput.jsx
 │   ├── 📁 hooks/                  # Custom terminal hook
 │   │   └── useTerminal.js
 │   ├── 📁 utils/                  # Logic for typing & commands
 │   │   ├── commands.js
 │   │   └── typing.js
 │   ├── App.css
 │   ├── App.jsx
 │   ├── index.css
 │   └── main.jsx
 └── README.md                     
```
---

## 🚀 Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/KunalMeshRam0/terminal-emulator.git

# Navigate to the project folder
cd react-terminal-emulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser. ✅

---

## 💻 Available Commands

| Command     | Description                                     |
|-------------|-------------------------------------------------|
| `help`      | Display available commands                      |
| `about`     | Show information about this terminal            |
| `clear`     | Clear the terminal screen                       |
| `echo`      | Display a line of text                          |
| `date`      | Display current date and time                   |
| `whoami`    | Display current user information                |
| `setuser`   | Change terminal username (usage: `setuser name`)|
| `ls`        | List directory contents (supports `-a`, `-l`)   |
| `pwd`       | Print working directory                         |
| `uname`     | Display system information (`-a` for full info) |

➡️ Try `setuser Alice`, `ls -a`, or `uname -a` to test dynamic behavior.

---

## 🧠 Ideas for Future Improvements

- ⌨️ Tab auto-complete  
- 💬 Chat-like fake AI commands  
- 🔊 Optional terminal sounds  
- 📦 Convert to reusable NPM package  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes  
4. Push to the branch  
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it.

---

## 🙌 Author

**Made with ❤️ by [@KunalMeshRam0](https://github.com/KunalMeshRam0)**  
Feel free to ⭐ star the repo if you found it useful!
