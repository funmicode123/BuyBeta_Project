import React from 'react';
import { FaStar } from "react-icons/fa";

export const StarRating = ({ rating, onRate }) => {
     return (
         <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => {
                   const ratingValue = i + 1;
                   return (
                       <label key={i} className="cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => onRate(ratingValue)}
                                className="hidden"
                            />
                            <FaStar
                                className={`text-xl transition ${
                                    ratingValue <= rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                            />
                       </label>
                   );
              })}
         </div>
     );
};