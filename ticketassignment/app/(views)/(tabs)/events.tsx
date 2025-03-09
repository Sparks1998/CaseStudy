/**
 * Events screen component.
 * Displays a list of events and allows users to purchase tickets.
 */

import { Button , StyleSheet } from "react-native";
import MasterPageView from "@/components/MasterPageView";
import { Row } from "@/components/Row";
import EventCard from "@/components/EventCard";
import { useSelector } from "react-redux";
import { eventActions , getEvents , purchaseTickets } from "@/store/eventSlice";
import { Event } from "@/assets/types/event";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/useAppDispatch";
import { OrderDirection } from "@/assets/types/OrderDirection";
import { useFocusEffect , useRouter } from "expo-router";
import { useCallback , useEffect } from "react";

export default function Events () {
	const dispatch : any = useAppDispatch ();
	const router = useRouter ();
	
	const data : Event[] = useSelector ( ( state : RootState ) => state.event.data );
	const refresh : boolean = useSelector ( ( state : RootState ) => state.event.refresh );
	
	useEffect (
		() => {
			dispatch ( eventActions.clear () );
		} ,
		[ dispatch ] ,
	);
	
	useFocusEffect (
		useCallback (
			() => {
				try {
					if ( refresh ) {
						dispatch (
							getEvents (
								{
									field : "id" ,
									direction : OrderDirection.ASC ,
								} ,
							) ,
						);
					}
				} catch ( e ) {
					console.log ( "Error Event: " , e );
				}
			} , [ dispatch , refresh ] ,
		) ,
	);
	
	return (
		<MasterPageView
			title = "Events"
			data = { data }
			renderItem = {
				( { item } ) => <Row key = { item.id }>
					<EventCard id = { item.id }
						eventName = { item.eventName }
						eventDate = { item.eventDate }
						onPurchase = { ( ticketId , quantity ) => {
							dispatch (
								purchaseTickets (
									{
										id : ticketId ,
										purchasedAmount : quantity ,
									} ,
								) ,
							);
						} }
						tickets = { item.tickets }
					/>
				</Row>
			}
		>
			<Button
				title = { "Add Event" }
				onPress = { () => {
					router.push ( "/(views)/addEvent" );
				} }
			/>
		</MasterPageView>
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
