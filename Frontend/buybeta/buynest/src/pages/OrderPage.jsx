import React from "react";
import { Link } from "react-router-dom";
import { Truck, Eye, XCircle } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import {sampleOrders} from "../reusables/data.jsx";
import {Footer} from "../components/Footer.jsx";

export const OrderPage = () => {
     return (
         <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">My Orders</h1>
                   <Link
                       to="/"
                       className="text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        Back to Home
                   </Link>
              </div>

              {/* Orders Table */}
              <div className="max-w-6xl mx-auto px-4 py-10">
                   <h2 className="text-2xl font-semibold text-blue-900 mb-6">Recent Orders</h2>

                   <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                        <table className="min-w-full table-auto">
                             <thead className="bg-blue-100 text-blue-800">
                             <tr>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Order ID</th>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Date</th>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Items</th>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Total</th>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Status</th>
                                  <th className="text-left px-6 py-3 text-sm font-semibold">Actions</th>
                             </tr>
                             </thead>
                             <tbody>
                             {sampleOrders.map((order) => (
                                 <tr key={order.id} className="border-b hover:bg-blue-50">
                                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{order.id}</td>
                                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                      <td className="px-6 py-4 text-sm text-gray-600">{order.items} item(s)</td>
                                      <td className="px-6 py-4 text-sm text-gray-600">₦{order.total.toLocaleString()}</td>
                                      <td className="px-6 py-4 text-sm">
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Shipped"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order.status === "Processing"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                                      </td>
                                      <td className="px-6 py-4 flex gap-2 items-center text-sm">
                                           {order.status !== "Cancelled" && (
                                               <Link
                                                   to={`/track-order/${order.id}`}
                                                   className="flex items-center gap-1 text-blue-600 hover:underline"
                                               >
                                                    <Truck size={16} />
                                                    Track
                                               </Link>
                                           )}
                                           <Link
                                               to={`/orders/${order.id}`}
                                               className="flex items-center gap-1 text-gray-700 hover:underline"
                                           >
                                                <Eye size={16} />
                                                View
                                           </Link>
                                           {order.status === "Processing" && (
                                               <button className="flex items-center gap-1 text-red-600 hover:underline">
                                                    <XCircle size={16} />
                                                    Cancel
                                               </button>
                                           )}
                                      </td>
                                 </tr>
                             ))}
                             </tbody>
                        </table>
                   </div>
              </div>
              <Footer/>
         </div>
     );
};
