import { useState } from "react";
import { Button, TextField, Box, Alert } from "@mui/material";
import { userMemo } from "../../store/selector";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { profileEditInitiate } from "../../store/actions/userAction";
import ReactLoading from "react-loading";

const EditProfileCard = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [userCheck, setUsercheck] = useState(false);
  const user = useSelector(userMemo);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "İsim en az 3 karakter içermelidir")
      .max(30, "İsim en fazla 30 karakter içermelidir")
      .required("Zorunlu alan"),
    username: Yup.string()
      .min(3, "Kullanıcı adı en az 3 karakter içermelidir")
      .max(30, "Kullanıcı adı en fazla 30 karakter içermelidir")
      .required("Zorunlu alan"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: user.currentUser.displayName,
      username: user.currentUser.username,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        profileEditInitiate(values.name, values.username, user.currentUser.uid)
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
    <div className="mx-6 mt-4 p-4 bg-white ">
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
              id="name"
              label="İsim"
              name="name"
              defaultValue={user.currentUser.displayName}
              onChange={handleChange}
              values={values.name}
            />
            {errors.username && (
              <Alert severity="error">{errors.username}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              defaultValue={user.currentUser.username}
              onChange={handleChange}
              values={values.username}
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

export default EditProfileCard;
