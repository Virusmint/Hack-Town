import React from "react";
import { FaSpotify } from "react-icons/fa";

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="btn-login" href="/auth/login">
          <FaSpotify />
        </a>
      </header>
    </div>
  );
}

export default Login;
