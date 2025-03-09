# 📱 Event ticket case study
A React Native app built with Expo, designed for both iOS and Android platforms.

## Prerequisites
```bash
# Make sure Node.js and npm are installed
npm install --global eas-cli
#or
yarn global add eas-cli
#or
pnpm add -g eas-cli
```

## 🚀 Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start the Development Server
```bash
npx expo start
```
- Scan the QR code using the Expo Go app on your device.
- Alternatively, use an emulator by pressing a (Android) or i (iOS) in the terminal.

## 📂 Project Structure


```
📦 ticketassignment
├── 📂 app             # App screens (e.g., HomeScreen, AddEventScreen)
│   ├── _layout.tsx    # Main entry point
├── 📂 assets          # Asset files (images, fonts, etc.)
├── 📂 components      # Reusable UI components
├── 📂 constants       # Theme color scheme.
├── 📂 graphql         # Apollo graphql client setup.
├── 📂 hooks           # Custom hooks to get theme styling
├── 📂 store           # Redux slices and store configuration with api calls.
├── 📂 utils           # Utility functions and helpers (ex: Storage)
├── app.json           # Expo configuration
├── package.json       # Project metadata and scripts
└── tsconfig.json      # TypeScript configuration
```

## 🚦 Running on Devices

### On iOS Simulator:
```bash
npx expo run:ios
```

### On Android Emulator:
```bash
npx expo run:android
```

### On Physical Device:
- Install the Expo Go app.
- Connect to the same network and scan the QR code in the Expo DevTools.

## 🌐 API Integration

This app uses GraphQL for data fetching:
```graphql
# Login mutation
mutation {
    login (userData: {
        email: "test@example.com",
        password: "test123",
        rememberToken: true
    }) {
        id
        firstName
        lastName
    }
}
```

## 🚧 Known Issues
- Parameters validation may need some improvements.
- Logout doesn't delete the old token from the database.