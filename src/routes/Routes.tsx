import DashboardHeader from "../components/dashboard/DashboardHeader";
import Login from "../pages/AuthenticationPages/Login";
import Signup from "../pages/AuthenticationPages/Signup";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardHeader />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
  
}

export default PageRoutes;
