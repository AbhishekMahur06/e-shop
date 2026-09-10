import { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const { mode, order, orderLoading } = useContext(myContext);
  const [userAllOrder, setUserAllOrder] = useState([]);

  useEffect(() => {
    let userId = null;

    try {
      const savedUser = localStorage.getItem("user");
      const loggedInUser = savedUser ? JSON.parse(savedUser) : null;
      userId = loggedInUser?.user?.uid || null;
    } catch (error) {
      console.error("Invalid user data:", error);
    }

    if (!userId || !Array.isArray(order)) {
      setUserAllOrder([]);
      return;
    }

    const userOrders = order.filter((item) => item.userid === userId);
    setUserAllOrder(userOrders);
  }, [order]);

  return (
    <Layout>
      {orderLoading && <Loader />}

      {!orderLoading && userAllOrder.length > 0 ? (
        <div className="h-full font-bold pt-10">
          <h1
            className="text-2xl text-center max-sm:text-center mb-5"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Your Orders:
          </h1>

          {userAllOrder.map((userOrder) => (
            <div
              key={userOrder.id}
              className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
            >
              <div className="w-full">
                {Array.isArray(userOrder.cartItems) &&
                  userOrder.cartItems.map((item) => (
                    <div
                      key={`${userOrder.id}-${item.id}`}
                      className="rounded-lg mb-6"
                    >
                      <div
                        className="justify-between rounded-lg bg-pink-100 p-6 shadow-md sm:flex sm:justify-start"
                        style={{
                          backgroundColor: mode === "dark" ? "#282c34" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title || "Product"}
                          className="w-full rounded-lg sm:w-40 object-contain"
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
                              Price: ₹{Number(item.price) || 0}
                            </p>

                            <p
                              className="mt-1 text-xs text-gray-700"
                              style={{
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              Quantity: {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : !orderLoading ? (
        <div className="h-[100vh] flex items-center justify-center flex-col">
          <h1
            style={{ color: mode === "dark" ? "white" : "" }}
            className="text-3xl max-sm:text-center"
          >
            You do not have any orders...
          </h1>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4816550-4004141.png"
            alt="No orders"
          />
        </div>
      ) : null}
    </Layout>
  );
}

export default Order;
