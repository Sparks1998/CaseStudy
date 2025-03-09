/**
 * Add Event screen component.
 * Allows users to create a new event with a name, date, and ticket quantity.
 */

import MasterPageView from "@/components/MasterPageView";
import { Row } from "@/components/Row";
import { Alert , Button , StyleSheet , Text , TextInput } from "react-native";
import { Column } from "@/components/Column";
import { useAppDispatch } from "@/store/useAppDispatch";
import { useRouter } from "expo-router";
import { useRef , useState } from "react";
import { formatDate } from "@/assets/Common";
import DateTimePicker , { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { createEvent } from "@/store/eventSlice";

export default function AddEvent () {
	const dispatch = useAppDispatch ();
	const router = useRouter ();
	
	const eventNameRef = useRef<TextInput> ( null );
	const quantityRef = useRef<TextInput> ( null );
	const eventDateRef = useRef<TextInput> ( null );
	
	const [ showPicker , setShowPicker ] = useState ( false );
	const [ eventName , setEventName ] = useState ( "" );
	const [ eventDate , setEventDate ] = useState<Date> ( new Date () );
	const [ quantity , setQuantity ] = useState ( "" );
	
	const [ errorName , setErrorName ] = useState ( "" );
	const [ errorDate , setErrorDate ] = useState ( "" );
	const [ errorQuantity , setErrorQuantity ] = useState ( "" );
	
	const [ mode , setMode ] = useState<"date" | "time"> ( "date" );
	
	const onChange = ( event : DateTimePickerEvent , selectedDate ? : Date ) => {
		if ( eventDateRef.current ) {
			eventDateRef.current.blur ();
		}
		const currentDate = selectedDate;
		setShowPicker ( false );
		setEventDate ( currentDate ?? eventDate );
		
		if ( mode === "date" && currentDate ) {
			showTimepicker ();
		} else if ( ! currentDate ) {
			setErrorDate ( "Please enter a valid date" );
		}
	};
	
	const showMode = ( currentMode : "date" | "time" ) => {
		setShowPicker ( true );
		setMode ( currentMode );
	};
	
	const showDatepicker = () => {
		showMode ( "date" );
	};
	
	const showTimepicker = () => {
		showMode ( "time" );
	};
	
	const handleQuantityChange = ( newQuantity : string ) => {
		const count = parseInt ( newQuantity );
		
		if ( isNaN ( count ) || count <= 0 ) {
			setErrorQuantity ( "Quantity must be a number and more than 0" );
		} else {
			setErrorQuantity ( "" );
		}
		
		setQuantity ( newQuantity );
	};
	
	const handleCreateEvent = () => {
		if ( eventName.trim () === "" || isNaN ( parseInt ( quantity ) ) ) {
			Alert.alert ( "Wrong credentials" , "Please enter a valid event name and quantity" );
			return;
		}
		
		dispatch (
			createEvent (
				{
					eventName : eventName.trim () ,
					eventDate ,
					quantity : parseInt ( quantity ) ,
				} ,
			) ,
		).
			then (
				() => {
					router.back ();
				} ,
			);
	};
	
	return (
		<MasterPageView
			title = "Add Event">
			<Column style = { { alignItems : "center" } }>
				<Row>
					<Text style = { styles.label }>Event Name:</Text>
					<TextInput
						key = { "Event Name" }
						ref = { eventNameRef }
						style = { styles.input }
						placeholder = "Example Event"
						value = { eventName }
						onChangeText = { ( value ) => {
							if ( value.trim () === "" ) {
								setErrorName ( "Please enter a valid event name" );
							} else {
								setErrorName ( "" );
							}
							
							setEventName ( value );
						} }
						autoCapitalize = "words"
					/>
				</Row>
				{ errorName ? <Row><Text style = { styles.errorText }>{ errorName }</Text></Row> : null }
				<Row>
					<Text style = { styles.label }>Event Date:</Text>
					<TextInput
						key = { "Event Date" }
						ref = { eventDateRef }
						style = { styles.input }
						placeholder = "02-10-2025"
						onFocus = { () => showDatepicker () }
						value = { formatDate ( `${ eventDate ?? new Date () }` , true ) }
					/>
				</Row>
				{ errorDate ? <Row><Text style = { styles.errorText }>{ errorDate }</Text></Row> : null }
				{ showPicker && (
					<DateTimePicker
						testID = "dateTimePicker"
						value = { eventDate }
						mode = { mode }
						is24Hour = { false }
						onChange = { onChange }
					/>
				) }
				
				<Row>
					<Text style = { styles.label }>Amount of tickets:</Text>
					<TextInput
						key = { "Amount of tickets" }
						ref = { quantityRef }
						style = { styles.input }
						placeholder = "10"
						keyboardType = "numeric"
						onChangeText = { handleQuantityChange }
						value = { quantity }
					/>
				</Row>
				{ errorQuantity ? <Row><Text style = { styles.errorText }>{ errorQuantity }</Text></Row> : null }
				<Row>
					<Button
						title = "Create Event"
						onPress = { handleCreateEvent }
					/>
				</Row>
			</Column>
		</MasterPageView>
	);
};

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