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
      className="bg-white rounded shadow-sm hover:shadow transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Taille d'image optimisée */}
        <div className="relative w-full h-56 md:h-48 lg:h-44 xl:h-40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover"
          />
        </div>

        {/* Badge (HOT, NEW, OFF) */}
        {product.badge && (
          <div
            className={`absolute top-1 right-1 text-xs font-bold px-1 py-0.5 ${
              product.badge.includes("OFF")
                ? "bg-blue-500"
                : product.badge === "HOT"
                ? "bg-red-500"
                : "bg-yellow-400"
            } text-white`}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-2 text-center">
        <h3 className="font-medium text-gray-800 text-xs sm:text-sm">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs mt-0.5 mb-2">{product.price}</p>
        {/* Bouton Add to Cart placé sous le prix */}
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white py-0.5 px-3 text-xs rounded-full transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default function ShopPage() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      {/* Header with coins */}
      <div className="self-end flex items-center justify-center font-bold text-xl rounded-2xl bg-neutral-50 w-fit px-2 py-1">
        1205 <Image className="w-5 h-5" src={coins} alt="Coins" />
        <span className="flex items-center justify-center bg-green-500 rounded-full text-white h-5 w-5 ml-1 text-xs">
          +
        </span>
      </div>

      {/* Store title */}
      <h1 className="text-center text-xl text-cyan-500 font-semibold mb-4">
        Store
      </h1>

      {/* Products grid */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button className="border border-gray-300 hover:border-cyan-500 hover:text-cyan-500 px-5 py-1 rounded transition-colors text-xs sm:text-sm">
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
}
