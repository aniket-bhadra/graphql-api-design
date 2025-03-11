const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const port = 8000;
const server = new ApolloServer({
  typeDefs: `type Query { hello: String }`,
  resolvers: {
    Query: {
      hello: () => "hello world",
    },
  },
});

startStandaloneServer(server, {
  listen: { port },
})
  .then(() => console.log(`Apollo Server running on http://localhost:${port}`))
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });

//-------------------------express app
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Sample route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Start server
// app.listen(port, () => {
//   console.log("Server running on http://localhost:3000");
// });
