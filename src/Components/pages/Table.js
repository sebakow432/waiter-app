import { getTableById, updateTableRequest } from "../../Redux/tablesRedux";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Col, Row, Stack, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id));

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(Number(table.peopleAmount));
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    Number(table.maxPeopleAmount)
  );
  const [bill, setBill] = useState(Number(table.bill));
  
  const statuses = [
    "Busy",
    "Reserved",
    "Free",
    "Cleaning",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (status === "Cleaning" || status === "Free") {
      setPeopleAmount(0);
    }
    if (status === "Busy") {
      setBill(0);
    }
  }, [status]);

  useEffect(() => {
    if (maxPeopleAmount < peopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
  }, [peopleAmount, maxPeopleAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id, 
      status, 
      peopleAmount: parseInt(peopleAmount), 
      maxPeopleAmount: parseInt(maxPeopleAmount), 
      bill: parseInt(bill)
    };
    console.log(data);
    dispatch(updateTableRequest(data)); //<------ Here's problem!
    navigate('/');
  };

  if (!table) return <Navigate to="/" />;

  
  if(isNaN(maxPeopleAmount)){
    setMaxPeopleAmount(0);
  }
  
  return (
    <div>
      <h1 className="my-4">Table {table.id}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="my-3">
          <Form.Label column sm={2} lg={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col sm={6} lg={4}>
            <Form.Select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map(status => (<option value={status} key={status}>{status}</option>))}
            </Form.Select>
          </Col>  
        </Form.Group>

        <Form.Group as={Row} className="my-3">
          <Stack direction="horizontal">
            <Form.Label column sm={2} lg={1}>
              <strong>People:</strong>
            </Form.Label>
            <Col lg={1}>
              <Form.Control 
                type="number" 
                min="0" 
                max={maxPeopleAmount} 
                value={peopleAmount}
                onChange={(e) => setPeopleAmount(Number(e.target.value))}
              />
            </Col>
            <Form.Text me={1} className="mx-3">/</Form.Text>
            <Col lg={1}>
              <Form.Control 
                type="number" 
                min="0" 
                max="10" 
                value={maxPeopleAmount}
                onChange={(e) => setMaxPeopleAmount(Number(e.target.value))}
              />
            </Col>
          </Stack>
        </Form.Group>

        <Form.Group as={Row} className={status !== "Busy" ? "d-none" : "my-3"}>
          <Stack direction="horizontal">
            <Form.Label column sm={1} lg={1}>
              <strong>Bill:</strong>
            </Form.Label>
            <Form.Text className="me-2">
              <strong className="m-1">$ </strong>
            </Form.Text>
            <Col lg={1}>
              <Form.Control className="my-2" 
                type="number" 
                min="0" 
                max="1000"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </Col>
          </Stack>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default Table;