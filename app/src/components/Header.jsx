import React from "react";

const Header = ({ logged }) => {
  const handleLoggout = () => {
    document.cookie = "token=; max-age=0";
    location.reload();
  };

  return (
    <header>
      <h1>AUTHENTICATE APP</h1>
      {logged && <button onClick={handleLoggout}>Log out</button>}
    </header>
  );
};

export default Header;
