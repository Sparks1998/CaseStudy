/**
 * AuthProvider Component
 *
 * Provides authentication context and state management throughout the application.
 * Handles authentication checks, token retrieval, and navigation based on auth state.
 *
 * @module AuthProvider
 */

import { createContext , ReactNode , useEffect , useState } from "react";
import { getAuthToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { ActivityIndicator , View } from "react-native";
import { useAppDispatch } from "@/store/useAppDispatch";
import { authActions } from "@/store/authSlice";

/**
 * Authentication Context Type Definition
 *
 * @interface AuthContextType
 * @property {boolean} isLoggedIn - Current authentication state
 * @property {function} setIsLoggedIn - Function to update authentication state
 */
interface AuthContextType {
	isLoggedIn : boolean;
	setIsLoggedIn : ( isLoggedIn : boolean ) => void;
}

/**
 * Authentication Context
 *
 * Provides the authentication state and setter function to components
 * that consume this context.
 */
export const AuthContext = createContext<AuthContextType> (
	{
		isLoggedIn : false ,
		setIsLoggedIn : () => {
		} ,
	} ,
);

/**
 * Authentication Provider Component
 *
 * Wraps the application to provide authentication state and handling.
 * Checks for existing authentication token on mount and navigates accordingly.
 * Displays a loading indicator while authentication check is in progress.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} The AuthContext provider with state
 */
export default function AuthProvider ( { children } : { children : ReactNode } ) {
	const [ isLoggedIn , setIsLoggedIn ] = useState ( false );
	const [ loading , setLoading ] = useState<boolean> ( true );
	const router : any = useRouter ();
	const dispatch = useAppDispatch ();
	
	/**
	 * Check authentication status on component mount
	 * Redirects to tabs if authenticated, otherwise stays on current route
	 */
	useEffect ( () => {
		const checkAuth = async () => {
			try {
				const token = await getAuthToken ();
				if ( token ) {
					dispatch (
						authActions.setAsLoggedIn () ,
					);
					setIsLoggedIn ( true );
					router.replace ( "/(views)/(tabs)" );
				}
			} catch ( e ) {
				console.error ( "Failed to check auth status" , e );
			} finally {
				setLoading ( false );
			}
		};
		
		checkAuth ().
			then ();
	} , [] );
	
	// Display loading indicator while checking authentication
	if ( loading ) {
		return (
			<View style = { { flex : 1 , justifyContent : "center" , alignItems : "center" } }>
				<ActivityIndicator size = { 60 } />
			</View>
		);
	}
	
	return <AuthContext.Provider value = { { isLoggedIn , setIsLoggedIn } }>
		{ children }
	</AuthContext.Provider>;
}