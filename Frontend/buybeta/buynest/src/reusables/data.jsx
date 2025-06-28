import SellIcon from "../assets/sell.png";
import WalletIcon from "../assets/wallet.png";
import ShippingIcon from "../assets/shipping.png";
import Image1 from "../assets/delight-dzansi-_DmkY-1JqKY-unsplash(1).png";
import image2 from "../assets/image(1).png"
import image3 from "../assets/image(2).png"
import image4 from "../assets/image(3).png"
import image5 from "../assets/image(4).png"
import image6 from "../assets/image(5).png"

import Product1 from "../assets/product1.jpg";
import Product2 from "../assets/product2.jpg";
import Product3 from "../assets/product3.jpg";
import {FaGlobe, FaLock, FaShieldAlt, FaTruck, FaUsers} from "react-icons/fa";

export const features = [
     {
          title: "Group Buying Power",
          description: "Pool funds with others to unlock bulk discounts and exclusive items",
          icon: <FaUsers className="w-8 h-8" />,
     },
     {
          title: "Blockchain Security",
          description: "Secure transactions and transparent fund management with blockchain",
          icon: <FaShieldAlt className="w-8 h-8" />,
     },
     {
          title: "Global Marketplace",
          description: "Access authentic African fashion from verified stores worldwide",
          icon: <FaGlobe className="w-8 h-8" />,
     },
     {
          title: "Smart Delivery",
          description: "Track your orders and coordinate group deliveries seamlessly",
          icon: <FaTruck className="w-8 h-8" />,
     },
];
export const categories = [
     {
          title: 'Traditional Dresses',
          items: 245,
          image: Image1,
     },
     {
          title: 'Ankara Prints',
          items: 189,
          image: image2,
     },
     {
          title: 'Kente Cloth',
          items: 156,
          image: image3,
     },
     {
          title: 'Dashiki Shirts',
          items: 134,
          image: image4,
     },
     {
          title: 'Head Wraps',
          items: 98,
          image: image5,
     },
     {
          title: 'Accessories',
          items: 267,
          image: image6,
     },
];

export const featureList = [
     {
          icon: SellIcon,
          title: "Sell fashion anywhere",
          description:
              "From your dashboard to trending social feeds, reach style-savvy shoppers looking for great group fashion deals — effortlessly.",
     },
     {
          icon: WalletIcon,
          title: "Flexible payment options",
          description:
              "Let buyers pay with cards, local wallets, or split-pay for group fashion orders — all powered by BuyBeta Payments.",
     },
     {
          icon: ShippingIcon,
          title: "Fast fashion fulfillment",
          description:
              "Dispatch fashion items to multiple customers at once with just one click, plus enjoy reduced shipping rates for bulk fashion orders.",
     },
];

export const testimonials = [
     {
          name: "Ada Nwoke",
          role: "Lagos, Nigeria",
          comment: "I got a designer dress 30% cheaper through a BuyBeta fashion group deal. I’m hooked!",
          image: "https://i.pravatar.cc/150?img=1",
     },
     {
          name: "Chinedu Okafor",
          role: "Abuja, Nigeria",
          comment: "BuyBeta helped me get premium sneakers at a great price by joining a group buy. Game changer!",
          image: "https://i.pravatar.cc/150?img=2",
     },
];

export const faqItems = [
     {
          question: "Why use BuyBeta for fashion?",
          answer:
              "You get wholesale prices for trendy clothes and accessories by teaming up with other shoppers. Save big, stay stylish.",
     },
     {
          question: "Is it free to sell fashion?",
          answer:
              "Yes. Listing your fashion items is free. We only take a small fee on successful group sales.",
     },
     {
          question: "What kind of fashion items can I sell?",
          answer:
              "Clothing, shoes, bags, jewelry, accessories, and more. If it’s wearable — you can sell it.",
     },
     {
          question: "Do I need a business to start selling fashion?",
          answer:
              "Nope! Whether you’re a fashion influencer or a boutique owner, just sign up with your email and start selling.",
     },
     {
          question: "Where can I sell fashion on BuyBeta?",
          answer:
              "Anywhere in Nigeria. Fashion sellers from all 36 states can reach buyers nationwide.",
     },
];

