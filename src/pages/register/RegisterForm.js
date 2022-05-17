import { Button, TextField, Link, Box, Grid, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userMemo } from "../../store/selector";

const RegisterForm = () => {
  const loadingState = useSelector(userMemo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "İsim en az 3 karakter içermelidir")
      .max(30, "İsim en fazla 30 karakter içermelidir")
      .required("Zorunlu alan"),
    email: Yup.string()
      .email("Lütfen uygun bir mail adresi girin")
      .required("Zorunlu alan"),
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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        registerInitiate(values.email, values.password, values.name)
      ).then(() => {
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
          {errors.name && <Alert severity="error">{errors.name}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="İsminiz"
            name="name"
            onChange={handleChange}
            values={values.name}
            autoFocus
          />
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
          />
          {errors.password && <Alert severity="error">{errors.password}</Alert>}
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
            Hesap Oluştur
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                {"Kayıtlı bir hesabın var mı? Giriş yap"}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Şifrenimi unuttun?
              </Link>
            </Grid>
          </Grid>
        </div>
      )}
    </Box>
  );
};

export default RegisterForm;
