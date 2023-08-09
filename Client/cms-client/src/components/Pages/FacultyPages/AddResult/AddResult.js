import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import "./AddResult.css";
import {
  ApiViewStudents,
  FacultyProfileApi,
  FacultyResultAddApi,
  ApiViewClass,
  ApiViewSemester,
  ApiViewSubjects,
} from "../../../api/FacultyApi";
import SideBarFaculty from "../SideBar/SideBarFaculty";

const AddResult = () => {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [classValue, setClassValue] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mark, setMark] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setsubject] = useState("");

  const [errmsg, setErrmsg] = useState("");

  const handleSubjectChange = (event) => {
    setsubject(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  const handleMarkChange = (event) => {
    setMark(event.target.value);
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
    setErrmsg("Fill All input fields properly");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      semester.trim() &&
      classValue.trim() &&
      studentId.trim() &&
      mark.trim() &&
      grade.trim() &&
      subject.trim()
    ) {
      FacultyResultAddApi(
        department,
        semester,
        classValue,
        studentId,
        mark,
        grade,
        subject
      );

      setSemester("");
      setClassValue("");
      setStudentId("");
      setErrmsg("");
      setMark("");
      setGrade("");
      setsubject("");
    } else {
      errorHandler();
    }
  };

  // =============================================================================

  const [Class, setClass] = useState([]);
  const [sem, setSem] = useState([]);
  const [student, setStudent] = useState([]);
  const [Subjects, setSubjects] = useState([]);

  useEffect(() => {
    const ApiHelper = async () => {
      let data = await FacultyProfileApi();
      setDepartment(data.department);
      let classes = await ApiViewClass(department);
      setClass(classes);
      let sesms = await ApiViewSemester(department);
      setSem(sesms);
      let students = await ApiViewStudents(department, semester, classValue);
      setStudent(students);
      let subject = await ApiViewSubjects(department, semester);
      setSubjects(subject);
    };

    ApiHelper();
  }, [department, semester, classValue]);

  return (
    <div style={{ backgroundColor: "gray", height: "100vh " }}>
      <SideBarFaculty />
      <Container>
        <Row>
          <Col>
            <div className="leave-form addresult">
              <Form onSubmit={handleSubmit}>
                <h1>ADD RESULT</h1>
                <p style={{ color: "red" }}>{errmsg}</p>

                <Form.Group controlId="formSemester" className="mb-3">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    as="select"
                    value={semester}
                    onChange={handleSemesterChange}
                  >
                    <option hidden value="">
                      Select Semester
                    </option>

                    {sem?.length > 0
                      ? sem.map((val, index) => (
                          <option key={index} value={val.semester}>
                            {val.semester}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formClass" className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    as="select"
                    value={classValue}
                    onChange={handleClassChange}
                  >
                    <option hidden value="">
                      Select Class
                    </option>
                    {Class?.length > 0
                      ? Class.map((val, index) => (
                          <option key={index} value={val.className}>
                            {val.className}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formSubject" className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    as="select"
                    value={subject}
                    onChange={handleSubjectChange}
                  >
                    <option hidden value="">
                      Select Subject
                    </option>
                    {Subjects?.length > 0
                      ? Subjects.map((val, index) => (
                          <option key={index} value={val.subject}>
                            {val.subject}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    as="select"
                    value={studentId}
                    onChange={handleStudentChange}
                  >
                    <option hidden value="">
                      Select Student
                    </option>
                    {student?.length > 0
                      ? student.map((val, index) => (
                          <option key={index} value={val._id}>
                            {val.name}
                          </option>
                        ))
                      : ""}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Mark</Form.Label>
                  <Form.Control
                    type="number"
                    value={mark}
                    onChange={handleMarkChange}
                    placeholder="Enter mark"
                  />
                </Form.Group>

                <Form.Group controlId="formGrade" className="mb-3">
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    as="select"
                    value={grade}
                    onChange={handleGradeChange}
                  >
                    <option hidden value="">
                      Select Grade
                    </option>

                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </Form.Control>
                </Form.Group>

                <Button style={{backgroundColor:"rgba(60, 34, 34, 0.96)" }} type="submit">Add</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddResult;
