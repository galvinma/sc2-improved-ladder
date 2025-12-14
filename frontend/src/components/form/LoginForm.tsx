import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import formStyles from "./Form.module.scss";
import appStyles from "../.././styles/App.module.scss";
import * as React from "react";
import { useState, type JSX } from "react";
import { handleLogin } from "../../funcs/auth";
import { useNavigate } from "react-router";

export default function LoginForm(): JSX.Element {
  const title = "Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const executeLogin = () => {
    handleLogin(email, password)
      .then(() => {
        navigate("/lobby");
      })
      .catch((err) => {
        console.debug(err);
      });
  };

  const checkLogin = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      executeLogin();
    }
  };

  return (
    <Box className={formStyles.formWrapper} onKeyDown={(e) => checkLogin(e)}>
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          {title}
        </Typography>
      </Box>

      <Box className={formStyles.formContainer}>
        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="login-email">
            <Typography variant="body1">Email Address</Typography>
          </InputLabel>
          <Input
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="login-password">
            <Typography variant="body1">Password</Typography>
          </InputLabel>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box className={formStyles.actionButtonContainer}>
        <Button
          variant="contained"
          disableElevation
          className={formStyles.actionButton}
          onClick={() => executeLogin()}
          onSubmit={() => executeLogin()}
        >
          <Typography variant="body1" className={appStyles.invertPrimaryFont}>
            Continue
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
