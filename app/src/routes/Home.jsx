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
        data: response.data,
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false, error: error.message });
    }
  }

  handleLoggout = () => {
    document.cookie = "token=; max-age=0";
    location.reload();
  };

  render() {
    return (
      <>
        <h2 className="home__title">
          Welcome!!! You only can read this if you are already logged in ;)
        </h2>
        <div className="home__container">
          <h3>This si your information:</h3>
          <ul>
            {console.log(this.state.data)}
            <li>First name: {this.state.data.firstName || "N/F"}</li>
            <li>Last name: {this.state.data.lastName || "N/F"}</li>
            <li>Email: {this.state.data.email || "N/F"}</li>
          </ul>
          <button
            type="button"
            onClick={this.handleLoggout}
            className="home__button"
          >
            Log out
          </button>
        </div>
      </>
    );
  }
}

export default Home;
