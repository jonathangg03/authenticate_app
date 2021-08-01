import React, { Component } from "react";
import Loading from "../components/Loading";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            value={this.state.formValues.email}
            name="email"
            onChange={this.handleChangeFormValues}
            required
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.formValues.password}
            onChange={this.handleChangeFormValues}
            required
          />
          <button type="submit">Log in</button>
          <a
            href="http://localhost:3000/api/user/auth/google"
            className="google__button"
          >
            <FaGoogle className="btn__icon" />
            Ingresar con Google
          </a>
          <button onClick={this.handleSignUpFacebook} className="fb__button">
            <FaFacebookF className="btn__icon" />
            Facebook
          </button>
          <button onClick={this.handleSignUpTwitter} className="tt__button">
            <FaTwitter className="btn__icon" />
            Twitter
          </button>
          {/* <button onClick={this.handleSignUp}>Sign up</button> */}
          <p className="invite__text">
            You do not have an account?
            <Link to="/sign-up">Sign up</Link>
          </p>
        </form>
        {this.state.loading && <Loading />}
      </>
    );
  }
}

export default Login;
