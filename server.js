import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema/schema.js";
import allResolvers from "./graphql/resolvers/index.js";
import connectDB from "./config/connect.js";
dotenv.config();
connectDB(process.env.MONGO_URI);

const port = 8000;
//GraphQL server---standaloneserver
// const server = new ApolloServer({ typeDefs, resolvers: allResolvers });

// startStandaloneServer(server, { listen: { port } })
//   .then(() =>
//     console.log(`🚀 Apollo Server running at http://localhost:${port}`)
//   )
//   .catch((error) => console.error("Failed to start the server:", error));

//------------------------- Express App
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Sample route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Start Express server
// app.listen(port, () => {
//   console.log("Express server running at http://localhost:8000");
// });

//GraphQL server with express
import { expressMiddleware } from "@apollo/server/express4";
const server = new ApolloServer({ typeDefs, resolvers: allResolvers });
await server.start();
const app = express();

app.use(cors());
app.use(express.json());
const user = {
  roll: "Admin",
};

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const authMiddleware = (req, res, next) => {
  if (user.roll === "Admin") next();
  else res.send("you are not authorized to access this");
};

app.use("/graphql", authMiddleware, expressMiddleware(server));

// Start Express server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
