"use client";

import React, { useState, useEffect } from 'react';
import { Droplet, Award, ChevronUp, ChevronDown } from 'lucide-react';

const HydrationPage = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(8); // KHASS NTAF9O ela Default goal 
  const [showGoalAdjuster, setShowGoalAdjuster] = useState(false);
  const [waterHistory, setWaterHistory] = useState([
    { date: '2025-05-09', amount: 6 },
    { date: '2025-05-08', amount: 7 },
    { date: '2025-05-07', amount: 5 },
    { date: '2025-05-06', amount: 8 },
    { date: '2025-05-05', amount: 4 },
  ]);
  const [streakDays, setStreakDays] = useState(2);
  const [showTips, setShowTips] = useState(false);

  const progressPercentage = Math.min((waterIntake / dailyGoal) * 100, 100);

  const addWater = () => {
    if (waterIntake < dailyGoal * 2) { 
      setWaterIntake(prev => prev + 1);
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };

  const adjustGoal = (increment) => {
    setDailyGoal(prev => Math.max(1, prev + increment));
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  const toggleGoalAdjuster = () => {
    setShowGoalAdjuster(!showGoalAdjuster);
  };

  const hydrationTips = [
    "Drinking water helps maintain the balance of body fluids.",
    "Staying hydrated can help control calories and maintain skin health.",
    "Water helps your kidneys transport waste products out of your cells.",
    "Even mild dehydration can drain your energy and make you tired.",
    "Try to drink a glass of water with each meal and between meals."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/*  Section 1 */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Hydration
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your water intake and stay hydrated to improve performance
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Progress Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6">Today's Progress</h2>
            
            {/* Progress Bar */}
            <div className="relative h-6 bg-black/30 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#16DDE3] to-[#0B737A] rounded-full flex items-center justify-end pr-2 text-xs font-bold text-black"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage.toFixed(0)}%
              </div>
            </div>
            
            {/* Water Glasses Counter */}
            <div className="flex flex-col items-center my-10">
              <div className="text-6xl font-bold text-white mb-2 relative">
                <span className="text-[#16DDE3]">{waterIntake}</span>
                <span className="text-2xl font-normal text-gray-400 absolute bottom-2 ml-2">/ {dailyGoal}</span>
              </div>
              <p className="text-gray-300 mb-8">glasses of water</p>
              
              {/* Add/Remove Buttons */}
              <div className="flex space-x-6">
                <button 
                  onClick={removeWater}
                  className="bg-black/30 hover:bg-black/50 text-white px-5 py-3 rounded-full flex items-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronDown size={20} className="text-[#16DDE3]" />
                  <span className="ml-2">Remove</span>
                </button>
                
                <button 
                  onClick={addWater}
                  className="bg-[#16DDE3] hover:bg-[#0B737A] text-black px-5 py-3 rounded-full flex items-center font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronUp size={20} />
                  <span className="ml-2">Add Water</span>
                </button>
              </div>
            </div>
            
            {/* Goal Setting */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Daily Goal</h3>
                <button 
                  onClick={toggleGoalAdjuster}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showGoalAdjuster ? 'Done' : 'Adjust'}
                </button>
              </div>
              
              {showGoalAdjuster && (
                <div className="mt-6 flex justify-center items-center space-x-6">
                  <button 
                    onClick={() => adjustGoal(-1)}
                    className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                  >
                    <ChevronDown size={24} className="text-[#16DDE3]" />
                  </button>
                  
                  <div className="text-3xl font-bold text-white">{dailyGoal}</div>
                  
                  <button 
                    onClick={() => adjustGoal(1)}
                    className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                  >
                    <ChevronUp size={24} className="text-[#16DDE3]" />
                  </button>
                </div>
              )}
              
              <p className="text-sm text-gray-400 mt-3">
                Recommended: 8-10 glasses (2L) of water per day
              </p>
            </div>
          </div>
          
          {/* Weekly Stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6">Weekly History</h2>
            
            <div className="space-y-4">
              {waterHistory.map((day, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-sm text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-grow mx-2">
                    <div className="relative h-5 bg-black/30 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#16DDE3]/70 to-[#0B737A]/70 rounded-full"
                        style={{ width: `${(day.amount / dailyGoal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-white">
                    <span className="text-[#16DDE3]">{day.amount}</span>/{dailyGoal}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-black/30 p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200">
              <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-full flex items-center justify-center">
                <Award className="text-[#16DDE3]" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white">Current Streak</p>
                <p className="text-2xl font-bold text-[#16DDE3]">{streakDays} days</p>
              </div>
            </div>
          </div>
          
          {/* Tips and Rewards */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Hydration Tips</h2>
                <button 
                  onClick={toggleTips}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showTips ? 'Show Less' : 'Show More'}
                </button>
              </div>
              
              <ul className="space-y-3">
                {hydrationTips.slice(0, showTips ? hydrationTips.length : 2).map((tip, index) => (
                  <li key={index} className="bg-black/30 p-3 rounded-xl text-gray-300 flex">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#16DDE3] mr-3 mt-1.5 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Points and Rewards */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Points & Rewards</h2>
              
              <div className="bg-gradient-to-r from-[#16DDE3]/20 to-transparent rounded-xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-300">Today's hydration points</p>
                    <p className="text-3xl font-bold text-[#16DDE3]">
                      {waterIntake >= dailyGoal ? '+50' : `+${Math.floor((waterIntake / dailyGoal) * 50)}`}
                    </p>
                  </div>
                  
                  <div className="bg-[#16DDE3]/20 p-4 rounded-full">
                    <Droplet size={32} className="text-[#16DDE3]" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">
                  {waterIntake >= dailyGoal 
                    ? 'You\'ve reached your goal for today! +50 points added to your account.'
                    : `You need ${dailyGoal - waterIntake} more glasses to reach your goal and earn full points.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HydrationPage;