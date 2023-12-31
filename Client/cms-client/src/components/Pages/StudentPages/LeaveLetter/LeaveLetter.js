import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LeaveLetter.css";
import { StudentLeaveApplyApi } from "../../../api/StudentApi";
import SideBarStudent from "../SideBar/SideBarStudent";

const LeaveLetterForm = () => {
  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [errmsg, setErrmsg] = useState("");

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const errorHandler = () => {
    setErrmsg("Fill All input fields properly");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reason.trim() && selectedDate != null) {
      StudentLeaveApplyApi(reason, selectedDate);
      setReason("");
      setSelectedDate(null);
      setErrmsg("");
    } else {
      errorHandler();
    }
  };
  // =============================================================================
  return (
    <div style={{ backgroundColor: "gray", height: "100vh" }}>
      <SideBarStudent />
      <div className="leetterformStayle">
        <Container>
          <Row>
            <Col>
              <div className="leave-form uplodformleave">
                <Form onSubmit={handleSubmit}>
                  <h1>LEAVE LETTER FORM</h1>
                  <p style={{ color: "red" }}>{errmsg}</p>

                  <Form.Group controlId="formReason" className="mb-3">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={reason}
                      onChange={handleReasonChange}
                      placeholder="Enter Reason"
                    />
                  </Form.Group>

                  <Form.Group controlId="formDate" className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <br />

                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Date"
                      className="form-control formleavedate" // Apply the same styling class as other inputs
                    />
                  </Form.Group>

                  <Button style={{backgroundColor:"#206a3d"}} type="submit">Apply Leave</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LeaveLetterForm;
