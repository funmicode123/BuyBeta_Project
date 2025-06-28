import React from "react";
import { Link, useParams } from "react-router-dom";
import { Home, Truck, CheckCircle, Clock } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import {trackingSteps} from "../reusables/data.jsx";



export const TrackOrderPage = () => {
     const { orderId } = useParams(); // You can use this to fetch real data later

     return (
         <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">Track Order #{orderId}</h1>
                   <Link
                       to="/"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back Home</span>
                   </Link>
              </div>

              {/* Tracking Timeline */}
              <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
                   <h2 className="text-xl font-semibold text-blue-900 mb-6">Delivery Status</h2>
                   <ol className="relative border-l border-blue-300">
                        {trackingSteps.map((step, index) => (
                            <li key={index} className="mb-10 ml-6">
              <span
                  className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ${
                      step.status === "done"
                          ? "bg-green-500 ring-green-200"
                          : step.status === "current"
                              ? "bg-yellow-500 ring-yellow-200"
                              : "bg-gray-300 ring-gray-100"
                  }`}
              >
                {step.status === "done" ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                ) : step.status === "current" ? (
                    <Truck className="w-4 h-4 text-white" />
                ) : (
                    <Clock className="w-4 h-4 text-white" />
                )}
              </span>
                                 <h3 className="font-medium text-blue-900">{step.label}</h3>
                                 {step.timestamp && (
                                     <time className="block mb-1 text-sm text-gray-500">{step.timestamp}</time>
                                 )}
                                 <p className="text-sm text-gray-600">
                                      {step.status === "done"
                                          ? "Completed"
                                          : step.status === "current"
                                              ? "In progress"
                                              : "Pending..."}
                                 </p>
                            </li>
                        ))}
                   </ol>
              </div>
         </div>
     );
};
