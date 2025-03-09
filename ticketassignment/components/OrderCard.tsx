/**
 * OrderCard Component
 *
 * A card component displaying details of a ticket order.
 * Shows event information and ticket purchase details.
 *
 * @module OrderCard
 */

import { Order } from "@/assets/types/Order";
import { StyleSheet , Text , View } from "react-native";
import { formatDate } from "@/assets/Common";
import { Row } from "@/components/Row";
import { Column } from "@/components/Column";

/**
 * OrderCard Component
 *
 * Displays information about a ticket order including:
 * - Event name
 * - Event date (formatted)
 * - Number of tickets purchased
 *
 * Uses Row and Column components for layout structure.
 *
 * @param {Object} props - Component props
 * @param {Order} props.order - The order data to display
 * @returns {JSX.Element} A card displaying order information
 */
export default function OrderCard ( { order } : { order : Order } ) {
	return (
		<View style = { styles.card }>
			<Row key = { order.id } style = { { flex : 1 } }>
				<Column>
					<Text style = { styles.title }>Event Name: { order.ticket.event?.eventName ?? "" }</Text>
					<View style = { styles.section }>
						<Text>Date: { formatDate ( `${ order.ticket.event?.eventDate ?? "" }` ) }</Text>
					</View>
					
					<View style = { styles.section }>
						<Text style = { styles.subtitle }>Tickets:</Text>
						<Text>Purchased Amount: { order.purchasedAmount }</Text>
					</View>
				</Column>
			</Row>
		</View>
	);
};

/**
 * Component styles
 */
const styles = StyleSheet.create ( {
	card : {
		flex : 1 ,
		backgroundColor : "#FFF" ,
		padding : 16 ,
		marginVertical : 8 ,
		borderRadius : 8 ,
		shadowColor : "#000" ,
		shadowOffset : { width : 0 , height : 2 } ,
		shadowOpacity : 0.1 ,
		shadowRadius : 8 ,
		elevation : 2 ,
	} ,
	title : {
		fontSize : 18 ,
		fontWeight : "bold" ,
		marginBottom : 8 ,
	} ,
	section : {
		marginTop : 8 ,
	} ,
	subtitle : {
		fontWeight : "600" ,
	} ,
} );