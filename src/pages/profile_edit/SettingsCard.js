import { useState } from "react";
import { Button, TextField, Box, Alert } from "@mui/material";
import { userMemo } from "../../store/selector";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { emailEditInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";

const SettingsCard = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [userCheck, setUsercheck] = useState(false);
  const user = useSelector(userMemo);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Lütfen uygun bir mail adresi girin")
      .required("Zorunlu alan"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: user.currentUser.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        emailEditInitiate(
          values.email,
          user.currentUser.username,
          user.currentUser.uid
        )
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
      <Box component="form" noValidate onSubmit={handleSubmit} x={{ mt: 1 }}>
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
            {errors.name && <Alert severity="error">{errors.name}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail Adres"
              name="email"
              autoComplete="email"
              defaultValue={user.currentUser.email}
              onChange={handleChange}
              values={values.name}
            />
            <Button
              type="submit"
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

export default SettingsCard;
