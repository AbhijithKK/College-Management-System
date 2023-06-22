import React from "react";
import "./UploadNotice.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
const UploadNotice = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
           <div className="uplodform">
           <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Notice Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select pdf</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
           </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadNotice;
