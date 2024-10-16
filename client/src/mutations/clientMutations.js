import { gql } from '@apollo/client';

// Here is the actual GraphQL queries which are used to add
// or delete client data

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!){
        addClient(name: $name, email: $email, phone: $phone){
        id
        name
        email
        phone
        }
    }
`

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!){
        deleteClient(id: $id){
            id
            name
            email
            phone
        }
    }
`;

export { ADD_CLIENT, DELETE_CLIENT };