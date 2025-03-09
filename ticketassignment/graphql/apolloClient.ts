/**
 * apolloClient.ts
 *
 * Configures and exports an Apollo Client instance for GraphQL API communication.
 * Handles authentication token management via request headers and response processing.
 */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthToken, setAuthToken } from "@/utils/storage";

/** GraphQL API endpoint URL */
const GRAPHQL_API_URL = "http://192.168.1.171:3000/graphql";

/**
 * Authentication link that adds the Authorization header with the auth token to outgoing requests.
 * Retrieves the current auth token from storage and adds it as a Bearer token.
 */
const authLink = setContext(async (_, { headers }) => {
	const token = await getAuthToken();
	
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

/**
 * Response handling link that processes incoming GraphQL responses.
 * Extracts any new Authorization token from response headers and saves it to storage.
 */
const responseLink = new ApolloLink((operation, forward) => {
	return forward(operation)
		.map(
			(response) => {
				const context = operation.getContext();
				const token = context.response.headers.get("Authorization");
				
				if (token) {
					setAuthToken(token)
						.then(
							(_) => {
								// Token saved successfully
							},
						);
				}
				
				return response;
			},
		);
});

/** HTTP link that defines the GraphQL server endpoint */
const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });

/**
 * Configured Apollo Client instance.
 * Uses a chain of links for request/response processing:
 * 1. authLink - Adds auth token to requests
 * 2. responseLink - Processes auth tokens from responses
 * 3. httpLink - Handles the actual HTTP communication
 *
 * Uses in-memory caching for GraphQL query results.
 */
const client = new ApolloClient({
	link: ApolloLink.from([authLink, responseLink, httpLink]),
	cache: new InMemoryCache(),
});

export default client;