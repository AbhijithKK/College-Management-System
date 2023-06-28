import React, { useState } from "react";
import "./UploadNotice.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { ApiUploadNotice } from "../../api/AdminApi";
const UploadNotice = () => {
  const [title ,useTitle]=useState('')
  const [file,useFile]=useState('')
  const Title=(event)=>{
    useTitle(event.target.value)
  }
  const Files=(event)=>{
    useFile(event.target.files[0])
  }
  const[errmsg,useErrmsg]=useState('')
  const ErrorHandler=()=>{
    useErrmsg('Fill InputBox properly')
  }
  const SendFile=()=>{
    if (title.trim() && file!=='') {
      
      ApiUploadNotice(file,title)
    }else{
      ErrorHandler()
    }
  }
  console.log(file);
  return (
    <div>
      <Container>
        <Row>
          <Col>
           <div className="uplodform">
           <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <p style={{color:'red'}}>{errmsg}</p>
                <Form.Label>Notice Title</Form.Label>
                <Form.Control type="text" value={title} onChange={Title} placeholder="Enter Title" />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select pdf</Form.Label>
                <Form.Control type="file" onChange={Files} />
              </Form.Group>
              <Button type="button" onClick={SendFile}>Submit form</Button>
            </Form>
           </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadNotice;
