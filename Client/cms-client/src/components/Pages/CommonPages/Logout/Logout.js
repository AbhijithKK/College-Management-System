import { useDispatch } from "react-redux";
import axios from "../../../../Utils/Axios/Axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = (prop) => {
  if (prop.data.logout === "/student") {
    localStorage.removeItem("sid");
  }
  if (prop.data.logout === "/faculty") {
    localStorage.removeItem("fid");
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios
    .get(`${prop.data.logout}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      if (data.data === true) {
        navigate("/");
        dispatch({ type: "refresh" });
      }
    });
  return <div></div>;
};

export default Logout;