export const menuSections = [
     {
          title: "BuyBeta",
          items: [
               { label: "About", path: "/about" },
               { label: "Careers", path: "/careers" },
               { label: "Fashion Partners", path: "/partners" },
               { label: "Affiliates", path: "/affiliates" },
               { label: "Legal", path: "/legal" },
          ],
     },
     {
          title: "Support",
          items: [
               { label: "Fashion support", path: "/merchant-support" },
               { label: "Help centre", path: "/help-centre" },
               { label: "Hire stylists", path: "/hire-partner" },
          ],
     },
     {
          title: "Fashion",
          items: [
               { label: "Shop Fashion", path: "/shop/fashion" },
               { label: "Designer Deals", path: "/shop/designers" },
               { label: "Bulk Clothing Orders", path: "/wholesale/fashion" },
          ],
     },
];

export const items = [
     "Shop Group Fashion Deals - Click Here",
     "Invite Friends, Earn Style Points - Click Here",
     "Sell Your Fashion Line - Click Here",
];

export const navItems = [
     {
          title: "Shop Fashion",
          href: "/fashion",
          dropdown: [
               { label: "Men's Clothing", href: "/fashion/men" },
               { label: "Women's Clothing", href: "/fashion/women" },
               { label: "Footwear", href: "/fashion/footwear" },
               { label: "Accessories", href: "/fashion/accessories" },
          ],
     },
     {
          title: "Group Buys",
          href: "/fashion-deals",
          dropdown: [
               { label: "Trending Deals", href: "/fashion-deals/trending" },
               { label: "Limited Edition", href: "/fashion-deals/limited" },
          ],
     },
     {
          title: "Sell Fashion",
          href: "/sell",
          dropdown: [
               { label: "Start Selling", href: "/sell/signup" },
               { label: "How It Works", href: "/sell/how-it-works" },
          ],
     },
];

