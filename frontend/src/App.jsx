import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Componant/Login";
import { Register } from "./Componant/Register";
import { ForgetPassword } from "./Componant/ForgetPassword";
import { ResetPassword } from "./Componant/ResetPassword";
import HomePage from "./Componant/HomePage";
import  Profile  from "./Componant/Profile";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PublicRoute from "./ProtectedRoute/PublicRoute";
import { useSelector } from "react-redux";
import UserPost from "./Componant/UserPost";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<UserPost />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
