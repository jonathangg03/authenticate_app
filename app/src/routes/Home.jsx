import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
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
    const response = await axios({
      url: "http://localhost:3000/api/user/sign-in",
      method: "post",
      auth: {
        username: this.state.formValues.email,
        password: this.state.formValues.password,
      },
    });
    console.log(response);
  };

  render() {
    return (
      <>
        <form action="" onSubmit={this.handleLogin}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Ingrese su email"
            value={this.state.formValues.email}
            name="email"
            onChange={this.handleChangeFormValues}
          />
          <label htmlFor="">Password</label>
          <input
            type="text"
            placeholder="Ingrese su password"
            name="password"
            value={this.state.formValues.password}
            onChange={this.handleChangeFormValues}
          />
          <button type="submit">Ingresar</button>
        </form>
      </>
    );
  }
}

export default Home;
