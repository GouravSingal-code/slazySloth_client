import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../../../slazysloth.jpg";
import {v4 as uuidv4} from "uuid";
import {getRequest, postRequest} from "../../../Fetch/request";
import {isValidEmail , isStrongPassword} from "../../../Utils/CheckEmailAndPassword";
import Popup from "../../Popup/PopUp";
import PopUp from "../../Popup/PopUp";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({handleLogin}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [popUpTitle, setPopUpTitle] = React.useState("");
  const [popUpMsg , setPopUpMsg] = React.useState("");
  const [popUpColor , setPopUpColor] = React.useState("red");

  const setPopProps = (title , msg, color) =>{
    setPopUpMsg(msg);
    setPopUpTitle(title);
    setPopUpColor(color);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if( !isValidEmail(email) ){
      setPopProps("Alert" , "email format is not correct", "red");
      handleOpen();
    }else if( !isStrongPassword(password) ){
      setPopProps("Alert" , "password should have at least 8 characters and contains a mix of letters, numbers, and symbols", "red");
      handleOpen();
    } else {
      const userObject = {
        email: email,
        password: password,
      };
      let postResponse = await postRequest("http://localhost:8000/login", userObject);
      postResponse = JSON.parse(postResponse);
      if( postResponse.status === "200" ){
        localStorage.setItem('profileObject',JSON.stringify(postResponse["_doc"]));
        handleLogin();
        window.location.href = '/';
      }else{
        setPopProps("Alert", postResponse.message, "red");   // setPopProps("Alert" , "email format is not correct");
        handleOpen();
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PopUp open={open} handleClose={handleClose} popUpTitle={popUpTitle} popUpMsg={popUpMsg} popUpColor={popUpColor} />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "pink",
            backgroundSize: "80%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, backgroundColor: "white" }}>
              <img
                src={"/images/logo_without_background.png"}
                alt="slazysloth"
                style={{ height: "50px", width: "160px" }}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/setPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
