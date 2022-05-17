import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ClubPage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  ProfileEditPage,
  AccountSettings,
  PasswordSettings,
  CreateClubPage,ManageClubPage
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import GetPage from "./GetPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/login"
          element={<GetPage Page={LoginPage} header={false} />}
        />
        <Route
          exact
          path="/register"
          element={<GetPage Page={RegisterPage} header={false} />}
        />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<GetPage Page={HomePage} />} />
        </Route>
        <Route exact path="/:club" element={<ProtectedRoute />}>
          <Route
            exact
            path="/:club"
            element={<GetPage Page={ClubPage} header={false} />}
          />
        </Route>
        <Route exact path="/p/:userId" element={<ProtectedRoute />}>
          <Route
            exact
            path="/p/:userId"
            element={<GetPage Page={ProfilePage} />}
          />
        </Route>
        <Route exact path="/profile-edit" element={<ProtectedRoute />}>
          <Route
            exact
            path="/profile-edit"
            element={<GetPage Page={ProfileEditPage} />}
          />
        </Route>
        <Route exact path="/settings" element={<ProtectedRoute />}>
          <Route
            exact
            path="/settings"
            element={<GetPage Page={AccountSettings} />}
          />
        </Route>
        <Route exact path="/password" element={<ProtectedRoute />}>
          <Route
            exact
            path="/password"
            element={<GetPage Page={PasswordSettings} />}
          />
        </Route>
        <Route exact path="/create-club" element={<ProtectedRoute />}>
          <Route
            exact
            path="/create-club"
            element={<GetPage Page={CreateClubPage} />}
          />
        </Route>
        <Route exact path="/manage-club" element={<ProtectedRoute />}>
          <Route
            exact
            path="/manage-club"
            element={<GetPage Page={ManageClubPage} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