export const products = [
     {
          id: 1,
          image: "https://images.unsplash.com/photo-1611312446172-1d47c5fdf18e",
          label: "Save 15% when you group up",
          name: "Adire Ankara Gown",
          price: 12500,
          originalPrice: 15000,
          rating: 4.8,
          itemsLeft: 6,
          size: "M, L, XL",
          dimensions: "Folded",
          description:
              "Handmade Nigerian Adire gown, vibrant and versatile. Ideal for casual or formal wear.",
     },
     {
          id: 2,
          image: "https://images.unsplash.com/photo-1579389083078-246d84d2c913",
          label: "Join the sneaker wave",
          name: "Nike Air Max 90",
          price: 68000,
          originalPrice: 80000,
          rating: 4.6,
          itemsLeft: 15,
          size: "US 8-12",
          dimensions: "Boxed",
          description:
              "Classic sneakers that blend comfort and style. Suitable for both street and activewear.",
     },
     {
          id: 3,
          image: "https://images.unsplash.com/photo-1616627988773-10c43f3d8d56",
          label: "Luxury for less",
          name: "Leather Tote Handbag",
          price: 30000,
          originalPrice: 35000,
          rating: 4.3,
          itemsLeft: 12,
          size: "Medium",
          dimensions: "40cm x 30cm x 12cm",
          description:
              "Elegant and durable tote made from premium leather. Perfect for daily use or travel.",
     },
     {
          id: 4,
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954",
          label: "Group fragrance discount",
          name: "Dior Sauvage EDT 100ml",
          price: 92000,
          originalPrice: 110000,
          rating: 4.9,
          itemsLeft: 10,
          size: "100ml",
          dimensions: "Boxed",
          description:
              "Bold and fresh designer fragrance for men. Long-lasting and magnetic.",
     },
     {
          id: 5,
          image: "https://images.unsplash.com/photo-1625842730383-e3b045f7f598",
          label: "Audio & style combo",
          name: "JBL Flip 6 + T-Shirt Bundle",
          price: 62000,
          originalPrice: 70000,
          rating: 4.5,
          itemsLeft: 7,
          size: "Speaker + Shirt Size M-XL",
          dimensions: "Boxed",
          description:
              "Get a wireless speaker with a premium branded shirt. Style meets sound.",
     },
];
export const stores = [
     {
          name: "Afro Chic Boutique",
          location: "Lagos, Nigeria",
          rating: 4.8,
          items: 154,
     },
     {
          name: "Kente Kingdom",
          location: "Accra, Ghana",
          rating: 4.4,
          items: 203,
     },
     {
          name: "Ankara Avenue",
          location: "Nairobi, Kenya",
          rating: 4.7,
          items: 178,
     },
     {
          name: "Heritage Fabrics",
          location: "CapeTown, SA",
          rating: 4.6,
          items: 145,
     },
];
export const categories2 = [
     {
          id: 1,
          title: "Jewelry & Accessories",
          description: "Traditional and contemporary African jewelry and accessories",
          image: "/assets/jewelry.jpg",
          price: "₦10,000 - ₦200,000",
          items: 123,
          groups: 5,
          rating: 4,
          featured: true,
          stores: ["Massai Elegance", "Beads and Beyond", "1 more"],
     },
     {
          id: 2,
          title: "Ankara Prints",
          description: "Traditional and contemporary African prints",
          image: "/assets/ankara.jpg",
          price: "₦5,000 - ₦150,000",
          items: 245,
          groups: 15,
          rating: 2.8,
          featured: true,
          stores: ["Massai Elegance", "Beads and Beyond", "1 more"],
     },
     {
          id: 3,
          title: "Home Decor and Textiles",
          description: "Traditional and contemporary African home decor and textiles",
          image: "/assets/home-decor.jpg",
          price: "₦5,000 - ₦200,000",
          items: 450,
          groups: 5,
          rating: 4.5,
          featured: true,
          stores: ["Massai Elegance", "Beads and Beyond", "1 more"],
     },
     {
          id: 4,
          title: "Traditional Dresses",
          description: "Traditional and contemporary African dresses",
          image: "/assets/traditional-dresses.jpg",
          price: "₦10,000 - ₦150,000",
          items: 90,
          groups: 2,
          rating: 5,
          featured: false,
          stores: ["Eleganza Africa", "AfroStyle Hub", "1 more"],
     },
     {
          id: 5,
          title: "African Children's Wear",
          description: "Traditional and contemporary African children's wear",
          image: "/assets/children-wear.jpg",
          price: "₦5,000 - ₦100,000",
          items: 500,
          groups: 5,
          rating: 1.6,
          featured: true,
          stores: ["MiniRoots", "Little Kulture", "1 more"],
     },
     {
          id: 6,
          title: "Head Wraps and Scarves",
          description: "Traditional and contemporary African head wraps and scarves",
          image: "/assets/head-wraps.jpg",
          price: "₦2,000 - ₦50,000",
          items: 780,
          groups: 23,
          rating: 3.5,
          featured: false,
          stores: ["Crown & Culture", "WrapQueen Africa", "1 more"],
     },
     {
          id: 7,
          title: "Kente Cloth",
          description: "Traditional and contemporary African Kente cloth",
          image: "/assets/kente-cloth.jpg",
          price: "₦10,000 - ₦250,000",
          items: 5,
          groups: 12,
          rating: 4.2,
          featured: true,
          stores: ["Royal Kente", "Ghana Textiles", "1 more"],
     },
     {
          id: 8,
          title: "Dashiki Shirts",
          description: "Traditional and contemporary African Dashiki shirts",
          image: "/assets/dashiki.jpg",
          price: "₦5,000 - ₦100,000",
          items: 24,
          groups: 5,
          rating: 4.6,
          featured: false,
          stores: ["Urban AfroStyle", "Dashiki Hub", "1 more"],
     },
     {
          id: 9,
          title: "Men's Traditional Wear",
          description: "Traditional and contemporary African men's traditional wear",
          image: "/assets/mens-wear.jpg",
          price: "₦10,000 - ₦200,000",
          items: 45,
          groups: 10,
          rating: 4.7,
          featured: true,
          stores: ["Heritage Attire", "Noble Threads", "1 more"],
     },
];
export const stores2 = [
     {
          id: 1,
          title: "Kente Kingdom",
          image: "/images/store1.jpg",
          rating: 4.5,
          location: "Accra, Ghana",
          description: "Authentic handmade Kente designs.",
          groups: 120,
          price: "₦75,000",
          items: 45
     },
     {
          id: 2,
          title: "Ankara Vibes",
          image: "/images/store2.jpg",
          rating: 4.2,
          location: "Lagos, Nigeria",
          description: "Modern Ankara outfits and accessories.",
          groups: 85,
          price: "₦55,000",
          items: 30
     },
     {
          id: 3,
          title: "Zulu Threads",
          image: "/images/store3.jpg",
          rating: 4.7,
          location: "Durban, South Africa",
          description: "Vibrant Zulu heritage fashion.",
          groups: 150,
          price: "₦110,000",
          items: 60
     },
     {
          id: 4,
          title: "Ethiopian Chic",
          image: "/images/store4.jpg",
          rating: 4.4,
          location: "Addis Ababa, Ethiopia",
          description: "Linen and cotton wear with traditional patterns.",
          groups: 62,
          price: "₦48,000",
          items: 20
     },
     {
          id: 5,
          title: "Swahili Styles",
          image: "/images/store5.jpg",
          rating: 4.6,
          location: "Mombasa, Kenya",
          description: "Swahili fabrics and jewelry.",
          groups: 98,
          price: "₦89,000",
          items: 35
     },
     {
          id: 6,
          title: "Ashanti Gold Wear",
          image: "/images/store6.jpg",
          rating: 4.9,
          location: "Kumasi, Ghana",
          description: "Premium Ashanti ceremonial attire.",
          groups: 200,
          price: "₦150,000",
          items: 50
     },
     {
          id: 7,
          title: "Igbo Vogue",
          image: "/images/store7.jpg",
          rating: 4.3,
          location: "Enugu, Nigeria",
          description: "High-end Igbo traditional wears.",
          groups: 70,
          price: "₦95,000",
          items: 40
     },
     {
          id: 8,
          title: "Sahara Nomad Fashion",
          image: "/images/store8.jpg",
          rating: 4.1,
          location: "Agadez, Niger",
          description: "Desert-inspired light fashion.",
          groups: 58,
          price: "₦40,000",
          items: 25
     },
     {
          id: 9,
          title: "Cape Couture",
          image: "/images/store9.jpg",
          rating: 4.8,
          location: "Cape Town, South Africa",
          description: "Urban African designs with Western fusion.",
          groups: 110,
          price: "₦102,000",
          items: 65
     },
     {
          id: 10,
          title: "AfroGlam",
          image: "/images/store10.jpg",
          rating: 4.7,
          location: "Nairobi, Kenya",
          description: "Contemporary African glamour clothing.",
          groups: 140,
          price: "₦88,000",
          items: 55
     }
];
export const sampleGroups = [
     {
          id: 1,
          title: "Buy 3 Ankara Dresses - Save 20%",
          store: "Ankara Vibes",
          storeId: 2,
          location: "Lagos, Nigeria",
          members: 12,
          goal: 20,
          status: "active",
          image: "/images/group1.jpg",
          price: "₦25,000",
     },
     {
          id: 2,
          title: "10 Kente Scarves Deal",
          store: "Kente Kingdom",
          storeId: 1,
          location: "Accra, Ghana",
          members: 8,
          goal: 10,
          status: "almost full",
          image: "/images/group2.jpg",
          price: "₦18,000",
     },
     {
          id: 3,
          title: "Group Buy for Zulu Jewelry Set",
          store: "Zulu Threads",
          storeId: 3,
          location: "Durban, South Africa",
          members: 4,
          goal: 15,
          status: "active",
          image: "/images/group3.jpg",
          price: "₦32,000",
     },
     {
          id: 4,
          title: "Luxury Ashanti Wear - Group of 5",
          store: "Ashanti Gold Wear",
          storeId: 6,
          location: "Kumasi, Ghana",
          members: 5,
          goal: 5,
          status: "closed",
          image: "/images/group4.jpg",
          price: "₦150,000",
     },
];
export const sampleOrders = [
     {
          id: "ORD-1001",
          date: "2025-06-25",
          status: "Shipped",
          total: 23000,
          items: 3,
     },
     {
          id: "ORD-1002",
          date: "2025-06-22",
          status: "Delivered",
          total: 51000,
          items: 5,
     },
     {
          id: "ORD-1003",
          date: "2025-06-20",
          status: "Processing",
          total: 19000,
          items: 2,
     },
     {
          id: "ORD-1004",
          date: "2025-06-19",
          status: "Cancelled",
          total: 12500,
          items: 1,
     },
];
export const trackingSteps = [
     { label: "Order Placed", timestamp: "2025-06-25 09:00", status: "done" },
     { label: "Processing", timestamp: "2025-06-26 14:30", status: "done" },
     { label: "Shipped", timestamp: "2025-06-27 08:45", status: "done" },
     { label: "Out for Delivery", timestamp: "", status: "current" },
     { label: "Delivered", timestamp: "", status: "pending" },
];
