# SplitSync - Smart Expense Splitter

![SplitSync Dashboard](src/assets/logo.png)

SplitSync is a modern, Web3-inspired expense splitting application that simplifies shared expense management with AI-powered categorization, real-time settlement tracking, and an engaging user experience. Built with React, TypeScript, and Tailwind CSS, SplitSync offers a sleek glassmorphism UI with neon glow effects, responsive design, and comprehensive financial tracking features.

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
- [Advanced Features](#advanced-features)
- [State Management](#state-management)
- [Data Persistence](#data-persistence)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- 🧮 **Smart Expense Splitting**: Automatically divide expenses among participants with customizable split methods
- 🤖 **AI-Powered Categorization**: Intelligent expense categorization with suggested categories
- 📊 **Real-time Analytics**: Visualize spending patterns with interactive charts and graphs
- 🎮 **Gamification System**: Karma points and achievements to encourage responsible expense tracking
- 📱 **Mobile-First Design**: Responsive interface optimized for all devices
- 🌙 **Dark/Light Theme**: Automatic theme switching based on system preferences
- 🔊 **Interactive Sound Feedback**: Audible feedback for all user interactions
- 📱 **Enhanced UI/UX**: Digital receipts, location tracking, offline mode, and more
- 🔐 **Privacy Focused**: All data processing happens locally in the browser
- 🎨 **Web3 Aesthetics**: Neon glow effects, glassmorphism, and holographic gradients
- 📈 **Financial Insights**: Budget tracking, savings goals, and expense forecasting
- 👥 **Social Features**: Group expenses, comments, and chat functionality
- 💰 **Payment Reminders**: Meme-based reminders for overdue payments
- 📎 **Digital Receipts**: Store and view digital copies of receipts

### Advanced Features
- **Voice Input**: Add expenses using voice commands
- **Expense Groups**: Organize expenses into groups (e.g., Trip to Goa, Roommates)
- **Multi-Currency Support**: Handle expenses in different currencies
- **Recurring Expenses**: Set up templates for regular expenses
- **Time-Based Splitting**: Split expenses based on time spent or usage
- **Weighted Splitting**: Split based on custom weights or income levels
- **Bank Account Syncing**: (Planned) Connect to bank accounts for automatic transaction import
- **Email Parsing**: (Planned) Parse expense details from email receipts
- **Calendar Integration**: (Planned) Sync recurring expenses with calendar

## Technology Stack

### Frontend Framework
- **[React 18](https://reactjs.org/)**: Component-based UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for enhanced code quality
- **[Vite](https://vitejs.dev/)**: Fast build tool and development server

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable component library built on Radix UI
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI primitives
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development
- **[React Router](https://reactrouter.com/)**: Declarative routing for React applications
- **[Lucide React](https://lucide.dev/)**: Beautiful and consistent icon set

### State Management & Data Handling
- **React useState, useEffect, and Context API**: Built-in React state management
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible forms with easy validation
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation
- **[Recharts](https://recharts.org/)**: Charting library built on D3 components
- **[Sonner](https://sonner.emilkowal.dev/)**: Minimal toast notification system
- **[TanStack Query](https://tanstack.com/query/latest)**: Server state management (for future API integration)

### Audio & Visual Effects
- **Web Audio API**: For sound effects and interactive feedback
- **CSS Animations**: Custom animations for enhanced user experience
- **Glassmorphism Effects**: Frosted glass UI elements
- **Neon Glow Effects**: Subtle glowing effects for interactive elements

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** (version 16 or higher)
- **[npm](https://www.npmjs.com/)** (comes with Node.js) or **[Bun](https://bun.sh/)**

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
   # or with Bun
   bun install
   ```

### Development

Start the development server with hot reloading:

```bash
npm run dev
# or with Bun
bun run dev
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
- **[PaymentReminder](src/components/PaymentReminder.tsx)**: Meme-based payment reminders
- **[FinancialInsights](src/components/FinancialInsights.tsx)**: Budget tracking and financial forecasting
- **[ExpenseGroups](src/components/ExpenseGroups.tsx)**: Group expense management
- **[PaymentReminders](src/components/PaymentReminders.tsx)**: Centralized payment reminder management
- **[AdvancedGamification](src/components/AdvancedGamification.tsx)**: Advanced gamification features
- **[SecurityPrivacy](src/components/SecurityPrivacy.tsx)**: Security and privacy controls
- **[AccessibilityImprovements](src/components/AccessibilityImprovements.tsx)**: Accessibility enhancements
- **[IntegrationCapabilities](src/components/IntegrationCapabilities.tsx)**: Integration capabilities

### UI Components

The application uses [shadcn/ui](https://ui.shadcn.com/) components which are built on top of [Radix UI](https://www.radix-ui.com/) and styled with [Tailwind CSS](https://tailwindcss.com/).

## UI/UX Features

### Visual Design

- **Glassmorphism**: Frosted glass effect for UI elements using backdrop-filter
- **Neon Glow**: Subtle glowing effects for interactive elements using box-shadow
- **Gradient Text**: Holographic text effects using linear gradients
- **Smooth Animations**: Micro-interactions and transitions using CSS keyframes
- **Responsive Layout**: Works on mobile, tablet, and desktop using Tailwind's responsive utilities

### Interaction Design

- **Sound Feedback**: Web Audio API for click, hover, and notification sounds
- **Hover Effects**: Scale and glow effects on interactive elements using CSS transforms
- **Keyboard Navigation**: Full keyboard support for all features
- **Accessibility**: WCAG compliant color contrast and ARIA labels

### Themes

- **Dark Mode**: Default theme with neon accents and dark backgrounds
- **Light Mode**: Clean light theme with pastel colors
- **Automatic Switching**: Respects system preference using next-themes

### Custom CSS Classes

The application includes several custom CSS utility classes defined in [src/index.css](src/index.css):

- **.glass**: Basic glassmorphism effect with backdrop blur
- **.glass-strong**: Enhanced glassmorphism with stronger blur and glow
- **.glow-purple/cyan/green**: Neon glow effects in different colors
- **.gradient-text**: Text with neon gradient fill
- **.hover-scale**: Scale animation on hover
- **.neon-border**: Animated neon border effect

## Advanced Features

### Expense Splitting Methods

SplitSync offers multiple ways to split expenses:
- **Equal Split**: Divide the total amount equally among all participants
- **Percentage Split**: Assign custom percentages to each participant
- **Custom Split**: Specify exact amounts for each participant
- **Time-Based Split**: Split based on time spent or usage
- **Weighted Split**: Split based on custom weights or importance

### Voice Input

Add expenses using voice commands:
- Speak naturally to add expenses (e.g., "Add ₹200 chai bill by Raj")
- Automatic parsing of amount, description, and participant names
- Works best in Chrome, Edge, and Safari browsers

### Digital Receipts

- View detailed digital receipts for all expenses
- Store and manage receipt images
- Print or download receipts as PDF
- Share receipts with other participants

### Payment Reminders

- Fun, meme-based reminders for overdue payments
- Multiple payment methods (UPI, QR Scan, Bank Transfer)
- Automatic tracking of payment status
- Notification system with sound alerts

### Financial Insights

- Budget tracking with category-based allocation
- Savings goals with progress tracking
- Expense forecasting based on historical data
- Spending habit analysis

### Social Features

- Group expense management
- Commenting system for expenses
- Group chat functionality
- Friend management

### Security & Privacy

- End-to-end encryption for sensitive data
- Two-factor authentication
- Data backup and restore capabilities
- Granular privacy controls

### Accessibility Improvements

- Voice commands for navigation and actions
- Screen reader optimization
- High contrast mode
- Comprehensive keyboard navigation

## State Management

SplitSync uses React's built-in state management capabilities:

- **useState**: For component-level state management
- **useEffect**: For side effects and lifecycle management
- **useContext**: For global state sharing (theme, sound settings)
- **Custom Hooks**: For reusable state logic (useSound, use-mobile)

### Data Flow

1. User interactions trigger state updates
2. State changes propagate through the component tree
3. Components re-render with updated data
4. Effects run to handle side effects (localStorage, notifications)

### Custom Hooks

- **[useSound](src/hooks/useSound.ts)**: Manages audio feedback for user interactions
- **use-mobile**: Detects mobile device usage

## Data Persistence

All data is stored locally in the browser using localStorage:

- **Recent Activity**: Expense history and status
- **Expense Groups**: Group information and participants
- **Payment Reminders**: Reminder status and details
- **Financial Insights**: Budgets and savings goals
- **User Preferences**: Theme settings and UI preferences

### Data Structure

```javascript
// Recent Activity
{
  name: "Dinner at Zomato",
  amount: "₹1,200",
  split: 4,
  status: "pending"
}

// Expense Groups
{
  id: 'group-1',
  name: 'Roommates',
  description: 'Monthly shared expenses for apartment',
  color: 'from-blue-500 to-cyan-500',
  participants: ['You', 'Alice', 'Bob'],
  createdDate: new Date(),
  totalExpenses: 3,
  totalAmount: 4500
}

// Payment Reminders
{
  id: "1",
  debtorName: "You",
  creditorName: "Alice",
  amount: 300,
  dueDate: new Date(),
  status: "pending"
}

// Financial Insights - Budgets
{
  id: "1",
  category: "Food & Dining",
  allocated: 5000,
  spent: 4200,
  color: "bg-red-500"
}

// Financial Insights - Savings Goals
{
  id: "1",
  name: "Vacation Fund",
  target: 50000,
  current: 35000,
  deadline: "2024-12-31"
}
```

### Data Deduplication

The application implements deduplication logic to prevent duplicate entries in recent activity:

```typescript
// Remove duplicates based on name and amount, keeping the first occurrence
const seen = new Set();
const uniqueActivity = parsedActivity.filter((activity: RecentActivity) => {
  const key = `${activity.name}-${activity.amount}`;
  if (seen.has(key)) {
    return false;
  }
  seen.add(key);
  return true;
});
```

## API Integration

SplitSync is a client-side application with no external API dependencies. All data processing happens locally in the browser.

### Future API Integration Plans

- **Bank Syncing**: Connect to bank accounts for automatic transaction import
- **Email Parsing**: Parse expense details from email receipts
- **Calendar Integration**: Sync recurring expenses with calendar
- **Third-Party App Integration**: Connect with accounting software

## Testing

### Unit Testing

Currently, the application does not include unit tests. Future plans include:

- Component testing with Jest and React Testing Library
- Hook testing for custom hooks
- Utility function testing
- Integration testing for complex workflows

### Manual Testing

The application has been manually tested across multiple browsers:
- Chrome (Recommended)
- Edge
- Safari
- Firefox

### Accessibility Testing

- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

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

### Environment Variables

No environment variables are required for basic deployment.

### Custom Domain

To use a custom domain:
1. Configure DNS settings with your domain provider
2. Update deployment settings in your hosting provider
3. Verify domain ownership if required

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent styling with Tailwind CSS
- Write clear, descriptive commit messages
- Add comments for complex logic

### Reporting Issues

Please use the GitHub issue tracker to report bugs or suggest features:
1. Check if the issue already exists
2. Provide detailed steps to reproduce
3. Include browser and OS information
4. Add screenshots if applicable

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using modern web technologies