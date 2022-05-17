import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterForm from "./RegisterForm";

const theme = createTheme();

const RegisterPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../../../img/background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-extrabold">
              <div className="w-full text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                OurClub
              </div>
              <hr className="border-b border-indigo-500 my-2" />
              <div className="w-full text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Kulübe Hoşgeldin
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Hesap Oluştur
            </Typography>
            <RegisterForm />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterPage;
