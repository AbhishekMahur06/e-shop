import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";

const PROFILE_IMAGE =
  "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png";

function Profile() {
  const { user } = useContext(myContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    let userId = null;

    try {
      const savedUser = localStorage.getItem("user");
      const loggedInUser = savedUser ? JSON.parse(savedUser) : null;
      userId = loggedInUser?.user?.uid || null;
    } catch (error) {
      console.error("Invalid user data:", error);
    }

    if (!userId || !Array.isArray(user)) {
      setUserInfo(null);
      return;
    }

    const userData = user.find((item) => item.uid === userId);
    setUserInfo(userData || null);
  }, [user]);

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
          {userInfo ? (
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
            <p>Loading user information...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
