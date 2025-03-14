import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing = [], incoming) {
            return incoming; // Replace old data safely
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_GRAPHQL_SERVER,
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
