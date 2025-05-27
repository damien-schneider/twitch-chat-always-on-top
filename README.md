# Twitch Chat Viewer

<div align="center">
  <img src="src-tauri/icons/icon.png" alt="Twitch Chat Viewer" width="128" height="128">
  
  A modern, lightweight desktop application for viewing Twitch chat with always-on-top and transparency features.
  
  ![Tauri](https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## ✨ Features

- 🎯 **Always on Top**: Keep the chat visible over other applications
- 🔮 **Transparency Mode**: Semi-transparent window with beautiful blur effects
- 🎨 **Modern UI**: Clean, responsive interface with smooth animations
- 💾 **Persistent Settings**: Automatically saves your preferences and last viewed channel
- 🔄 **URL Parsing**: Supports both full Twitch URLs and channel names
- 📱 **Responsive Design**: Collapsible settings panel to maximize chat space
- 🌙 **Dark Theme**: Easy on the eyes during long streaming sessions
- ⚡ **Lightweight**: Built with Tauri for minimal resource usage

## 🖼️ Screenshots

*Screenshots will be added soon*

## 🚀 Installation

### Download Pre-built Binaries

Download the latest release for your platform from the [Releases page](../../releases).

#### macOS
- Download `Twitch-Chat-Viewer_x.x.x_aarch64.dmg` (Apple Silicon) or `Twitch-Chat-Viewer_x.x.x_x64.dmg` (Intel)
- Open the DMG file and drag the app to your Applications folder

#### Windows
- Download `Twitch-Chat-Viewer_x.x.x_x64-setup.exe`
- Run the installer and follow the setup wizard

#### Linux
- Download `twitch-chat-viewer_x.x.x_amd64.deb` (Debian/Ubuntu) or `twitch-chat-viewer-x.x.x-1.x86_64.rpm` (Red Hat/Fedora)
- Install using your package manager

### Build from Source

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (package manager)
- [Rust](https://rustup.rs/) (latest stable)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)

#### Clone and Build

```bash
# Clone the repository
git clone https://github.com/yourusername/twitch-chat-always-on-top.git
cd twitch-chat-always-on-top

# Install dependencies
pnpm install

# Run in development mode
pnpm tauri dev

# Build for production
pnpm tauri build
```

## 🎮 Usage

1. **Launch the application**
2. **Enter a Twitch channel**: You can use either:
   - Full URL: `https://twitch.tv/channelname`
   - Just the channel name: `channelname`
3. **Configure settings**:
   - **Always on Top**: Keeps the window above all other applications
   - **Transparent Mode**: Makes the window semi-transparent with blur effects
4. **Collapse settings**: Click the chevron icon to hide the settings panel and maximize chat space

### Supported URL Formats

```
✅ twitch.tv/channelname
✅ https://twitch.tv/channelname
✅ https://www.twitch.tv/channelname
✅ channelname
```

## ⚙️ Configuration

The application automatically saves your settings including:
- Last viewed channel
- Always on top preference
- Transparency mode preference
- Settings panel collapsed state

Settings are stored in your system's application data directory:
- **macOS**: `~/Library/Application Support/com.twitch-chat-viewer.dev/`
- **Windows**: `%APPDATA%\com.twitch-chat-viewer.dev\`
- **Linux**: `~/.config/com.twitch-chat-viewer.dev/`

## 🛠️ Development

### Project Structure

```
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   └── types.ts           # TypeScript types
├── src-tauri/             # Tauri backend
│   ├── src/               # Rust source code
│   ├── icons/             # Application icons
│   └── Cargo.toml         # Rust dependencies
└── package.json           # Node.js dependencies
```

### Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **Backend**: Rust, Tauri 2.0
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Code Quality**: Biome (linting & formatting), ESLint

### Available Scripts

```bash
# Development
pnpm dev              # Start Vite dev server
pnpm tauri dev       # Start Tauri development mode

# Building
pnpm build           # Build frontend
pnpm tauri build     # Build complete application

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:biome      # Run Biome linter
pnpm format          # Format code with Biome
pnpm check           # Run Biome checks
pnpm check:fix       # Fix Biome issues
```

### Architecture

The application uses Tauri's command system for communication between the React frontend and Rust backend:

- **Frontend**: Handles UI, user interactions, and chat iframe rendering
- **Backend**: Manages window properties (always-on-top, transparency), file system operations, and state persistence

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/twitch-chat-always-on-top.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Test your changes: `pnpm tauri dev`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Code Style

This project uses Biome for code formatting and linting. Please ensure your code follows the established style:

```bash
pnpm check:fix  # Fix formatting and linting issues
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - For the amazing Rust-based app framework
- [React](https://reactjs.org/) - For the UI framework
- [TailwindCSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide](https://lucide.dev/) - For the beautiful icons
- [Twitch](https://twitch.tv/) - For providing the chat embed functionality

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues page](../../issues) to see if your issue has already been reported
2. If not, [create a new issue](../../issues/new) with:
   - A clear description of the problem
   - Steps to reproduce the issue
   - Your operating system and app version
   - Any relevant error messages or screenshots

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

<div align="center">
  Made with ❤️ by [Damien Schneider](https://github.com/damien-schneider/)
</div>
