const {ApolloServer, gql} = require("apollo-server");

const typeDef = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "world",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(() => console.log("Server is running -> http://localhost:4000"));