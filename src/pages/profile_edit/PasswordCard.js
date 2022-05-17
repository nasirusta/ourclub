import { useState } from "react";
import { Button, TextField, Box, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { passwordEditInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userMemo } from "../../store/selector";

const PasswordCard = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [userCheck, setUsercheck] = useState(false);
  const user = useSelector(userMemo);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter içermelidir")
      .max(30, "Şifre en fazla 30 karakter içermelidir")
      .required("Zorunlu alan"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Şifre uyuşmuyor"
    ),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        passwordEditInitiate(values.username, values.password)
      )
        .then(() => {
          setAlertShow(true);
        })
        .catch((error) => {
          setUsercheck(error);
          setAlertShow(false);
        });
    },
  });

  return (
    <div className="mx-6 mt-4 p-4 bg-white">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {!user.loading && userCheck && (
          <Alert severity="error">{userCheck}</Alert>
        )}
        {!user.loading && alertShow && (
          <Alert severity="success">Güncellendi!</Alert>
        )}
        {user.loading && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
            <ReactLoading type={"spin"} color="#1976d2" />
          </div>
        )}
        {!user.loading && (
          <div className="block w-full h-auto">
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              onChange={handleChange}
              values={values.password}
              autoComplete="current-password"
            />
            {errors.passwordConfirmation && (
              <Alert severity="error">{errors.passwordConfirmation}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Şifre tekrar"
              type="password"
              id="passwordConfirmation"
              onChange={handleChange}
              values={values.passwordConfirmation}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              lang={"tr"}
            >
              Güncelle
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default PasswordCard;
