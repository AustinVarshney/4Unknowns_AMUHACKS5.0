# 🧘 CalmPath - Personal Crisis Decision Assistant

> *Your compassionate guide through emergencies - helping you find clarity when it matters most.*

CalmPath is a modern, mobile-first crisis management application designed to help people manage emergencies with clear guidance and emotional support. Built with React, TypeScript, and powered by an intuitive AI-like conversational interface, CalmPath provides step-by-step instructions, calming techniques, and emergency escalation support during high-stress situations.

## 🌟 Key Features

### 🆘 Crisis Guidance System
- **Multi-Crisis Support**: Handle Medical, Fire, Personal Safety, and Other emergencies
- **AI-Powered Chat Interface**: Natural conversational flow with intelligent response system
- **Panic-Level Tracking**: Real-time monitoring of stress levels (Calm → Stressed → Panic)
- **Dynamic Adaptation**: Guidance adjusts based on user responses and panic indicators

### 🗣️ Multimodal Communication
- **Voice Input**: Hands-free interaction using Web Speech API
- **Multi-Language Support**: Hindi and English speech recognition
- **Auto-Translation**: Hindi-to-English translation for seamless communication
- **Text-to-Speech**: Audio playback of tutorial instructions for accessibility

### 📚 Interactive Tutorials
- **Step-by-Step Instructions**: Clear, timed guidance for each crisis type
- **Audio Instructions**: Voice-guided steps for hands-free operation
- **Progress Tracking**: Visual indicators showing current step and completion status
- **Timer Integration**: Built-in timers for critical time-sensitive actions

### 💆 Wellness & Calming Tools
- **Guided Breathing Exercises**: 3 scientifically-backed breathing patterns
  - Box Breathing (4-4-4-4)
  - 4-7-8 Breathing
  - Quick Calm (2-3-4)
- **Animated Visual Guides**: Breathing circle that scales with inhale/exhale cycles
- **Emergency Contacts Manager**: Save and manage trusted contacts with persistent storage
- **Safety Checklist**: Track preparedness across Home Safety, Digital Prep, and Go-Bag items
- **First Aid Quick Reference**: Accordion-style tips for common emergencies (cuts, burns, choking, CPR, etc.)

### 🚨 Emergency Features
- **One-Tap Emergency Escalation**: Quick access when situations worsen
- **Direct Emergency Contacts**: Phone links to emergency services (102/101/100/112)
- **Live Location Sharing**: Geolocation API integration for sharing your location
- **Post-Crisis Re-Evaluation**: "Is the situation under control?" assessment flow

### 💾 Data Persistence
- **LocalStorage Integration**: Saves emergency contacts and safety checklist progress
- **Session Continuity**: Maintains user data across browser sessions

## 📱 Application Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing Page** | `/` | Hero section, feature highlights, usage stats, and wellness tool links |
| **Crisis Selection** | `/select` | Choose your emergency type (Medical/Fire/Safety/Other) |
| **AI Chat Assistant** | `/chat/:crisisType` | Conversational crisis guidance with voice input and panic tracking |
| **Tutorial Guide** | `/tutorial/:crisisType` | Step-by-step visual instructions with audio and timers |
| **Re-Evaluation** | `/evaluate` | Post-tutorial assessment with escalation decision |
| **Emergency Escalation** | `/emergency` | Direct emergency service contacts and location sharing |
| **Breathing Exercise** | `/breathe` | Guided breathing patterns with visual animations |
| **Safety Checklist** | `/checklist` | Preparedness checklist with progress tracking |
| **Emergency Contacts** | `/contacts` | Manage trusted emergency contacts |
| **First Aid Tips** | `/first-aid` | Quick-reference accordion for common emergencies |
| **404 Not Found** | `/*` | Error page for invalid routes |

## 🛠️ Tech Stack

### Core Framework
- **React 18.3** - Modern UI library with hooks and concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool with HMR
- **React Router 6.30** - Client-side routing

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shadcn/ui** - Beautifully designed component library built on Radix UI
- **Framer Motion 12.34** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon set (462+ icons)
- **Next-themes** - Dark mode support

### State & Forms
- **React Query 5.83** - Server state management and caching
- **React Hook Form 7.61** - Performant form handling
- **Zod 3.25** - TypeScript-first schema validation

### UI Components (Shadcn/ui)
Over 48 accessible, customizable components including:
- **Form Controls**: input, textarea, select, checkbox, radio-group, switch, slider
- **Overlays**: dialog, drawer, alert-dialog, popover, tooltip, hover-card, sheet
- **Navigation**: breadcrumb, navigation-menu, menubar, tabs, dropdown-menu, pagination
- **Data Display**: table, accordion, carousel, card, badge, avatar, progress
- **Feedback**: alert, toast, sonner, skeleton, command

### Browser APIs
- **Web Speech API** - Speech recognition for voice input
- **Geolocation API** - Location sharing for emergency services
- **Web Audio API** - Text-to-speech synthesis
- **LocalStorage API** - Persistent data storage

