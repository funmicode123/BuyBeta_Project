import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackgroundImage from "../assets/backgroundImage.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer.jsx";

const SignInPage = () => {
     const [formData, setFormData] = useState({ email: "", password: "" });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!/\S+@\S+\.\S+/.test(formData.email)) {
               toast.error("Enter a valid email address.");
               return;
          }

          if (!formData.password) {
               toast.error("Password is required");
               return;
          }

          setIsSubmitting(true);
          // Simulate login
          setTimeout(() => {
               setIsSubmitting(false);
               toast.success("Logged in successfully!");
               navigate("/dashboard");
          }, 1500);
     };

     return (
         <div className="min-h-screen overflow-hidden">
              <div className="flex h-screen flex-col-reverse md:flex-row items-center">
                   {/* Left Form Section */}
                   <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-6 md:px-12 bg-[#2563EB] text-white">
                        <div className="w-full max-w-md">
                             <div className="mb-8 text-center flex flex-col items-center">
                                  <img src={Logo} alt="logo" className="h-12 w-auto mb-3" />
                                  <p className="text-gray-200">Sign in to your group-buying account</p>
                             </div>
                             <form onSubmit={handleSubmit} className="space-y-4">
                                  <div>
                                       <label className="block text-sm font-medium text-white mb-1">Email</label>
                                       <input
                                           type="email"
                                           name="email"
                                           value={formData.email}
                                           onChange={handleChange}
                                           className="w-full px-4 py-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                                           placeholder="you@example.com"
                                       />
                                  </div>

                                  <div>
                                       <label className="block text-sm font-medium text-white mb-1">Password</label>
                                       <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                                                placeholder="********"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                       </div>
                                  </div>

                                  <button
                                      type="submit"
                                      className="w-full bg-white text-[#2563EB] font-semibold py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-100 transform hover:scale-[1.02]"
                                      disabled={isSubmitting}
                                  >
                                       {isSubmitting ? "Signing In..." : "Sign In"}
                                  </button>

                                  <p className="text-sm text-center text-gray-200">
                                       Don’t have an account?{" "}
                                       <a href="/signup" className="text-white underline hover:text-gray-100">
                                            Sign up
                                       </a>
                                  </p>
                             </form>
                        </div>
                   </div>

                   {/* Right Side Image Section */}
                   <div className="hidden sm:flex w-full md:w-1/2 bg-[#E0ECFF] items-center justify-center p-8 min-h-[30vh] md:min-h-screen">
                        <div className="max-w-lg p-4 text-center md:text-left">
                             <h2 className="text-3xl font-bold text-[#1A1F2C] mb-4">
                                  Welcome Back to{" "}
                                  <img src={Logo} alt="logo" className="h-8 inline w-auto ml-1" />
                             </h2>
                             <p className="text-gray-700 mb-6">
                                  Continue getting the best group deals. Sign in and start saving!
                             </p>
                             <div className="relative h-64 md:h-80 overflow-hidden rounded-xl shadow-xl">
                                  <img
                                      src={BackgroundImage}
                                      alt="Group Buying Visual"
                                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500 ease-in-out"
                                  />
                             </div>
                        </div>
                   </div>
              </div>
              <Footer />
         </div>
     );
};

export default SignInPage;
