import {ApolloServer} from "apollo-server-express";

require("dotenv").config();
import express from "express";
import logger from "morgan";
import {typeDefs, resolvers} from "./schema";
import {getUser} from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    }
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

apollo.listen(PORT).then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
);