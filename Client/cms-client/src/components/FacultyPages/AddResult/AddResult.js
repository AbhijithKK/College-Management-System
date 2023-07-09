import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import './AddResult.css';

import { ApiViewClass, ApiViewDepartment, ApiViewSemester } from "../../api/AdminApi";
import { ApiViewStudents, FacultyResultAddApi } from "../../api/FacultyApi";

const AddResult = () => {    
  
  const [department, setDepartment] = useState("dep");
  const [semester, setSemester] = useState("");
  const [classValue, setClassValue] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mark, setMark] = useState("");
  const [grade, setGrade] = useState("");
 
  const [errmsg, setErrmsg] = useState("");

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  const handleMarkChange = (event) => {
    setMark(event.target.value);
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

  const handleStudentChange = (event) => {
    setStudentId(event.target.value);
  };

  
  const errorHandler = () => {
    setErrmsg('Fill All input fields properly');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( department!=='dep' && semester.trim() && classValue.trim() &&studentId.trim() &&mark.trim() && grade.trim() ) {

        FacultyResultAddApi(department,semester,classValue,studentId,mark,grade)
     console.log(department,semester,classValue,studentId,mark,grade);
      setDepartment("");
      setSemester("");
      setClassValue("");
      setStudentId("");
      setErrmsg("");
      setMark('');
      setGrade('');
    } else {
      errorHandler();
    }
  };

// =============================================================================

const[dep,setDep]=useState([])
const[Class,setClass]=useState([])
const[sem,setSem]=useState([])
const[student,setStudent]=useState([])

useEffect(()=>{
    const ApiHelper=async()=>{
        let departments=await ApiViewDepartment()
        setDep(departments)
        let classes=await ApiViewClass(department)
        setClass(classes)
        let sesms=await ApiViewSemester(department)
        setSem(sesms)
        let students=await ApiViewStudents(department,semester,classValue)
        setStudent(students)
    }
    
ApiHelper()
},[department,semester,classValue])

console.log(student);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="leave-form addresult">
              <Form onSubmit={handleSubmit}>
                <h1>ADD RESULT</h1>
                <p style={{ color: 'red' }}>{errmsg}</p>

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

                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control as="select" value={studentId} onChange={handleStudentChange}>
                    <option hidden value="">Select Student</option>
                    {
                        student.map((val,index)=>(
                            <option key={index} value={val._id}>{val.name}</option>
                        ))
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Mark</Form.Label>
                  <Form.Control type="number" value={mark} onChange={handleMarkChange} placeholder="Enter mark" />
                </Form.Group>
                
                <Form.Group controlId="formGrade" className="mb-3">
                  <Form.Label>Grade</Form.Label>
                  <Form.Control as="select" value={grade} onChange={handleGradeChange}>
                    <option hidden value="">Select Grade</option>
                    
                            <option  value='A+'>A+</option>
                            <option  value='A'>A</option>
                            <option  value='B+'>B+</option>
                            <option  value='B'>B</option>
                            <option  value='C+'>C+</option>
                            <option  value='C'>C</option>
                            <option  value='D+'>D+</option>
                            <option  value='D'>D</option>
                            <option  value='E'>E</option>
                       
                  </Form.Control>
                </Form.Group>

                <Button type="submit">Add</Button>
              </Form>
            </div>
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default AddResult
