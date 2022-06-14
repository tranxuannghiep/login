import * as yup from "yup";

export const validationRegisterSchema = yup.object({
  email: yup.string().email("emailInvalid").required("emailRequire"),
  password: yup
    .string()
    .min(4, "minPasswordInvalid")
    .required("passwordRequire"),
  repeatPassword: yup
    .string()
    .required("repeatPasswordRequire")
    .oneOf([yup.ref("password")], "repeatPasswordNotMatch"),
  name: yup
    .string()
    .required("nameRequire")
    .test("should has at least two words", "tooShort", (value = "") => {
      return value.trim().split(" ").length >= 2;
    }),
  gender: yup.string().required("genderRequired"),
  region: yup.string().required("regionRequired"),
  state: yup.string().required("stateRequired"),
});
