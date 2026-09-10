import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import {
  clearCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";

function Cart() {
  const { mode } = useContext(myContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const isDark = mode === "dark";

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item?.price);
      const quantity = Number(item?.quantity || 1);

      if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
        return total;
      }

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const shipping = cartItems.length > 0 ? 100 : 0;
  const grandTotal = totalAmount + shipping;

  const formatPrice = (price) => {
    const value = Number(price);

    if (!Number.isFinite(value)) {
      return "0";
    }

    return value.toLocaleString("en-IN");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  const increaseCartQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };

  const decreaseCartQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const getUser = () => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  };

  const validateOrder = () => {
    if (
      !name.trim() ||
      !address.trim() ||
      !pincode.trim() ||
      !phoneNumber.trim()
    ) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });

      return false;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      toast.error("Enter a valid 6-digit pincode");
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber.trim())) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const buyNow = async () => {
    if (paymentLoading) {
      return;
    }

    if (!validateOrder()) {
      return;
    }

    const user = getUser();

    if (!user?.user?.email || !user?.user?.uid) {
      toast.error("Please login before placing an order");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment system is not available");
      return;
    }

    const addressInfo = {
      name: name.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: Math.round(grandTotal * 100),
      currency: "INR",
      name: "E-Bharat",
      description: "Order Payment",

      handler: async (response) => {
        try {
          const orderInfo = {
            cartItems,
            addressInfo,
            subtotal: totalAmount,
            shipping,
            grandTotal,
            email: user.user.email,
            userid: user.user.uid,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "paid",
            orderStatus: "pending",
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          };

          await addDoc(collection(fireDB, "order"), orderInfo);

          dispatch(clearCart());

          setName("");
          setAddress("");
          setPincode("");
          setPhoneNumber("");

          toast.success("Order placed successfully");
        } catch (error) {
          console.error("Error creating order:", error);
          toast.error(
            "Payment succeeded, but order creation failed. Contact support.",
          );
        } finally {
          setPaymentLoading(false);
        }
      },

      modal: {
        ondismiss: () => {
          setPaymentLoading(false);
        },
      },

      theme: {
        color: "#3399cc",
      },
    };

    try {
      setPaymentLoading(true);

      const payment = new window.Razorpay(options);

      payment.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        setPaymentLoading(false);
        toast.error("Payment failed");
      });

      payment.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      setPaymentLoading(false);
      toast.error("Unable to start payment");
    }
  };

  return (
    <Layout>
      {cartItems.length > 0 ? (
        <div
          className="h-fit bg-gray-100 pb-[20%] pt-5"
          style={{
            backgroundColor: isDark ? "#282c34" : "",
            color: isDark ? "white" : "",
          }}
        >
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((item) => {
                const {
                  id,
                  title,
                  price,
                  description,
                  imageUrl,
                  quantity = 1,
                } = item;

                const itemPrice = Number(price);
                const itemQuantity = Number(quantity);

                const safePrice = Number.isFinite(itemPrice) ? itemPrice : 0;

                const safeQuantity =
                  Number.isFinite(itemQuantity) && itemQuantity > 0
                    ? itemQuantity
                    : 1;

                return (
                  <div
                    key={id}
                    className="mb-6 rounded-lg border bg-pink-100 p-6 drop-shadow-xl sm:flex sm:justify-start"
                    style={{
                      backgroundColor: isDark ? "rgb(32 33 34)" : "",
                      color: isDark ? "white" : "",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={title || "Product"}
                      className="w-full rounded-lg object-cover sm:w-40"
                      loading="lazy"
                    />

                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className="text-lg font-bold text-gray-900"
                          style={{
                            color: isDark ? "white" : "",
                          }}
                        >
                          {title || "Untitled Product"}
                        </h2>

                        <p
                          className="mt-1 text-sm text-gray-900"
                          style={{
                            color: isDark ? "white" : "",
                          }}
                        >
                          {description || "No description available"}
                        </p>

                        <p
                          className="mt-1 text-xs font-semibold text-gray-700"
                          style={{
                            color: isDark ? "white" : "",
                          }}
                        >
                          ₹{formatPrice(safePrice)}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => decreaseCartQuantity(item)}
                            disabled={safeQuantity <= 1}
                            className="h-8 w-8 rounded border disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Decrease quantity of ${title}`}
                          >
                            -
                          </button>

                          <span className="font-semibold">{safeQuantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseCartQuantity(item)}
                            className="h-8 w-8 rounded border"
                            aria-label={`Increase quantity of ${title}`}
                          >
                            +
                          </button>
                        </div>

                        <p className="mt-2 font-semibold">
                          ₹{formatPrice(safePrice * safeQuantity)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-4 sm:mt-0">
                        <button
                          type="button"
                          onClick={() => deleteCart(item)}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          aria-label={`Remove ${title || "item"} from cart`}
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
              style={{
                backgroundColor: isDark ? "rgb(32 33 34)" : "",
                color: isDark ? "white" : "",
              }}
            >
              <div className="mb-2 flex justify-between">
                <p
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  Subtotal
                </p>

                <p
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  ₹{formatPrice(totalAmount)}
                </p>
              </div>

              <div className="flex justify-between">
                <p
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  Shipping
                </p>

                <p
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  ₹{formatPrice(shipping)}
                </p>
              </div>

              <hr className="my-4" />

              <div className="mb-3 flex justify-between">
                <p
                  className="text-lg font-bold"
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  Total
                </p>

                <p
                  className="text-lg font-bold"
                  style={{
                    color: isDark ? "white" : "",
                  }}
                >
                  ₹{formatPrice(grandTotal)}
                </p>
              </div>

              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
                paymentLoading={paymentLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1
            className="text-5xl max-sm:text-center"
            style={{
              color: isDark ? "white" : "",
            }}
          >
            Your cart is empty...
          </h1>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-page-3936848-3277288.png"
            alt="Empty cart"
            className="w-100"
          />
        </div>
      )}
    </Layout>
  );
}

export default Cart;
