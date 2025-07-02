import Login from "../pages/Login";
import Signup from "../pages/Signup";
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
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
  
}

export default PageRoutes;
