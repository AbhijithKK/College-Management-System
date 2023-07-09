import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './LeaveLetter.css';

const LeaveLetterForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
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
    if (name.trim() && department.trim() && semester.trim() && classValue.trim() && reason.trim() && selectedDate) {
      // Handle form submission here
      console.log("Submitted:", {
        name,
        department,
        semester,
        classValue,
        reason,
        selectedDate
      });
      // Reset the form fields
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
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSemester" className="mb-3">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control as="select" value={semester} onChange={handleSemesterChange}>
                    <option value="">Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    {/* Add more options for different semesters */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formClass" className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Control as="select" value={classValue} onChange={handleClassChange}>
                    <option value="">Select Class</option>
                    <option value="A">Class A</option>
                    <option value="B">Class B</option>
                    <option value="C">Class C</option>
                    {/* Add more options for different classes */}
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
