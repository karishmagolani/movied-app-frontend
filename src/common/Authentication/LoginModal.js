import {
  Modal,
  Typography,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import React, { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const LoginModal = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiFail, setApiFail] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOnLoginClick = () => {
    if (!username || !password) {
      setError(true);
    }
    const input = window.btoa(`${username}:${password}`);
    fetch("http://localhost:8085/api/v1/auth/login", {
      method: "POST",
      headers: {
        authorization: `Basic ${input}`,
        Accept: "application/json;charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res.headers.get("access-token"));
        if (res.status !== 200) {
          setApiFail(true);
        } else {
          window.localStorage.setItem(
            "access-token",
            res.headers.get("access-token")
          );
          setApiFail(false);
          handleClose();
          window.location.reload();
        }
      })
      .catch((err) => err);
  };
  const handleOnSignupClick = () => {
    if (!email || !firstName || !lastName || !contact || !password) {
      setError(true);
      return;
    }
    fetch("http://localhost:8085/api/v1/signup", {
      method: "POST",
      body: {
        email_address: email,
        first_name: firstName,
        last_name: lastName,
        mobile_number: contact,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        setError(false);
        setSuccess(true);
      })
      .catch((err) => err);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "300px",
    background: "#fff",
    border: "2px solid #000",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px",
    padding: "32px",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style}>
        <div sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <FormControl style={{ width: "100%" }}>
            <Input
              id="username"
              aria-describedby="username"
              placeholder="Username*"
              required
              style={{ paddingTop: "20px" }}
              onChange={(event) => setUsername(event.target.value)}
            />
            {error && !username && (
              <FormHelperText id="username-text">Error</FormHelperText>
            )}
            <Input
              id="password"
              aria-describedby="password"
              placeholder="Password*"
              type="password"
              required
              style={{ paddingTop: "15px" }}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && !password && (
              <FormHelperText id="password-text">Error</FormHelperText>
            )}
            {apiFail && (
              <div style={{ marginTop: "10px" }}>Error occured, try again</div>
            )}
            <div style={{ paddingTop: "15px", textAlign: "center" }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                onClick={handleOnLoginClick}
              >
                Login
              </Button>
            </div>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormControl error={error} style={{ width: "100%" }}>
            <Input
              id="firstname"
              aria-describedby="firstname"
              placeholder="First Name*"
              required={true}
              style={{ paddingTop: "20px" }}
              onChange={(event) => setFirstName(event.target.value)}
            />
            {error && !firstName && (
              <FormHelperText id="firstname-text">Error</FormHelperText>
            )}
            <Input
              id="lastname"
              aria-describedby="lastname"
              placeholder="Last Name*"
              required={true}
              style={{ paddingTop: "20px" }}
              onChange={(event) => setLastName(event.target.value)}
            />
            {error && !lastName && (
              <FormHelperText id="lastname-text">Error</FormHelperText>
            )}
            <Input
              id="email"
              aria-describedby="email"
              placeholder="Email*"
              required={true}
              style={{ paddingTop: "20px" }}
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            {error && !email && (
              <FormHelperText id="email-text">Error</FormHelperText>
            )}
            <Input
              id="password"
              aria-describedby="password"
              placeholder="Password*"
              type="password"
              required={true}
              style={{ paddingTop: "15px" }}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && !password && (
              <FormHelperText id="password-text">Error</FormHelperText>
            )}
            <Input
              id="contact"
              aria-describedby="contact"
              placeholder="Contact No*"
              required={true}
              style={{ paddingTop: "20px" }}
              onChange={(event) => setContact(event.target.value)}
            />
            {error && !contact && (
              <FormHelperText id="contact-text">Error</FormHelperText>
            )}
            {success && (
              <div style={{ marginTop: "10px" }}>
                Registration Successful. Please Login!
              </div>
            )}
            <div style={{ paddingTop: "15px", textAlign: "center" }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                onClick={handleOnSignupClick}
              >
                Sign Up
              </Button>
            </div>
          </FormControl>
        </TabPanel>
      </div>
    </Modal>
  );
};

export default LoginModal;
