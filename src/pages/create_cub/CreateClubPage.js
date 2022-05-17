import { Button, TextField, Box, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { userMemo } from "../../store/selector";
import { createClub } from "../../store/actions/clubAction";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateClubPage = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userMemo);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Kulp adı en az 5 karakter içermelidir")
      .max(60, "Kulp adı en fazla 60 karakter içermelidir")
      .required("Zorunlu alan"),
    about: Yup.string()
      .min(10, "En az 10 karakter içermelidir")
      .max(120, "En fazla 120 karakter içermelidir")
      .required("Zorunlu alan"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      about: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        createClub(values, user.currentUser.username, user.currentUser.uid)
      )
        .then((res) => {
          navigate(`/${res.clubURL}`);
        })
        .catch((error) => {
          setError(error);
        });
    },
  });

  useEffect(() => {
    if (typeof user.currentUser.club !== "undefined") {
      navigate(`/`);
    }
  }, []);

  return (
    <div className="block w-4/6 mx-auto p-6 my-6 rounded-lg shadow border border-gray-300 bg-white">
      {error && (
        <div className="block pb-4">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {user.loading && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" />
        </div>
      )}
      {!user.loading && (
        <div>
          <div className="w-full block space-y-2">
            <h1 className="font-bold text-2xl text-gray-500">Kulüp oluştur</h1>
            <h2 className="text-sm">
              Her kullanıcı sadece bir külüp oluşturabilir.
            </h2>
            <h2 className="text-sm">Kulüp adı değiştirilemez.</h2>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <div className="block w-full h-auto">
              {errors.name && <Alert severity="error">{errors.name}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Kulüp Adı"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                values={values.name}
                autoFocus
              />
              {errors.about && <Alert severity="error">{errors.about}</Alert>}
              <TextField
                margin="normal"
                id="about"
                name="about"
                label="Kulüp Hakkında"
                fullWidth
                multiline
                minRows={3}
                maxRows={3}
                onChange={handleChange}
                values={values.about}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                lang={"tr"}
              >
                Kulübü Oluştur
              </Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default CreateClubPage;
