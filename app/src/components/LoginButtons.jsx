import React from "react";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

const LoginButtons = () => {
  return (
    <>
      <a
        href="http://localhost:3000/api/user/auth/google"
        className="social__button google"
      >
        <FaGoogle className="btn__icon" />
        Enter with Google
      </a>
      <a
        href="http://localhost:3000/api/user/auth/facebook"
        className="social__button fb"
      >
        <FaFacebookF className="btn__icon" />
        Enter with Facebook
      </a>
      <a
        href="http://localhost:3000/api/user/auth/twitter"
        className="social__button tt"
      >
        <FaTwitter className="btn__icon" />
        Enter with Twitter
      </a>
    </>
  );
};

export default LoginButtons;
