import { Button, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './AddStudent.css'
function AddStudent() {
    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <div className='StudentForm' style={{
                       
                        width: "100%",
                        display: 'flex',
                        justifyContent: "center"
                    }}>
                        <Form className='form'>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                <Form.Control id="disabledTextInput" placeholder="Full Name" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Email" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Mobile Number" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                <Form.Control id="disabledTextInput" placeholder="ADM Year" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledSelect">Select Departments</Form.Label>
                                        <Form.Select id="disabledSelect">
                                            {/* Options for departments */}
                                        </Form.Select>
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledSelect">Select Semesters</Form.Label>
                                        <Form.Select id="disabledSelect">
                                            {/* Options for semesters */}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledSelect">Select gender</Form.Label>
                                <Form.Select id="disabledSelect">
                                    {/* Options for gender */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Guardian Name" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Guardian Number" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Full Address</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button type="submit">Submit</Button>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddStudent;
