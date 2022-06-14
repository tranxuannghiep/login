import { LoadingButton } from "@mui/lab";
import { Box, Button, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AsyncSelectFiled from "components/form-controls/AsyncSelectFiled/AsyncSelectFiled";
import InputFiled from "components/form-controls/InputFiled";
import PasswordFiled from "components/form-controls/PasswordFiled";
import SelectFiled from "components/form-controls/SelectFiled/SelectFiled";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import { useFormik } from "formik";
import { ILocationParams, ISignUpParams } from "models/auth";
import { fetchThunk } from "modules/common/redux/thunk";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { getErrorMessageResponse } from "utils";
import { RESPONSE_STATUS_SUCCESS } from "utils/httpResponseCode";
import { validationRegisterSchema } from "utils/validate.util";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    maxWidth: "600px",
    margin: "0 auto",
  },
  register: {
    padding: "20px",
    "&  .MuiFormHelperText-root": {
      fontSize: "16px",
    },
  },
}));
export interface RegisterFormProps {}

export default function RegisterForm(props: RegisterFormProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [regionList, setRegionList] = useState<ILocationParams[]>([]);
  const [stateList, setSateList] = useState<ILocationParams[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const onChangeId = useCallback(
    (id: number) => {
      const getLocationById = async () => {
        const json = await dispatch(
          fetchThunk(API_PATHS.getLocationByPid(id), "get")
        );
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
          setSateList(json.data);
          return;
        }
      };
      getLocationById();
    },
    [dispatch]
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      gender: "",
      region: "",
      state: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit: async (formValues: ISignUpParams) => {
      setErrorMessages("");
      setLoading(true);
      const res = await dispatch(
        fetchThunk(API_PATHS.signUp, "post", formValues)
      );
      setLoading(false);
      if (res?.code === RESPONSE_STATUS_SUCCESS) {
        alert("Chúc mừng bạn đã đăng ký thành công");

        navigate(ROUTES.login);
        return;
      }
      setErrorMessages(getErrorMessageResponse(res));
    },
  });
  const getLocation = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, "get"));
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setRegionList(json.data);
      return;
    }
  }, [dispatch]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <Box className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.register}>
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

          <InputFiled label="Địa chỉ Email" name="email" form={formik} />
          <PasswordFiled label="Mật khẩu" name="password" form={formik} />
          <PasswordFiled
            label="Xác nhận lại mật khẩu"
            name="repeatPassword"
            form={formik}
          />
          <InputFiled label="Họ và tên" name="name" form={formik} />
          <SelectFiled label="Giới tính" name="gender" form={formik} />
          <AsyncSelectFiled
            label="Quốc gia"
            name="region"
            form={formik}
            items={regionList}
            onChangeId={onChangeId}
          />

          <AsyncSelectFiled
            label="Thành phố"
            name="state"
            form={formik}
            items={stateList}
          />

          <Box textAlign="center">
            <LoadingButton loading={loading} type="submit" variant="contained">
              <FormattedMessage id="register" />
            </LoadingButton>
          </Box>
          <Box textAlign="center" mt={2}>
            <Button onClick={() => navigate(ROUTES.login)}>
              <FormattedMessage id="loginNow" />
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
