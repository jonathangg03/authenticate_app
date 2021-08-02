import React, { Component } from "react";
import Loading from "../components/Loading";
import LoginButtons from "../components/LoginButtons";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      formValues: {
        firstName: "",
        lastName: "",
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

  handleLogin = () => {
    this.props.history.push("/");
  };

  handleSignUp = async (event) => {
    event.preventDefault();
    this.setState({ ...this.state, loading: true });
    try {
      await axios({
        url: "http://localhost:3000/api/user/sign-up",
        method: "post",
        data: this.state.formValues,
      });
      this.setState({ ...this.state, loading: false });
      this.props.history.push("/");
      location.reload();
    } catch (error) {
      this.setState({ ...this.state, loading: false, error: error });
    }
  };

  render() {
    return (
      <>
        <form action="" onSubmit={this.handleSignUp}>
          <label htmlFor="">First name:</label>
          <input
            type="text"
            value={this.state.formValues.firstName}
            name="firstName"
            required
            onChange={this.handleChangeFormValues}
          />
          <label htmlFor="">Last name:</label>
          <input
            type="text"
            name="lastName"
            required
            value={this.state.formValues.lastName}
            onChange={this.handleChangeFormValues}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={this.state.formValues.email}
            onChange={this.handleChangeFormValues}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="password"
            required
            value={this.state.formValues.password}
            onChange={this.handleChangeFormValues}
          />
          <button type="submit">Sign up</button>
          <LoginButtons />
          <p className="invite__text">
            You already have an account?
            <Link to="/">Log in</Link>
          </p>
        </form>
        {this.state.loading && <Loading />}
      </>
    );
  }
}

export default SignUp;
