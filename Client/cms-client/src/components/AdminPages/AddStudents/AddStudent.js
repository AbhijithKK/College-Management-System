import { Button, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './AddStudent.css'
import { useForm } from '../../useForm/useForm';
import axios from '../../Axios/Axios';
function AddStudent() {
    const[value,SetValue]=useForm({
        names:'',
        email:'',
        mobNumber:'',
        dob:'',
        admYear:'',
        guardianName:'',
        guardianNumber:'',
        address:'',
        department:'',
        gender:'',
        semester:''
    })
    const ValueHandle=(event)=>{
        SetValue(event)
    }
 const SubmitForm=()=>{
    axios.post('/admin/addStudent',value,{
        headers:{
            'Content-Type':"application/json"
        },withCredentials:true
    }).then((data)=>{
        console.log(data.data);
    })
 }
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
                                <Form.Control id="disabledTextInput" type='text' name='names' value={value.names} onChange={ValueHandle} placeholder="Full Name" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='email' name='email' value={value.email} onChange={ValueHandle} placeholder="Email" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='number' name='mobNumber' value={value.mobNumber} onChange={ValueHandle} placeholder="Mobile Number" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date"  value={value.dob} onChange={ValueHandle} name="dob" placeholder="Date of Birth" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                <Form.Control id="disabledTextInput" type='number' name='admYear' value={value.admYear} onChange={ValueHandle} placeholder="ADM Year" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="">Select Departments</Form.Label>
                                        <Form.Select id="" name='department'  onChange={ValueHandle}>
                                           <option value="">Select Department</option>
                                           <option value="eee">eee</option>
                                           <option value="cs">cs</option>
                                        </Form.Select>
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="">Select Semesters</Form.Label>
                                        <Form.Select id="" name='semester' onChange={ValueHandle}>
                                           <option value="">Select sem</option>
                                           <option value="1">1</option>
                                           <option value="2">2</option>
                                           <option value="3">3</option>
                                           <option value="4">4</option>
                                           <option value="5">5</option>
                                           <option value="6">6</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="">Select gender</Form.Label>
                                <Form.Select id="" name='gender' onChange={ValueHandle}>
                                    <option value="m">male</option>
                                    <option value="f">female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='text' name='guardianName' value={value.guardianName} onChange={ValueHandle} placeholder="Guardian Name" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='number' name='guardianNumber' value={value.guardianNumber} onChange={ValueHandle} placeholder="Guardian Number" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Full Address</Form.Label>
                                <Form.Control as="textarea" type='text' name='address' value={value.address} onChange={ValueHandle} rows={3} />
                            </Form.Group>
                            <Button type="button" onClick={SubmitForm} >Submit</Button>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddStudent;
