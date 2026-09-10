import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/data/myContext";

function UpdateProduct() {
  const { products, setProducts, updateProduct, actionLoading } =
    useContext(myContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const title = products?.title?.trim();
    const price = products?.price;
    const imageUrl = products?.imageUrl?.trim();
    const category = products?.category?.trim();
    const description = products?.description?.trim();

    if (!title || !price || !imageUrl || !category || !description) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError("Price must be a valid number greater than 0.");
      return;
    }

    if (!products?.id) {
      setError("Product ID is missing.");
      return;
    }

    try {
      await updateProduct();
      navigate("/admin");
    } catch (err) {
      setError("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <h1 className="text-center text-white text-xl mb-4 font-bold">
          Update Product
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={products?.title || ""}
            onChange={handleChange}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product title"
            disabled={actionLoading}
          />

          <input
            type="number"
            name="price"
            value={products?.price || ""}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product price"
            disabled={actionLoading}
          />

          <input
            type="url"
            name="imageUrl"
            value={products?.imageUrl || ""}
            onChange={handleChange}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product image URL"
            disabled={actionLoading}
          />

          <input
            type="text"
            name="category"
            value={products?.category || ""}
            onChange={handleChange}
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product category"
            disabled={actionLoading}
          />

          <textarea
            name="description"
            value={products?.description || ""}
            onChange={handleChange}
            rows="6"
            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Product description"
            disabled={actionLoading}
          />

          {error && (
            <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={actionLoading}
            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
