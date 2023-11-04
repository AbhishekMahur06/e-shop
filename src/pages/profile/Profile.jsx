import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";

function Profile() {
  const userId = JSON.parse(localStorage.getItem("user")).user.uid;

  const context = useContext(myContext);

  const { user } = context;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userId) {
      const userData = user.find((obj) => obj.uid === userId);
      if (userData) {
        setUserInfo(userData);
      }
    }
  }, [userId, user]);

  return (
    <Layout>
      <div className=" h-[50vh] flex max-sm:flex-col max-sm:h-screen  border-red-500 p-5 ba">
        {/* left */}
        <div className=" border-solid-red h-full w-full border bg-neutral-400">
          <img
            className=" w-[40%] mt-6 ml-[25%] max-sm:m-auto max-sm:mt-10 max-sm:w-[50%]"
            src="https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png"
          />
        </div>

        {/* right */}
        <div className="w-full border flex gap-5 justify-center flex-col text-center max-sm:justify-start max-sm:h-fit  bg-neutral-300 p-5">
          {userInfo ? (
            <>
              <h1 className="text-2xl">Username: {userInfo.name}</h1>
              <h1 className="text-2xl">E-Mail: {userInfo.email}</h1>
              <Link to={"/cart"}>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  My Cart
                </button>
              </Link>
              <Link to={"/order"}>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  My Order
                </button>
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
