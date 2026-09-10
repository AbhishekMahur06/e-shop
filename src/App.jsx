import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

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

import { auth } from "./fireabase/FirebaseConfig";
import Loader from "./components/loader/Loader";

const ADMIN_EMAIL = "ankur@gmail.com";

function ProtectedRoute({ children, user, authLoading }) {
  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ProtectedRouteForAdmin({ children, user, authLoading }) {
  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/allproducts" element={<Allproducts />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute user={user} authLoading={authLoading}>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin user={user} authLoading={authLoading}>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />

          <Route path="/productinfo/:id" element={<ProductInfo />} />

          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin user={user} authLoading={authLoading}>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin user={user} authLoading={authLoading}>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} authLoading={authLoading}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoPage />} />
        </Routes>

        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;
