import { useEffect, useState } from "react";
import MyContext from "./myContext";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { fireDB } from "../../fireabase/FirebaseConfig";

const getDefaultProduct = () => ({
  title: "",
  price: "",
  imageUrl: "",
  category: "",
  description: "",
  time: Timestamp.now(),
  date: new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
});

function MyState({ children }) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";

      document.body.style.backgroundColor =
        newMode === "dark" ? "rgb(17, 24, 39)" : "white";

      return newMode;
    });
  };

  const [productLoading, setProductLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [products, setProducts] = useState(getDefaultProduct);
  const [product, setProduct] = useState([]);

  const addProduct = async () => {
    const { title, price, imageUrl, category, description } = products;

    const cleanTitle = title?.trim();
    const cleanImageUrl = imageUrl?.trim();
    const cleanCategory = category?.trim();
    const cleanDescription = description?.trim();
    const numericPrice = Number(price);

    if (
      !cleanTitle ||
      !cleanImageUrl ||
      !cleanCategory ||
      !cleanDescription ||
      price === ""
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.error("Price must be a valid number greater than 0");
      return false;
    }

    setActionLoading(true);

    try {
      const productData = {
        title: cleanTitle,
        price: numericPrice,
        imageUrl: cleanImageUrl,
        category: cleanCategory,
        description: cleanDescription,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await addDoc(collection(fireDB, "products"), productData);

      toast.success("Product added successfully");
      setProducts(getDefaultProduct());

      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    setProductLoading(true);

    const productsQuery = query(
      collection(fireDB, "products"),
      orderBy("time"),
    );

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const productArray = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        setProduct(productArray);
        setProductLoading(false);
      },
      (error) => {
        console.error("Error getting products:", error);
        toast.error("Failed to load products");
        setProductLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const edithandle = (item) => {
    if (!item?.id) {
      toast.error("Product ID is missing");
      return;
    }

    setProducts({
      ...item,
      price: item.price ?? "",
    });
  };

  const updateProduct = async () => {
    const { id, title, price, imageUrl, category, description } = products;

    const cleanTitle = title?.trim();
    const cleanImageUrl = imageUrl?.trim();
    const cleanCategory = category?.trim();
    const cleanDescription = description?.trim();
    const numericPrice = Number(price);

    if (!id) {
      toast.error("Product ID is missing");
      return false;
    }

    if (
      !cleanTitle ||
      !cleanImageUrl ||
      !cleanCategory ||
      !cleanDescription ||
      price === ""
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.error("Price must be a valid number greater than 0");
      return false;
    }

    setActionLoading(true);

    try {
      await updateDoc(doc(fireDB, "products", id), {
        title: cleanTitle,
        price: numericPrice,
        imageUrl: cleanImageUrl,
        category: cleanCategory,
        description: cleanDescription,
        updatedAt: Timestamp.now(),
      });

      toast.success("Product updated successfully");
      setProducts(getDefaultProduct());

      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    if (!item?.id) {
      toast.error("Product ID is missing");
      return false;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`,
    );

    if (!confirmed) {
      return false;
    }

    setActionLoading(true);

    try {
      await deleteDoc(doc(fireDB, "products", item.id));

      toast.success("Product deleted successfully");

      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setOrderLoading(true);

    try {
      const result = await getDocs(collection(fireDB, "order"));

      const ordersArray = result.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      setOrder(ordersArray);
    } catch (error) {
      console.error("Error getting orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setOrderLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setUserLoading(true);

    try {
      const result = await getDocs(collection(fireDB, "users"));

      const usersArray = result.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      setUser(usersArray);
    } catch (error) {
      console.error("Error getting users:", error);
      toast.error("Failed to load users");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const loading =
    productLoading || orderLoading || userLoading || actionLoading;

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,

        loading,
        productLoading,
        orderLoading,
        userLoading,
        actionLoading,

        products,
        setProducts,
        product,

        addProduct,
        edithandle,
        updateProduct,
        deleteProduct,

        order,
        user,

        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
