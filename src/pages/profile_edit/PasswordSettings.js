import { LeftSide, RightSide } from "../../components";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import PasswordCard from "./PasswordCard";
import { Button, TextField, Box, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";
import { userMemo } from "../../store/selector";
import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordSettings = () => {
  const [loginState, setLoginstate] = useState(false);
  const dispatch = useDispatch();
  const loadingState = useSelector(userMemo);
  const windowWidth = useWindowWidth();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter içermelidir")
      .max(30, "Şifre en fazla 30 karakter içermelidir")
      .required("Zorunlu alan"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        loginInitiate(loadingState.currentUser.email, values.password)
      ).then(() => {
        setLoginstate(true);
      });
    },
  });

  useEffect(() => {}, [windowWidth]);

  return <div className="flex flex-wrap w-full">
  {windowWidth > 767 && (
    <div className="w-1/4">
      <LeftSide />
    </div>
  )}
  <div className="md:w-2/4 w-full">
    {!loginState && (
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        {loadingState.loading && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
            <ReactLoading type={"spin"} color="#1976d2" />
          </div>
        )}
        {!loadingState.loading && (
          <div className="block  p-4 mt-5 h-auto mx-6 bg-white">
            {errors.password && (
              <Alert severity="error">{errors.password}</Alert>
            )}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              lang={"tr"}
            >
              Devam Et
            </Button>
          </div>
        )}
      </Box>
    )}
    {loginState && (
      <div>
        <PasswordCard />
      </div>
    )}
  </div>
  {windowWidth > 767 && (
    <div className="w-1/4 mt-4">
      <RightSide />
    </div>
  )}
</div>;
};

export default PasswordSettings;
