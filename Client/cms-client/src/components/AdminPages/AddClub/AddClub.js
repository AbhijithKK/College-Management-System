import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './AddClub.css';
import { useEffect, useState } from 'react';
import axios from '../../Axios/Axios';
import { useForm } from '../../useForm/useForm';

function AddClub() {
  const [faculty, setFaculty] = useState([{ name: '' }]);

  useEffect(() => {
    axios
      .get('/admin/viewFacultys', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => {
        FacultyName(data.data);
      });
  }, []);

  const FacultyName = (data) => {
    setFaculty(data);
  };

  const [value ,useValue]=useForm({
    names:'',
    clubAdmin:'',
    discription:''
  })
const HandleChange=(event)=>{
  useValue(event)
}
const SendData=()=>{
  axios.post('/admin/addClub',value,{
    headers:{
      'Content-Type':'application/json'
    },withCredentials:true
  }).then((data)=>{
    console.log(data.data);
  })
}
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            <div
              className="studentclub"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Form className="form">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Club Name</Form.Label>
                  <Form.Control type="text" name='names' value={value.names} onChange={HandleChange} placeholder="Enter Club Name" />
                </Form.Group>
                <Form.Select aria-label="Default select example" name='clubAdmin' onChange={HandleChange} >
                  <option>Select Club Admin</option>
                  {faculty.map((value, index) => (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Add Description</Form.Label>
                  <Form.Control as="textarea" name='discription' value={value.discription} onChange={HandleChange} rows={3} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button type="button" onClick={SendData}>Add</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddClub;
