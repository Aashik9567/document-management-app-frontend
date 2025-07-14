import Login from "../pages/AuthenticationPages/Login";
import Signup from "../pages/AuthenticationPages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/HomePages/Home";
import Dashboard from "../pages/DashboardPages/Dashboard";

import HowItWorksSection from "../components/home/HowItWorksSection";
import ContactSection from "../components/home/ContactSection";
import DashboardSetting from "../components/dashboard/DashboardSetting";

import Document from "../pages/DocumentPages/Document";
import AuthenticatedDashboardLayout from "../pages/DashboardPages/Layout";

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
          <Route path="/dashboard" element={<AuthenticatedDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<DashboardSetting />} />
          </Route>
          <Route path="/document/create" element={<Document />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
