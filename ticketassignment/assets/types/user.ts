// ✅ Define the types for login response and arguments

/**
 * Represents a user with their associated details.
 */
export interface User {
	id: string; // Unique identifier for the user.
	firstName: string; // First name of the user.
	lastName: string; // Last name of the user.
	email: string; // Email address of the user.
}