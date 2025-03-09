/**
 * ThemedText.tsx
 *
 * A themed Text component that supports both light and dark mode.
 * Automatically applies the appropriate text color based on the current theme
 * and provides several predefined text styles.
 */
import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Props for the ThemedText component.
 * @extends TextProps - Extends all standard React Native Text props
 * @property {string} [lightColor] - Optional custom text color for light mode
 * @property {string} [darkColor] - Optional custom text color for dark mode
 * @property {'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'} [type='default'] - Predefined text style
 */
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

/**
 * A theme-aware Text component that automatically applies the appropriate text
 * color and style based on the current theme (light/dark mode).
 *
 * @param {ThemedTextProps} props - Component props
 * @param {TextStyle} props.style - Additional styles to apply to the text
 * @param {string} props.lightColor - Optional custom color for light mode
 * @param {string} props.darkColor - Optional custom color for dark mode
 * @param {'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'} props.type - Predefined text style to use
 * @returns {JSX.Element} - Rendered Text component with theme-appropriate styling
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Get the appropriate text color for the current theme
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

/**
 * Predefined text styles for different text types
 */
const styles = StyleSheet.create({
  // Standard body text style
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  // Semi-bold version of the default text
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  // Large title text style
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  // Medium-sized subtitle style
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Hyperlink text style
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});