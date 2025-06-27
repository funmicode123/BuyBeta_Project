import React from 'react';
import BuyBeta from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const Footer = () => {
     return (
         <div>
              {/* FOOTER */}
              <footer className="bg-blue-900  text-white p-8 mt-auto">
                   <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                        <div>
                             <img src={BuyBeta} className="h-15 w-auto mb-5"/>
                             <div className="text-blue-300">
                                  <p>Connecting fashion lovers worldwide through authentic African design.</p>
                             </div>
                        </div>
                        <div>
                             <h4 className="font-extrabold mb-5">Quick Links</h4>
                             <div className="text-blue-300">
                                  <ul className="space-y-1">
                                       <li>About Us</li>
                                       <li>How It Works</li>
                                       <li>Blockchain Security</li>
                                  </ul>
                             </div>
                        </div>
                        <div>
                             <h4 className="font-extrabold mb-5">Support</h4>
                             <div className="text-blue-300">
                                  <ul className="space-y-1">
                                       <li>Help Center</li>
                                       <li>Contact Us</li>
                                       <li>Shipping Info</li>
                                  </ul>
                             </div>
                        </div>
                        <div>
                             <h4 className="font-extrabold mb-5">Legal</h4>
                             <div className="text-blue-300">
                                  <ul className="space-y-1">
                                       <li>Privacy Policy</li>
                                       <li>Terms of Service</li>
                                       <li>Blockchain Terms</li>
                                  </ul>
                             </div>
                        </div>
                   </div>
                   <div className="border-t border-blue-300 mt-8 pt-4 text-center text-sm">
                        &copy; {new Date().getFullYear()} BuyBeta. All rights reserved.
                   </div>
              </footer>
         </div>
     )
}