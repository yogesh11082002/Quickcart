
// "use client";
// import React, { useEffect, useState } from "react";
// import { assets } from "@/assets/assets";
// import Image from "next/image";
// import { useAppContext } from "@/context/AppContext";
// import Footer from "@/components/seller/Footer";
// import Loading from "@/components/Loading";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useAuth } from "@clerk/nextjs";

// const ProductList = () => {
//   const { router, user } = useAppContext();
//   const { getToken } = useAuth();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // for editing
//   const [editProduct, setEditProduct] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     category: "",
//     offerPrice: "",
//     image: [""], // Keep image as array
//   });

//   // Fetch seller products
//   const fetchSellerProduct = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.get("/api/product/seller-list", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setProducts(data.products);
//         setLoading(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error(error.message);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.delete(`/api/product/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         toast.success("Product deleted!");
//         setProducts(products.filter((p) => p._id !== id));
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("Failed to delete product");
//     }
//   };

//   // Open Edit Modal
//   const handleEditClick = (product) => {
//     setEditProduct(product);
//     setEditForm({
//       name: product.name,
//       category: product.category,
//       offerPrice: product.offerPrice,
//       image: product.image, // Keep it as array
//     });
//   };

//   // Save Edited Product
//   const handleSaveEdit = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.put(
//         `/api/product/${editProduct._id}`,
//         editForm,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         toast.success("Product updated!");
//         setProducts(
//           products.map((p) =>
//             p._id === editProduct._id ? { ...p, ...editForm } : p
//           )
//         );
//         setEditProduct(null);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Edit error:", error);
//       toast.error("Failed to update product");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchSellerProduct();
//     }
//   }, [user]);

//   return (
//     <div className="flex-1 min-h-screen flex flex-col justify-between">
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="w-full md:p-10 p-4">
//           <h2 className="pb-4 text-lg font-medium">All Product</h2>
//           <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//             <table className="table-fixed w-full overflow-hidden">
//               <thead className="text-gray-900 text-sm text-left">
//                 <tr>
//                   <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
//                     Product
//                   </th>
//                   <th className="px-4 py-3 font-medium truncate max-sm:hidden">
//                     Category
//                   </th>
//                   <th className="px-4 py-3 font-medium truncate">Price</th>
//                   <th className="px-4 py-3 font-medium truncate max-sm:hidden">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="text-sm text-gray-500">
//                 {products.map((product, index) => (
//                   <tr key={index} className="border-t border-gray-500/20">
//                     <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                       <div className="bg-gray-500/10 rounded p-2">
//                         <Image
//                           src={product.image[0]}
//                           alt="product Image"
//                           className="w-16"
//                           width={1280}
//                           height={720}
//                         />
//                       </div>
//                       <span className="truncate w-full">{product.name}</span>
//                     </td>

//                     <td className="px-4 py-3 max-sm:hidden">
//                       {product.category}
//                     </td>
//                     <td className="px-4 py-3">${product.offerPrice}</td>

//                     <td className="px-4 py-3 max-sm:hidden flex gap-2">
//                       {/* Visit */}
//                       <button
//                         onClick={() => router.push(`/product/${product._id}`)}
//                         className="flex items-center gap-1 px-2 py-2 bg-orange-600 text-white rounded-md"
//                       >
//                         <span className="hidden md:block">Visit</span>
//                       </button>

//                       {/* Edit */}
//                       <button
//                         onClick={() => handleEditClick(product)}
//                         className="px-2 py-2 bg-blue-600 text-white rounded-md"
//                       >
//                         Edit
//                       </button>

//                       {/* Delete */}
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="px-2 py-2 bg-red-600 text-white rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md w-96">
//             <h3 className="text-lg font-medium mb-4">Edit Product</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={editForm.name}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, name: e.target.value })
//               }
//               className="w-full border px-2 py-1 mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               value={editForm.category}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, category: e.target.value })
//               }
//               className="w-full border px-2 py-1 mb-2"
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={editForm.offerPrice}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, offerPrice: e.target.value })
//               }
//               className="w-full border px-2 py-1 mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={editForm.image[0]}
//               onChange={(e) =>
//                 setEditForm({ ...editForm, image: [e.target.value] })
//               }
//               className="w-full border px-2 py-1 mb-2"
//             />

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setEditProduct(null)}
//                 className="px-3 py-1 bg-gray-400 text-white rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default ProductList;


"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const ProductList = () => {
  const { router, user } = useAppContext();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For editing
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    offerPrice: "",
    images: [""], // Now array of multiple images
  });

  // Fetch seller products
  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Product deleted!");
        setProducts(products.filter((p) => p._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  // Open Edit Modal
  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      offerPrice: product.offerPrice,
      images: product.image, // Array of images
    });
  };

  // Update specific image URL
  const updateImage = (index, value) => {
    const newImages = [...editForm.images];
    newImages[index] = value;
    setEditForm({ ...editForm, images: newImages });
  };

  // Add new image input
  const addImageField = () => {
    setEditForm({ ...editForm, images: [...editForm.images, ""] });
  };

  // Remove an image input
  const removeImageField = (index) => {
    const newImages = editForm.images.filter((_, i) => i !== index);
    setEditForm({ ...editForm, images: newImages });
  };

  // Save Edited Product
  const handleSaveEdit = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        `/api/product/${editProduct._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Product updated!");
        setProducts(
          products.map((p) =>
            p._id === editProduct._id ? { ...p, ...editForm } : p
          )
        );
        setEditProduct(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Product</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2">
                        <Image
                          src={product.image[0]}
                          alt="product Image"
                          className="w-16"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <span className="truncate w-full">{product.name}</span>
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">
                      {product.category}
                    </td>
                    <td className="px-4 py-3">${product.offerPrice}</td>

                    <td className="px-4 py-3 max-sm:hidden flex gap-2">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-1 px-2 py-2 bg-orange-600 text-white rounded-md"
                      >
                        <span className="hidden md:block">Visit</span>
                      </button>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-2 py-2 bg-blue-600 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-2 py-2 bg-red-600 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-medium mb-4">Edit Product</h3>
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full border px-2 py-1 mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
              className="w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={editForm.offerPrice}
              onChange={(e) =>
                setEditForm({ ...editForm, offerPrice: e.target.value })
              }
              className="w-full border px-2 py-1 mb-2"
            />

            {/* Multiple images */}
            {editForm.images.map((img, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Image URL ${idx + 1}`}
                  value={img}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  className="w-full border px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addImageField}
              className="px-2 py-1 bg-green-600 text-white rounded-md mb-4"
            >
              + Add Image
            </button>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditProduct(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;
