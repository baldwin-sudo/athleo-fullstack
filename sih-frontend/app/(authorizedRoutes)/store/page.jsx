"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    price: "480.00 Coins",
    image: slamBallImage,
    badge: null,
  },
  {
    id: 2,
    name: "Gym Personal Bag",
    price: "250.00 Coins",
    image: GymBag,
    badge: "HOT",
  },
  {
    id: 3,
    name: "Water Bottle",
    price: "100.50 Coins",
    image: WaterBottle,
    badge: "15% OFF",
  },
  {
    id: 4,
    name: "Mind Reader Kettlebell",
    price: "30.2 Coins per kg",
    image: MindReaderKettlebell,
    badge: null,
  },
  {
    id: 5,
    name: "Stamina Door Gyms",
    price: "790.00 Coins",
    image: StaminaDoorGyms,
    badge: "HOT",
  },
  {
    id: 6,
    name: "Pushup Stands",
    price: "180.00 Coins",
    image: PushupStands,
    badge: "NEW",
  },
  {
    id: 7,
    name: "Workout Tank Top",
    price: "250.00 Coins",
    image: WorkoutTankTop,
    badge: "HOT",
  },
  {
    id: 8,
    name: "Ab Roller",
    price: "120.00 Coins",
    image: AbRoller,
    badge: null,
  },
  {
    id: 9,
    name: "Skipping Rope",
    price: "30.50 Coins",
    image: SkippingRope,
    badge: "NEW",
  },
  {
    id: 10,
    name: "Hand Dumble",
    price: "20.5 Coins per kg",
    image: HandDumbleg,
    badge: "NEW",
  },
  {
    id: 11,
    name: "Cycling Machine",
    price: "2650.50 Coins",
    image: CyclingMachine,
    badge: "35% OFF",
  },
  {
    id: 12,
    name: "Bluetooth Headphone",
    price: "490.50 Coins",
    image: BluetoothHeadphone,
    badge: "15% OFF",
  },
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-900 rounded-lg shadow-lg hover:shadow-cyan-400/20 transition-all border border-gray-800 hover:border-cyan-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Taille d'image optimisée */}
        <div className="relative w-full h-56 md:h-48 lg:h-44 xl:h-40 overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Badge (HOT, NEW, OFF) */}
        {product.badge && (
          <div
            className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${
              product.badge.includes("OFF")
                ? "bg-cyan-400"
                : product.badge === "HOT"
                ? "bg-red-500"
                : "bg-yellow-400"
            } text-black`}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-3 text-center">
        <h3 className="font-medium text-white text-sm">{product.name}</h3>
        <p className="text-cyan-400 text-xs mt-1 mb-3 font-bold">
          {product.price}
        </p>
        {/* Bouton Add to Cart placé sous le prix */}
        <button className="bg-cyan-400 hover:bg-cyan-500 text-black py-1 px-4 text-xs font-bold rounded-full transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default function ShopPage() {
  return (
    <main className="bg-black text-white min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-cyan-400">REWARDS </span>SHOP
          </h1>
          <p className="text-lg mb-8 text-center text-gray-400">
            Exchange your hard-earned coins for premium fitness gear and
            accessories
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full">
          {/* Header with coins */}
          <div className="self-end flex items-center justify-center font-bold text-lg rounded-full bg-gray-900 px-4 py-2 border border-gray-800 mb-6">
            <span className="mr-2">Your Balance:</span>
            <span className="text-cyan-400">1205</span>
            <Image className="w-5 h-5 ml-1" src={coins} alt="Coins" />
            <span className="flex items-center justify-center bg-cyan-400 rounded-full text-black h-6 w-6 ml-2 text-xs font-bold">
              +
            </span>
          </div>

          {/* Products grid */}
          <div className="bg-gray-900/50 rounded-lg p-6 shadow-lg border border-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
              <button className="bg-transparent border border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 px-8 py-2 rounded-md transition-colors text-sm font-bold">
                VIEW ALL PRODUCTS
              </button>
            </div>
          </div>

          {/* Featured section */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              <span className="text-cyan-400">FEATURED </span>PRODUCTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-black rounded-lg p-4 border border-gray-800 hover:border-cyan-400 transition-all"
                >
                  <div className="relative w-full h-44">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="mt-4 text-white font-bold">{product.name}</h4>
                  <p className="text-cyan-400 mt-1 font-bold">
                    {product.price}
                  </p>
                  <button className="mt-3 w-full bg-cyan-400 hover:bg-cyan-500 text-black py-2 px-4 text-sm font-bold rounded-lg transition-colors">
                    Quick Buy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 mb-8 text-center bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg border border-gray-800">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Earn more <span className="text-cyan-400">rewards</span> with
              daily objectives
            </h3>
            <p className="text-gray-400 mb-6">
              Complete health challenges to earn coins and unlock premium
              products
            </p>
            <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-md mx-2">
              VIEW CHALLENGES
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
