import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import Allproducts from "./pages/allproducts/Allproducts";
import Profile from "./pages/profile/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ADMIN_EMAIL = "ankur@gmail.com";

const getLoggedInUser = () => {
  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);

    return parsedUser?.user || null;
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");
    return null;
  }
};

function ProtectedRoute({ children }) {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ProtectedRouteForAdmin({ children }) {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/allproducts" element={<Allproducts />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/productinfo/:id" element={<ProductInfo />} />

          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NoPage />} />
        </Routes>

        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;
