# MultiversX Lite Wallet DApp

🚧 **Notice: This project is not production-ready.** 🚧

A lightweight wallet dApp for interacting with the MultiversX blockchain, built with React, TypeScript, and Vite. This is a basic implementation inspired by [@multiversx/mx-lite-wallet-dapp](https://github.com/multiversx/mx-lite-wallet-dapp), providing the essentials for MultiversX authentication and transaction management.

## Features

- 🔐 Multiple wallet connection methods (Extension, Web Wallet, xPortal, Ledger)
- 💰 Account balance and transaction history
- 🌐 Multi-network support (Devnet, Testnet, Mainnet)
- 📱 Responsive design with modern UI
- ⚡ Built with Vite for fast development
- 🎨 Styled with TailwindCSS

## Requirements

- Node.js version >=22
- npm version >=10

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Configuration

1. Update the `.env` file with your configuration:

```env
VITE_ENVIRONMENT="devnet"
VITE_APP_PERSIST="localStorage"
VITE_WALLETCONNECT_PROJECT_ID="your_project_id_here"
```

2. The app supports multiple networks (devnet, testnet, mainnet). Configuration files are located in `src/config/`.

### Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navigation.tsx
│   └── WalletConnect.tsx
├── config/          # Network configurations
│   ├── config.devnet.ts
│   ├── config.testnet.ts
│   ├── config.mainnet.ts
│   └── index.ts
├── pages/           # Main application pages
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   └── Settings.tsx
├── App.tsx          # Main app component
└── main.tsx         # Application entry point
```

## Security Notice

⚠️ **This is a development wallet. Never use it with real funds on mainnet.**

- Always verify transactions before signing
- Keep your private keys and seed phrases secure
- Never share your credentials with anyone

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
