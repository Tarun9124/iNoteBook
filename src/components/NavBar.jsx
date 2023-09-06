/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("Logout Successfullly!", "warning");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link className="btn btn-primary mx-2" role="button" to="/login">
                Login
              </Link>

              <Link className="btn btn-primary mx-2" role="button" to="/signup">
                Create New Account
              </Link>
            </div>
          ) : (
            <button className="btn btn-primary" role="button" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
