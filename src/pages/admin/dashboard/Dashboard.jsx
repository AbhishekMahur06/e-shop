import { useContext } from "react";
import { FaBoxOpen, FaShoppingCart, FaUserTie } from "react-icons/fa";

import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import Loader from "../../../components/loader/Loader";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const {
    mode,
    order,
    product,
    user,
    productLoading,
    orderLoading,
    userLoading,
  } = useContext(myContext);

  const isDark = mode === "dark";

  const stats = [
    {
      icon: <FaBoxOpen size={50} />,
      count: Array.isArray(product) ? product.length : 0,
      label: "Total Products",
    },
    {
      icon: <FaShoppingCart size={50} />,
      count: Array.isArray(order) ? order.length : 0,
      label: "Total Orders",
    },
    {
      icon: <FaUserTie size={50} />,
      count: Array.isArray(user) ? user.length : 0,
      label: "Total Users",
    },
  ];

  const loading = productLoading || orderLoading || userLoading;

  return (
    <Layout>
      {loading && <Loader />}

      <section className="body-font mt-10 mb-10 text-gray-600">
        <div className="container mx-auto mb-10 px-5">
          <div className="flex flex-wrap justify-center -m-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div
                  className="rounded-xl border-2 border-gray-300 bg-gray-100 px-4 py-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] hover:shadow-purple-600"
                  style={{
                    backgroundColor: isDark ? "rgb(46 49 55)" : "",
                    color: isDark ? "white" : "",
                  }}
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center text-purple-500">
                    {stat.icon}
                  </div>

                  <h2
                    className="title-font fonts1 text-3xl font-medium text-black"
                    style={{
                      color: isDark ? "white" : "",
                    }}
                  >
                    {stat.count}
                  </h2>

                  <p
                    className="font-bold text-purple-500"
                    style={{
                      color: isDark ? "white" : "",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
