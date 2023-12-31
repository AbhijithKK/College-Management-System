import "./AddComplaint.css";
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { StudentCompliantPostApi } from "../../../api/StudentApi";
import Swal from "sweetalert2";
import SideBarStudent from "../SideBar/SideBarStudent";

function AddComplaint() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errMsg, setErrmsg] = useState("");
  const sendComplaint = async () => {
    if (title.trim() && content.trim()) {
      let data = await StudentCompliantPostApi(title, content);
      if (data === true) {
        Swal.fire({
          icon: "success",

          text: "Complaint Registered Successfully",
        });
        setContent("");
        setTitle("");
        setErrmsg("");
      }
    } else {
      setErrmsg("Fill all the fileds");
    }
  };
  return (
    <div style={{ backgroundColor: "gray", height: "100vh " }}>
      <SideBarStudent />
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
      >
        <div style={{ marginLeft: "20px " }}>
          <div className="mask gradient-custom-3"></div>
          <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
            <MDBCardBody className="px-5">
              <h2 className="text-uppercase text-center mb-5">
                Report Your Complaint
              </h2>
              <p style={{ color: "red" }}>{errMsg}</p>
              <MDBInput
                wrapperClass="mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                size="lg"
                id="form1"
                type="text"
              />
              <MDBTextArea
                label="Message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="textAreaExample"
                rows={4}
                wrapperClass="mb-4"
                size="lg"
              />

              <MDBBtn
                className="mb-4 w-100 gradient-custom-4"
                type="button"
                onClick={sendComplaint}
                size="lg"
                style={{backgroundColor:"#206a3d"}}
              >
                Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    </div>
  );
}

export default AddComplaint;
