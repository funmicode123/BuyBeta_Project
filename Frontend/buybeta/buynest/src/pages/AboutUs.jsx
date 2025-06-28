import React from "react";
import Logo from "../assets/Logo.png";

const AboutUs = () => {
     return (
         <div className="bg-blue-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-12 font-sans">
              <div className="text-xl font-bold text-blue-600">
                   <img src={Logo} alt="logo" className="h-8 w-auto"/>
              </div>
              <div className="max-w-5xl mx-auto space-y-10">
                   <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
                             About Us
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600">
                             Building the Future of Fair & Collaborative Commerce
                        </p>
                   </div>

                   <div className="space-y-6">
                        <p>
                             We are a mission-driven team on a journey to transform the way people
                             shop—<span className="font-semibold text-blue-700">together</span>.
                             Our platform empowers everyday consumers to unlock better prices by
                             joining forces with others, creating a smarter, more inclusive commerce
                             experience.
                        </p>

                        <p>
                             At the heart of our solution is the belief that{" "}
                             <span className="font-semibold">community is powerful</span>. By enabling
                             people to form buying groups, we eliminate the need for middlemen and put
                             control back in the hands of the consumer. No hidden markups. No price games.
                             Just transparent, automated group buying that benefits everyone involved.
                        </p>

                        <p>
                             Whether you're a shopper looking to save more or a vendor aiming to sell smarter,
                             our platform bridges the gap. Sellers gain volume, visibility, and loyal buyers.
                             Shoppers enjoy unbeatable deals and the confidence that comes with buying collectively.
                        </p>
                   </div>

                   <div className="grid sm:grid-cols-2 gap-8 mt-8">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md shadow-sm">
                             <h3 className="text-xl font-bold text-blue-700 mb-2">Why We Exist</h3>
                             <p>
                                  Emerging markets are filled with potential—but also inefficiencies. Prices are often
                                  inflated, access is limited, and trust is hard to come by. We’re building a solution
                                  rooted in these real-world challenges, using technology to remove friction and unlock
                                  the true power of demand aggregation.
                             </p>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-md shadow-sm">
                             <h3 className="text-xl font-bold text-orange-700 mb-2">Our Vision</h3>
                             <p>
                                  A world where <span
                                 className="font-semibold">buying power belongs to the people</span>.
                                  Where pricing is transparent, and shopping becomes a collective win.
                             </p>
                        </div>
                   </div>

                   <div className="mt-10 bg-gray-50 p-6 rounded-md shadow-sm">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Our Mission</h3>
                        <p>
                             To make group commerce simple, fair, and accessible for everyone. We’re helping people save
                             money,
                             vendors sell more, and communities grow stronger—one group deal at a time.
                        </p>
                   </div>
              </div>
         </div>
     );
};

export default AboutUs;
