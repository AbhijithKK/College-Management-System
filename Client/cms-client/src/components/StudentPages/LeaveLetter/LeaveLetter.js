import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './LeaveLetter.css';
import { StudentLeaveApplyApi } from "../../api/StudentApi";
import { ApiViewClass, ApiViewDepartment, ApiViewSemester } from "../../api/AdminApi";

const LeaveLetterForm = () => {    
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("dep");
  const [semester, setSemester] = useState("");
  const [classValue, setClassValue] = useState("");
  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [errmsg, setErrmsg] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleClassChange = (event) => {
    setClassValue(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const errorHandler = () => {
    setErrmsg('Fill All input fields properly');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() && department!=='dep' && semester.trim() && classValue.trim() && reason.trim() && selectedDate) {

        StudentLeaveApplyApi(name, department, semester, classValue,reason, selectedDate)
     
      
      setName("");
      setDepartment("");
      setSemester("");
      setClassValue("");
      setReason("");
      setSelectedDate(null);
      setErrmsg("");
    } else {
      errorHandler();
    }
  };

// =============================================================================

const[dep,setDep]=useState([])
const[Class,setClass]=useState([])
const[sem,setSem]=useState([])





useEffect(()=>{
    const ApiHelper=async()=>{
        let departments=await ApiViewDepartment()
        setDep(departments)
        let classes=await ApiViewClass(department)
        setClass(classes)
        let sesms=await ApiViewSemester(department)
        setSem(sesms)
    }
    
ApiHelper()
},[department])


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="leave-form uplodformleave">
              <Form onSubmit={handleSubmit}>
                <h1>LEAVE LETTER FORM</h1>
                <p style={{ color: 'red' }}>{errmsg}</p>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={handleNameChange} placeholder="Enter Name" />
                </Form.Group>

                <Form.Group controlId="formDepartment" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" value={department} onChange={handleDepartmentChange}>
                    <option hidden value="">Select Department</option>
                    {
                        dep.map((val,index)=>(
                            <option key={index} value={val.name}>{val.name}</option>
                        ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSemester" className="mb-3">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control as="select" value={semester} onChange={handleSemesterChange}>
                  <option hidden value="">Select Semester</option>

                  {
                        sem.map((val,index)=>(
                            <option key={index} value={val.semester}>{val.semester}</option>
                        ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formClass" className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Control as="select" value={classValue} onChange={handleClassChange}>
                    <option hidden value="">Select Class</option>
                    {
                        Class.map((val,index)=>(
                            <option key={index} value={val.className}>{val.className}</option>
                        ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formReason" className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control as="textarea" value={reason} onChange={handleReasonChange} placeholder="Enter Reason" />
                </Form.Group>


                
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Date</Form.Label>
                 <br/>

                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Date"
                    className="form-control formleavedate" // Apply the same styling class as other inputs
                    
                    />
                    
                </Form.Group>

                <Button type="submit">Apply Leave</Button>
              </Form>
            </div>
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default LeaveLetterForm;
