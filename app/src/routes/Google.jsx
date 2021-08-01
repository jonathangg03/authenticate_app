import React, { Component } from "react";
import axios from "axios";

class Google extends Component {
  async componentDidMount() {
    await axios.get("http://localhost:3000/api/user/auth/google");
  }

  render() {
    return <h1>Start auth with google</h1>;
  }
}

export default Google;
