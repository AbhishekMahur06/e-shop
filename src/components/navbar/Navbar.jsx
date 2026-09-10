import { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";

const ADMIN_EMAIL = "abhishekmahur05@gmail.com";

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

function Navbar() {
  const { mode, toggleMode } = useContext(myContext);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const user = getLoggedInUser();
  const isAdmin = user?.email === ADMIN_EMAIL;
  const isDark = mode === "dark";

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + Number(item?.quantity || 1), 0)
    : 0;

  const logout = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login", { replace: true });
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        backgroundColor: isDark ? "rgb(17, 24, 39)" : "white",
      }}
    >
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl"
                style={{
                  backgroundColor: isDark ? "rgb(40, 44, 52)" : "white",
                  color: isDark ? "white" : "black",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="block text-sm font-medium hover:text-red-700"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    Home
                  </Link>

                  <Link
                    to="/allproducts"
                    onClick={closeMobileMenu}
                    className="block text-sm font-medium hover:text-red-700"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    All Products
                  </Link>

                  {user && (
                    <Link
                      to="/order"
                      onClick={closeMobileMenu}
                      className="block text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Order
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="block text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  )}

                  {user ? (
                    <button
                      type="button"
                      onClick={logout}
                      className="block text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="block text-sm font-medium hover:text-red-700"
                        style={{ color: isDark ? "white" : "" }}
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        onClick={closeMobileMenu}
                        className="block text-sm font-medium hover:text-red-700"
                        style={{ color: isDark ? "white" : "" }}
                      >
                        Signup
                      </Link>
                    </>
                  )}

                  {user && (
                    <Link
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="block"
                    >
                      <img
                        className="inline-block h-10 w-10 rounded-full border border-black"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&usqp=CAU"
                        alt="User profile"
                      />
                    </Link>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <span
                    className="ml-3 block text-base font-medium"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    INDIA
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header>
        <p
          className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: isDark ? "rgb(62 64 66)" : "rgb(219 39 119)",
          }}
        >
          Get free delivery on orders over ₹300
        </p>

        <nav
          aria-label="Top"
          className="px-4 shadow-xl sm:px-6 lg:px-8"
          style={{
            backgroundColor: isDark ? "#282c34" : "rgb(243 244 246)",
            color: isDark ? "white" : "black",
          }}
        >
          <div>
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md p-2 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: isDark ? "rgb(80 82 87)" : "white",
                  color: isDark ? "white" : "rgb(156 163 175)",
                }}
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to="/" className="flex">
                  <h1
                    className="rounded px-2 py-1 text-2xl font-bold hover:text-red-700"
                    style={{ color: isDark ? "white" : "black" }}
                  >
                    E-Bharat
                  </h1>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/"
                    className="text-sm font-medium hover:text-pink-700"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    Home
                  </Link>

                  <Link
                    to="/allproducts"
                    className="text-sm font-medium hover:text-red-700"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    All Products
                  </Link>

                  {user ? (
                    <Link
                      to="/order"
                      className="text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Order
                    </Link>
                  ) : (
                    <Link
                      to="/signup"
                      className="text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Signup
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      className="text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  )}

                  {user && (
                    <button
                      type="button"
                      onClick={logout}
                      className="cursor-pointer text-sm font-medium hover:text-red-700"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      Logout
                    </button>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <span
                    className="text-sm font-medium"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    INDIA
                  </span>
                </div>

                {user && (
                  <div className="hidden lg:ml-8 lg:flex">
                    <Link to="/profile" aria-label="Open profile">
                      <img
                        className="inline-block h-9 w-10 rounded-full border border-black"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&usqp=CAU"
                        alt="User profile"
                      />
                    </Link>
                  </div>
                )}

                <div className="flex lg:ml-6">
                  <button
                    type="button"
                    onClick={toggleMode}
                    aria-label="Toggle dark mode"
                  >
                    {isDark ? (
                      <BsFillCloudSunFill
                        className="hover:text-red-700"
                        size={30}
                      />
                    ) : (
                      <FiSun className="hover:text-red-700" size={30} />
                    )}
                  </button>
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to="/cart"
                    className="group -m-2 flex items-center p-2 hover:text-red-700"
                    style={{ color: isDark ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 01-1.5 0z"
                      />
                    </svg>

                    <span
                      className="ml-2 text-sm font-medium"
                      style={{ color: isDark ? "white" : "" }}
                    >
                      {cartCount}
                    </span>

                    <span className="sr-only">
                      {cartCount} items in cart, view cart
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
