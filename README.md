# SplitSync - Smart Expense Splitter

![SplitSync Dashboard](src/assets/logo.png)

SplitSync is a modern, Web3-inspired expense splitting application that simplifies shared expense management with AI-powered categorization, real-time settlement tracking, and an engaging user experience.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [UI/UX Features](#uiux-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🧮 **Smart Expense Splitting**: Automatically divide expenses among participants with customizable split methods
- 🤖 **AI-Powered Categorization**: Intelligent expense categorization with suggested categories
- 📊 **Real-time Analytics**: Visualize spending patterns with interactive charts and graphs
- 🎮 **Gamification System**: Karma points and achievements to encourage responsible expense tracking
- 📱 **Mobile-First Design**: Responsive interface optimized for all devices
- 🌙 **Dark/Light Theme**: Automatic theme switching based on system preferences
- 🔊 **Interactive Sound Feedback**: Audible feedback for all user interactions
- 📱 **Enhanced UI/UX**: Digital receipts, location tracking, offline mode, and more
- 🔐 **Privacy Focused**: All data processing happens locally in the browser

## Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd neon-split-flow
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:8080` by default.

Other available scripts:
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # React components
│   ├── social/          # Social features (comments, chat)
│   ├── ui/              # Reusable UI components
│   └── ...              # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
└── App.tsx              # Main application component
```

## Key Components

### Core Components

- **[Dashboard](src/components/Dashboard.tsx)**: Main application interface with quick actions and recent activity
- **[AddExpenseModal](src/components/AddExpenseModal.tsx)**: Modal for adding new expenses with smart categorization
- **[Analytics](src/components/Analytics.tsx)**: Spending insights with interactive charts
- **[Gamification](src/components/Gamification.tsx)**: Karma points system and achievements
- **[EnhancedUI](src/components/EnhancedUI.tsx)**: Advanced features like digital receipts and location tracking

### Feature Components

- **[DigitalReceipt](src/components/DigitalReceipt.tsx)**: Detailed digital receipt viewer
- **[ParticipantSelector](src/components/ParticipantSelector.tsx)**: Interface for selecting expense participants
- **[SplitOptions](src/components/SplitOptions.tsx)**: Various methods for splitting expenses
- **[Settlement](src/components/Settlement.tsx)**: Track and manage expense settlements

### UI Components

The application uses [shadcn/ui](https://ui.shadcn.com/) components which are built on top of [Radix UI](https://www.radix-ui.com/) and styled with [Tailwind CSS](https://tailwindcss.com/).

## UI/UX Features

### Visual Design

- **Glassmorphism**: Frosted glass effect for UI elements
- **Neon Glow**: Subtle glowing effects for interactive elements
- **Gradient Text**: Holographic text effects for headings
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive Layout**: Works on mobile, tablet, and desktop

### Interaction Design

- **Sound Feedback**: Web Audio API for click and hover sounds
- **Hover Effects**: Scale and glow effects on interactive elements
- **Keyboard Navigation**: Full keyboard support for all features
- **Accessibility**: WCAG compliant color contrast and ARIA labels

### Themes

- **Dark Mode**: Default theme with neon accents
- **Light Mode**: Clean light theme with pastel colors
- **Automatic Switching**: Respects system preference

## Deployment

To deploy the application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The output will be in the `dist/` directory, which can be deployed to any static hosting service:
   - [Vercel](https://vercel.com/)
   - [Netlify](https://netlify.com/)
   - [GitHub Pages](https://pages.github.com/)
   - [Firebase Hosting](https://firebase.google.com/products/hosting)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using modern web technologies