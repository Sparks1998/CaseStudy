import { Tickets } from "@/assets/types/tickets";

/**
 * Represents an event with its associated details.
 */
export interface Event {
	id : number; // Unique identifier for the event.
	eventName : string; // Name of the event.
	eventDate : Date; // Date and time of the event.
	tickets : Tickets; // Tickets associated with the event.
}