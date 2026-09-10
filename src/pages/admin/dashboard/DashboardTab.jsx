import { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import myContext from "../../../context/data/myContext";

function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user } =
    useContext(myContext);

  const navigate = useNavigate();
  const isDark = mode === "dark";

  const products = Array.isArray(product) ? product : [];
  const orders = Array.isArray(order) ? order : [];
  const users = Array.isArray(user) ? user : [];

  const addProduct = () => {
    navigate("/addproduct");
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item?.title || "this product"}"?`,
    );

    if (!confirmed) {
      return;
    }

    await deleteProduct(item);
  };

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "0";
    }

    return value.toLocaleString("en-IN");
  };

  return (
    <div className="container mx-auto">
      <div className="tab container mx-auto">
        <Tabs defaultIndex={0}>
          <TabList className="mb-10 grid grid-cols-2 gap-4 text-center md:flex md:justify-center md:space-x-8">
            <Tab>
              <button
                type="button"
                className="rounded-lg border-b-2 border-purple-500 bg-[#605d5d12] px-5 py-1.5 text-center text-xl font-medium text-purple-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] hover:shadow-purple-700"
              >
                <div className="flex items-center gap-2">
                  <MdOutlineProductionQuantityLimits />
                  Products
                </div>
              </button>
            </Tab>

            <Tab>
              <button
                type="button"
                className="rounded-lg border-b-2 border-pink-500 bg-[#605d5d12] px-5 py-1.5 text-center text-xl font-medium text-pink-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] hover:shadow-pink-700"
              >
                <div className="flex items-center gap-2">
                  <AiFillShopping />
                  Order
                </div>
              </button>
            </Tab>

            <Tab>
              <button
                type="button"
                className="rounded-lg border-b-2 border-green-500 bg-[#605d5d12] px-5 py-1.5 text-center text-xl font-medium text-green-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] hover:shadow-green-700"
              >
                <div className="flex items-center gap-2">
                  <FaUser />
                  Users
                </div>
              </button>
            </Tab>
          </TabList>

          {/* Products */}
          <TabPanel>
            <div className="mb-16 px-4 md:px-0">
              <h1
                className="mb-5 text-center text-3xl font-semibold underline"
                style={{
                  color: isDark ? "white" : "",
                }}
              >
                Product Details
              </h1>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addProduct}
                  className="mb-2 rounded-lg border bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] hover:bg-pink-700"
                  style={{
                    backgroundColor: isDark ? "rgb(46 49 55)" : "",
                    color: isDark ? "white" : "",
                  }}
                >
                  <div className="flex items-center gap-2">
                    Add Product
                    <FaCartPlus size={20} />
                  </div>
                </button>
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                  <thead
                    className="border border-gray-600 bg-gray-200 text-xs uppercase text-black shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                    style={{
                      backgroundColor: isDark ? "rgb(46 49 55)" : "",
                      color: isDark ? "white" : "",
                    }}
                  >
                    <tr>
                      <th className="px-6 py-3">S.No</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.length > 0 ? (
                      products.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b bg-gray-50"
                          style={{
                            backgroundColor: isDark ? "rgb(46 49 55)" : "",
                            color: isDark ? "white" : "",
                          }}
                        >
                          <td
                            className="px-6 py-4"
                            style={{
                              color: isDark ? "white" : "",
                            }}
                          >
                            {index + 1}.
                          </td>

                          <td className="px-6 py-4">
                            <img
                              className="w-16 rounded"
                              src={item.imageUrl}
                              alt={item.title || "Product"}
                              loading="lazy"
                            />
                          </td>

                          <td
                            className="px-6 py-4"
                            style={{
                              color: isDark ? "white" : "",
                            }}
                          >
                            {item.title || "N/A"}
                          </td>

                          <td
                            className="px-6 py-4"
                            style={{
                              color: isDark ? "white" : "",
                            }}
                          >
                            ₹{formatPrice(item.price)}
                          </td>

                          <td
                            className="px-6 py-4"
                            style={{
                              color: isDark ? "white" : "",
                            }}
                          >
                            {item.category || "N/A"}
                          </td>

                          <td
                            className="px-6 py-4"
                            style={{
                              color: isDark ? "white" : "",
                            }}
                          >
                            {item.date || "N/A"}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => handleDelete(item)}
                                className="text-red-500 hover:text-red-700"
                                aria-label={`Delete ${item.title || "product"}`}
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              <Link
                                to="/updateproduct"
                                onClick={() => edithandle(item)}
                                className="text-blue-500 hover:text-blue-700"
                                aria-label={`Edit ${item.title || "product"}`}
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-8 text-center"
                          style={{
                            color: isDark ? "white" : "",
                          }}
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          {/* Orders */}
          <TabPanel>
            <div className="relative mb-16 overflow-x-auto">
              <h1
                className="mb-5 text-center text-3xl font-semibold underline"
                style={{
                  color: isDark ? "white" : "",
                }}
              >
                Order Details
              </h1>

              <table className="w-full text-left text-sm text-gray-500">
                <thead
                  className="bg-gray-200 text-xs uppercase"
                  style={{
                    backgroundColor: isDark ? "rgb(46 49 55)" : "",
                    color: isDark ? "white" : "",
                  }}
                >
                  <tr>
                    <th className="px-6 py-3">Payment Id</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Pincode</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length > 0 ? (
                    orders.flatMap((allOrder) =>
                      Array.isArray(allOrder.cartItems)
                        ? allOrder.cartItems.map((item, index) => (
                            <tr
                              key={`${allOrder.id}-${item.id || index}`}
                              className="border-b bg-gray-50"
                              style={{
                                backgroundColor: isDark ? "rgb(46 49 55)" : "",
                                color: isDark ? "white" : "",
                              }}
                            >
                              <td className="px-6 py-4">
                                {allOrder.paymentId || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                <img
                                  className="w-16 rounded"
                                  src={item.imageUrl}
                                  alt={item.title || "Product"}
                                  loading="lazy"
                                />
                              </td>

                              <td className="px-6 py-4">
                                {item.title || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                ₹{formatPrice(item.price)}
                              </td>

                              <td className="px-6 py-4">
                                {item.category || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.addressInfo?.name || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.addressInfo?.address || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.addressInfo?.pincode || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.addressInfo?.phoneNumber || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.email || "N/A"}
                              </td>

                              <td className="px-6 py-4">
                                {allOrder.date || "N/A"}
                              </td>
                            </tr>
                          ))
                        : [],
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="11"
                        className="px-6 py-8 text-center"
                        style={{
                          color: isDark ? "white" : "",
                        }}
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* Users */}
          <TabPanel>
            <div className="relative mb-10 overflow-x-auto">
              <h1
                className="mb-5 text-center text-3xl font-semibold underline"
                style={{
                  color: isDark ? "white" : "",
                }}
              >
                User Details
              </h1>

              <table className="w-full text-left text-sm text-gray-500">
                <thead
                  className="bg-gray-200 text-xs uppercase"
                  style={{
                    backgroundColor: isDark ? "rgb(46 49 55)" : "",
                    color: isDark ? "white" : "",
                  }}
                >
                  <tr>
                    <th className="px-6 py-3">S.No</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Uid</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((item, index) => (
                      <tr
                        key={item.uid || item.id || index}
                        className="border-b bg-gray-50"
                        style={{
                          backgroundColor: isDark ? "rgb(46 49 55)" : "",
                          color: isDark ? "white" : "",
                        }}
                      >
                        <td className="px-6 py-4">{index + 1}.</td>
                        <td className="px-6 py-4">{item.name || "N/A"}</td>
                        <td className="px-6 py-4">{item.email || "N/A"}</td>
                        <td className="px-6 py-4">{item.uid || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center"
                        style={{
                          color: isDark ? "white" : "",
                        }}
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardTab;
