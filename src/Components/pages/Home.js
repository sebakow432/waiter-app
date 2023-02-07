import ListGroup from 'react-bootstrap/ListGroup';
import { Stack, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllTables } from '../../Redux/tablesRedux';
import { useSelector } from 'react-redux';

const Home = () => {
  const tables = useSelector(getAllTables);

  if (!tables) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return(
      <div>
        <h1 className='my-3'>All tables</h1>
        <ListGroup variant='flush'>
        {tables.map(table => (
          <ListGroup.Item key={table.id} className='px-0'>
            <Stack direction="horizontal" gap={4}>
              <h3>Table {table.id}</h3>
              <p className='mb-0'><strong>Status:</strong> {table.status}</p>
              <p className='mb-0'></p>
              <Link className="ms-auto" to={`/table/${table.id}`}>
                <Button variant='primary' >Show more</Button>
              </Link>
            </Stack>
          </ListGroup.Item>
        ))}
        </ListGroup>
      </div>
  )
};

export default Home;