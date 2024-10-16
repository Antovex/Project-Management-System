import {gql} from '@apollo/client'

// This is client query which is same as we wrote in GraphiQL interface
const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`

export { GET_CLIENTS };