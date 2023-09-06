/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [data, setData] = useState({ email: "", password: "" });
  const Submit = async (e) => {
    e.preventDefault();
    try {
      //API call
      const respone = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await respone.json();
      if (json.success) {
        console.log(json);
        //Save the auth Token and Redirect
        localStorage.setItem("token", json.token);
        props.showAlert("Login Successfully!", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid credentials!", "danger");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h2>Login</h2>
        <form onSubmit={Submit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={onChange}
              value={data.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={onChange}
              value={data.password}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
