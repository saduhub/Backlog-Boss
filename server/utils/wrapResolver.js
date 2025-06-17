// Custom error handling for GraphQL resolvers
import { ApolloError } from 'apollo-server-express';
// Wrapper function to handle errors in GraphQL resolvers
export function wrapResolver(resolverFn, customMessage = "An unexpected error occurred", errorCode = "INTERNAL_SERVER_ERROR") {
  return async (...resolverArgs) => {
    try {
      return await resolverFn(...resolverArgs);
    } catch (error) {
      console.error(`[Resolver Error]: ${errorCode} - ${customMessage}`);
      throw new ApolloError(customMessage, errorCode);
    }
  };
}
