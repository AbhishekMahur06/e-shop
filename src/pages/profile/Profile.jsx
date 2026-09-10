import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import Layout from "../../components/layout/Layout";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";

const PROFILE_IMAGE =
  "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);

        const currentUser = auth.currentUser;

        if (!currentUser) {
          navigate("/login", { replace: true });
          return;
        }

        const q = query(
          collection(fireDB, "users"),
          where("uid", "==", currentUser.uid),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          setUserInfo({
            id: querySnapshot.docs[0].id,
            ...userData,
          });
        } else {
          setUserInfo({
            name: currentUser.displayName || "User",
            email: currentUser.email || "",
            uid: currentUser.uid,
          });
        }
      } catch (error) {
        console.error("Error loading user information:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [navigate]);

  return (
    <Layout>
      <div className="h-[50vh] flex max-sm:flex-col max-sm:h-fit border-red-500 p-5">
        <div className="border-solid-red h-full w-full border bg-neutral-400 max-sm:h-[40%] pb-10">
          <img
            className="w-[40%] mt-6 ml-[25%] max-sm:m-auto max-sm:mt-10 max-sm:w-[50%]"
            src={PROFILE_IMAGE}
            alt="User profile"
          />
        </div>

        <div className="w-full border flex gap-5 justify-center flex-col text-center max-sm:justify-start max-sm:h-fit bg-neutral-300 p-5">
          {loading ? (
            <p>Loading user information...</p>
          ) : userInfo ? (
            <>
              <h1 className="text-2xl">Username: {userInfo.name}</h1>

              <h1 className="text-2xl">E-Mail: {userInfo.email}</h1>

              <Link
                to="/cart"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                My Cart
              </Link>

              <Link
                to="/order"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                My Order
              </Link>
            </>
          ) : (
            <p>Unable to load user information.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
