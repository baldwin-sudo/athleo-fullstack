"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FootprintsIcon, Droplet, UtensilsCrossed, Moon, Dumbbell, TrendingUp, Award, Crown } from 'lucide-react';

const DashboardPage = () => {
  const router = useRouter();
  const [userLevel, setUserLevel] = useState("Débutant");
  const [totalPoints, setTotalPoints] = useState(142);
  const [dailyProgress, setDailyProgress] = useState({
    steps: 65,
    hydration: 75,
    nutrition: 40,
    sleep: 90,
    workout: 25
  });

  // vers pas
  const navigateToSteps = () => {
    router.push("/steps");
  };

  const navigateToHydration = () => {
    router.push("/hydration");
  };

  const navigateToNutrition = () => {
    router.push("/nutrition");
  };
  
  const navigateToSleep = () => {
    router.push("/sleep");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Dashboard
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your progress and achieve your health goals
          </p>
          
          {/* Level & Points Indicator */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <span className="text-[#16DDE3] mr-2">
                <Crown size={16} />
              </span>
              <span className="text-sm text-gray-300 mr-1">Level:</span>
              <span className="text-[#16DDE3] font-medium">{userLevel}</span>
            </div>
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <span className="text-[#16DDE3] mr-2">
                <Award size={16} />
              </span>
              <span className="text-sm text-gray-300 mr-1">Total Points:</span>
              <span className="text-[#16DDE3] font-medium">{totalPoints}</span>
            </div>
          </div>
        </div>

        {/* Daily Progress Overview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 mb-10 hover:scale-[1.01] transition-transform duration-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
              <TrendingUp size={20} className="text-[#16DDE3]" />
            </span>
            Today's Progress
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Steps Progress */}
            <div className="bg-black/30 rounded-xl p-4 flex flex-col items-center hover:bg-black/40 transition-all">
              <div className="relative w-20 h-20 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#0B737A" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * dailyProgress.steps) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FootprintsIcon size={24} className="text-[#16DDE3]" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Steps</h3>
              <p className="text-[#16DDE3]">{dailyProgress.steps}%</p>
              <button 
                onClick={navigateToSteps}
                className="mt-2 text-xs bg-[#16DDE3]/20 hover:bg-[#16DDE3]/30 px-3 py-1 rounded-full text-[#16DDE3] transition-colors"
              >
                View Details
              </button>
            </div>
            
            {/* Hydration Progress */}
            <div className="bg-black/30 rounded-xl p-4 flex flex-col items-center hover:bg-black/40 transition-all">
              <div className="relative w-20 h-20 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#0B737A" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * dailyProgress.hydration) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplet size={24} className="text-[#16DDE3]" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Hydration</h3>
              <p className="text-[#16DDE3]">{dailyProgress.hydration}%</p>
              <button 
                onClick={navigateToHydration}
                className="mt-2 text-xs bg-[#16DDE3]/20 hover:bg-[#16DDE3]/30 px-3 py-1 rounded-full text-[#16DDE3] transition-colors"
              >
                View Details
              </button>
            </div>
            
            {/* Nutrition Progress */}
            <div className="bg-black/30 rounded-xl p-4 flex flex-col items-center hover:bg-black/40 transition-all">
              <div className="relative w-20 h-20 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#0B737A" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * dailyProgress.nutrition) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <UtensilsCrossed size={24} className="text-[#16DDE3]" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Nutrition</h3>
              <p className="text-[#16DDE3]">{dailyProgress.nutrition}%</p>
              <button 
                onClick={navigateToNutrition}
                className="mt-2 text-xs bg-[#16DDE3]/20 hover:bg-[#16DDE3]/30 px-3 py-1 rounded-full text-[#16DDE3] transition-colors"
              >
                View Details
              </button>
            </div>
            
            {/* Sleep Progress */}
            <div className="bg-black/30 rounded-xl p-4 flex flex-col items-center hover:bg-black/40 transition-all">
              <div className="relative w-20 h-20 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#0B737A" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * dailyProgress.sleep) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Moon size={24} className="text-[#16DDE3]" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Sleep</h3>
              <p className="text-[#16DDE3]">{dailyProgress.sleep}%</p>
              <button 
                onClick={navigateToSleep}
                className="mt-2 text-xs bg-[#16DDE3]/20 hover:bg-[#16DDE3]/30 px-3 py-1 rounded-full text-[#16DDE3] transition-colors"
              >
                View Details
              </button>
            </div>
            
            {/* Workout Progress */}
            <div className="bg-black/30 rounded-xl p-4 flex flex-col items-center hover:bg-black/40 transition-all">
              <div className="relative w-20 h-20 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#0B737A" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * dailyProgress.workout) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell size={24} className="text-[#16DDE3]" />
                </div>
              </div>
              <h3 className="font-bold text-lg">Workout</h3>
              <p className="text-[#16DDE3]">{dailyProgress.workout}%</p>
              <button 
                className="mt-2 text-xs bg-[#16DDE3]/20 hover:bg-[#16DDE3]/30 px-3 py-1 rounded-full text-[#16DDE3] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Steps Card */}
          <div 
            onClick={navigateToSteps}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-200 via-green-300 to-green-400 mr-4 group-hover:shadow-md group-hover:shadow-green-300/50 transition-all">
                <FootprintsIcon className="size-8 text-green-900" />
              </div>
              <h2 className="text-2xl font-bold">Steps Tracking</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Track your daily steps to stay active and energized. Walking is a simple way to improve your health.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[#16DDE3] font-medium">Goal: 10,000 steps</span>
              <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">
                +25 points
              </span>
            </div>
          </div>
          
          {/* Hydration Card */}
          <div 
            onClick={navigateToHydration}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-red-200 via-red-300 to-red-400 mr-4 group-hover:shadow-md group-hover:shadow-red-300/50 transition-all">
                <Droplet className="size-8 text-red-900" />
              </div>
              <h2 className="text-2xl font-bold">Hydration</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Stay hydrated by logging your daily water intake. Proper hydration is key to overall wellness.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[#16DDE3] font-medium">Goal: 8 glasses</span>
              <span className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-sm">
                +15 points
              </span>
            </div>
          </div>
          
          {/* Nutrition Card */}
          <div 
            onClick={navigateToNutrition}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 mr-4 group-hover:shadow-md group-hover:shadow-purple-300/50 transition-all">
                <UtensilsCrossed className="size-8 text-purple-900" />
              </div>
              <h2 className="text-2xl font-bold">Nutrition</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Maintain a healthy diet by tracking your meals. Balanced nutrition provides your body with essential fuel.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[#16DDE3] font-medium">Goal: 2000 calories</span>
              <span className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                +15 points
              </span>
            </div>
          </div>
          
          {/* Sleep Card */}
          <div 
            onClick={navigateToSleep}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400 mr-4 group-hover:shadow-md group-hover:shadow-cyan-300/50 transition-all">
                <Moon className="size-8 text-cyan-900" />
              </div>
              <h2 className="text-2xl font-bold">Sleep</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get enough rest and track your sleeping habits. Quality sleep is crucial for recovery and performance.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[#16DDE3] font-medium">Goal: 8 hours</span>
              <span className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                +30 points
              </span>
            </div>
          </div>
          
          {/* Workout Card */}
          <div 
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 mr-4 group-hover:shadow-md group-hover:shadow-yellow-300/50 transition-all">
                <Dumbbell className="size-8 text-yellow-900" />
              </div>
              <h2 className="text-2xl font-bold">Workout</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Record your workouts to level up your fitness journey. Regular exercise improves strength and endurance.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[#16DDE3] font-medium">Goal: 30 minutes</span>
              <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                +25 points
              </span>
            </div>
          </div>
          
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-[#16DDE3]/10 to-black rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center mb-6">
              <div className="p-4 rounded-full bg-[#16DDE3]/20 mr-4">
                <Award className="size-8 text-[#16DDE3]" />
              </div>
              <h2 className="text-2xl font-bold">Points Summary</h2>
            </div>
            
            <div className="bg-black/30 rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-center mb-2">Today's Points</h3>
              <div className="text-5xl font-bold text-center text-[#16DDE3] mb-1">42</div>
              <p className="text-center text-gray-400 text-sm">out of 110 possible</p>
            </div>
            
            <div className="flex justify-between text-center">
              <div>
                <div className="text-lg font-bold text-[#16DDE3]">142</div>
                <p className="text-xs text-gray-400">Total Points</p>
              </div>
              <div>
                <div className="text-lg font-bold text-[#16DDE3]">3</div>
                <p className="text-xs text-gray-400">Day Streak</p>
              </div>
              <div>
                <div className="text-lg font-bold text-[#16DDE3]">Bronze</div>
                <p className="text-xs text-gray-400">Current Badge</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;