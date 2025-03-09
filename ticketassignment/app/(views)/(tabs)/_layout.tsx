/**
 * Layout component for the main tab navigation.
 * Defines the structure and appearance of the bottom tab bar.
 */

import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign , SimpleLineIcons } from "@expo/vector-icons";

export default function _layout () {
	const colorScheme = useColorScheme ();
	
	return (
		<Tabs
			screenOptions = { {
				tabBarActiveTintColor : Colors[ colorScheme ?? "light" ].tint ,
				headerShown : false ,
				tabBarButton : HapticTab ,
				tabBarBackground : TabBarBackground ,
				tabBarStyle : Platform.select ( {
					ios : {
						// Use a transparent background on iOS to show the blur effect
						position : "absolute" ,
					} ,
					default : {} ,
				} ) ,
			} }>
			<Tabs.Screen
				name = "orders"
				options = { {
					title : "Orders" ,
					tabBarIcon : ( { color } ) =>
						<SimpleLineIcons
							size = { 28 }
							name = "calendar"
							color = { color }
						/> ,
				} }
			/>
			<Tabs.Screen
				name = "events"
				options = { {
					title : "Events" ,
					tabBarIcon : ( { color } ) =>
						<AntDesign size = { 28 }
							name = "calendar"
							color = { color } /> ,
				} }
			/>
		</Tabs>
	);
}

