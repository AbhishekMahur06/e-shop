import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      toast.error("All fields are required");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Name must contain at least 2 characters");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password,
      );

      const userData = {
        name: trimmedName,
        uid: result.user.uid,
        email: result.user.email,
        time: Timestamp.now(),
      };

      await addDoc(collection(fireDB, "users"), userData);

      toast.success("Signup successful");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email is already registered");
          break;

        case "auth/invalid-email":
          toast.error("Please enter a valid email");
          break;

        case "auth/weak-password":
          toast.error("Password is too weak");
          break;

        case "auth/operation-not-allowed":
          toast.error("Email/password signup is disabled");
          break;

        default:
          toast.error("Signup failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {loading && <Loader />}

      <div className="rounded-xl bg-gray-800 px-10 py-10">
        <h1 className="mb-4 text-center text-xl font-bold text-white">
          Signup
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg bg-gray-600 px-2 py-2 text-white outline-none placeholder:text-gray-200 lg:w-[20em]"
            placeholder="Name"
            autoComplete="name"
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-lg bg-gray-600 px-2 py-2 text-white outline-none placeholder:text-gray-200 lg:w-[20em]"
            placeholder="Email"
            autoComplete="email"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-lg bg-gray-600 px-2 py-2 text-white outline-none placeholder:text-gray-200 lg:w-[20em]"
            placeholder="Password"
            autoComplete="new-password"
            disabled={loading}
          />

          <div className="mb-3 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-500 px-2 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>

        <h2 className="text-white">
          Have an account{" "}
          <Link className="font-bold text-red-500" to="/login">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Signup;
