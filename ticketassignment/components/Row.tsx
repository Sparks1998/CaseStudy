/**
 * Row Component
 *
 * A themed layout component that arranges children in a horizontal row with consistent spacing.
 * Supports theme-aware background colors.
 *
 * @module Row
 */

import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * Row Component Props
 *
 * @typedef {Object} RowProps
 * @property {string} [lightColor] - Background color to use in light theme
 * @property {string} [darkColor] - Background color to use in dark theme
 */
export type RowProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

/**
 * Row Component
 *
 * Renders content in a horizontal row with consistent spacing and theme-aware styling.
 * Uses gap to create consistent horizontal spacing between children.
 *
 * @param {RowProps} props - Component props
 * @param {ViewStyle} props.style - Additional styles to apply
 * @param {string} [props.lightColor] - Background color in light mode
 * @param {string} [props.darkColor] - Background color in dark mode
 * @returns {JSX.Element} A View component with row layout and theming
 */
export function Row({ style, lightColor, darkColor, ...otherProps }: RowProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
	
	return <View style={[{ backgroundColor }, rowStyle.row, style]} {...otherProps} />;
}

/**
 * Component styles
 */
const rowStyle = StyleSheet.create({
	row: {
		flexDirection: "row",
		verticalAlign: "middle",
		gap: 8,
		alignItems: "flex-start",
		backgroundColor: "transparent"
	},
});