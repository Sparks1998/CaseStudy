/**
 * Event slice to manage event-related state including fetching, creating, and refreshing events.
 * Utilizes Redux Toolkit's createAsyncThunk and createSlice for async actions and state management.
 */

import { gql } from "@apollo/client";
import client from "@/graphql/apolloClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Event } from "@/assets/types/event";
import { OrderDirection } from "@/assets/types/OrderDirection";
import { StoreStateArray } from "@/store/StoreStateTypes";
import { Order } from "@/assets/types/Order";

/**
 * State interface for managing an array of events.
 * Extends the base StoreStateArray with a refresh flag.
 */
interface EventState extends StoreStateArray<Event> {
	refresh : boolean;
}

/**
 * Interface representing the arguments required for fetching events.
 */
interface EventArgs {
	field : string;
	direction : OrderDirection;
}

/**
 * Interface representing the arguments required for purchasing tickets.
 */
interface PurchaseArgs {
	id : number;
	purchasedAmount : number;
}

/**
 * Interface representing the arguments required for creating an event.
 */
interface CreateEventArgs {
	eventName : string;
	eventDate : Date;
}

/**
 * Interface representing the arguments required for creating a ticket.
 */
interface CreateTicketArgs {
	quantity : number;
}

/**
 * Initial state of the event slice.
 */
const initialState: EventState = {
    data: [],
    errors: null,
    status: "idle",
    refresh: true,
};

/**
 * GraphQL query to fetch events.
 */
const eventQuery = gql`
    query GetEvents($field: String = "id", $direction: OrderDirection = ASC) {
        events (order: {field: $field, direction: $direction}) {
            id
            eventName
            eventDate
            tickets {
                id
                quantity
            }
        }
    }
`;

/**
 * GraphQL mutation for purchasing tickets.
 */
const purchaseMutation = gql`
    mutation Purchase($id: Int!, $purchasedAmount: Int!) {
        purchase (createOrderInput: {id: $id, purchasedAmount: $purchasedAmount}) {
            id
            ticket {
                id
                quantity
                event {
                    id
                    eventName
                    eventDate
                }
            }
        }
    }
`;

/**
 * GraphQL mutation for creating an event.
 */
const createEventMutation = gql`
    mutation CreateEvent($eventName: String!, $eventDate: String!) {
        createEvent (createEventInput: {eventName: $eventName, eventDate: $eventDate}) {
            id
            eventName
            eventDate
        }
    }
`;

/**
 * GraphQL mutation for creating a ticket.
 */
const createTicketMutation = gql`
    mutation CreateTicket($eventId: Int!, $quantity: Int!) {
        createTicket (createTicketInput: {eventId: $eventId, quantity: $quantity}) {
            id
            quantity
        }
    }
`;

/**
 * Async thunk to fetch events asynchronously.
 */
export const getEvents = createAsyncThunk<Event[], EventArgs>(
    "events",
    async ({ field, direction }: EventArgs, { rejectWithValue }) => {
        try {
            const response = await client.query({
                query: eventQuery,
                variables: { field, direction },
                fetchPolicy: "network-only",
            });

            return response.data.events;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk to purchase tickets.
 */
export const purchaseTickets = createAsyncThunk<Order, PurchaseArgs>(
    "purchaseTickets",
    async ({ id, purchasedAmount }: PurchaseArgs, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: purchaseMutation,
                variables: { id, purchasedAmount },
            });

            return response.data.events;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk to create an event and associated tickets.
 */
export const createEvent = createAsyncThunk<Event, CreateEventArgs & CreateTicketArgs>(
    "createEvent",
    async ({ eventName, eventDate, quantity }: CreateEventArgs & CreateTicketArgs, { rejectWithValue }) => {
        try {
            const response: any = await client.mutate({
                mutation: createEventMutation,
                variables: {
                    eventName,
                    eventDate: eventDate.toISOString(),
                },
            });

            const event: Event = response.data.createEvent;
            const ticketResponse = await client.mutate({
                mutation: createTicketMutation,
                variables: {
                    eventId: event.id,
                    quantity,
                },
            });

            event.tickets = ticketResponse.data.createTicket;

            return event;
        } catch (error: any) {
            console.log("Error: ", error);
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Redux slice for event management.
 */
const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        /**
         * Clears the event state data and resets status.
         */
        clear(state) {
            state.data = [];
            state.status = "idle";
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        // Handle fetching events
        builder
            .addCase(getEvents.pending, (state) => {
                state.status = "waiting";
                state.refresh = false;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "success";
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.status = "fail";
                state.errors = action.payload as string;
            })

            // Handle purchase ticket state
            .addCase(purchaseTickets.pending, (state) => {
                state.status = "waiting";
            })
            .addCase(purchaseTickets.fulfilled, (state) => {
                state.status = "success";
                state.refresh = true;
            })
            .addCase(purchaseTickets.rejected, (state) => {
                state.status = "fail";
            })

            // Handle creating new event
            .addCase(createEvent.pending, (state) => {
                state.status = "waiting";
            })
            .addCase(createEvent.fulfilled, (state) => {
                state.status = "success";
                state.refresh = true;
            })
            .addCase(createEvent.rejected, (state) => {
                state.status = "fail";
            });
    },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;