import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../../fireabase/FirebaseConfig";

const ADMIN_EMAIL = "ankur@gmail.com";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const updateCartCount = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(cart)) {
        setCartCount(0);
        return;
      }

      const count = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0,
      );

      setCartCount(count);
    } catch (error) {
      console.error("Invalid cart data:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    updateCartCount();

    const handleCartChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleCartChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("user");

      setMobileMenu(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  if (authLoading) {
    return null;
  }

  return (
    <>
      <div className="bg-pink-600 text-white text-center py-2 font-semibold">
        Get free delivery on orders over ₹300
      </div>

      <nav className="bg-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
          <Link to="/" onClick={closeMenu} className="text-2xl font-bold">
            E-Bharat
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 font-semibold">
            <Link to="/" className="hover:text-pink-600">
              Home
            </Link>

            <Link to="/allproducts" className="hover:text-pink-600">
              All Products
            </Link>

            {/* Customer only */}
            {user && !isAdmin && (
              <Link to="/order" className="hover:text-pink-600">
                Order
              </Link>
            )}

            {/* Admin only */}
            {user && isAdmin && (
              <Link to="/dashboard" className="hover:text-pink-600">
                Admin
              </Link>
            )}

            {user && (
              <Link to="/profile" className="hover:text-pink-600">
                Profile
              </Link>
            )}

            {/* Customer only */}
            {user && !isAdmin && (
              <Link
                to="/cart"
                className="flex items-center gap-2 hover:text-pink-600"
              >
                <span>🛒</span>
                <span>Cart ({cartCount})</span>
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className="hover:text-pink-600">
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-pink-600">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4 font-semibold">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/allproducts" onClick={closeMenu}>
              All Products
            </Link>

            {/* Customer only */}
            {user && !isAdmin && (
              <Link to="/order" onClick={closeMenu}>
                Order
              </Link>
            )}

            {/* Admin only */}
            {user && isAdmin && (
              <Link to="/dashboard" onClick={closeMenu}>
                Admin
              </Link>
            )}

            {user && (
              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            )}

            {/* Customer only */}
            {user && !isAdmin && (
              <Link to="/cart" onClick={closeMenu}>
                Cart ({cartCount})
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className="text-left">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
