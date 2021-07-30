import React, { Component } from "react";

class Home extends Component {
  // const cookieA = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith("token="))
  //   .split("=")[1];

  render() {
    return (
      <>
        <h2>
          Welcome!!! You only can read this if you are already logged in ;)
        </h2>
        <h3>This si your information</h3>
      </>
    );
  }
}

export default Home;
