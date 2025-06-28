import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { products } from "../reusables/data.jsx";
import { Star, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { useWishlist } from "../reusables/WishListContext.jsx";
import { useCart } from "../reusables/CartContext.jsx";

export const ProductsPage = () => {
     const { addToWishlist, isInWishlist } = useWishlist();
     const { addToCart } = useCart();
     const { id } = useParams();

     const product = products.find((p) => p.id === parseInt(id));
     const [quantity, setQuantity] = useState(1);

     if (!product) {
          return <div className="text-center mt-24 text-lg font-semibold">Product not found</div>;
     }

     const maxQty = product.itemsLeft || 20;
     const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, maxQty));
     const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

     const discount = product.originalPrice
         ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
         : 0;

     const percentageLeft = product.itemsLeft ? Math.round((product.itemsLeft / 20) * 100) : 50;

     return (
         <div className="min-h-screen flex flex-col bg-white">
              <Header />

              <main className="flex-grow pt-28 sm:pt-32">
                   <div className="max-w-7xl mx-auto px-6 py-10">
                        <div className="flex flex-col md:flex-row gap-12">
                             {/* Product Image & Rating */}
                             <div className="w-full md:w-1/2">
                                  <img
                                      src={product.image}
                                      alt={product.name || "Product image"}
                                      className="rounded-lg border shadow-md w-full object-cover"
                                  />
                                  <div className="mt-4 flex items-center gap-2">
                                       <span className="text-sm text-gray-600">{product.rating} Reviews</span>
                                       <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < product.rating ? "currentColor" : "none"}
                                                    className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                                                    strokeWidth={1.5}
                                                />
                                            ))}
                                       </div>
                                  </div>
                             </div>

                             {/* Product Info */}
                             <div className="w-full md:w-1/2 space-y-4">
                                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                  <p className="text-gray-600 font-medium">{product.label}</p>

                                  {/* Pricing */}
                                  <div className="flex items-center gap-3">
                                       <p className="text-2xl font-bold text-black">
                                            ₦{(product.price * quantity).toLocaleString()}
                                       </p>
                                       {product.originalPrice && (
                                           <>
                                                <span className="line-through text-gray-400 text-lg">
                                                     ₦{(product.originalPrice * quantity).toLocaleString()}
                                                </span>
                                                <span className="text-green-600 font-medium text-sm">
                                                     -{discount}%
                                                </span>
                                           </>
                                       )}
                                  </div>

                                  <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>

                                  {/* Stock Info */}
                                  <div className="space-y-2">
                                       <div className="text-sm text-gray-500">{product.itemsLeft} items left</div>
                                       <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-500 h-1.5 rounded-full"
                                                style={{ width: `${percentageLeft}%` }}
                                            />
                                       </div>
                                       <div className="flex items-center gap-3">
                                            <span className="text-green-600 font-medium text-sm">✓ IN STOCK</span>
                                       </div>

                                       {/* Quantity & Wishlist */}
                                       <div className="flex items-center gap-2">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="px-3 py-1 border rounded text-lg"
                                            >−</button>
                                            <span className="px-4">{quantity}</span>
                                            <button
                                                onClick={increaseQuantity}
                                                className="px-3 py-1 border rounded text-lg"
                                            >+</button>

                                            <button
                                                onClick={() => addToWishlist(product)}
                                                disabled={isInWishlist(product.id)}
                                                className={`text-sm ${isInWishlist(product.id)
                                                    ? "text-pink-500"
                                                    : "text-gray-600 hover:text-pink-500"}`}
                                            >
                                                 {isInWishlist(product.id) ? "In Wishlist" : "♡ Add to Wishlist"}
                                            </button>
                                       </div>
                                  </div>

                                  {/* Add to Cart */}
                                  <button
                                      onClick={() => addToCart({ ...product, quantity })}
                                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-center shadow"
                                  >
                                       Add to cart
                                  </button>

                                  <p className="text-green-600 text-sm text-center font-semibold">
                                       Save 15% when you group up
                                  </p>

                                  {/* More Details */}
                                  <div className="mt-6 text-sm text-gray-700 space-y-1">
                                       <p><span className="font-semibold">Dimensions:</span> {product.dimensions}</p>
                                       <p><span className="font-semibold">Size:</span> {product.size}</p>
                                       <details className="mt-2">
                                            <summary className="font-semibold text-black cursor-pointer">Description</summary>
                                            <div className="mt-2 text-sm">{product.description}</div>
                                       </details>
                                  </div>

                                  {/* Share Section */}
                                  <div className="mt-6 flex items-center gap-4">
                                       <span className="text-sm font-medium text-gray-600">SHARE</span>
                                       <div className="flex gap-3 text-gray-500">
                                            <a href="https://twitter.com/share" target="_blank" rel="noopener noreferrer">
                                                 <Twitter className="w-5 h-5 hover:text-black cursor-pointer" />
                                            </a>
                                            <a href="https://facebook.com/sharer/sharer.php" target="_blank" rel="noopener noreferrer">
                                                 <Facebook className="w-5 h-5 hover:text-black cursor-pointer" />
                                            </a>
                                            <a href="https://linkedin.com/shareArticle" target="_blank" rel="noopener noreferrer">
                                                 <Linkedin className="w-5 h-5 hover:text-black cursor-pointer" />
                                            </a>
                                            <a
                                                href={`mailto:?subject=Check%20this%20out&body=Take%20a%20look%20at%20this%20product`}
                                                target="_blank" rel="noreferrer"
                                            >
                                                 <Mail className="w-5 h-5 hover:text-black cursor-pointer" />
                                            </a>
                                       </div>
                                  </div>
                             </div>
                        </div>
                   </div>
              </main>

              <Footer />
         </div>
     );
};
