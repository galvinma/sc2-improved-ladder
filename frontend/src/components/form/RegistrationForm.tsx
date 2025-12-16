import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import formStyles from "./Form.module.scss";
import buttonStyles from ".././Button/Button.module.scss";
import appStyles from "../.././styles/App.module.scss";
import * as React from "react";
import { useState, type JSX } from "react";
import { handleRegistration } from "../../funcs/auth";

export default function RegistrationForm(): JSX.Element {
  const title = "Register";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkRegistration = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      handleRegistration(email, firstName, lastName, password, confirmPassword);
    }
  };

  return (
    <Box
      className={formStyles.formWrapper}
      onKeyDown={(e) => checkRegistration(e)}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          {title}
        </Typography>
      </Box>

      <Box className={formStyles.formContainer}>
        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="register-email">
            <Typography variant="body1">Email Address</Typography>
          </InputLabel>
          <Input
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="register-first-name">
            <Typography variant="body1">First Name</Typography>
          </InputLabel>
          <Input
            id="register-first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="register-last-name">
            <Typography variant="body1">Last Name</Typography>
          </InputLabel>
          <Input
            id="register-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>

        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="register-password">
            <Typography variant="body1">Password</Typography>
          </InputLabel>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl className={formStyles.formControlContainer}>
          <InputLabel htmlFor="register-confirm-password">
            <Typography variant="body1">Confirm Password</Typography>
          </InputLabel>
          <Input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box className={buttonStyles.actionButtonContainer}>
        <Button
          variant="contained"
          disableElevation
          className={buttonStyles.actionButton}
          onClick={() =>
            handleRegistration(
              email,
              firstName,
              lastName,
              password,
              confirmPassword,
            )
          }
        >
          <Typography variant="body1" className={appStyles.invertPrimaryFont}>
            Join
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
