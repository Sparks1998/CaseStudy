import { Event } from "@/assets/types/event";

/**
 * Represents a ticket with its associated details.
 */
export interface Tickets {
	id: number; // Unique identifier for the ticket.
	quantity: number; // Quantity of tickets available.
	event?: Event; // Optional reference to the event associated with the ticket.
}