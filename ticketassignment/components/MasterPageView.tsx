/**
 * MasterPageView Component
 *
 * A reusable page template providing consistent layout with header, scroll functionality,
 * and optional list rendering. Handles navigation, authentication actions, and provides
 * app-wide consistent styling.
 *
 * @module MasterPageView
 */

import type { PropsWithChildren } from "react";
import { ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Appbar } from "react-native-paper";
import Animated, { SharedValue, useAnimatedRef } from "react-native-reanimated";
import { useNavigation, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import { authActions } from "@/store/authSlice";

/**
 * MasterPageView Props
 *
 * @typedef {Object} Props
 * @property {String} title - The title to display in the header
 * @property {Object} [headerBackgroundColor] - Background colors for the header in light/dark mode
 * @property {any[]} [data] - Array of data items for list rendering
 * @property {ListRenderItem<any>|SharedValue|null|undefined} [renderItem] - Function to render list items
 */
type Props = PropsWithChildren<{
	title: String;
	headerBackgroundColor?: { dark: string; light: string };
	data?: any[];
	renderItem?: ListRenderItem<any> | SharedValue<ListRenderItem<any> | null | undefined> | null | undefined;
}>;

/**
 * MasterPageView Component
 *
 * A page layout template with:
 * - Themed header with title
 * - Back navigation when available
 * - Logout button when authenticated
 * - Scrollable content area or FlatList
 * - Proper handling of bottom tab space
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} A complete page layout with header and content area
 */
export default function MasterPageView({
	children,
	title,
	headerBackgroundColor = { light: "#A1CEDC", dark: "#1D3D47" },
	data = [],
	renderItem,
}: Props) {
	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme() ?? "light";
	const bottom = useBottomTabOverflow();
	const scrollRef = useAnimatedRef<any>();
	const navigation = useNavigation();
	const router = useRouter();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	
	return (
		<ThemedView style={styles.container}>
			<Appbar.Header
				style={[styles.header, { backgroundColor: headerBackgroundColor[colorScheme] }]}
			>
				{
					navigation.canGoBack() &&
					(
						<TouchableOpacity
							onPress={() => {
								router.back();
							}}
							style={styles.icon}
						>
							<AntDesign name="arrowleft" size={28} color={"#000000"} />
						</TouchableOpacity>
					)
				}
				<Appbar.Content title={title} />
				
				{
					isLoggedIn &&
					(
						<TouchableOpacity
							onPress={async () => {
								dispatch(
									authActions.logout(),
								);
								router.replace("/(views)");
							}}
							style={styles.icon}
						>
							<AntDesign name="logout" size={28} color={"#000000"} />
						</TouchableOpacity>
					)
				}
			</Appbar.Header>
			{
				renderItem ?
					<Animated.FlatList
						style={{ paddingTop: 20 }}
						ref={scrollRef}
						scrollEventThrottle={16}
						scrollIndicatorInsets={{ bottom }}
						contentContainerStyle={{ paddingBottom: bottom }}
						ListHeaderComponent={() => <View>{children}</View>}
						data={data}
						renderItem={renderItem}
					/> :
					<Animated.ScrollView
						ref={scrollRef}
						scrollEventThrottle={16}
						scrollIndicatorInsets={{ bottom }}
						contentContainerStyle={{ paddingBottom: bottom }}
					>
						<ThemedView style={styles.content}>{children}</ThemedView>
					</Animated.ScrollView>
			}
		</ThemedView>
	);
}

/**
 * Component styles
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		overflow: "hidden",
	},
	content: {
		flex: 1,
		paddingTop: 20,
		gap: 16,
		overflow: "hidden",
	},
	icon: {
		marginRight: 20,
		marginLeft: 20,
	},
});