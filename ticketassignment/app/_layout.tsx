/**
 * RootLayout.tsx - Root Component for the Application
 *
 * This file serves as the entry point for the application's UI, establishing the theming,
 * navigation structure, and global state management.
 *
 * @module RootLayout
 */
import { DarkTheme , DefaultTheme , ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/store/store";

/**
 * Prevent the splash screen from automatically hiding before asset loading is complete.
 * This ensures a smooth transition from the splash screen to the application.
 */
SplashScreen.preventAutoHideAsync ().
	then ();

/**
 * RootLayout Component
 *
 * Sets up the foundational structure of the application including:
 * - Redux store provider for global state management
 * - Theme provider for light/dark mode support
 * - Navigation stack configuration
 * - Custom font loading
 * - Splash screen management
 *
 * @returns {JSX.Element|null} The root application layout, or null if fonts aren't loaded
 */
export default function RootLayout () {
	// Get the current color scheme (light/dark) from the custom hook
	const colorScheme = useColorScheme ();
	
	// Load custom fonts needed by the application
	const [ loaded ] = useFonts ( {
		SpaceMono : require ( "../assets/fonts/SpaceMono-Regular.ttf" ) ,
	} );
	
	/**
	 * Hide the splash screen once fonts are loaded to transition to the app UI
	 */
	useEffect ( () => {
		if ( loaded ) {
			SplashScreen.hideAsync ().
				then ();
		}
	} , [ loaded ] );
	
	// Return null if fonts are still loading to prevent rendering incomplete UI
	if ( ! loaded ) {
		return null;
	}
	
	return (
		<Provider store = { store }>
			<ThemeProvider value = { colorScheme === "dark" ? DarkTheme : DefaultTheme }>
				<Stack>
					{/* Main application views */ }
					<Stack.Screen name = "(views)/index" options = { { headerShown : false } } />
					<Stack.Screen name = "(views)/(tabs)" options = { { headerShown : false } } />
					<Stack.Screen name = "(views)/addEvent" options = { { headerShown : false } } />
					<Stack.Screen name = "+not-found" />
				</Stack>
				<StatusBar style = "auto" />
			</ThemeProvider>
		</Provider>
	);
}
