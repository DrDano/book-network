import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: ID!, $description: String!, $title: String!, $image: String, $link: String, $authors: [String!]) {
  saveBook (bookId: $bookId, description: $description, title: $title, image: $image, link: $link, authors: $authors) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      title
      description
      image
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    savedBooks {
    bookId
    authors
    description
    title
    image
    }
  }
}
`;