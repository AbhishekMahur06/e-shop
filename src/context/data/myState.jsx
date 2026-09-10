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
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

import { fireDB, auth } from "../../fireabase/FirebaseConfig";

const ADMIN_EMAIL = "ankur@gmail.com";

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

  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [productLoading, setProductLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [products, setProducts] = useState(getDefaultProduct);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const isAdmin = authUser?.email === ADMIN_EMAIL;

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";

      document.body.style.backgroundColor =
        newMode === "dark" ? "rgb(17, 24, 39)" : "white";

      return newMode;
    });
  };

  // Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Products
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

  // Orders
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!authUser) {
      setOrder([]);
      setOrderLoading(false);
      return;
    }

    const getOrderData = async () => {
      setOrderLoading(true);

      try {
        let orderQuery;

        if (isAdmin) {
          orderQuery = collection(fireDB, "order");
        } else {
          orderQuery = query(
            collection(fireDB, "order"),
            where("userid", "==", authUser.uid),
          );
        }

        const result = await getDocs(orderQuery);

        const ordersArray = result.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));

        setOrder(ordersArray);
      } catch (error) {
        console.error("Error getting orders:", error);
        toast.error("Failed to load orders");
        setOrder([]);
      } finally {
        setOrderLoading(false);
      }
    };

    getOrderData();
  }, [authUser, authLoading, isAdmin]);

  // Users - only admin needs all users
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!authUser || !isAdmin) {
      setUser([]);
      setUserLoading(false);
      return;
    }

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
        setUser([]);
      } finally {
        setUserLoading(false);
      }
    };

    getUserData();
  }, [authUser, authLoading, isAdmin]);

  // Add product
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

    if (!authUser || !isAdmin) {
      toast.error("Admin access required");
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

  // Select product for editing
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

  // Update product
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

    if (!authUser || !isAdmin) {
      toast.error("Admin access required");
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

  // Delete product
  const deleteProduct = async (item) => {
    if (!item?.id) {
      toast.error("Product ID is missing");
      return false;
    }

    if (!authUser || !isAdmin) {
      toast.error("Admin access required");
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

  const loading =
    authLoading ||
    productLoading ||
    orderLoading ||
    userLoading ||
    actionLoading;

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,

        authLoading,
        authUser,

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
