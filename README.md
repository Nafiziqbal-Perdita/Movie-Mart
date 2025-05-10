# MovieMart 🎬

A modern movie discovery and information app built with React Native and Expo.

## Features

### Core Features
- Browse and discover movies with a beautiful, intuitive interface
- Detailed movie information including:
  - Cast and crew details
  - Plot summaries
  - Release dates
  - Ratings and reviews
  - Trailers and media content
- Personalized movie recommendations
- Search functionality with filters and categories
- Save favorite movies to watchlist
- Share movies with friends

### Technical Features
- Modern UI with TailwindCSS (NativeWind)
- Firebase integration for:
  - User authentication
  - Data storage
  - Real-time updates
- Smooth animations with React Native Reanimated
- Gesture handling for intuitive navigation
- Blur effects and haptic feedback for enhanced UX
- Cross-platform support (iOS, Android)
- Offline support with local data caching
- Responsive design for various screen sizes
- Dark/Light theme support

### User Experience
- Fast and responsive interface
- Smooth transitions and animations
- Intuitive navigation
- Loading states and error handling
- Pull-to-refresh functionality
- Infinite scrolling for movie lists
- Image lazy loading
- Search suggestions and history

## Tech Stack

- React Native
- Expo (SDK 53)
- TypeScript
- NativeWind (TailwindCSS)
- Firebase
- React Navigation
- Expo Router

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Getting Started

1. Clone the repository
   ```bash
   git clone [your-repository-url]
   cd MovieMart
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Run on your preferred platform
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

```
MovieMart/
├── app/              # Main application code
├── assets/           # Images, fonts, and other static assets
├── .expo/           # Expo configuration
├── node_modules/    # Dependencies
└── ...
```

## Development

The project uses:
- TypeScript for type safety
- ESLint for code linting
- NativeWind for styling
- Expo Router for navigation

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run web` - Start the app on web
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
