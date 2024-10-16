import {gql} from '@apollo/client';

// This is the query which is used to obtain all the projects' data
const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
        }
    }
`
// This query gets us the single project
const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

export {GET_PROJECTS, GET_PROJECT};