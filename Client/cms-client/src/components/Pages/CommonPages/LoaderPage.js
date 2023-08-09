import React from "react";
import { Oval } from "react-loader-spinner";
const LoaderPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Oval
        height="80"
        width="80"
        radius="15"
        color="red"
        ariaLabel="loading"
      />
    </div>
  );
};

export default LoaderPage;
