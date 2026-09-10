import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        password,
      );

      // Kept temporarily for compatibility with existing project logic.
      localStorage.setItem("user", JSON.stringify(result));

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password");
          break;

        case "auth/user-not-found":
          toast.error("No account found with this email");
          break;

        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;

        case "auth/invalid-email":
          toast.error("Enter a valid email address");
          break;

        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later");
          break;

        case "auth/user-disabled":
          toast.error("This account has been disabled");
          break;

        case "auth/network-request-failed":
          toast.error("Network error. Check your internet connection");
          break;

        default:
          toast.error("Login failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loader />}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-gray-800 px-10 py-10"
      >
        <h1 className="mb-4 text-center text-xl font-bold text-white">Login</h1>

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mb-4 w-full rounded-lg bg-gray-600 px-2 py-2 text-white outline-none placeholder:text-gray-200 lg:w-[20em]"
          placeholder="Email"
          disabled={loading}
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mb-4 w-full rounded-lg bg-gray-600 px-2 py-2 text-white outline-none placeholder:text-gray-200 lg:w-[20em]"
          placeholder="Password"
          disabled={loading}
          required
        />

        <div className="mb-3 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-500 px-2 py-2 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <h2 className="text-white">
          Don't have an account{" "}
          <Link className="font-bold text-yellow-500" to="/signup">
            Signup
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default Login;
