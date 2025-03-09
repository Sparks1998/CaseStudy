/**
 * Utility functions for managing authentication tokens in AsyncStorage.
 * Provides methods to set, retrieve, and remove the authentication token.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Key used to store the authentication token in AsyncStorage.
 */
const AUTH_TOKEN_KEY = "authToken";

/**
 * Saves the authentication token to AsyncStorage.
 * @param {string} token - The authentication token to be saved.
 */
export const setAuthToken = async ( token : string ) => {
	try {
		await AsyncStorage.setItem ( AUTH_TOKEN_KEY , token );
	} catch ( e ) {
		console.error ( "Failed to save token to storage:" , e );
	}
};

/**
 * Retrieves the authentication token from AsyncStorage.
 * @returns {Promise<string | null>} The authentication token if found, otherwise null.
 */
export const getAuthToken = async () : Promise<string | null> => {
	try {
		return await AsyncStorage.getItem ( AUTH_TOKEN_KEY );
	} catch ( e ) {
		console.error ( "Failed to fetch token from storage:" , e );
		return null;
	}
};

/**
 * Removes the authentication token from AsyncStorage.
 */
export const removeAuthToken = async () => {
	try {
		await AsyncStorage.removeItem ( AUTH_TOKEN_KEY );
	} catch ( e ) {
		console.error ( "Failed to remove token from storage:" , e );
	}
};