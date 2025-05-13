"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Award, Crown, Tag, Gift, TrendingUp, Plus, Search, ChevronDown } from 'lucide-react';
import coins from "../../assets/coins.png";

// Import des images depuis le dossier local
import slamBallImage from "../../assets/img/shop/Fitness Slam Ball.jpg";
import GymBag from "../../assets/img/shop/Gym Personal Bag.jpeg";
import WaterBottle from "../../assets/img/shop/Water Bottle.jpg";
import MindReaderKettlebell from "../../assets/img/shop/Mind Reader Kettlebell.jpeg";
import StaminaDoorGyms from "../../assets/img/shop/Stamina Door Gyms.jpeg";
import PushupStands from "../../assets/img/shop/Pushup Stands.jpeg";
import WorkoutTankTop from "../../assets/img/shop/Workout Tank Top.jpeg";
import AbRoller from "../../assets/img/shop/Ab Roller.jpeg";
import SkippingRope from "../../assets/img/shop/Skipping Rope.jpeg";
import HandDumbleg from "../../assets/img/shop/Hand Dumble.jpeg";
import CyclingMachine from "../../assets/img/shop/Cycling Machine.jpeg";
import BluetoothHeadphone from "../../assets/img/shop/Bluetooth Headphone.png";

// Product data
const products = [
  {
    id: 1,
    name: "Fitness Slam Ball",
    price: 480,
    image: slamBallImage,
    badge: null,
    category: "Equipment"
  },
  {
    id: 2,
    name: "Gym Personal Bag",
    price: 250,
    image: GymBag,
    badge: "HOT",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Water Bottle",
    price: 100.5,
    image: WaterBottle,
    badge: "15% OFF",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Mind Reader Kettlebell",
    price: 30.2,
    image: MindReaderKettlebell,
    badge: null,
    category: "Equipment",
    perUnit: "per kg"
  },
  {
    id: 5,
    name: "Stamina Door Gyms",
    price: 790,
    image: StaminaDoorGyms,
    badge: "HOT",
    category: "Equipment"
  },
  {
    id: 6,
    name: "Pushup Stands",
    price: 180,
    image: PushupStands,
    badge: "NEW",
    category: "Equipment"
  },
  {
    id: 7,
    name: "Workout Tank Top",
    price: 250,
    image: WorkoutTankTop,
    badge: "HOT",
    category: "Apparel"
  },
  {
    id: 8,
    name: "Ab Roller",
    price: 120,
    image: AbRoller,
    badge: null,
    category: "Equipment"
  },
  {
    id: 9,
    name: "Skipping Rope",
    price: 30.50,
    image: SkippingRope,
    badge: "NEW",
    category: "Equipment"
  },
  {
    id: 10,
    name: "Hand Dumble",
    price: 20.5,
    image: HandDumbleg,
    badge: "NEW",
    category: "Equipment",
    perUnit: "per kg"
  },
  {
    id: 11,
    name: "Cycling Machine",
    price: 2650.5,
    image: CyclingMachine,
    badge: "35% OFF",
    category: "Equipment"
  },
  {
    id: 12,
    name: "Bluetooth Headphone",
    price: 490.5,
    image: BluetoothHeadphone,
    badge: "15% OFF",
    category: "Electronics"
  },
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover hover:scale-110 transition-transform duration-500"
          />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-xs py-1 px-2 rounded-full text-white">
            {product.category}
          </div>

          {/* Badge (HOT, NEW, OFF) */}
          {product.badge && (
            <div
              className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                product.badge.includes("OFF")
                  ? "bg-[#16DDE3]/80 text-black"
                  : product.badge === "HOT"
                    ? "bg-red-500/80 text-white"
                    : "bg-yellow-400/80 text-black"
              }`}
            >
              {product.badge}
            </div>
          )}
          
          {/* Overlay on hover with quick actions */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 flex items-end justify-center pb-4 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button className="bg-[#16DDE3] hover:bg-[#0B737A] text-black hover:text-white font-semibold py-2 px-4 rounded-full text-xs transition-colors mr-2">
              Quick View
            </button>
            <button className="bg-black/60 hover:bg-black/80 text-white font-semibold py-2 px-4 rounded-full text-xs transition-colors border border-white/30 hover:border-white">
              Details
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-white text-sm line-clamp-1">{product.name}</h3>
          <div className="flex items-center">
            <span className="text-[#16DDE3] font-bold text-sm">{product.price}</span>
            {product.perUnit && (
              <span className="text-gray-400 text-xs ml-1">{product.perUnit}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src={coins} alt="Coins" width={16} height={16} className="mr-1" />
            <span className="text-gray-400 text-xs">Coins</span>
          </div>
          <button className="bg-[#16DDE3]/10 hover:bg-[#16DDE3]/20 text-[#16DDE3] py-1 px-3 rounded-full text-xs font-medium flex items-center transition-colors">
            <ShoppingCart size={12} className="mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Equipment", "Accessories", "Apparel", "Electronics"];
  const userCoins = 1205;
  const userLevel = "Intermédiaire";
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Rewards
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Exchange your hard-earned coins for premium fitness gear and accessories
          </p>
          
          {/* User Stats Banner */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <span className="text-[#16DDE3] mr-2">
                <Crown size={16} />
              </span>
              <span className="text-sm text-gray-300 mr-1">Level:</span>
              <span className="text-[#16DDE3] font-medium">{userLevel}</span>
            </div>
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <Image src={coins} alt="Coins" width={20} height={20} className="mr-2" />
              <span className="text-sm text-gray-300 mr-1">Balance:</span>
              <span className="text-[#16DDE3] font-medium">{userCoins}</span>
              <button className="ml-2 bg-[#16DDE3] rounded-full h-5 w-5 flex items-center justify-center text-black font-bold hover:bg-[#0B737A] transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto max-w-sm">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#16DDE3]/50 focus:border-transparent"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#16DDE3] text-black font-medium'
                    : 'bg-black/40 text-gray-300 hover:bg-black/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <Gift size={20} className="text-[#16DDE3]" />
              </span>
              Featured Rewards
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 group">
                <div className="relative h-56">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div
                      className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                        product.badge.includes("OFF")
                          ? "bg-[#16DDE3]/80 text-black"
                          : product.badge === "HOT"
                            ? "bg-red-500/80 text-white"
                            : "bg-yellow-400/80 text-black"
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Image src={coins} alt="Coins" width={16} height={16} className="mr-1" />
                        <span className="text-[#16DDE3] font-bold">{product.price}</span>
                        {product.perUnit && (
                          <span className="text-gray-300 text-xs ml-1">{product.perUnit}</span>
                        )}
                      </div>
                      <button className="bg-[#16DDE3] hover:bg-[#0B737A] text-black py-1.5 px-4 rounded-full text-xs font-medium transition-colors">
                        Quick Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <Tag size={20} className="text-[#16DDE3]" />
              </span>
              All Products
            </h2>
            <div className="text-sm text-gray-400">
              Showing {filteredProducts.length} products
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="flex justify-center mt-10">
            <button className="bg-transparent border border-[#16DDE3] hover:bg-[#16DDE3]/10 text-[#16DDE3] px-8 py-3 rounded-full text-sm font-bold transition-colors hover:scale-105 active:scale-95 flex items-center">
              VIEW ALL PRODUCTS
              <ChevronDown size={18} className="ml-1" />
            </button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-20 mb-8 bg-gradient-to-r from-[#16DDE3]/20 to-transparent backdrop-blur-sm rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Earn more <span className="text-[#16DDE3]">rewards</span> with daily objectives
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Complete health challenges to earn coins and unlock premium products
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#16DDE3] text-black font-semibold rounded-full hover:bg-[#0B737A] hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform flex items-center">
              <TrendingUp size={20} className="mr-2" />
              View Challenges
            </button>
            <button className="px-8 py-4 bg-black/40 text-white font-semibold rounded-full hover:bg-black/60 border border-[#16DDE3]/50 transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              View Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;