import { useQuery} from '@apollo/client'
import ClientRow from '../components/ClientRow'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'

// This is our main compnent which is getting data and displaying

export default function Clients() {
    // we are getting data form gql and useQuery is then used to send it forward
    const { loading, error, data } = useQuery(GET_CLIENTS)

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            { !loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* "data" is where our values from DB is getting inserted into */}
                        {data.clients.map(client => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            ) }
        </>
    )
}
