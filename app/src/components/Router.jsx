import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "../routes/Login";
import SignUp from "../routes/Sign-up";
import Home from "../routes/Home";
import NotFound from "../routes/NotFound";

const Router = (props) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    try {
      const cookieA = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      console.log(cookieA);
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
          <Route exact path="/sign-up" component={logged ? Home : SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
