import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import myContext from "../../context/data/myContext";
import { addToCart } from "../../redux/cartSlice";

function ProductCard() {
  const { mode, product, searchkey } = useContext(myContext);
  const dispatch = useDispatch();

  const isDark = mode === "dark";
  const searchTerm = (searchkey || "").trim().toLowerCase();

  const addCart = (item) => {
    if (!item?.id) {
      toast.error("Product is not available");
      return;
    }

    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const filteredProducts = (Array.isArray(product) ? product : [])
    .filter((item) => {
      if (!searchTerm) return true;

      const title = item.title?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";

      return title.includes(searchTerm) || category.includes(searchTerm);
    })
    .slice(0, 4);

  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-8 pb-20 md:py-16">
        <div className="mb-6 w-full lg:mb-10 lg:w-1/2">
          <h1
            className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl"
            style={{
              color: isDark ? "white" : "",
            }}
          >
            Our Latest Collection
          </h1>

          <div className="h-1 w-20 rounded bg-pink-600" />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap justify-center -m-4">
            {filteredProducts.map((item) => {
              const { id, title, price, imageUrl } = item;

              return (
                <div key={id} className="w-full p-4 md:w-1/2 lg:w-1/4">
                  <div
                    className="h-full overflow-hidden rounded-2xl border-2 border-gray-200 border-opacity-60 drop-shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
                    style={{
                      backgroundColor: isDark ? "rgb(46 49 55)" : "",
                      color: isDark ? "white" : "",
                    }}
                  >
                    <Link
                      to={`/productinfo/${id}`}
                      className="flex cursor-pointer justify-center overflow-hidden"
                    >
                      <img
                        className="h-80 w-full rounded-2xl object-cover p-2 transition-transform duration-300 ease-in-out hover:scale-110"
                        src={imageUrl}
                        alt={title || "Product"}
                        loading="lazy"
                      />
                    </Link>

                    <div className="border-t-2 p-5">
                      <h2
                        className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400"
                        style={{
                          color: isDark ? "white" : "",
                        }}
                      >
                        E-Bharat
                      </h2>

                      <h1
                        className="title-font mb-3 text-lg font-medium text-gray-900"
                        style={{
                          color: isDark ? "white" : "",
                        }}
                      >
                        {title || "Untitled Product"}
                      </h1>

                      <p
                        className="mb-3 leading-relaxed"
                        style={{
                          color: isDark ? "white" : "",
                        }}
                      >
                        ₹{Number(price || 0).toLocaleString("en-IN")}
                      </p>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => addCart(item)}
                          className="w-full rounded-lg bg-pink-600 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p
            className="py-10 text-center text-lg"
            style={{
              color: isDark ? "white" : "",
            }}
          >
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductCard;
