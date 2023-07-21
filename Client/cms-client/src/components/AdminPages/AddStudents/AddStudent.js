import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./AddStudent.css";
import { useForm } from "../../useForm/useForm";
import SideBar from '../SideBar/SideBar';
import { useEffect, useState } from "react";
import { ApiAddStudent, ApiViewClass, ApiViewDepartment, ApiViewSemester } from "../../api/AdminApi";

function AddStudent() {
  const [value, SetValue] = useForm({
    names: "",
    email: "",
    mobNumber: "",
    dob: "",
    admYear: "",
    guardianName: "",
    guardianNumber: "",
    address: "",
    department: "def",
    gender: "",
    semester: "",
    className:''
  });
  const ValueHandle = (event) => {
    SetValue(event);
  };
const [errmsg,setErrmsg]=useState('')
  const SubmitForm = () => {
    if (value.names.trim() &&value.email.trim()&&value.mobNumber.trim()&&value.dob.trim()&&value.admYear.trim()&&value.guardianName.trim()&&value.guardianNumber.trim()
    &&value.address.trim()&&value.department!=='def'&&value.gender.trim()&&value.semester.trim()&& value.className.trim()) {
      
      ApiAddStudent(value)
    }else{
      setErrmsg('Fill the Form properly')
    }
  

  };
  const [dept,setDept]=useState([])
  const[AllSem,setAllSem]=useState([])
  const[AllClass,setAllClass]=useState([])

  useEffect(()=>{
    const HelpDep=async()=>{
      let data=await ApiViewDepartment()
      let sem=await ApiViewSemester(value.department)
      let cls=await ApiViewClass(value.department,value.semester)
      setDept(data)
      setAllSem(sem.allSemesters)
      setAllClass(cls.allClass)
    }
    HelpDep()
  },[value.department,value.semester])
  return (
    <>
   <SideBar/>
    <Container>
      <Row>
        <Col sm={12}>
          <div
            className="StudentForm"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form className="form">
            <h1 style={{fontWeight:'bold'}}>ADD STUDENT</h1>
              <p style={{color:'red'}}>{errmsg}</p>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="text"
                  name="names"
                  value={value.names}
                  onChange={ValueHandle}
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="disabledTextInput"></Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      type="email"
                      name="email"
                      value={value.email}
                      onChange={ValueHandle}
                      placeholder="Email"
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="disabledTextInput"></Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      type="number"
                      name="mobNumber"
                      value={value.mobNumber}
                      onChange={ValueHandle}
                      placeholder="Mobile Number"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={value.dob}
                  onChange={ValueHandle}
                  name="dob"
                  placeholder="Date of Birth"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput"></Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="number"
                  name="admYear"
                  value={value.admYear}
                  onChange={ValueHandle}
                  placeholder="ADM Year"
                />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="">Select Departments</Form.Label>
                    <Form.Select id=""  name="department" onChange={ValueHandle}>
                    <option hidden value={value.department}>Select Department</option>
              {dept.map((data, index) => (

                <option key={index} value={data.name}>{data.name}</option>
              ))
              }

                    </Form.Select>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="">Select Semesters</Form.Label>
                    <Form.Select id="" name="semester" onChange={ValueHandle}>
                    <option hidden value={value.semester}>Select Semester</option>
              {AllSem.map((data, index) => (

                <option key={index} value={data.semester}>{data.semester}</option>
              ))
              }
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
              <Row>
              
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="">Select Class</Form.Label>
                    <Form.Select id="" name="className" onChange={ValueHandle}>
                    <option hidden value={value.className}>Select Class</option>
              {AllClass.map((data, index) => (

                <option key={index} value={data.className}>{data.className}</option>
              ))
              }
                    </Form.Select>
                  </Col>
              <Col sm={12} md={6}>
                <Form.Label htmlFor="">Select gender</Form.Label>
                <Form.Select id="" value={value.gender} name="gender" onChange={ValueHandle}>
                  <option hidden value="">Select Gender</option>
                  <option value="m">male</option>
                  <option value="f">female</option>
                </Form.Select>
                </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="disabledTextInput"></Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      type="text"
                      name="guardianName"
                      value={value.guardianName}
                      onChange={ValueHandle}
                      placeholder="Guardian Name"
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Label htmlFor="disabledTextInput"></Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      type="number"
                      name="guardianNumber"
                      value={value.guardianNumber}
                      onChange={ValueHandle}
                      placeholder="Guardian Number"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Full Address</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="address"
                  value={value.address}
                  onChange={ValueHandle}
                  rows={3}
                />
              </Form.Group>
              <Button type="button" onClick={SubmitForm}>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default AddStudent;
