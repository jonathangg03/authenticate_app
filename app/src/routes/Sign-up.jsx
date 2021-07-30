import React, { Component } from "react";
import Loading from "../components/Loading";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      formValues: {
        email: "",
        password: "",
      },
    };
  }

  handleChangeFormValues = (event) => {
    this.setState({
      ...this.state,
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    this.setState({ ...this.state, loading: true });
    try {
      const response = await axios({
        url: "http://localhost:3000/api/user/sign-in",
        method: "post",
        auth: {
          username: this.state.formValues.email,
          password: this.state.formValues.password,
        },
      });
      document.cookie = `token=${response.data.token}`;
      this.setState({ ...this.state, loading: false });
      location.reload();
    } catch (error) {
      this.setState({ ...this.state, loading: false, error: error });
    }
  };

  handleClick = () => {
    const cookieA = document.cookie
      .split("; ")
      .find((row) => row.startsWith("s="))
      .split("=")[1];
    if (cookieA) {
      console.log("a");
    } else {
      console.log("b");
    }
  };

  render() {
    return (
      <>
        <form action="" onSubmit={this.handleLogin}>
          <label htmlFor="">Email:</label>
          <input
            type="text"
            placeholder="Ingrese su email"
            value={this.state.formValues.email}
            name="email"
            onChange={this.handleChangeFormValues}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            placeholder="Ingrese su password"
            name="password"
            value={this.state.formValues.password}
            onChange={this.handleChangeFormValues}
          />
          <button type="submit">Log in</button>
        </form>
        {this.state.loading && <Loading />}
      </>
    );
  }
}

export default Login;
