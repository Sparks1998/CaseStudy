/**
 * Collapsible Component
 *
 * A reusable UI component that provides collapsible/expandable content sections.
 * Features a clickable header with a rotating chevron icon and expandable content area.
 *
 * @module Collapsible
 */

import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Collapsible Component
 *
 * Creates a collapsible section with a header and expandable content.
 * The header includes a rotating chevron icon indicating the expanded/collapsed state.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The content to be displayed when expanded
 * @param {string} props.title - The title displayed in the header
 * @returns {JSX.Element} Collapsible component with header and conditional content
 */
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
	// Track expanded/collapsed state
	const [isOpen, setIsOpen] = useState(false);
	// Get current theme for icon color
	const theme = useColorScheme() ?? "light";
	
	return (
		<ThemedView>
			<TouchableOpacity
				style={styles.heading}
				onPress={() => setIsOpen((value) => !value)}
				activeOpacity={0.8}>
				<MaterialIcons
					name="chevron-right"
					size={18}
					weight="medium"
					color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
					style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
				/>
				
				<ThemedText type="defaultSemiBold">{title}</ThemedText>
			</TouchableOpacity>
			{isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
		</ThemedView>
	);
}

/**
 * Component styles
 */
const styles = StyleSheet.create({
	heading: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: 24,
	},
});