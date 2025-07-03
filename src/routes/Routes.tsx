
import Login from "../pages/AuthenticationPages/Login";
import Signup from "../pages/AuthenticationPages/Signup";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "../pages/HomePages/Home";
import Dashboard from "../pages/DashboardPages/Dashboard";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Define other routes here */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
  
}

export default PageRoutes;
