import { Button , StyleSheet , Text , TextInput } from "react-native";
import MasterPageView from "@/components/MasterPageView";
import { Row } from "@/components/Row";
import { Column } from "@/components/Column";
import { useState } from "react";
import { useRouter } from "expo-router";
import { loginUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/useAppDispatch";
import AuthProvider from "@/components/AuthProvider";

/**
 * Handles the login process by dispatching the loginUser action and navigating to the tabs view on success.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @param dispatch - The Redux dispatch function.
 * @param router - The router object for navigation.
 */
async function login ( email : string , password : string , dispatch : any , router : any ) {
	try {
		await dispatch (
			loginUser (
				{
					email ,
					password ,
					rememberToken : true ,
				} ,
			) ,
		);
		router.replace ( "/(views)/(tabs)" );
	} catch ( error ) {
		console.error ( "Login failed:" , error );
	}
}

/**
 * Index component is the main login screen of the application.
 * It provides input fields for email and password, and a button to submit the login form.
 */
export default function Index () {
	const dispatch = useAppDispatch ();
	const router = useRouter ();
	
	const [ email , setEmail ] = useState ( "" );
	const [ password , setPassword ] = useState ( "" );
	const [ error , setError ] = useState ( "" );
	
	/**
	 * Handles changes to the email input field and validates the email format.
	 *
	 * @param text - The current text in the email input field.
	 */
	const handleEmailChange = ( text : string ) => {
		setEmail ( text );
		validateEmail ( text );
	};
	
	/**
	 * Validates the email format using a simple regex.
	 *
	 * @param text - The email address to validate.
	 */
	const validateEmail = ( text : string ) => {
		// Simple email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if ( ! emailRegex.test ( text ) ) {
			setError ( "Please enter a valid email address" );
		} else {
			setError ( "" );
		}
	};
	
	return (
		<AuthProvider>
			<MasterPageView title = "Login">
				<Column style = { { alignItems : "center" } }>
					<Row>
						<Text style = { styles.label }>Email:</Text>
						<TextInput
							style = { styles.input }
							placeholder = "example@example.com"
							value = { email }
							onChangeText = { handleEmailChange }
							keyboardType = "email-address"
							autoCapitalize = "none"
						/>
					</Row>
					{ error ? <Row><Text style = { styles.errorText }>{ error }</Text></Row> : null }
					<Row>
						<Text style = { styles.label }>Password:</Text>
						<TextInput
							style = { styles.input }
							placeholder = "Expample password"
							value = { password }
							onChangeText = { setPassword }
							secureTextEntry = { true }
						/>
					</Row>
					<Row>
						<Button
							title = "Login"
							onPress = { () => login ( email , password , dispatch , router ) }
						/>
					</Row>
				</Column>
			</MasterPageView>
		</AuthProvider>
	);
}

const styles = StyleSheet.create ( {
	titleContainer : {
		flexDirection : "column" ,
		alignItems : "center" ,
		gap : 8 ,
	} ,
	stepContainer : {
		gap : 8 ,
		marginBottom : 8 ,
	} ,
	reactLogo : {
		height : 178 ,
		width : 290 ,
		bottom : 0 ,
		left : 0 ,
		position : "absolute" ,
	} ,
	container : {
		flex : 1 ,
	} ,
	
	label : {
		marginBottom : 8 ,
		fontSize : 16 ,
	} ,
	input : {
		height : 40 ,
		borderColor : "#CCC" ,
		borderWidth : 1 ,
		borderRadius : 8 ,
		paddingHorizontal : 10 ,
		marginBottom : 16 ,
		width : 190 ,
	} ,
	errorText : {
		color : "red" ,
		marginBottom : 10 ,
	} ,
} );