### External APIs
- **MyMemory Translation API** - Hindi-to-English translation
- **Google Maps Embed** - Location visualization

### Development Tools
- **ESLint 9.32** - Code linting with TypeScript support
- **Vitest 3.2** - Fast unit testing framework
- **Testing Library** - React component testing
- **PostCSS** - CSS processing with Autoprefixer
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+ or **yarn** 1.22+
- Modern web browser with Speech API support (Chrome, Edge, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rupeshv2121/CalmPath_Frontend.git
   cd CalmPath_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

## 📁 Project Structure

```
CalmPath_Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui component library (48+ components)
│   │   ├── ChatBubble.tsx  # Animated chat message bubbles
│   │   ├── PanicIndicator.tsx  # Real-time panic level display
│   │   ├── TimerComponent.tsx  # Step-by-step countdown timer
│   │   ├── CrisisCard.tsx  # Selectable crisis type cards
│   │   └── PageWrapper.tsx # Consistent page layout wrapper
│   ├── pages/              # Application pages (11 routes)
│   │   ├── Index.tsx       # Landing page
│   │   ├── CrisisSelection.tsx
│   │   ├── ChatBot.tsx
│   │   ├── Tutorial.tsx
│   │   ├── ReEvaluation.tsx
│   │   ├── EmergencyEscalation.tsx
│   │   ├── BreathingExercise.tsx
│   │   ├── SafetyChecklist.tsx
│   │   ├── EmergencyContacts.tsx
│   │   ├── FirstAidTips.tsx
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx  # Responsive breakpoint detection
│   │   └── use-toast.tsx   # Toast notification management
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # cn() for class merging
│   ├── App.tsx             # Root component with router
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Static assets
├── dist/                   # Production build output (generated)
├── components.json         # Shadcn/ui configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment config
└── package.json            # Project dependencies and scripts
```

## 🔄 Application Flow

### Typical Crisis Management Flow
```
Landing Page (/)
    ↓
Crisis Selection (/select)
    ↓
AI Chat Assistant (/chat/:type) ← Voice/Text Input
    ↓
Tutorial Guide (/tutorial/:type) ← Step-by-step instructions
    ↓
Re-Evaluation (/evaluate) ← "Is situation under control?"
    ↓
[If escalation needed]
Emergency Escalation (/emergency) ← Direct emergency contacts
```

### Wellness Tools (Accessible Anytime)
- `/breathe` - Guided breathing exercises
- `/checklist` - Safety preparedness
- `/contacts` - Emergency contact management
- `/first-aid` - Quick first aid reference

## 🎨 Features Showcase

### Crisis Chat Interface
- Real-time panic level indicator (Calm/Stressed/Panic)
- Animated chat bubbles with gradient styling
- Voice input with speech-to-text
- Hindi language support with auto-translation
- Conversational AI-like responses

### Interactive Tutorials
- Crisis-specific step-by-step guidance
- Audio narration of instructions
- Visual timer for each step
- Progress tracking (e.g., "Step 3 of 5")
- Smooth transitions between steps

### Breathing Exercises
- **Box Breathing**: 4-4-4-4 pattern for balanced calm
- **4-7-8 Breathing**: Deep relaxation technique
- **Quick Calm**: Rapid stress reduction (2-3-4)
- Animated breathing circle that scales with cycles
- Clear visual instructions (Inhale/Hold/Exhale)

### Emergency Escalation
- Direct links to emergency services:
  - 🚑 Medical Emergency (102)
  - 🚒 Fire Emergency (101)
  - 👮 Police (100)
  - 🆘 National Emergency (112)
- Live location sharing via geolocation
- Google Maps embed for location visualization

## 🌐 Browser Compatibility

### Recommended Browsers
- ✅ **Chrome/Edge** 90+ (Best support for Speech API)
- ✅ **Safari** 14+ (Limited Hindi speech recognition)
- ✅ **Firefox** 88+ (Text features fully supported)

### Required Browser Features
- **Speech Recognition API** - For voice input (Chrome/Edge recommended)
- **Geolocation API** - For location sharing
- **LocalStorage** - For data persistence
- **Modern CSS** - Grid, Flexbox, Custom Properties

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory if you need to customize:

```env
# No required environment variables for basic functionality
# Optional: Add backend API URL if implementing server-side features
VITE_API_URL=https://your-backend-api.com
```

### Vite Configuration
The project uses standard Vite configuration optimized for React:
- React SWC plugin for fast refresh
- Path aliases configured for clean imports
- Production optimizations enabled

### Tailwind Configuration
Custom theme extensions:
- Container queries
- Typography plugin
- Custom animations (accordion-down, accordion-up)
- Extended color palette for crisis types

## 🧪 Testing

### Running Tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode (for development)
npm run test:watch
```

### Test Structure
- Unit tests with Vitest
- React component tests with Testing Library
- DOM testing with jsdom

## 📦 Building for Production

### Standard Build
```bash
npm run build
```
Outputs to `dist/` directory with optimized assets:
- Minified JavaScript bundles
- Optimized CSS
- Asset hashing for cache busting
- Tree-shaking for minimal bundle size

### Development Build
```bash
npm run build:dev
```
Builds with source maps and less aggressive optimizations for debugging.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally at `http://localhost:4173`

## 🚀 Deployment to Vercel

This project is configured for deployment on Vercel. Follow these steps:

### Prerequisites
- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite framework settings

3. **Deploy**
   - Click "Deploy" - Vercel will automatically use the configuration from `vercel.json`
   - Your app will be live at `https://your-project.vercel.app`

### Environment Variables
If you need environment variables, add them in the Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., `VITE_API_URL`)

