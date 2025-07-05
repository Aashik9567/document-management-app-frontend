import Login from "../pages/AuthenticationPages/Login";
import Signup from "../pages/AuthenticationPages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/HomePages/Home";
import Dashboard from "../pages/DashboardPages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ContactSection from "../components/home/ContactSection";
import DashboardSetting from "../components/dashboard/DashboardSetting";
import Layout from "../pages/DashboardPages/Layout";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howitworks" element={<HowItWorksSection />} />
          <Route path="/contact" element={<ContactSection />} />
          {/* Define other routes here */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<DashboardSetting />} />
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
