import { Button, TextField, Link, Box, Grid, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { userMemo } from "../../store/selector";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingState = useSelector(userMemo);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Lütfen uygun bir mail adresi girin")
      .required("Zorunlu alan"),
    password: Yup.string().required("Zorunlu alan"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginInitiate(values.email, values.password)).then(() => {
        navigate("/");
      });
    },
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {loadingState.loading && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" />
        </div>
      )}
      {!loadingState.loading && (
        <div className="block w-full h-auto">
          {errors.email && <Alert severity="error">{errors.email}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail Adres"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            values={values.email}
            autoFocus
          />
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
            Giriş Yap
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Şifrenimi unuttun?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Hesap oluştur"}
              </Link>
            </Grid>
          </Grid>
        </div>
      )}
    </Box>
  );
};

export default LoginForm;
