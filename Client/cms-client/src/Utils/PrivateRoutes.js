import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./Axios/Axios";
import React from "react";
import { Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = ({ role, route }) => {
  const dispatch = useDispatch()
  const refresh = useSelector((state) => {
    return state.refresh;
  });

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (role === "admin") {
      axios
        .get("/admin/checkAuth", {
          headers: { "Content-Type": "application/json" },
        })
        .then((data) => {
          if (data.data === true) {
            setAuth(true);
          } else {
            setAuth(false);
          }
          dispatch({ type: "admin", payload: { login: data.data } });
        });
    } else if (role === "student") {
      axios
        .get("/student/checkAuth", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((data) => {
          if (data.data === true) {
            setAuth(true);
          } else {
            setAuth(false);
          }
          dispatch({ type: "student", payload: { login: data.data } });
        });
    } else if (role === "faculty") {
      axios
        .get("/faculty/checkAuth", {
          headers: { "Content-Type": "application/json" },
        })
        .then((data) => {
          if (data.data === true) {
            setAuth(true);
          } else {
            setAuth(false);
          }
          dispatch({ type: "faculty", payload: { login: data.data } });
        });
    }
  }, [refresh, dispatch, role]);
  if (auth == null) return;
  return (auth ? <Outlet /> : <Navigate to={route} />)
};

export default PrivateRoutes;
