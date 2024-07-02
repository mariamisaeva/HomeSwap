import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogInProvider from "./context/LogInProvider/LogInProvider";
import ProtectedProfile from "./components/ProtectedRoute/ProtectedProfile";
import ViewProperty from "./components/ViewProperty/ViewProperty";
import UploadProperty from "./pages/UploadProperty/UploadProperty";
import ProfileComponent from "./components/Profile/ProfileComponent";
import { ToastContainer } from "react-toastify";
import RequestListPage from "./components/RequestListPage/RequestListPage";

const App = () => {
  return (
    <LogInProvider>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route element={<ProtectedProfile />}>
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/home" element={<Home />} />
          <Route path="/swap/requests/:id" element={<RequestListPage />} />
          <Route path="/property/view/:id" element={<ViewProperty />} />
          <Route path="/property/upload" element={<UploadProperty />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </LogInProvider>
  );
};

export default App;
