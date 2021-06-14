import {getUser} from "./users/users.utils";

require("dotenv").config();
import {ApolloServer} from "apollo-server";
import schema from "./schema";

const PORT = process.env.PORT;
const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    }
});
server.listen(PORT).then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT} ✅`)
);