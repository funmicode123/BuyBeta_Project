import SellIcon from "../assets/sell.png";
import WalletIcon from "../assets/wallet.png";
import ShippingIcon from "../assets/shipping.png";
import Product1 from "../assets/product1.jpg";
import Product2 from "../assets/product2.jpg";
import Product3 from "../assets/product3.jpg";


export const featureList = [
     {
          icon: SellIcon,
          title: "Sell everywhere",
          description: " One Click, Many Buyers!" +
              "From your dashboard to group chats and bulk-buy platforms, " +
              "reach group buyers where they shop most. It’s wholesale made easy —" +
              " more reach, more orders,less hassle!"
     },
     {
          icon: WalletIcon,
          title: "Let customers " +
              "pay their way",
          description: "Accept credit cards, local payment methods, and accelerated checkouts with BuyNest Payments, or choose from over 100 third-party payment gateways."
     },
     {
          icon: ShippingIcon,
          title: "Simplified shipping",
          description: "Fulfill one or multiple orders with a single click and give your customers negotiated shipping rates with BuyNest Shipping."
     }
];
export const testimonials = [
     {
          name: "Ada Nwoke",
          role: "Lagos, Nigeria",
          comment: "BuyBeta helped me save money by joining a group deal. It's simple and secure!",
          image: "https://i.pravatar.cc/150?img=1"
     },
     {
          name: "Chinedu Okafor",
          role: "Abuja, Nigeria",
          comment: "I didn’t believe it at first, but I got my product cheaper thanks to BuyBeta. Amazing platform!",
          image: "https://i.pravatar.cc/150?img=2"
     }
];
export const faqItems = [
     {
          question: "Why BuyBeta?",
          answer: "BuyBeta allows individuals and businesses to access bulk discounts by pooling purchases together. It’s simple, transparent, and helps everyone save more."
     },
     {
          question: "What does BuyBeta cost?",
          answer: "BuyBeta is free to join and use. We only take a small service fee on successful group purchases — no hidden charges."
     },
     {
          question: "What can I sell on BuyBeta?",
          answer: "You can sell physical products like electronics, fashion, beauty items, home goods, and more. Services and digital goods are coming soon."
     },
     {
          question: "What do I need to start selling on BuyBeta?",
          answer: "All you need is a valid email, basic business details, and a product listing. We’ll guide you through onboarding."
     },
     {
          question: "Where can I sell on BuyBeta?",
          answer: "BuyBeta is available across Nigeria. Sellers from any state can list products and reach buyers nationwide."
     }
];
// src/data/menuData.js
export const menuSections = [
     {
          title: "BuyBeta",
          items: [
               { label: "About", path: "/abo ut" },
               { label: "Careers", path: "/careers" },
               { label: "Investors", path: "/investors" },
               { label: "Partners", path: "/partners" },
               { label: "Affiliates", path: "/affiliates" },
               { label: "Legal", path: "/legal" },
               { label: "Service Status", path: "/status" }
          ]
     },
     {
          title: "Support",
          items: [
               { label: "Merchant support", path: "/merchant-support" },
               { label: "BuyBeta help centre", path: "/help-centre" },
               { label: "Hire a partner", path: "/hire-partner" },
               { label: "BuyBeta Academy", path: "/academy" },
               { label: "BuyBeta community", path: "/community" }
          ]
     },
     {
          title: "Product",
          items: [
               { label: "Shop", path: "/shop" },
               { label: "Shop pay", path: "/shop-pay" },
               { label: "BuyBeta for Enterprise", path: "/enterprise" }
          ]
     }
];
export const items = [
     "GET REWARDED FOR SHOPPING - CLICK HERE",
     "GROUP UP, SAVE MORE - CLICK HERE",
     "INVITE FRIENDS AND SAVE EVEN MORE - CLICK HERE",
];

export const navItems = [
     {
          title: "About us",
          href: "/about",
          dropdown: [
               { label: "Our Story", href: "/about/story" },
               { label: "Team", href: "/about/team" },
          ],
     },
     {
          title: "Businesses",
          href: "/businesses",
          dropdown: [
               { label: "Find Businesses", href: "/businesses/find" },
               { label: "Partner With Us", href: "/businesses/partner" },
          ],
     },
     {
          title: "Sales & Offers",
          href: "/offers",
          dropdown: [
               { label: "Today's Deals", href: "/offers/today" },
               { label: "Weekly Offers", href: "/offers/weekly" },
          ],
     },
     {
          title: "Rewards",
          href: "/rewards",
          dropdown: [
               { label: "Loyalty Program", href: "/rewards/loyalty" },
               { label: "Claim Rewards", href: "/rewards/claim" },
          ],
     },
     {
          title: "Wholesale",
          href: "/wholesale",
          dropdown: [
               { label: "Bulk Orders", href: "/wholesale/bulk" },
               { label: "Request Quote", href: "/wholesale/quote" },
          ],
     },
     {
          title: "Become a vendor",
          href: "/vendor",
          dropdown: [
               { label: "Sign Up", href: "/vendor/signup" },
               { label: "Vendor FAQs", href: "/vendor/faqs" },
          ],
     },
];
export const products = [
     {
          id: 1,
          image: Product1,
          label: "Save 15% when you group up",
          name: "GlowRx Vitamin C Serum",
          price: "₦18,500",
          rating: 5,
     },
     {
          id: 2,
          image: Product2,
          label: "Buy together, save more",
          name: "SkinFix Barrier+ Cleanser",
          price: "₦12,000",
          rating: 3,
     },
     {
          id: 3,
          image: Product3,
          label: "Join a group, unlock discount",
          name: "The Ordinary Niacinamide 10%",
          price: "₦10,500",
          rating: 4,
     },
     {
          id: 4,
          image: Product3,
          label: "Bundle & save deal",
          name: "Cerave Hydrating Cleanser",
          price: "₦14,000",
          rating: 2,
     },
     {
          id: 5,
          image: Product2,
          label: "Group price unlocked",
          name: "Cosrx Snail Mucin Essence",
          price: "₦17,000",
          rating: 1,
     },
     {
          id: 6,
          image: Product1,
          label: "Exclusive group discount",
          name: "Paula’s Choice BHA Exfoliant",
          price: "₦16,000",
          rating: 0.5,
     },
     {
          id: 7,
          image: Product2,
          label: "Get 20% off in a group",
          name: "Glow Recipe Watermelon Toner",
          price: "₦13,200",
          rating: 4.5,
     },
     {
          id: 8,
          image: Product3,
          label: "Limited-time group offer",
          name: "Fenty Skin Hydra Vizor",
          price: "₦22,000",
          rating: 5,
     },
];
