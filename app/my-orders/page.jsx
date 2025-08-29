// 'use client';
// import React, { useEffect, useState } from "react";
// import { assets } from "@/assets/assets";
// import Image from "next/image";
// import { useAppContext } from "@/context/AppContext";
// import Footer from "@/components/Footer";
// import { useAuth, useUser } from "@clerk/nextjs";
// import Navbar from "@/components/Navbar";
// import Loading from "@/components/Loading";
// import toast from "react-hot-toast";
// import axios from "axios";

// const MyOrders = () => {
//   const { currency } = useAppContext();
//   const { user } = useUser();
//   const { getToken } = useAuth();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/order/list", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setOrders(data.orders.reverse());
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchOrders();
//     }
//   }, [user]);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
//         <div className="space-y-5">
//           <h2 className="text-lg font-medium mt-6">My Orders</h2>
//           {loading ? (
//             <Loading />
//           ) : (
//             <div className="max-w-5xl border-t border-gray-300 text-sm">
//               {orders.map((order, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
//                 >
//                   {/* Product Preview */}
//                   <div className="flex-1 flex gap-5 max-w-80">
//                     <Image
//                       className="w-16 h-16 object-cover rounded-md"
//                       src={order.items[0]?.product?.image || assets.box_icon}
//                       alt={order.items[0]?.product?.name || "box_icon"}
//                       width={64}
//                       height={64}
//                     />
//                     <p className="flex flex-col gap-3">
//                       <span className="font-medium text-base">
//                         {order.items
//                           .map(
//                             (item) =>
//                               `${item.product?.name || "Unnamed"} x ${
//                                 item.quantity
//                               }`
//                           )
//                           .join(", ")}
//                       </span>
//                       <span>Items: {order.items.length}</span>
//                     </p>
//                   </div>

//                   {/* Address */}
//                   <div>
//                     <p>
//                       <span className="font-medium">
//                         {order.address?.fullName || "No name"}
//                       </span>
//                       <br />
//                       <span>{order.address?.area || "N/A"}</span>
//                       <br />
//                       <span>
//                         {order.address?.city || "N/A"},{" "}
//                         {order.address?.state || ""}
//                       </span>
//                       <br />
//                       <span>{order.address?.phoneNumber || "N/A"}</span>
//                     </p>
//                   </div>

//                   {/* Amount */}
//                   <p className="font-medium my-auto">
//                     {currency}
//                     {order.amount}
//                   </p>

//                   {/* Order Meta */}
//                   <div>
//                     <p className="flex flex-col">
//                       <span>Method: {order.paymentMethod || "COD"}</span>
//                       <span>
//                         Date:{" "}
//                         {order.date
//                           ? new Date(order.date).toLocaleDateString()
//                           : "N/A"}
//                       </span>
//                       <span>
//                         Payment: {order.paymentStatus || "Pending"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyOrders;

'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import { useAuth, useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const MyOrders = () => {
  const { currency } = useAppContext();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders); // already sorted in backend
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  {/* Product Preview */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="w-16 h-16 object-cover rounded-md"
                      src={
                        typeof order.items[0]?.productId?.image === "string" &&
                        order.items[0]?.productId?.image.trim() !== ""
                          ? order.items[0].productId.image
                          : assets.box_icon
                      }
                      alt={order.items[0]?.productId?.name || "Product"}
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-base">
                        {order.items
                          .map(
                            (item) =>
                              `${item.productId?.name || "Unnamed Product"} x ${
                                item.quantity
                              }`
                          )
                          .join(", ")}
                      </span>
                      <span className="text-gray-500">
                        Items: {order.items.length}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="leading-5">
                      <span className="font-medium">
                        {order.address?.fullName || "No name"}
                      </span>
                      <br />
                      <span>
                        {[
                          order.address?.area,
                          order.address?.city,
                          order.address?.state,
                          order.address?.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ") || "N/A"}
                      </span>
                      <br />
                      <span>{order.address?.phoneNumber || "N/A"}</span>
                    </p>
                  </div>

                  {/* Amount */}
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amount ? Number(order.amount).toFixed(2) : "0.00"}
                  </p>

                  {/* Order Meta */}
                  <div>
                    <p className="flex flex-col">
                      <span>Method: {order.paymentMethod || "COD"}</span>
                      <span>
                        Date:{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </span>
                      <span>
                        Payment: {order.paymentStatus || "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
