import { useContext, useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";

import { useParams } from "react-router";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

import { doc, getDoc } from "firebase/firestore";

import { toast } from "react-toastify";

import { fireDB } from "../../fireabase/FirebaseConfig";

function ProductInfo() {
  const context = useContext(myContext);
  const { mode } = context;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();

  const getProductData = async () => {
    if (!id) {
      toast.error("Product ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const productRef = doc(fireDB, "products", id);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        setProduct(null);
        toast.error("Product not found");
        return;
      }

      setProduct({
        ...productSnapshot.data(),
        id: productSnapshot.id,
      });
    } catch (error) {
      console.error("Error getting product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  const addCart = () => {
    if (!product) {
      toast.error("Product is not available");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-3xl font-semibold">Product not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="body-font overflow-hidden"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "white",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        <div className="container mx-auto px-5 py-10">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt={product.title}
              className="w-full rounded object-cover object-center lg:h-auto lg:w-1/3"
              src={product.imageUrl}
            />

            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2
                className="title-font text-sm tracking-widest"
                style={{
                  color: mode === "dark" ? "#d1d5db" : "#6b7280",
                }}
              >
                BRAND NAME
              </h2>

              <h1
                className="title-font mb-1 text-3xl font-medium"
                style={{
                  color: mode === "dark" ? "white" : "#111827",
                }}
              >
                {product.title}
              </h1>

              <div className="mb-4 flex">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>

                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>

                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>

                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>

                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>

                  <span
                    className="ml-3"
                    style={{
                      color: mode === "dark" ? "#d1d5db" : "#4b5563",
                    }}
                  >
                    4 Reviews
                  </span>
                </span>
              </div>

              <p
                className="mb-5 border-b-2 pb-5 leading-relaxed"
                style={{
                  borderColor: mode === "dark" ? "#4b5563" : "#e5e7eb",
                  color: mode === "dark" ? "#d1d5db" : "#4b5563",
                }}
              >
                {product.description}
              </p>

              <div className="flex items-center">
                <span
                  className="title-font text-2xl font-medium"
                  style={{
                    color: mode === "dark" ? "white" : "#111827",
                  }}
                >
                  ₹{product.price}
                </span>

                <button
                  type="button"
                  onClick={addCart}
                  className="ml-auto flex rounded border-0 bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600 focus:outline-none"
                >
                  Add To Cart
                </button>

                <button
                  type="button"
                  className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500"
                  aria-label="Add to wishlist"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
