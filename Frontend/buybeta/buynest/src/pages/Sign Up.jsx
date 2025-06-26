import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BackgroundImage from "../assets/backgroundImage.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import {toast} from "react-toastify";

const SignUpPage = () => {
     const [formData, setFormData] = useState({
          fullName: "",
          email: "",
          password: "",
     });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [success, setSuccess] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
     };


     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formData.fullName.length < 6) {
               toast.error("Username must be at least 6 characters!");
               return;
          }
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!formData.password) {
               toast.error("Password is required")
               return;
          } else
          if (!passwordRegex.test(formData.password)) {
               toast.error(
                   "Must be 8+ characters, include uppercase, lowercase, and a number.");
               return;
          } else
          if (formData.password.length < 6) {
               toast.error("Password must be at least 6 characters!");
               return;
          }

          if(!formData.email.includes("@")) {
               toast.error("invalid email");
               return;
          }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
               toast.error("Enter a valid email address.");
          }

          setIsSubmitting(true);
     };

     return (
         <div className="flex min-h-screen flex-col-reverse md:flex-row items-center bg-white">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex justify-center items-center">
                   <div className="w-full max-w-md">
                        <div className="mb-8 text-center flex flex-col items-center">
                             <img src={Logo} alt="logo" className="h-8 w-auto mb-2"/>
                             <p className="text-gray-600">Create your group-buying account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                             <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                       Full Name
                                  </label>
                                  <input
                                      type="text"
                                      name="fullName"
                                      value={formData.fullName}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                      placeholder="Jane Doe"
                                  />
                                  <div className="text-xs text-[#666] mt-[0.2rem] text-right">
                                       {20 - formData.fullName.length} characters remaining
                                  </div>
                             </div>

                             <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                  </label>
                                  <input
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                      placeholder="you@example.com"
                                  />
                             </div>

                             <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                       Password
                                  </label>
                                  <div className="relative">
                                       <input
                                           type={showPassword ? "text" : "password"}
                                           name="password"
                                           maxLength={20}
                                           value={formData.password}
                                           onChange={handleChange}
                                           className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                           placeholder="********"
                                       />
                                       <button
                                           type="button"
                                           onClick={() => setShowPassword(!showPassword)}
                                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                       >
                                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                       </button>
                                  </div>
                                  <div className="text-xs text-[#666] mt-[0.2rem] text-right">
                                       {20 - formData.password.length} characters remaining
                                  </div>
                             </div>

                             <button
                                 type="submit"
                                 className="w-full bg-[#2563EB] text-white font-medium py-3 px-4 rounded-lg transition duration-200 hover:bg-[#1E40AF] transform hover:scale-[1.02]"
                                 disabled={isSubmitting}
                             >
                                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                             </button>

                             <p className="text-sm text-center text-gray-600">
                                  Already have an account?{" "}
                                  <a href="/login" className="text-[#2563EB] hover:underline">
                                       Log in
                                  </a>
                             </p>
                        </form>
                   </div>
              </div>

              <div
                  className="hidden sm:flex w-full md:w-1/2 bg-[#E0ECFF] items-center justify-center p-8 min-h-[30vh] md:min-h-screen">
                   <div className="max-w-lg p-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-[#1A1F2C] mb-4">
                             Unlock Group Power with{" "}
                             <img src={Logo} alt="logo" className="h-8 w-auto"/>
                        </h2>
                        <p className="text-gray-700 mb-6">
                             Pool funds with others and get better deals. Buying as a group has
                             never been easier.
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
     );
};

export default SignUpPage;
