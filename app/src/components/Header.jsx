import React from "react";

const Header = ({ logged, history }) => {
  const handleLoggout = () => {
    document.cookie = "token=; max-age=0";
    location.reload();
  };

  const handleSignUp = () => {
    history.push("/sign-up");
  };

  return (
    <header>
      <h1>AUTHENTICATE APP</h1>
      {logged ? (
        <button onClick={handleLoggout}>Log out</button>
      ) : (
        <button onClick={handleSignUp}>Sign up</button>
      )}
    </header>
  );
};

export default Header;
