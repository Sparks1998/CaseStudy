/**
 * EventCard Component
 *
 * A card component for displaying event information with ticket purchasing functionality.
 * Shows event details and provides a UI for purchasing tickets with validation.
 *
 * @module EventCard
 */

import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Tickets } from "@/assets/types/tickets";
import { formatDate } from "@/assets/Common";

/**
 * EventCard Component Props
 *
 * @interface EventCardProps
 * @property {number} id - Unique identifier for the event
 * @property {string} eventName - Name of the event
 * @property {Date} eventDate - Date when the event occurs
 * @property {Tickets} [tickets] - Optional ticket information for the event
 * @property {function} onPurchase - Callback function when tickets are purchased
 */
interface EventCardProps {
	id: number;
	eventName: string;
	eventDate: Date;
	tickets?: Tickets;
	onPurchase: (ticketId: number, quantity: number) => void;
}

/**
 * EventCard Component
 *
 * Displays event information and provides ticket purchasing interface.
 * Includes validation for ticket quantities and availability.
 *
 * @param {EventCardProps} props - Component props
 * @returns {JSX.Element} Event card with details and purchase functionality
 */
export default function EventCard({
	id,
	eventName,
	eventDate,
	tickets,
	onPurchase,
}: EventCardProps) {
	// State for tracking ticket quantity input
	const [ticketCount, setTicketCount] = useState<string>("0");
	
	/**
	 * Handles the ticket purchase action
	 * Validates input and available tickets before processing purchase
	 */
	const handlePurchase = () => {
		const count = parseInt(ticketCount);
		
		if (!tickets) {
			Alert.alert("No tickets", "There are no tickets for this event yet!");
			return;
		}
		
		if (isNaN(count) || count <= 0) {
			Alert.alert("Invalid Input", "Please enter a valid number of tickets.");
			return;
		}
		
		if (count > tickets.quantity) {
			Alert.alert("Not Enough Tickets", `Only ${tickets.quantity} tickets available.`);
			return;
		}
		
		onPurchase(tickets.id, count);
		
		setTicketCount("0");
	};
	
	return (
		<View style={styles.card}>
			<View style={styles.details}>
				<Text style={styles.title}>{eventName}</Text>
				<Text style={styles.date}>Date: {formatDate(eventDate.toString())}</Text>
				<Text style={styles.tickets}>
					Tickets Available: {tickets?.quantity ?? 0}
				</Text>
				
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Number of tickets"
						keyboardType="numeric"
						value={ticketCount}
						onChangeText={setTicketCount}
						editable={tickets && tickets.quantity > 0}
					/>
					<Button
						title="Purchase Tickets"
						onPress={() => handlePurchase()}
						disabled={!tickets || tickets.quantity <= 0}
					/>
				</View>
			</View>
		</View>
	);
}

/**
 * Component styles
 */
const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 8,
		overflow: "hidden",
		marginVertical: 8,
		backgroundColor: "#FFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	details: {
		flex: 1,
		padding: 8,
		justifyContent: "space-between",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	date: {
		color: "#555",
		marginVertical: 4,
	},
	tickets: {
		color: "#888",
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 4,
		padding: 8,
		flex: 1,
		marginRight: 8,
	},
});