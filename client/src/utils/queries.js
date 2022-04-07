import { gql } from "@apollo/client";

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        bookCount
        books {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;