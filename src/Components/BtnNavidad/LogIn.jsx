import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

import { useDispatch, useSelector } from 'react-redux';
import { asyncLogIn } from '../redux/slice';
import "./BtnNavidad.css";
const API = process.env.REACT_APP_API_STRAPI;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogIn = ({ onLoginSuccess }) => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const { usuarioComander, comercio } = useSelector((state) => state.alldata);

  useEffect(() => {
    if (!usuarioComander) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [usuarioComander]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const success = await dispatch(asyncLogIn(credentials));
      if (success) {
        setOpen(false);
      } else {
        // Manejar el caso de inicio de sesión fallido si es necesario
        console.log('Login failed');
      }
    } catch (error) {
      // Manejar el error adecuadamente
      console.error('An error occurred during login:', error);
    }
  };
  

  return (
    <div className="btnNav">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="infoNavi">
          <div>
            <img src={`${API}${comercio?.attributes?.logo?.data?.attributes?.url}`} alt="logo" width="100px" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="login-container">
            <h2 className="login-heading">Log In</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="login-submit"
              >
                Log in
              </button>
            </form>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default LogIn;
