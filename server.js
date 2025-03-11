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
const server = new ApolloServer({ typeDefs, resolvers: allResolvers });

startStandaloneServer(server, { listen: { port } })
  .then(() =>
    console.log(`🚀 Apollo Server running at http://localhost:${port}`)
  )
  .catch((error) => console.error("Failed to start the server:", error));

//------------------------- Express App
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Sample route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Start Express server
// app.listen(3000, () => {
//   console.log("Express server running at http://localhost:3000");
// });
