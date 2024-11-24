import React from "react";
import { FaSpotify } from "react-icons/fa";

function Login() {
  return (
    <a className="btn-login" href="/auth/login">
      Login with Spotify
      <FaSpotify />
    </a>
  );
}

export default Login;
