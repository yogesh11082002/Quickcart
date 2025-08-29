// 'use client';
// import React, { useEffect, useState } from "react";
// import { assets, orderDummyData } from "@/assets/assets";
// import Image from "next/image";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useAppContext } from "@/context/AppContext";
// import Footer from "@/components/seller/Footer";
// import Loading from "@/components/Loading";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { set } from "mongoose";

// const Orders = () => {

//     const { user } = useUser();
//       const { getToken } = useAuth();
//     const { currency } = useAppContext();

//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchSellerOrders = async () => {
//         try {
     
//       const token = await getToken();
//       const { data } = await axios.get("/api/order/seller-orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//        setOrders(data.orders);
//        setLoading(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error(error.message);
//     }
       
//     }

//     useEffect(() => {
//        if (user) {
//          fetchSellerOrders();
//        }
//     }, [user]);

//     return (
//         <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
//             {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
//                 <h2 className="text-lg font-medium">Orders</h2>
//                 <div className="max-w-4xl rounded-md">
//                     {orders.map((order, index) => (
//                         <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300">
//                             <div className="flex-1 flex gap-5 max-w-80">
//                                 <Image
//                                     className="max-w-16 max-h-16 object-cover"
//                                     src={assets.box_icon}
//                                     alt="box_icon"
//                                 />
//                                 <p className="flex flex-col gap-3">
//                                     <span className="font-medium">
//                                         {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
//                                     </span>
//                                     <span>Items : {order.items.length}</span>
//                                 </p>
//                             </div>
//                             <div>
//                                 <p>
//                                     <span className="font-medium">{order.address.fullName}</span>
//                                     <br />
//                                     <span >{order.address.area}</span>
//                                     <br />
//                                     <span>{`${order.address.city}, ${order.address.state}`}</span>
//                                     <br />
//                                     <span>{order.address.phoneNumber}</span>
//                                 </p>
//                             </div>
//                             <p className="font-medium my-auto">{currency}{order.amount}</p>
//                             <div>
//                                 <p className="flex flex-col">
//                                     <span>Method : COD</span>
//                                     <span>Date : {new Date(order.date).toLocaleDateString()}</span>
//                                     <span>Payment : Pending</span>
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>}
//             <Footer />
//         </div>
//     );
// };

// export default Orders;

'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const Orders = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { currency } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                {/* Left: Items */}
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
                      {order.items
                        .map((item) => {
                          const product = item.productId; // populated from backend
                          return product
                            ? `${product.name} x ${item.quantity}`
                            : `Unknown product x ${item.quantity}`;
                        })
                        .join(", ")}
                    </span>
                    <span>Items : {order.items.length}</span>
                  </p>
                </div>

                {/* Middle: Address */}
                <div>
                  <p>
                    <span className="font-medium">
                      {order.address?.fullName || "No name"}
                    </span>
                    <br />
                    <span>{order.address?.area || "No area"}</span>
                    <br />
                    <span>
                      {order.address
                        ? `${order.address.city || "No city"}, ${
                            order.address.state || "No state"
                          }`
                        : "No address"}
                    </span>
                    <br />
                    <span>{order.address?.phoneNumber || "No phone"}</span>
                  </p>
                </div>

                {/* Right: Amount */}
                <p className="font-medium my-auto">
                  {currency}
                  {order.amount}
                </p>

                {/* Order Info */}
                <div>
                  <p className="flex flex-col">
                    <span>Method : COD</span>
                    <span>
                      Date :{" "}
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "No date"}
                    </span>
                    <span>Payment : Pending</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
