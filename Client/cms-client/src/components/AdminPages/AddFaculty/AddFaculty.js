import { Button, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './AddFaculty.css'
import { useForm } from '../../useForm/useForm';
import { ApiAddFaculty, ApiViewDepartment } from '../../api/AdminApi';
import { useEffect, useState } from 'react';
function Addfaculty() {
    const [value,SetValue]=useForm({
        names:'',
        email:'',
        mobNumber:'',
        dob:'',
        admYear:'',
        department:'',
        semester:'',
        gender:'',
        qualification:'',
        teachingArea:'',
        address:''
    })
    const Handlevalue=(event)=>{
        SetValue(event)
    }
    const [errmsg,setErrmsg]=useState('')
  const SendData = () => {
    if (value.names.trim() &&value.email.trim()&&
    value.mobNumber.trim()&&value.dob.trim()&&
    value.admYear.trim()&&
    value.qualification.trim()&&value.teachingArea.trim()
    &&value.address.trim()&&value.department.trim()&&value.gender.trim()&&value.semester.trim()) {
      
        ApiAddFaculty(value)
    }else{
      setErrmsg('Fill the Form properly')
    }
  };
  const [dept,setDept]=useState([])
  const HelpDep=async()=>{
    let data=await ApiViewDepartment()
    setDept(data)
  }
  useEffect(()=>{
    HelpDep()
  },[])
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
                                <p style={{color:'red'}}>{errmsg}</p>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                <Form.Control id="disabledTextInput" type='text' name='names' value={value.names} onChange={Handlevalue} placeholder="Full Name" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='email' name='email' value={value.email} onChange={Handlevalue} placeholder="Email" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='number' name='mobNumber' value={value.mobNumber} onChange={Handlevalue} placeholder="Mobile Number" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="dob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" value={value.dob} onChange={Handlevalue} placeholder="Date of Birth" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                <Form.Control id="disabledTextInput" type='number' name='admYear' value={value.admYear} onChange={Handlevalue} placeholder="ADM Year" />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledSelect">Select Departments</Form.Label>
                                        <Form.Select id="disabledSelect" name='department' onChange={Handlevalue}>
                                        <option hidden value={value.department}>Select Department</option>
                                         {dept.map((data, index) => (

                                         <option key={index} value={data.name}>{data.name}</option>
                                            ))
                                                  }
                                        </Form.Select>
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledSelect">Select Semesters</Form.Label>
                                        <Form.Select id="disabledSelect" value={value.semester} name='semester' onChange={Handlevalue}>
                                            <option value="">select sem</option>
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
                                <Form.Label htmlFor="disabledSelect">Select gender</Form.Label>
                                <Form.Select id="disabledSelect" name='gender' value={value.gender} onChange={Handlevalue}>
                                    <option hidden value="">select gender</option>
                                    <option value="m">male</option>
                                    <option value="f">female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='text' name='qualification' value={value.qualification} onChange={Handlevalue} placeholder="Qualification" />
                                    </Col>
                                    <Col sm={12}  md={6}>
                                        <Form.Label htmlFor="disabledTextInput"></Form.Label>
                                        <Form.Control id="disabledTextInput" type='text' name='teachingArea' value={value.teachingArea} onChange={Handlevalue} placeholder="Teaching Area" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Full Address</Form.Label>
                                <Form.Control as="textarea" type='text' name='address' value={value.address} onChange={Handlevalue} rows={3} />
                            </Form.Group>
                            <Button type="button" onClick={SendData}>Submit</Button>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Addfaculty;
