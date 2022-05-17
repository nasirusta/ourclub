import { Outlet, Navigate } from "react-router-dom";
import { authtMemo } from "./store/selector";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logoutInitiate } from "./store/actions/userAction";

const ProtectedRoute = () => {
  const authUser = useSelector(authtMemo);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      dispatch(logoutInitiate());
    }
  });

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
