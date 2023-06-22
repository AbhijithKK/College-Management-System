import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import './AddClub.css'
function AddClub() {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
          <div className='studentclub' style={{
                       
                       width: "100%",
                       display: 'flex',
                       justifyContent: "center"
                   }}>
          <Form className='form'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Club Name</Form.Label>
        <Form.Control type="email" placeholder="Enter Club Name" />
      </Form.Group>
      <Form.Select aria-label="Default select example">
      <option>Select Club Admin</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Add Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <div className='d-flex justify-content-center'>

      <Button type="submit" >Add</Button>
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