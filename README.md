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
Serves the production build locally at `http://localhost:5173`

## 🗺️ Future Enhancements

- 🌍 **Multi-language Support**: Add more regional languages
- 📊 **Analytics Dashboard**: Track usage patterns and crisis types
- 🔔 **Push Notifications**: Browser notifications for safety alerts
- 👥 **Account System**: User profiles and crisis history
- 📱 **Mobile App**: Native iOS/Android versions
- 🏥 **Hospital Finder**: Nearby hospital locator with directions
- 🚗 **Ride Booking**: Integrated emergency transportation
- 📝 **Crisis Logs**: Save and review past emergency responses

## 🔗 Useful Links

- **Repository**: [https://github.com/rupeshv2121/CalmPath_Frontend](https://github.com/rupeshv2121/CalmPath_Frontend)
- **Live Demo**: [https://calm-path-frontend.vercel.app](https://calm-path-frontend.vercel.app) *(if deployed)*
- **Issues**: [https://github.com/rupeshv2121/CalmPath_Frontend/issues](https://github.com/rupeshv2121/CalmPath_Frontend/issues)
- **Pull Requests**: [https://github.com/rupeshv2121/CalmPath_Frontend/pulls](https://github.com/rupeshv2121/CalmPath_Frontend/pulls)

---

<div align="center">
**Made with ❤️ by Team 4Unknowns**
*CalmPath - Because clarity matters when every second counts*
</div>
