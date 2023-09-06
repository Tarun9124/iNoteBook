import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const Submit = async (e) => {
    e.preventDefault();
    try {
      //API call
      const respone = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const json = await respone.json();
      if (json.success) {
        console.log(json);
        //Save the auth Token and Redirect
        localStorage.setItem("token", json.token);
        navigate("/");
        props.showAlert("Account Created Successfully!", "success");
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
        <h2>Create New Account</h2>
        <form onSubmit={Submit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              onChange={onChange}
              value={data.name}
              required
              minLength={5}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={onChange}
              value={data.email}
              required
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
              required
              minLength={8}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              placeholder="Enter Confirm Password"
              onChange={onChange}
              value={data.cpassword}
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create New Account
          </button>
        </form>
      </div>
    </>
  );
}
