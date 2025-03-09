/**
 * Orders screen component.
 * Displays a list of orders placed by the user.
 */

import MasterPageView from "@/components/MasterPageView";
import { useAppDispatch } from "@/store/useAppDispatch";
import { useCallback , useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getOrders , orderActions } from "@/store/orderSlice";
import { Order } from "@/assets/types/Order";
import OrderCard from "@/components/OrderCard";
import { Row } from "@/components/Row";
import { useFocusEffect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Orders () {
	const dispatch = useAppDispatch ();
	
	useEffect (
		() => {
			try {
				dispatch ( orderActions.clear () );
			} catch ( e ) {
				console.log ( "Error Event: " , e );
			}
		} ,
		[ dispatch ] ,
	);
	
	useFocusEffect (
		useCallback (
			() => {
				dispatch ( getOrders () );
			} ,
			[ dispatch ] ,
		) ,
	);
	
	const data : Order[] = useSelector ( ( state : RootState ) => state.order.data );
	
	return (
		<MasterPageView
			title = "Orders"
			data = { data }
			renderItem = {
				( { item } ) => <Row key = { item.id }>
					<Row key = { item.id }>
						<OrderCard
							order = { item }
						/>
					</Row>
				</Row>
			}
		>
		</MasterPageView>
	);
}

const styles = StyleSheet.create ( {
	container : {
		flex : 1 ,
		alignItems : "center" ,
		justifyContent : "center" ,
	} ,
} );