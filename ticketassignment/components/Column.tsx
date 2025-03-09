/**
 * Column Component
 *
 * A themed layout component that arranges children in a vertical column with consistent spacing.
 * Supports theme-aware background colors.
 *
 * @module Column
 */

import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * Column Component Props
 *
 * @typedef {Object} ColumnProps
 * @property {string} [lightColor] - Background color to use in light theme
 * @property {string} [darkColor] - Background color to use in dark theme
 */
export type ColumnProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

/**
 * Column Component
 *
 * Renders content in a vertical column with consistent spacing and theme-aware styling.
 * Uses gap to create consistent vertical spacing between children.
 *
 * @param {ColumnProps} props - Component props
 * @param {ViewStyle} props.style - Additional styles to apply
 * @param {string} [props.lightColor] - Background color in light mode
 * @param {string} [props.darkColor] - Background color in dark mode
 * @returns {JSX.Element} A View component with column layout and theming
 */
export function Column({ style, lightColor, darkColor, ...otherProps }: ColumnProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
	
	return <View style={[{ backgroundColor }, columnStyle.column, style]} {...otherProps} />;
}

/**
 * Column component styles
 */
const columnStyle = StyleSheet.create({
	column: {
		flexDirection: "column",
		gap: 8,
		alignItems: "center",
		backgroundColor: "transparent",
	},
});