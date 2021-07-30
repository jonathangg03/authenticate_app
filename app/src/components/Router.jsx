import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../routes/Login";
import Home from "../routes/Home";

const Router = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    try {
      const cookieA = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      if (cookieA) {
        setLogged(true);
      }
    } catch (err) {
      setLogged(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout logged={logged}>
        <Switch>
          <Route exact path="/" component={logged ? Home : Login} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
