import { Tickets } from "@/assets/types/tickets";
import { User } from "@/assets/types/user";

/**
 * Represents an order made by a user for a specific ticket.
 */
export interface Order {
	id : string; // Unique identifier for the order.
	purchasedAmount : number; // Amount of tickets purchased.
	ticket : Tickets; // The ticket associated with the order.
	user : User; // The user who made the order.
}