### Automatic Deployments
Every push to the `main` branch will trigger a new deployment automatically.

## 🗺️ Roadmap & Future Enhancements

### Potential Features
- 🌍 **Multi-language Support**: Add more regional languages
- 🤖 **AI Integration**: Connect to LLM APIs for dynamic crisis responses
- 📊 **Analytics Dashboard**: Track usage patterns and crisis types
- 🔔 **Push Notifications**: Browser notifications for safety alerts
- 👥 **Account System**: User profiles and crisis history
- 🆘 **SOS Button**: Quick hardware button integration for emergencies
- 📱 **Mobile App**: Native iOS/Android versions
- 🏥 **Hospital Finder**: Nearby hospital locator with directions
- 🚗 **Ride Booking**: Integrated emergency transportation
- 📝 **Crisis Logs**: Save and review past emergency responses

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CalmPath_Frontend.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Wait for review

### Commit Convention
We follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules (`npm run lint`)
- Use Tailwind CSS utilities over custom CSS
- Prefer functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌐 Translation/localization
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🧪 Test coverage

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2026 Rupesh Verma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Rupesh Verma** ([@rupeshv2121](https://github.com/rupeshv2121))

## 🙏 Acknowledgments

### Technologies & Libraries
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [React Router](https://reactrouter.com/) - Routing
- [React Query](https://tanstack.com/query/) - Data fetching
- [Vercel](https://vercel.com/) - Deployment platform

### APIs & Services
- [MyMemory Translation API](https://mymemory.translated.net/) - Translation service
- [Google Maps](https://maps.google.com/) - Location embedding
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - Speech recognition

## 📞 Support & Contact

### Issues & Bugs
If you encounter any issues or bugs:
1. Check [existing issues](https://github.com/rupeshv2121/CalmPath_Frontend/issues)
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Feature Requests
Have an idea? [Open a feature request](https://github.com/rupeshv2121/CalmPath_Frontend/issues/new) with:
- Detailed description
- Use cases
- Expected behavior
- Mockups/wireframes (if applicable)

### Emergency Services Disclaimer
⚠️ **IMPORTANT**: CalmPath is a guidance tool and should not replace professional emergency services. In life-threatening situations:
- **Always call emergency services first** (911, 102, 101, 100, 112)
- Use CalmPath as a supplementary guidance tool
- Follow professional advice over app suggestions

## 📊 Project Stats

- **React Components**: 60+
- **Application Pages**: 11
- **Crisis Types Supported**: 4 (Medical, Fire, Safety, Other)
- **Breathing Patterns**: 3
- **Emergency Services**: 4
- **Supported Languages**: 2 (English, Hindi)
- **UI Components**: 48+ (Shadcn/ui)
- **Lines of Code**: 5000+ (estimated)

## 🔗 Links

- **Repository**: [https://github.com/rupeshv2121/CalmPath_Frontend](https://github.com/rupeshv2121/CalmPath_Frontend)
- **Live Demo**: [https://calm-path-frontend.vercel.app](https://calm-path-frontend.vercel.app) *(if deployed)*
- **Issues**: [https://github.com/rupeshv2121/CalmPath_Frontend/issues](https://github.com/rupeshv2121/CalmPath_Frontend/issues)
- **Pull Requests**: [https://github.com/rupeshv2121/CalmPath_Frontend/pulls](https://github.com/rupeshv2121/CalmPath_Frontend/pulls)

---

<div align="center">

**Made with ❤️ for humanity's moments of crisis**

*CalmPath - Because clarity matters when every second counts*

[![GitHub stars](https://img.shields.io/github/stars/rupeshv2121/CalmPath_Frontend?style=social)](https://github.com/rupeshv2121/CalmPath_Frontend/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/rupeshv2121/CalmPath_Frontend?style=social)](https://github.com/rupeshv2121/CalmPath_Frontend/network/members)
[![GitHub issues](https://img.shields.io/github/issues/rupeshv2121/CalmPath_Frontend)](https://github.com/rupeshv2121/CalmPath_Frontend/issues)
[![GitHub license](https://img.shields.io/github/license/rupeshv2121/CalmPath_Frontend)](https://github.com/rupeshv2121/CalmPath_Frontend/blob/main/LICENSE)

</div>
