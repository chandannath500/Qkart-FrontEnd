import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect} from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const [loader, setLoader] = useState(false);
  const formData = { userName, pwd, confirmpwd };
  const [hasHiddenAuthButtons, setHasHiddenAuthButtons] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    setHasHiddenAuthButtons(true)
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    }
    if (id === "password") {
      setPwd(value);
    }
    if (id === "confirmPassword") {
      setConfirmpwd(value);
    }
  };
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function




  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    setLoader(true);
    if (validateInput(formData)) {
      try {
        await axios
          .post(`${config.endpoint}/auth/register`, {
            username: formData.userName,
            password: formData.pwd,
          })
          .then((response) => {
            setLoader(false);
            enqueueSnackbar("Registered success", {
              variant: "success",
            });
           history.push("/login");
          })
          .catch((error) => {
            setLoader(false);
            enqueueSnackbar("Username is already taken", { variant: "error" });
          });
      } catch (err) {
        setLoader(false);

        enqueueSnackbar("Username is already taken", { variant: "error" });
      }
    } else {
      setLoader(false);
    }
  };
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    // console.log(data)
    if (data.userName === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning", autoHideDuration: 3000 });
    } else if (data.userName.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning", autoHideDuration: 3000
      });
    }
    if (data.pwd === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
    } else if (data.pwd.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning", autoHideDuration: 3000
      });
    } else if (data.pwd !== data.confirmpwd) {
      enqueueSnackbar("Passwords do not match", { variant: "warning", autoHideDuration: 3000 });
    }
    if (
      data.userName !== "" &&
      data.userName.length >= 6 &&
      data.pwd !== "" &&
      data.pwd.length >= 6 &&
      data.pwd === data.confirmpwd
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
       <Header hasHiddenAuthButtons={hasHiddenAuthButtons} />     
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={userName}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={pwd}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={confirmpwd}
            onChange={(e) => handleInputChange(e)}
          />
          {!loader ? (
            <Button
              className="button"
              variant="contained"
              onClick={() => register(formData)}
            >
              register now
            </Button>
          ) : (           
            <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="success" size={25} />
          </Box>)}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
