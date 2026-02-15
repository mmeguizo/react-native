# React Native Complete Beginner's Guide
## Based on Login App Example

---

## Table of Contents
1. [Introduction to React Native](#introduction)
2. [Setting Up Your Development Environment](#setup)
3. [Understanding the Project Structure](#project-structure)
4. [React Native Fundamentals](#fundamentals)
5. [Building the Login Screen](#login-screen)
6. [Building the Dashboard Screen](#dashboard-screen)
7. [Navigation Between Screens](#navigation)
8. [State Management](#state-management)
9. [Styling in React Native](#styling)
10. [Platform-Specific Code](#platform-specific)
11. [Best Practices](#best-practices)
12. [Next Steps](#next-steps)

---

## 1. Introduction to React Native {#introduction}

### What is React Native?
React Native is a JavaScript framework for building native mobile applications for iOS and Android. It uses React (a JavaScript library for building user interfaces) and allows you to write code once and run it on both platforms.

### Why Use React Native?
- **Cross-Platform**: Write once, run on iOS and Android
- **JavaScript**: Use JavaScript instead of Swift/Objective-C or Kotlin/Java
- **Fast Development**: Hot reloading allows instant preview of changes
- **Native Performance**: Uses native components for better performance
- **Large Community**: Extensive libraries and community support

### What is Expo?
Expo is a framework and platform built around React Native that makes development easier:
- No need for Xcode or Android Studio to get started
- Easy setup and deployment
- Built-in components and APIs
- Simplified build process

---

## 2. Setting Up Your Development Environment {#setup}

### Prerequisites
- **Node.js**: JavaScript runtime (v18 or newer recommended)
- **npm** or **yarn**: Package manager
- **Code Editor**: VS Code is recommended
- **Smartphone** (optional): For testing on real device

### Installation Steps

#### Step 1: Install Node.js
Download and install from [nodejs.org](https://nodejs.org/)

```bash
# Verify installation
node --version
npm --version
```

#### Step 2: Create a New Expo Project
```bash
# Install Expo CLI globally (optional)
npm install -g expo-cli

# Create new project
npx create-expo-app my-app

# Navigate to project
cd my-app
```

#### Step 3: Install Dependencies
Our project uses these key dependencies:

```json
{
  "dependencies": {
    "expo": "~54.0.33",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "expo-router": "~6.0.23",
    "react-native-safe-area-context": "~5.6.0",
    "@react-navigation/native": "^7.1.8"
  }
}
```

Install them:
```bash
npm install
```

#### Step 4: Start the Development Server
```bash
npx expo start
```

This will open Expo DevTools in your browser. You can:
- Press **i** to open iOS simulator
- Press **a** to open Android emulator
- Scan QR code with Expo Go app on your phone

---

## 3. Understanding the Project Structure {#project-structure}

Our login app has this structure:

```
react-native-app/
├── app/                    # Main application code
│   ├── _layout.tsx        # Root layout configuration
│   ├── index.tsx          # Login screen (home page)
│   └── dashboard.tsx      # Dashboard screen
├── assets/                # Images, fonts, etc.
├── node_modules/          # Dependencies
├── .gitignore            # Git ignore file
├── app.json              # Expo configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

### Key Files Explained

#### `app.json` - Expo Configuration
```json
{
  "expo": {
    "name": "test",
    "slug": "test",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"]
  }
}
```

#### `package.json` - Dependencies & Scripts
Lists all packages your app needs and defines scripts to run:
```json
{
  "scripts": {
    "start": "expo start",      // Start development server
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

---

## 4. React Native Fundamentals {#fundamentals}

### Core Components

React Native provides built-in components that map to native UI elements:

#### View Component
Like a `<div>` in HTML - a container for other components

```typescript
import { View } from 'react-native';

<View style={{ flex: 1, padding: 20 }}>
  {/* Other components go here */}
</View>
```

#### Text Component
Display text (you must use Text, not plain text)

```typescript
import { Text } from 'react-native';

<Text style={{ fontSize: 20, color: 'blue' }}>
  Hello World!
</Text>
```

#### TextInput Component
Input field for user text entry

```typescript
import { TextInput } from 'react-native';

<TextInput
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
  style={{ height: 40, borderWidth: 1 }}
/>
```

#### Button Component
A simple button

```typescript
import { Button } from 'react-native';

<Button 
  title="Click Me" 
  onPress={() => console.log('Pressed!')}
/>
```

### Import Statements
Always import components before using them:

```typescript
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
```

---

## 5. Building the Login Screen {#login-screen}

Let's break down our `app/index.tsx` file step by step.

### Full Login Screen Code

```typescript
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staticUsername = "Admin";
  const staticPassword = "Password123!";

  function verifyUser() {
    let message =
      username !== staticUsername || password !== staticPassword
        ? "Invalid Credentials"
        : "Login Successful";
    
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(message);
    }
    
    if (username === staticUsername && password === staticPassword) {
      router.push("/dashboard");
    }
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#2A7B9B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "LOGIN",
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Login System</Text>
          
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          
          <View style={styles.buttonFit}>
            <Button title="Login" onPress={verifyUser} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const BACKGROUND_COLOR = "#2A7B9B";

const styles = StyleSheet.create({
  buttonFit: {
    width: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
});
```

### Code Explanation - Section by Section

#### 1. Import Statements
```typescript
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
```

**What each import does:**
- `Stack, useRouter` - Navigation tools from Expo Router
- `useState` - React hook for managing component state
- `Alert, Button, etc.` - Built-in React Native components
- `SafeAreaProvider, SafeAreaView` - Handles safe areas (notches, status bars)

#### 2. Component Declaration
```typescript
export default function Index() {
  // Component code
}
```

- `export default` - Makes this component the default export
- `function Index()` - Function component (modern React way)
- This component represents our login screen

#### 3. Hooks and State
```typescript
const router = useRouter();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
```

**Understanding useState:**
- `useState("")` - Creates a state variable with initial value ""
- Returns an array: `[currentValue, functionToUpdateValue]`
- `username` - Current value of username
- `setUsername` - Function to update username
- When state changes, component re-renders

**Example:**
```typescript
const [count, setCount] = useState(0);
// count is 0
setCount(5);
// count is now 5
```

#### 4. Static Credentials
```typescript
const staticUsername = "Admin";
const staticPassword = "Password123!";
```

Hardcoded credentials for demo purposes. In a real app, you'd validate against a backend API.

#### 5. Verification Function
```typescript
function verifyUser() {
  let message =
    username !== staticUsername || password !== staticPassword
      ? "Invalid Credentials"
      : "Login Successful";
  
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
  
  if (username === staticUsername && password === staticPassword) {
    router.push("/dashboard");
  }
}
```

**Breaking it down:**
1. **Ternary Operator**: `condition ? valueIfTrue : valueIfFalse`
2. **Validation**: Checks if username AND password match
3. **Platform Check**: Different alert methods for web vs mobile
4. **Navigation**: If login successful, navigate to dashboard

#### 6. UI Components - Header Configuration
```typescript
<Stack.Screen
  options={{
    headerStyle: {
      backgroundColor: "#2A7B9B",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitle: "LOGIN",
    headerTitleAlign: "center",
  }}
/>
```

Configures the navigation header:
- Background color: Teal blue
- Text color: White
- Title: "LOGIN"
- Centered alignment

#### 7. UI Components - Form Layout
```typescript
<SafeAreaView style={styles.container}>
  <View style={styles.mainContainer}>
    <Text style={styles.text}>Login System</Text>
    
    <TextInput
      style={styles.input}
      value={username}
      onChangeText={setUsername}
      placeholder="Username"
    />
    
    <TextInput
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      secureTextEntry
    />
    
    <View style={styles.buttonFit}>
      <Button title="Login" onPress={verifyUser} />
    </View>
  </View>
</SafeAreaView>
```

**Component Hierarchy:**
```
SafeAreaView (Safe area handling)
  └─ View (Main container)
      ├─ Text (Title)
      ├─ TextInput (Username)
      ├─ TextInput (Password)
      └─ View (Button container)
          └─ Button (Login button)
```

**TextInput Props Explained:**
- `value={username}` - Controlled component (value comes from state)
- `onChangeText={setUsername}` - Updates state when user types
- `placeholder="Username"` - Gray text shown when empty
- `secureTextEntry` - Hides password characters (•••)

#### 8. Styling with StyleSheet
```typescript
const BACKGROUND_COLOR = "#2A7B9B";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  // ... more styles
});
```

**Key Style Properties:**
- `flex: 1` - Takes up all available space
- `justifyContent: "center"` - Centers content vertically
- `alignItems: "center"` - Centers content horizontally
- `marginTop: 10` - Space above element
- `paddingHorizontal: 10` - Padding on left and right
- `width: "80%"` - 80% of parent width

---

## 6. Building the Dashboard Screen {#dashboard-screen}

Our `app/dashboard.tsx` is simpler - it just shows a welcome message and logout button.

### Full Dashboard Code

```typescript
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  function logout() {
    router.push("/");
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#2A7B9B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "DASHBOARD",
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Dashboard</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const BACKGROUND_COLOR = "#2A7B9B";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
});
```

### Key Concepts

#### Logout Function
```typescript
function logout() {
  router.push("/");
}
```

Simple - just navigates back to the home screen (login page).

#### Simpler Structure
No form inputs, no state management - just display and navigation.

---

## 7. Navigation Between Screens {#navigation}

### Expo Router File-Based Navigation

Expo Router uses file names to create routes automatically:

```
app/
├── index.tsx       → Route: "/"
├── dashboard.tsx   → Route: "/dashboard"
└── _layout.tsx     → Layout wrapper for all screens
```

### Navigation Methods

#### 1. router.push()
Navigate to a new screen:

```typescript
import { useRouter } from "expo-router";

const router = useRouter();
router.push("/dashboard");
```

#### 2. router.back()
Go back to previous screen:

```typescript
router.back();
```

#### 3. router.replace()
Replace current screen (no back button):

```typescript
router.replace("/dashboard");
```

### Root Layout

The `app/_layout.tsx` file wraps all screens:

```typescript
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack />
    </>
  );
}
```

**What it does:**
- `StatusBar` - Controls top status bar appearance
- `Stack` - Enables stack-based navigation (screens stack on top of each other)

---

## 8. State Management {#state-management}

### Understanding State

**State** = Data that changes over time in your component

### useState Hook

```typescript
import { useState } from 'react';

const [value, setValue] = useState(initialValue);
```

**Example - Counter:**
```typescript
const [count, setCount] = useState(0);

<Button 
  title="Increment" 
  onPress={() => setCount(count + 1)} 
/>
<Text>{count}</Text>
```

### Controlled Components

In our login form, inputs are "controlled" by state:

```typescript
const [username, setUsername] = useState("");

<TextInput
  value={username}              // Reads from state
  onChangeText={setUsername}    // Writes to state
/>
```

**Flow:**
1. User types in input
2. `onChangeText` fires
3. Calls `setUsername(newValue)`
4. Component re-renders
5. Input shows new value

### Multiple State Variables

You can have many state variables:

```typescript
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(0);
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

---

## 9. Styling in React Native {#styling}

### StyleSheet API

React Native uses JavaScript objects for styling:

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});
```

### Common Style Properties

#### Layout (Flexbox)
```typescript
{
  flex: 1,                    // Take up available space
  flexDirection: 'row',       // Horizontal layout (default: 'column')
  justifyContent: 'center',   // Main axis alignment
  alignItems: 'center',       // Cross axis alignment
}
```

#### Spacing
```typescript
{
  margin: 10,              // All sides
  marginTop: 20,           // Specific side
  marginHorizontal: 15,    // Left and right
  marginVertical: 10,      // Top and bottom
  padding: 10,             // Inner spacing
}
```

#### Dimensions
```typescript
{
  width: 200,       // Fixed width
  width: '80%',     // Percentage
  height: 40,       // Fixed height
  minWidth: 100,    // Minimum width
  maxWidth: 300,    // Maximum width
}
```

#### Text
```typescript
{
  fontSize: 20,
  fontWeight: 'bold',     // 'normal', 'bold', '100'-'900'
  color: '#333',
  textAlign: 'center',    // 'left', 'right', 'center'
}
```

#### Borders
```typescript
{
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,       // Rounded corners
}
```

#### Background
```typescript
{
  backgroundColor: '#2A7B9B',
  backgroundColor: 'rgba(42, 123, 155, 0.5)',  // With opacity
}
```

### Applying Styles

```typescript
// Single style
<View style={styles.container}>

// Multiple styles (array)
<View style={[styles.container, styles.bordered]}>

// Inline styles
<View style={{ flex: 1, padding: 20 }}>

// Conditional styles
<View style={[
  styles.box,
  isActive && styles.activeBox
]}>
```

### Style Example from Our App

```typescript
const styles = StyleSheet.create({
  input: {
    height: 40,               // Fixed height
    borderColor: "gray",      // Border color
    borderWidth: 1,           // Border thickness
    marginTop: 10,            // Space above
    paddingHorizontal: 10,    // Padding left/right
    width: "80%",             // 80% of parent
    backgroundColor: "#fff",  // White background
  },
});
```

---

## 10. Platform-Specific Code {#platform-specific}

### Detecting the Platform

```typescript
import { Platform } from 'react-native';

// Current platform
Platform.OS  // 'ios', 'android', or 'web'
```

### Platform.OS Usage

From our login code:

```typescript
if (Platform.OS === "web") {
  window.alert(message);      // Browser alert
} else {
  Alert.alert(message);       // Native alert
}
```

### Platform.select()

Choose different values per platform:

```typescript
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      },
    }),
  },
});
```

### Platform-Specific Files

You can create separate files:
```
Button.ios.tsx    // Used on iOS
Button.android.tsx // Used on Android
Button.tsx        // Used on other platforms
```

---

## 11. Best Practices {#best-practices}

### 1. Component Organization

**Good Practice:**
```typescript
// Imports first
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// Component declaration
export default function MyComponent() {
  // Hooks at the top
  const [state, setState] = useState("");
  
  // Functions
  function handlePress() {
    // logic
  }
  
  // Return JSX
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

// Styles at the bottom
const styles = StyleSheet.create({
  // styles
});
```

### 2. State Management

**Do:**
```typescript
const [username, setUsername] = useState("");
setUsername("newValue");  // Correct
```

**Don't:**
```typescript
const [username, setUsername] = useState("");
username = "newValue";  // Wrong! Never mutate directly
```

### 3. Key Props in Lists

Always use keys when mapping arrays:

```typescript
{users.map(user => (
  <Text key={user.id}>{user.name}</Text>
))}
```

### 4. Naming Conventions

- **Components**: PascalCase → `LoginScreen`, `UserProfile`
- **Functions**: camelCase → `handlePress`, `verifyUser`
- **Constants**: UPPER_CASE → `API_URL`, `MAX_LENGTH`

### 5. Performance

- Use `StyleSheet.create()` instead of inline styles
- Avoid anonymous functions in render:

**Good:**
```typescript
function handlePress() {
  console.log('pressed');
}
<Button onPress={handlePress} />
```

**Avoid:**
```typescript
<Button onPress={() => console.log('pressed')} />
```

### 6. Security

**Don't hardcode credentials:**
```typescript
// Bad
const API_KEY = "12345-secret-key";
```

**Use environment variables:**
```typescript
// Good
import { API_KEY } from '@env';
```

### 7. Error Handling

Always handle errors:

```typescript
try {
  const response = await fetch(API_URL);
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Error', 'Something went wrong');
}
```

---

## 12. Next Steps {#next-steps}

### Enhance the Login App

1. **Add Password Validation**
```typescript
function validatePassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password);
}
```

2. **Add Loading State**
```typescript
const [isLoading, setIsLoading] = useState(false);

function verifyUser() {
  setIsLoading(true);
  // Simulate API call
  setTimeout(() => {
    setIsLoading(false);
    router.push("/dashboard");
  }, 2000);
}
```

3. **Store User Data**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('username', username);

// Retrieve
const savedUsername = await AsyncStorage.getItem('username');
```

4. **Add More Screens**
```
app/
├── index.tsx
├── dashboard.tsx
├── profile.tsx        // New
├── settings.tsx       // New
└── about.tsx          // New
```

5. **Add Real API Integration**
```typescript
async function verifyUser() {
  const response = await fetch('https://api.example.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  if (data.success) {
    router.push("/dashboard");
  }
}
```

### Learn More Topics

1. **Lists and FlatList**
   - Display scrollable lists of data
   - Efficiently render large datasets

2. **Images**
   - Load local and remote images
   - Image caching and optimization

3. **Animations**
   - React Native Reanimated
   - Animated API
   - LayoutAnimation

4. **Forms**
   - Form validation libraries (Formik, React Hook Form)
   - Complex form handling

5. **API Integration**
   - Fetch API
   - Axios library
   - REST and GraphQL

6. **State Management Libraries**
   - Redux
   - MobX
   - Zustand
   - Context API

7. **Testing**
   - Jest for unit tests
   - React Native Testing Library
   - Detox for E2E testing

8. **Navigation**
   - Tabs navigation
   - Drawer navigation
   - Modal screens

### Resources

**Official Documentation:**
- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Documentation](https://react.dev/)

**Learning Platforms:**
- React Native Express
- Udemy courses
- YouTube tutorials
- FreeCodeCamp

**Community:**
- Stack Overflow
- Reddit r/reactnative
- Discord servers
- GitHub discussions

---

## Quick Reference

### Common Commands

```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Clear cache
npx expo start -c

# Install package
npm install package-name

# Update dependencies
npm update
```

### Component Import Cheatsheet

```typescript
// Core components
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';

// React
import React, { useState, useEffect } from 'react';

// Navigation
import { useRouter, Stack } from 'expo-router';

// Safe area
import { SafeAreaView } from 'react-native-safe-area-context';
```

### Common Patterns

**Button with custom styling:**
```typescript
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity 
  style={styles.button} 
  onPress={handlePress}
>
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>
```

**Loading indicator:**
```typescript
import { ActivityIndicator } from 'react-native';

{isLoading && <ActivityIndicator size="large" color="#0000ff" />}
```

**Conditional rendering:**
```typescript
{isLoggedIn ? (
  <Text>Welcome!</Text>
) : (
  <Text>Please log in</Text>
)}
```

---

## Conclusion

Congratulations! You've learned the fundamentals of React Native through building a login application. This guide covered:

✅ Setting up a development environment  
✅ Understanding project structure  
✅ Using core React Native components  
✅ Managing state with useState  
✅ Handling navigation between screens  
✅ Styling with StyleSheet  
✅ Platform-specific code  
✅ Best practices

**Remember:**
- Practice regularly by building small projects
- Read documentation when stuck
- Join the community for help
- Start simple and gradually add complexity

Happy coding! 🚀📱

---

## Appendix: Complete Code Files

### app/index.tsx (Login Screen)
```typescript
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staticUsername = "Admin";
  const staticPassword = "Password123!";

  function verifyUser() {
    let message =
      username !== staticUsername || password !== staticPassword
        ? "Invalid Credentials"
        : "Login Successful";
    if (Platform.OS === "web") {
      window.alert(message);
      router.push("/dashboard");
    } else {
      Alert.alert(message);
      router.push("/dashboard");
    }
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#2A7B9B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "LOGIN",
          headerTitleAlign: "center",
          headerLargeTitle: true,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Login System</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonFit}>
            <Button title="Login" onPress={verifyUser} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const BACKGROUND_COLOR = "#2A7B9B";
const styles = StyleSheet.create({
  buttonFit: {
    width: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
});
```

### app/dashboard.tsx (Dashboard Screen)
```typescript
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  function logout() {
    router.push("/");
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#2A7B9B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "DASHBOARD",
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Dashboard</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const BACKGROUND_COLOR = "#2A7B9B";
const styles = StyleSheet.create({
  buttonFit: {
    width: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
});
```

### app/_layout.tsx (Root Layout)
```typescript
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack />
    </>
  );
}
```

---

**End of Guide**

This comprehensive guide covers everything a beginner needs to understand React Native based on your login app example. Use it as a reference while building your own applications!
