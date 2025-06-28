import React, { useState, useRef, useEffect } from "react";

export function Select({ value, onValueChange, children }) {
     const [open, setOpen] = useState(false);
     const ref = useRef(null);

     useEffect(() => {
          function handleClickOutside(e) {
               if (ref.current && !ref.current.contains(e.target)) setOpen(false);
          }
          if (open) document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [open]);

     return (
         <div className="relative" ref={ref}>
              {React.Children.map(children, child => {
                   if (child.type === SelectTrigger) {
                        return React.cloneElement(child, { onClick: () => setOpen(v => !v), value });
                   }
                   if (child.type === SelectContent && open) {
                        return React.cloneElement(child, { onValueChange, setOpen });
                   }
                   if (child.type !== SelectTrigger && child.type !== SelectContent) {
                        return child;
                   }
                   return null;
              })}
         </div>
     );
}

export function SelectTrigger({ children, onClick, value }) {
     return (
         <button
             type="button"
             className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-200"
             onClick={onClick}
         >
              {children}
         </button>
     );
}

export function SelectValue({ placeholder, value }) {
     return <span className="text-gray-700">{value || placeholder}</span>;
}

export function SelectContent({ children, onValueChange, setOpen }) {
     return (
         <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
              {React.Children.map(children, child =>
                  React.cloneElement(child, { onValueChange, setOpen })
              )}
         </div>
     );
}

export function SelectItem({ value, children, onValueChange, setOpen }) {
     return (
         <div
             className="cursor-pointer px-4 py-2 hover:bg-blue-100"
             onClick={() => {
                  onValueChange(value);
                  setOpen(false);
             }}
         >
              {children}
         </div>
     );
}