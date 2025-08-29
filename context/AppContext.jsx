// "use client";

// import { productsDummyData } from "@/assets/assets";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

// export const AppContextProvider = ({ children }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY;
//   const router = useRouter();

//   const { user } = useUser();
//   const { getToken } = useAuth();

//   const [products, setProducts] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [loadingUser, setLoadingUser] = useState(false); // ✅ Loading state

//   // Fetch products (dummy data for now)
//   const fetchProductData = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");

//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error(error.message);
//     }
//   };

//   // Fetch user data from API
//   const fetchUserData = async () => {
//     try {
//       if (user.publicMetadata.role === "seller") {
//         setIsSeller(true);
//       }

//       // Don't log token
//       const token = await getToken();

//       const { data } = await axios.get("/api/user/data", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // console.log("API Response:", data); // Only log the response

//       if (data.success) {
//         setUserData(data.user);
//         setCartItems(data.user.cartItems);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error(error.message);
//     }
//   };

//   // Cart functions
//   const addToCart = async (itemId) => {
//     setCartItems((prev) => {
//       const updated = { ...prev };
//       updated[itemId] = (updated[itemId] || 0) + 1;
//       return updated;
//     });

//     if (user) {
//       try {
//         const token = await getToken();
//         await axios.post(
//           "/api/cart/update",
//           { cartData },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         toast.success("Item added to cart");
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         toast.error(error.message);
//       }
//     }
//   };

//   const updateCartQuantity = async (itemId, quantity) => {
//     setCartItems((prev) => {
//       const updated = { ...prev };
//       if (quantity <= 0) delete updated[itemId];
//       else updated[itemId] = quantity;
//       return updated;
//     });
//      if (user) {
//       try {
//         const token = await getToken();
//         await axios.post(
//           "/api/cart/update",
//           { cartData },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         toast.success("Cart updated");
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartCount = () =>
//     Object.values(cartItems).reduce((total, qty) => total + qty, 0);

//   const getCartAmount = () =>
//     Math.floor(
//       Object.entries(cartItems).reduce((sum, [id, qty]) => {
//         const product = products.find((p) => p._id === id);
//         return sum + (product?.offerPrice || 0) * qty;
//       }, 0) * 100
//     ) / 100;

//   // Effects
//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   useEffect(() => {
//     if (user) fetchUserData(); // ✅ Only fetch when user is loaded
//   }, [user]);

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         userData,
//         products,
//         cartItems,
//         isSeller,
//         loadingUser,
//         currency,
//         router,
//         fetchUserData,
//         addToCart,
//         updateCartQuantity,
//         getCartCount,
//         getCartAmount,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };


"use client";

import { productsDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const { user } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [loadingUser, setLoadingUser] = useState(false);

  // Fetch products
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      if (user?.publicMetadata?.role === "seller") {
        setIsSeller(true);
      }

      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    }
  };

  // 🔥 Helper to sync cart with backend
  const syncCartWithBackend = async (updatedCart) => {
    if (!user) return;
    try {
      const token = await getToken();
      await axios.post(
        "/api/cart/update",
        { cartData: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error syncing cart:", error);
      toast.error(error.message);
    }
  };

  // Add to cart
  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);
    await syncCartWithBackend(updatedCart);
    toast.success("Item added to cart");
  };

  // Update cart quantity
  const updateCartQuantity = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity <= 0) delete updatedCart[itemId];
    else updatedCart[itemId] = quantity;

    setCartItems(updatedCart);
    await syncCartWithBackend(updatedCart);
    toast.success("Cart updated");
  };

  // Cart total count
  const getCartCount = () =>
    Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  // Cart total amount
  const getCartAmount = () =>
    Math.floor(
      Object.entries(cartItems).reduce((sum, [id, qty]) => {
        const product = products.find((p) => p._id === id);
        return sum + (product?.offerPrice || 0) * qty;
      }, 0) * 100
    ) / 100;

  // Effects
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        userData,
        products,
        cartItems,
        isSeller,
        loadingUser,
        currency,
        router,
        fetchUserData,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
