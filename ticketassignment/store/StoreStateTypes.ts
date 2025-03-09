/**
 * Interface representing common states for Redux slices.
 * Includes status and errors properties to manage the state of async operations.
 */
interface CommonStates {
	status : "idle" | "waiting" | "success" | "fail";
	errors : any;
}

/**
 * Interface representing the state for managing an array of data.
 * Extends CommonStates to include a data property that holds an array of type T.
 */
export interface StoreStateArray<T> extends CommonStates {
	data : T[];
}

/**
 * Interface representing the state for managing a single data object.
 * Extends CommonStates to include a data property that holds a single object of type T or null.
 */
export interface StoreState<T> extends CommonStates {
	data : T | null;
}