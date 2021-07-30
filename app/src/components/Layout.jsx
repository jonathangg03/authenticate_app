import React from "react";
import Header from "./Header";

const Layout = ({ children, logged }) => {
  return (
    <>
      <Header logged={logged} />
      {children}
    </>
  );
};

export default Layout;
