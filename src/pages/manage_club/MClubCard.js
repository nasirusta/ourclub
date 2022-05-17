import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Alert,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { editClubInitiate } from "../../store/actions/clubAction";
import { userMemo } from "../../store/selector";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const MClubCard = () => {
  const [alert, setAlert] = useState(false);
  const [alertError, setError] = useState(false);
  const [clubData, setClub] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userMemo);
  const validationSchema = Yup.object({
    about: Yup.string()
      .min(10, "En az 10 karakter içermelidir")
      .max(120, "En fazla 120 karakter içermelidir")
      .required("Zorunlu alan"),
    clubURL: Yup.string()
      .min(5, "En az 5 karakter içermelidir")
      .max(60, "En fazla 60 karakter içermelidir"),
  });

  let initVal = {};

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: initVal,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(
        editClubInitiate(
          values,
          user.currentUser.username,
          user.currentUser.club
        )
      )
        .then(() => {
          setAlert("Kulüp güncelendi !");
        })
        .catch((error) => {
          setError(error);
        });
    },
  });

  const getData = async () => {
    const docRef = doc(db, "clubs", user.currentUser.club);
    const docSnap = await getDoc(docRef);

    if (typeof docSnap.data().timeposts === "undefined") {
      initVal.timeposts = "public";
    } else {
      initVal.timeposts = docSnap.data().timeposts;
    }

    if (docSnap.exists()) {
      setClub({ recordID: docSnap.id, data: docSnap.data() });
      initVal.about = docSnap.data().about;
      initVal.clubURL = docSnap.data().clubURL;
    } else {
      setClub(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="block mx-6 p-6 my-4 rounded-lg shadow border border-gray-300 bg-white">
      {alertError && (
        <div className="block pb-4">
          <Alert severity="error">{alertError}</Alert>
        </div>
      )}
      {alert && (
        <div className="block pb-4">
          <Alert severity="success">{alert}</Alert>
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
            <h1 className="font-bold text-2xl text-gray-500">Kulüp yönetimi</h1>
            <h2 className="text-sm">Kulüp adı değiştirilemez.</h2>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {!clubData && (
              <div className="w-full flex flex-wrap items-center justify-center py-4">
                <ReactLoading type={"spin"} color="#1976d2" />
              </div>
            )}
            {clubData && (
              <div className="block w-full h-auto">
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Kulüp Adı"
                  name="name"
                  autoComplete="name"
                  defaultValue={clubData.data.name}
                  disabled={true}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="clubURL"
                  label="Kulüp Adresi"
                  name="clubURL"
                  autoComplete="clubURL"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
                  defaultValue={clubData.data.clubURL}
                  onChange={handleChange}
                  values={values.clubURL}
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
                  defaultValue={clubData.data.about}
                  onChange={handleChange}
                  values={values.about}
                />
                <FormControl margin="normal">
                  <FormLabel id="timeposts">Kulüp paylaşımları</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="timeposts"
                    name="timeposts"
                    onChange={handleChange}
                    values={values.timeposts}
                    value={values.timeposts}
                  >
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label="Herkese açık"
                    />
                    <FormControlLabel
                      value="members"
                      control={<Radio />}
                      label="Sadece üyeler"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  lang={"tr"}
                >
                  Kaydet
                </Button>
              </div>
            )}
          </Box>
        </div>
      )}
    </div>
  );
};

export default MClubCard;
