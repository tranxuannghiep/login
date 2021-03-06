import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
// import * as yup from "yup";
import { useFormik } from "formik";
import { ILoginParams } from "models/auth";
import { validateLogin, validLogin } from "../utils";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { RESPONSE_STATUS_SUCCESS } from "utils/httpResponseCode";
import { setUserInfo } from "../redux/authReducer";
import { getErrorMessageResponse } from "utils";
import InputFiled from "components/form-controls/InputFiled";
import PasswordFiled from "components/form-controls/PasswordFiled";
import { RootState } from "redux/reducer";
import { ROUTES } from "configs/routes";
import { FormattedMessage } from "react-intl";
import { ACCESS_TOKEN_KEY } from "utils/constants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    maxWidth: "600px",
    margin: "0 auto",
  },
  login: {
    padding: "20px",
    "&  .MuiFormHelperText-root": {
      fontSize: "16px",
    },
  },
}));
export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  // const validationSchema = yup.object({
  //   email: yup
  //     .string()
  //     .email("Enter a valid email")
  //     .required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(4, "Password should be of minimum 8 characters length")
  //     .required("Password is required"),
  // });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    // validate ch???y = yup
    // validationSchema: validationSchema,
    // validate ch???y = c??m
    validate: (values: ILoginParams) => {
      const validate = validateLogin(values);
      if (validLogin(validate)) {
        return;
      }
      return validate;
    },

    onSubmit: async (formValues: ILoginParams) => {
      setLoading(true);
      const res = await dispatch(
        fetchThunk(API_PATHS.signIn, "post", {
          email: formValues.email,
          password: formValues.password,
        })
      );
      setLoading(false);
      if (res?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(res.data));
        if (formValues.rememberMe) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token);
        } else localStorage.removeItem(ACCESS_TOKEN_KEY);
        navigate(ROUTES.home, { replace: true });
        return;
      }
      setErrorMessages(getErrorMessageResponse(res));
    },
  });

  return (
    <Box className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.login}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Tcj3W5LZYlioIj5o9yXL0fHeYrcBstH98OOPxWqnsmdzUZgLNVkrAKdP92zLEftSXoU&usqp=CAU"
            alt=""
            style={{
              maxWidth: "250px",
              margin: "0 auto",
              textAlign: "center",
              display: "block",
            }}
          />
          {!!errorMessages && (
            <Typography color="red">
              <FormattedMessage id={errorMessages} />
            </Typography>
          )}

          <InputFiled label="Email" name="email" form={formik} />
          <PasswordFiled label="Password" name="password" form={formik} />
          <FormControlLabel
            style={{ marginTop: "8px" }}
            control={
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label="L??u th??ng tin ????ng nh???p"
          />
          <Box textAlign="center">
            <LoadingButton loading={loading} type="submit" variant="contained">
              <FormattedMessage id="login" />
            </LoadingButton>
          </Box>
          <Box textAlign="center" mt={2}>
            <Button onClick={() => navigate(ROUTES.register)}>
              <FormattedMessage id="registerNow" />
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
