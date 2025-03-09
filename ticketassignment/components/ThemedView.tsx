/**
 * ThemedView.tsx
 *
 * A themed View component that supports both light and dark mode.
 * Automatically applies the appropriate background color based on the current theme.
 */
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Props for the ThemedView component.
 * @extends ViewProps - Extends all standard React Native View props
 * @property {string} [lightColor] - Optional custom background color for light mode
 * @property {string} [darkColor] - Optional custom background color for dark mode
 */
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * A theme-aware View component that automatically applies the appropriate background
 * color based on the current theme (light/dark mode).
 *
 * @param {ThemedViewProps} props - Component props
 * @param {ViewStyle} props.style - Additional styles to apply to the view
 * @param {string} props.lightColor - Optional custom background color for light mode
 * @param {string} props.darkColor - Optional custom background color for dark mode
 * @returns {JSX.Element} - Rendered View component with theme-appropriate styling
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Get the appropriate background color for the current theme
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}