# GLR Agenda App

Een moderne, donkere agenda-app gebouwd met React Native, Expo en NativeWind.

## Features

- ** Modern Dark Design**: Stijlvolle donkere interface met lime-groene accenten
- ** Beautiful Loading Screen**: Animated loading screen met GLR logo
- ** Responsive**: Werkt perfect op alle schermformaten
- ** Pull to Refresh**: Trek naar beneden om je agenda te vernieuwen
- ** Smart Filtering**: Filter tussen vandaag en aankomende evenementen
- ** Clean Architecture**: Goed georganiseerde mappenstructuur

## Project Structure

```
glragenda/
├── app/                          # Main app screens (Expo Router)
│   ├── _layout.tsx              # Root layout with loading screen
│   ├── index.tsx                # Home page entry point
│   └── +not-found.tsx           # 404 page
├── components/
│   ├── common/                  # Reusable common components
│   │   └── LoadingScreen.tsx    # Beautiful animated loading screen
│   ├── screens/                 # Screen components
│   │   └── HomeScreen.tsx       # Main home screen logic
│   ├── ui/                      # UI components
│   │   ├── IconSymbol.tsx       # Icon components
│   │   └── TabBarBackground.tsx # Tab styling
│   ├── LocalEventCard.tsx       # Event card component
│   ├── ThemedText.tsx           # Themed text component
│   └── ...other components
├── hooks/                       # Custom React hooks
│   ├── useLocalAgenda.ts        # Agenda data management
│   ├── useAuth.ts               # Authentication logic
│   └── ...other hooks
├── constants/                   # App constants
│   └── Colors.ts                # Color definitions
├── assets/                      # Static assets
│   ├── images/
│   │   └── GLRLOGO.png          # GLR logo for branding
│   └── fonts/
└── styles/                      # Global styles and themes
```

## 🎨 Design System

### Colors
- **Primary**: Lime 400 (#84cc16) - GLR brand color
- **Background**: Slate 900 (#0f172a) - Main dark background
- **Surface**: Slate 800 (#1e293b) - Card backgrounds
- **Text**: White/Gray variants for hierarchy

### Components
- **LoadingScreen**: Animated loading with GLR logo
- **HomeScreen**: Main agenda view with tabs
- **LocalEventCard**: Modern event cards with status badges
- **ThemedText**: Consistent text styling

##  Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open the app:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

##  Key Improvements Made

1. **Beautiful Loading Screen**: Custom animated loading screen with GLR logo
2. **Modern Dark Theme**: Consistent dark design with lime accents
3. **Better Code Organization**: Clean folder structure with separation of concerns
4. **Removed Index Bar**: Fixed header display issues
5. **Enhanced Event Cards**: Modern card design with status badges and icons
6. **Improved Navigation**: Better tab switching with icons
7. **Responsive Design**: Works great on all screen sizes

## 🛠 Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **NativeWind**: Tailwind CSS for React Native
- **TypeScript**: Type-safe development
- **Expo Router**: File-based routing
- **Expo Vector Icons**: Beautiful icons

## Features

- **Today View**: See all events for today
- **Upcoming View**: View future events
- **Event Details**: Rich event information with location and description
- **Status Badges**: Visual indicators for event status
- **Pull to Refresh**: Easy data refreshing
- **Floating Action Button**: Quick access to add events

## Performance

- Optimized animations with native drivers
- Efficient state management
- Smart re-rendering
- Fast navigation transitions
