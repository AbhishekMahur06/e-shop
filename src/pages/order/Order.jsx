import { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;

  const context = useContext(myContext);
  const { mode, loading, order } = context;

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full font-bold pt-10">
            <h1 className="text-2xl  text-center max-sm:text-center ">
              {/* Yours Orders */}
              {order.filter((obj) => obj.userid) === userid ? (
                "Yours Orders"
              ) : (
                <div className="flex items-center justify-center flex-col ">
                  <h1 className="text-3xl max-sm:text-center  ">
                    Your don't have any order...
                  </h1>
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4816550-4004141.png"
                    alt="img"
                  />
                </div>
              )}
            </h1>
            {order
              .filter((obj) => obj.userid == userid)
              .map((order, index) => {
                return (
                  <div
                    key={index}
                    className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
                  >
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key={index} className="rounded-lg md:w-2/3">
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  Title: {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  Description: {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  Price: {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <h2 className=" text-center tex-2xl text-white ">Not Order</h2>
      )}
    </Layout>
  );
}

export default Order;
