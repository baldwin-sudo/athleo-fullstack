"use client";

import React, { useState, useEffect } from 'react';
import { Droplet, Award, ChevronUp, ChevronDown, Waves, Timer, TrendingUp, Crown } from 'lucide-react';

const HydrationPage = () => {
  // User level state (could be fetched from API/context in a real app)
  const [userLevel, setUserLevel] = useState("Débutant"); // Options: "Débutant", "Intermédiaire", "Avancé"
  
  // Initialize water goal based on user level in ml and glasses
  const getWaterGoalByLevel = () => {
    switch(userLevel) {
      case "Intermédiaire": 
        return { ml: 3000, glasses: 12 }; // 3L = 12 glasses
      case "Avancé": 
        return { ml: 3500, glasses: 14 }; // 3.5L = 14 glasses (corrigé plus élevé que l'intermédiaire)
      default: 
        return { ml: 1500, glasses: 6 }; // 1.5L = 6 glasses pour Débutant
    }
  };
  
  const [waterIntake, setWaterIntake] = useState(0); // en verres
  const [dailyGoalMl, setDailyGoalMl] = useState(getWaterGoalByLevel().ml);
  const [dailyGoalGlasses, setDailyGoalGlasses] = useState(getWaterGoalByLevel().glasses);
  const [showGoalAdjuster, setShowGoalAdjuster] = useState(false);
  
  // Mise à jour de l'historique avec les objectifs corrects par niveau
  const [waterHistory, setWaterHistory] = useState([
    { date: '2025-05-09', amount: 6, goal: 6 }, // Débutant
    { date: '2025-05-08', amount: 7, goal: 6 },
    { date: '2025-05-07', amount: 5, goal: 6 },
    { date: '2025-05-06', amount: 8, goal: 6 },
    { date: '2025-05-05', amount: 4, goal: 6 },
  ]);
  
  const [streakDays, setStreakDays] = useState(2);
  const [showTips, setShowTips] = useState(false);

  // Update history goals when level changes
  useEffect(() => {
    const newGoal = getWaterGoalByLevel().glasses;
    setWaterHistory(prev => prev.map(day => ({ ...day, goal: newGoal })));
  }, [userLevel]);

  // Calculate the progress percentage
  const progressPercentage = Math.min((waterIntake / dailyGoalGlasses) * 100, 100);
  
  // Calculate points based on Athleo's system
  const calculatePoints = () => {
    // Full 15 points if goal is reached
    const potentialPoints = 15;
    const earnedPoints = waterIntake >= dailyGoalGlasses ? 15 : Math.floor((waterIntake / dailyGoalGlasses) * 15);
    
    let message = "";
    if (waterIntake >= dailyGoalGlasses) {
      message = "You've reached your daily hydration goal! +15 points";
    } else {
      message = `You need ${dailyGoalGlasses - waterIntake} more glasses to reach your goal.`;
    }
    
    return { earned: earnedPoints, potential: potentialPoints, message };
  };
  
  const points = calculatePoints();
  
  // Add a glass of water
  const addWater = () => {
    if (waterIntake < dailyGoalGlasses * 2) { // Prevent adding too many glasses by mistake
      setWaterIntake(prev => prev + 1);
    }
  };

  // Remove a glass of water
  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };

  // Change user level and update goals accordingly
  const changeUserLevel = (level) => {
    setUserLevel(level);
    const newGoals = getWaterGoalByLevel(level);
    setDailyGoalMl(newGoals.ml);
    setDailyGoalGlasses(newGoals.glasses);
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  // Toggle goal adjuster visibility
  const toggleGoalAdjuster = () => {
    setShowGoalAdjuster(!showGoalAdjuster);
  };

  // Sample hydration tips
  const hydrationTips = [
    "Drinking water helps maintain the balance of body fluids.",
    "Staying hydrated can help control calories and maintain skin health.",
    "Water helps your kidneys transport waste products out of your cells.",
    "Even mild dehydration can drain your energy and make you tired.",
    "Try to drink a glass of water with each meal and between meals."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
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
          
          {/* Level Indicator */}
          <div className="mt-4 flex justify-center">
            <div className="bg-black/30 px-4 py-2 rounded-full flex items-center">
              <span className="text-[#16DDE3] mr-2">
                <Crown size={16} />
              </span>
              <span className="text-sm text-gray-300 mr-1">Level:</span>
              <span className="text-[#16DDE3] font-medium">{userLevel}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Progress Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <Droplet size={20} className="text-[#16DDE3]" />
              </span>
              Today's Progress
            </h2>
            
            {/* Progress Bar */}
            <div className="relative h-6 bg-black/30 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#16DDE3] to-[#0B737A] rounded-full flex items-center justify-end pr-2 text-xs font-bold text-black"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage.toFixed(0)}%
              </div>
            </div>
            
            {/* Vis */}
            <div className="flex flex-col items-center my-10">
              <div className="relative w-32 h-64 mb-6">
                {/* container */}
                <div className="absolute inset-0 border-4 border-white/20 rounded-b-3xl rounded-t-sm overflow-hidden">
                  {/* animation */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#16DDE3] to-[#0B737A]/70 transition-all duration-500 ease-out"
                    style={{ height: `${(waterIntake / (dailyGoalGlasses * 1.5)) * 100}%` }}
                  >
                    {/* animation */}
                    <div className="absolute inset-0 opacity-50">
                      <div className="absolute inset-x-0 top-0 h-3 animate-wave">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-6 w-full">
                          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity=".25"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glass measurement marks */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute left-0 w-3 h-0.5 bg-white/30"
                    style={{ bottom: `${(i / 5) * 100}%` }}
                  ></div>
                ))}
              </div>
              
              <div className="text-6xl font-bold text-white mb-2 relative">
                <span className="text-[#16DDE3]">{waterIntake}</span>
                <span className="text-2xl font-normal text-gray-400 absolute bottom-2 ml-2">/{dailyGoalGlasses}</span>
              </div>
              <p className="text-gray-300 mb-2">glasses of water</p>
              <p className="text-gray-500 text-sm mb-8">({Math.round(waterIntake * 250).toLocaleString()} ml / {dailyGoalMl.toLocaleString()} ml)</p>
              
              {/* Add/Remove Buttons */}
              <div className="flex space-x-6">
                <button 
                  onClick={removeWater}
                  className="bg-black/30 hover:bg-black/50 text-white px-5 py-3 rounded-xl flex items-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronDown size={20} className="text-[#16DDE3]" />
                  <span className="ml-2">Remove</span>
                </button>
                
                <button 
                  onClick={addWater}
                  className="bg-[#16DDE3] hover:bg-[#0B737A] text-black px-5 py-3 rounded-xl flex items-center font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronUp size={20} />
                  <span className="ml-2">Add Water</span>
                </button>
              </div>
            </div>
            
            {/* Daily Goal */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Daily Water Goal</h3>
                <button 
                  onClick={toggleGoalAdjuster}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showGoalAdjuster ? 'Done' : 'Adjust'}
                </button>
              </div>
              
              {showGoalAdjuster && (
                <div className="mt-6">
                  {/* Level-based goal presets */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <button 
                      onClick={() => changeUserLevel("Débutant")}
                      className={`text-sm py-2 px-1 rounded-lg transition-all ${
                        userLevel === "Débutant" 
                          ? 'bg-[#16DDE3] text-black font-bold' 
                          : 'bg-black/30 text-gray-300 hover:bg-black/50'
                      }`}
                    >
                      Débutant (6 verres)
                    </button>
                    <button 
                      onClick={() => changeUserLevel("Intermédiaire")}
                      className={`text-sm py-2 px-1 rounded-lg transition-all ${
                        userLevel === "Intermédiaire" 
                          ? 'bg-[#16DDE3] text-black font-bold' 
                          : 'bg-black/30 text-gray-300 hover:bg-black/50'
                      }`}
                    >
                      Intermédiaire (12 verres)
                    </button>
                    <button 
                      onClick={() => changeUserLevel("Avancé")}
                      className={`text-sm py-2 px-1 rounded-lg transition-all ${
                        userLevel === "Avancé" 
                          ? 'bg-[#16DDE3] text-black font-bold' 
                          : 'bg-black/30 text-gray-300 hover:bg-black/50'
                      }`}
                    >
                      Avancé (14 verres)
                    </button>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-400 mt-3">
                Recommended goal based on your level: <span className="text-[#16DDE3]">{dailyGoalMl / 1000}L ({dailyGoalGlasses} glasses)</span>
              </p>
            </div>
          </div>
          
          {/* Weekly History */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <TrendingUp size={20} className="text-[#16DDE3]" />
              </span>
              Weekly History
            </h2>
            
            <div className="space-y-5">
              {waterHistory.map((day, index) => (
                <div key={index} className="group">
                  <div className="flex items-center mb-1">
                    <div className="w-28 text-sm text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="ml-auto text-sm font-medium text-white">
                      <span className={day.amount >= day.goal ? 'text-[#16DDE3]' : 'text-gray-400'}>
                        {day.amount}
                      </span>/{day.goal}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="relative h-6 bg-gray-800 rounded-lg overflow-hidden group-hover:bg-gray-700 transition-all">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#16DDE3]/80 to-[#0B737A]/80 rounded-lg group-hover:from-[#16DDE3] group-hover:to-[#0B737A] transition-all"
                        style={{ width: `${Math.min((day.amount / day.goal) * 100, 100)}%` }}
                      >
                        {/* Water wave animation */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 animate-wave">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-12 w-full">
                              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity=".25"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#16DDE3]/10 p-4 rounded-xl">
              <div className="flex items-center">
                <div className="p-3 bg-[#16DDE3]/20 rounded-full mr-4">
                  <Award className="text-[#16DDE3]" size={24} />
                </div>
                <div>
                  <p className="text-gray-300">Current Streak</p>
                  <p className="text-2xl font-bold text-[#16DDE3]">{streakDays} days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tips and Rewards */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                    <Waves size={20} className="text-[#16DDE3]" />
                  </span>
                  Hydration Tips
                </h2>
                <button 
                  onClick={toggleTips}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showTips ? 'Show Less' : 'Show More'}
                </button>
              </div>
              
              <ul className="space-y-3">
                {hydrationTips.slice(0, showTips ? hydrationTips.length : 2).map((tip, index) => (
                  <li key={index} className="bg-black/30 p-4 rounded-xl text-gray-300 flex items-start hover:bg-black/40 transition-colors">
                    <div className="bg-[#16DDE3]/20 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#16DDE3]"></div>
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Points & Rewards */}
            <div className="mb-8 bg-gradient-to-br from-[#16DDE3]/10 to-transparent rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-300">Today's hydration points</p>
                  <p className="text-3xl font-bold">
                    <span className="text-[#16DDE3]">+{points.earned}</span>
                    <span className="text-sm text-gray-400">/{points.potential}</span>
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-[#16DDE3]/30 rounded-full blur-md"></div>
                  <div className="relative bg-[#16DDE3]/20 p-4 rounded-full">
                    <Award size={32} className="text-[#16DDE3]" />
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">
                {points.message}
              </p>
            </div>
            
            {/* Water intake schedule - Adapté au niveau */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                  <Timer size={20} className="text-[#16DDE3]" />
                </span>
                Intake Schedule
              </h2>
              
              {userLevel === "Débutant" && (
                <div className="space-y-3">
                  {[
                    'Morning (Wake up)',
                    'Before breakfast',
                    'Mid-morning',
                    'Lunch time',
                    'Afternoon',
                    'Evening'
                  ].map((time, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                      <span className="text-gray-300">{time}</span>
                      <span className="text-[#16DDE3]">1 glass</span>
                    </div>
                  ))}
                </div>
              )}
              
              {userLevel === "Intermédiaire" && (
                <div className="space-y-3">
                  {[
                    'Morning (Wake up)',
                    'Breakfast',
                    'Mid-morning (10AM)',
                    'Mid-morning (11AM)',
                    'Lunch time',
                    'Early afternoon (2PM)',
                    'Mid afternoon (3PM)',
                    'Late afternoon (4PM)',
                    'Early evening (6PM)',
                    'Dinner time',
                    'Before bed (9PM)',
                    'Before sleep'
                  ].map((time, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                      <span className="text-gray-300">{time}</span>
                      <span className="text-[#16DDE3]">1 glass</span>
                    </div>
                  ))}
                </div>
              )}
              
              {userLevel === "Avancé" && (
                <div className="space-y-3">
                  {[
                    'Morning (Wake up) - 2 glasses',
                    'Breakfast',
                    'Mid-morning (10AM)',
                    'Mid-morning (11AM)',
                    'Before lunch',
                    'During lunch',
                    'Early afternoon (2PM)',
                    'Mid afternoon (3PM)',
                    'Late afternoon (4PM)',
                    'Early evening (6PM)',
                    'During dinner',
                    'Evening (8PM)',
                    'Before bed (9PM)',
                    'Before sleep'
                  ].map((time, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                      <span className="text-gray-300">{time}</span>
                      <span className="text-[#16DDE3]">{time.includes("2 glasses") ? "2 glasses" : "1 glass"}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-3">
                Recommended schedule to distribute your water intake throughout the day for level: {userLevel}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HydrationPage;