import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: null,
      data: [],
    };
  }

  async componentDidMount() {
    this.setState({ ...this.state, loading: true });
    try {
      const cookieA = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      const response = await axios.get(
        `http://localhost:3000/api/user/${cookieA}`
      );

      this.setState({
        ...this.state,
        loading: false,
        data: Object.values(response.data),
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false, error: error.message });
    }
  }

  /*
          {this.state.data.map((userInfoElement) => (
          <div key={userInfoElement.id}>
            <ul>
              <li>First name: {userInfoElement.firstName}</li>
              <li>Last name: {userInfoElement.lastName}</li>
              <li>Email: {userInfoElement.email}</li>
            </ul>
          </div>
        ))}
  */

  render() {
    return (
      <>
        <h2 className="home__title">
          Welcome!!! You only can read this if you are already logged in ;)
        </h2>
        <div className="home__container">
          <h3>This si your information:</h3>
          <ul>
            <li>First name: {this.state.data[0]}</li>
            <li>Last name: {this.state.data[1]}</li>
            <li>Email: {this.state.data[2]}</li>
          </ul>
        </div>
      </>
    );
  }
}

export default Home;
