import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";

function Footer() {
  const { mode } = useContext(myContext);

  const isDark = mode === "dark";

  const textStyle = {
    color: isDark ? "white" : "",
  };

  return (
    <footer
      className="text-gray-600 body-font bg-gray-300"
      style={{
        backgroundColor: isDark ? "rgb(46 49 55)" : "",
        color: isDark ? "white" : "",
      }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={textStyle}
            >
              CATEGORIES
            </h2>

            <nav className="list-none mb-10">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={textStyle}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/order"
                  className="text-gray-600 hover:text-gray-800"
                  style={textStyle}
                >
                  Order
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts"
                  className="text-gray-600 hover:text-gray-800"
                  style={textStyle}
                >
                  Local For Vocal
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-gray-800"
                  style={textStyle}
                >
                  Cart
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase"
              style={textStyle}
            >
              Customer Service
            </h2>

            <nav className="list-none mb-10">
              <li>
                <span className="text-gray-600" style={textStyle}>
                  Return Policy
                </span>
              </li>

              <li>
                <span className="text-gray-600" style={textStyle}>
                  About
                </span>
              </li>

              <li>
                <span className="text-gray-600" style={textStyle}>
                  Contact Us
                </span>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={textStyle}
            >
              Services
            </h2>

            <nav className="list-none mb-10">
              <li>
                <span className="text-gray-600" style={textStyle}>
                  Privacy
                </span>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <img
              src="https://ecommerce-sk.vercel.app/pay.png"
              alt="Payment methods"
            />
          </div>
        </div>
      </div>

      <div
        className="bg-gray-200"
        style={{
          backgroundColor: isDark ? "rgb(55 57 61)" : "",
          color: isDark ? "white" : "",
        }}
      >
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          <Link to="/" className="flex">
            <h1
              className="text-2xl font-bold text-black px-2 py-1 rounded"
              style={textStyle}
            >
              E-Bharat
            </h1>
          </Link>

          <p
            className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4"
            style={textStyle}
          >
            © 2023 E-Bharat —
            <span className="text-gray-600 ml-1" style={textStyle}>
              www.ebharat.com
            </span>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500"
              aria-label="Facebook"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-500"
              aria-label="Twitter"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-500"
              aria-label="Instagram"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-500"
              aria-label="LinkedIn"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
