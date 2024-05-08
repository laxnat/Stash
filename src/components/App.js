import React from "react"
import { Container } from "react-bootstrap";
import Signup from "./authentication/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./files/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* File Routes */}
          <Route path ="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard /> } />
            <Route path="/folder/:folderId" element={<Dashboard />} />
          </Route>

          {/* Profile Routes */}
          <Route path ="/" element={<PrivateRoute />}>
            <Route path="/user" element={<Profile /> } />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
