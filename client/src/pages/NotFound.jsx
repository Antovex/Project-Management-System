import {FaExclamationTriangle} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// This Page appears when we try to access a link which is not available

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <FaExclamationTriangle className='text-danger' size='5em' />
        <h1>404</h1>
        <p className='lead'>Sorry, this page doesn't exist</p>
        <Link to='/' className='btn btn-primary'>Go Back</Link>
    </div>
  )
}
