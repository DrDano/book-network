const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [String]
    bookCount: Int
}

type Book {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
}

type Auth {
    token: ID
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookId: ID!): Book
}
`;