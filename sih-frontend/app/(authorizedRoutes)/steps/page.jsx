"use client";

import React, { useState, useEffect } from 'react';
import { FootprintsIcon, Award, ChevronUp, ChevronDown, TrendingUp, Crown, BarChart, Activity, Clock as ClockIcon, Target } from 'lucide-react';

const StepsPage = () => {
  // User level state (could be fetched from API/context in a real app)
  const [userLevel, setUserLevel] = useState("Débutant"); // Options: "Débutant", "Intermédiaire", "Avancé"
  
  // Initialize steps goal based on user level
  const getStepsGoalByLevel = () => {
    switch(userLevel) {
      case "Intermédiaire": return 20000;
      case "Avancé": return 40000;
      default: return 10000; // Débutant
    }
  };
  
  const [currentSteps, setCurrentSteps] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(getStepsGoalByLevel());
  const [showGoalAdjuster, setShowGoalAdjuster] = useState(false);
  
  const [stepsHistory, setStepsHistory] = useState([
    { date: '2025-05-09', steps: 8500, goal: 10000 },
    { date: '2025-05-08', steps: 12500, goal: 10000 },
    { date: '2025-05-07', steps: 9800, goal: 10000 },
    { date: '2025-05-06', steps: 11200, goal: 10000 },
    { date: '2025-05-05', steps: 7600, goal: 10000 },
    { date: '2025-05-04', steps: 10300, goal: 10000 },
    { date: '2025-05-03', steps: 9500, goal: 10000 },
  ]);
  
  const [streakDays, setStreakDays] = useState(3);
  const [showTips, setShowTips] = useState(false);
  const [activityLevel, setActivityLevel] = useState("");
  
  // Update history goals when level changes
  useEffect(() => {
    const newGoal = getStepsGoalByLevel();
    setDailyGoal(newGoal);
    setStepsHistory(prev => prev.map(day => ({ ...day, goal: newGoal })));
  }, [userLevel]);
  
  // Calculate activity level based on current steps
  useEffect(() => {
    if (currentSteps < dailyGoal * 0.3) {
      setActivityLevel("Low");
    } else if (currentSteps < dailyGoal * 0.7) {
      setActivityLevel("Moderate");
    } else if (currentSteps < dailyGoal) {
      setActivityLevel("Active");
    } else {
      setActivityLevel("Very Active");
    }
  }, [currentSteps, dailyGoal]);

  // Calculate the progress percentage
  const progressPercentage = Math.min((currentSteps / dailyGoal) * 100, 100);
  
  // Calculate points based on Athleo's system
  const calculatePoints = () => {
    // Steps are worth 25 points if the goal is reached
    const potentialPoints = 25;
    
    // Calculate earned points based on percentage of goal
    const earnedPoints = currentSteps >= dailyGoal ? 25 : Math.floor((currentSteps / dailyGoal) * 25);
    
    let message = "";
    if (currentSteps >= dailyGoal) {
      message = "You've reached your steps goal! +25 points";
    } else {
      const stepsNeeded = dailyGoal - currentSteps;
      message = `You need ${stepsNeeded.toLocaleString()} more steps to reach your goal.`;
    }
    
    return { earned: earnedPoints, potential: potentialPoints, message };
  };
  
  const points = calculatePoints();
  
  // Add steps
  const addSteps = (amount) => {
    setCurrentSteps(prev => Math.min(prev + amount, dailyGoal * 2)); // Cap at 2x goal
  };

  // Remove steps
  const removeSteps = (amount) => {
    setCurrentSteps(prev => Math.max(prev - amount, 0));
  };

  // Change user level
  const changeUserLevel = (level) => {
    setUserLevel(level);
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  // Toggle goal adjuster visibility
  const toggleGoalAdjuster = () => {
    setShowGoalAdjuster(!showGoalAdjuster);
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Calculate calories burned (rough estimate)
  const calculateCaloriesBurned = () => {
    // Rough estimate: 40 calories per 1000 steps
    return Math.round(currentSteps * 0.04);
  };

  // Calculate distance (rough estimate)
  const calculateDistance = () => {
    // Rough estimate: average stride length of 0.7m
    const meters = currentSteps * 0.7;
    const kilometers = meters / 1000;
    return kilometers.toFixed(2);
  };

  // Sample steps tips
  const stepsTips = [
    "Take the stairs instead of the elevator when possible.",
    "Park farther away from entrances to add extra steps to your day.",
    "Schedule walking meetings instead of sitting ones.",
    "Set hourly reminders to get up and move for a few minutes.",
    "Take a short walk after meals to boost your digestion and step count."
  ];

  // Activity statistics
  const activityStats = [
    { name: "Weekly Average", value: "9,750", unit: "steps" },
    { name: "Monthly Average", value: "10,200", unit: "steps" },
    { name: "Best Day", value: "15,238", unit: "steps" },
    { name: "Active Days", value: "22/30", unit: "" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Steps
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your daily steps to stay active and reach your fitness goals
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
          {/* Steps Tracking Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <FootprintsIcon size={20} className="text-[#16DDE3]" />
              </span>
              Today's Steps
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
            
            {/* Steps Counter Visualization */}
            <div className="flex flex-col items-center my-10">
              <div className="relative w-48 h-48 mb-6">
                {/* Circular progress background */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>
                {/* Circular progress indicator */}
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
                    strokeDashoffset={251.2 - (251.2 * Math.min(progressPercentage, 100)) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                {/* Steps counter in middle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-white">{formatNumber(currentSteps)}</div>
                  <p className="text-xs text-gray-400 mt-1">of {formatNumber(dailyGoal)} steps</p>
                  <div className="mt-2 px-3 py-1 bg-[#16DDE3]/20 rounded-full">
                    <span className="text-[#16DDE3] text-xs">{activityLevel}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full mb-8">
                <div className="bg-black/30 p-3 rounded-xl text-center">
                  <p className="text-[#16DDE3] text-2xl font-bold">{calculateCaloriesBurned()}</p>
                  <p className="text-gray-400 text-sm">Calories Burned</p>
                </div>
                <div className="bg-black/30 p-3 rounded-xl text-center">
                  <p className="text-[#16DDE3] text-2xl font-bold">{calculateDistance()} km</p>
                  <p className="text-gray-400 text-sm">Distance</p>
                </div>
              </div>
              
              {/* Add/Remove Buttons */}
              <div className="flex space-x-6">
                <button 
                  onClick={() => removeSteps(1000)}
                  className="bg-black/30 hover:bg-black/50 text-white px-5 py-3 rounded-xl flex items-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronDown size={20} className="text-[#16DDE3]" />
                  <span className="ml-2">-1000</span>
                </button>
                
                <button 
                  onClick={() => addSteps(1000)}
                  className="bg-[#16DDE3] hover:bg-[#0B737A] text-black px-5 py-3 rounded-xl flex items-center font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronUp size={20} />
                  <span className="ml-2">+1000</span>
                </button>
              </div>
            </div>
            
            {/* Daily Goal */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Daily Steps Goal</h3>
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
                      Débutant (10k)
                    </button>
                    <button 
                      onClick={() => changeUserLevel("Intermédiaire")}
                      className={`text-sm py-2 px-1 rounded-lg transition-all ${
                        userLevel === "Intermédiaire" 
                          ? 'bg-[#16DDE3] text-black font-bold' 
                          : 'bg-black/30 text-gray-300 hover:bg-black/50'
                      }`}
                    >
                      Intermédiaire (20k)
                    </button>
                    <button 
                      onClick={() => changeUserLevel("Avancé")}
                      className={`text-sm py-2 px-1 rounded-lg transition-all ${
                        userLevel === "Avancé" 
                          ? 'bg-[#16DDE3] text-black font-bold' 
                          : 'bg-black/30 text-gray-300 hover:bg-black/50'
                      }`}
                    >
                      Avancé (40k)
                    </button>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-400 mt-3">
                Recommended goal based on your level: <span className="text-[#16DDE3]">{formatNumber(dailyGoal)} steps</span>
              </p>
            </div>
          </div>
          
          {/* Steps History */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <TrendingUp size={20} className="text-[#16DDE3]" />
              </span>
              Weekly Steps
            </h2>
            
            <div className="space-y-4">
              {stepsHistory.map((day, index) => (
                <div key={index} className="group">
                  <div className="flex items-center mb-1">
                    <div className="w-28 text-sm text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="ml-auto text-sm font-medium text-white">
                      <span className={day.steps >= day.goal ? 'text-[#16DDE3]' : 'text-gray-400'}>
                        {formatNumber(day.steps)}
                      </span> /{formatNumber(day.goal)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="relative h-6 bg-gray-800 rounded-lg overflow-hidden group-hover:bg-gray-700 transition-all">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#16DDE3]/80 to-[#0B737A]/80 rounded-lg group-hover:from-[#16DDE3] group-hover:to-[#0B737A] transition-all"
                        style={{ width: `${Math.min((day.steps / day.goal) * 100, 100)}%` }}
                      ></div>
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
                  <p className="text-gray-300">Active Streak</p>
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
                    <FootprintsIcon size={20} className="text-[#16DDE3]" />
                  </span>
                  Step Tips
                </h2>
                <button 
                  onClick={toggleTips}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showTips ? 'Show Less' : 'Show More'}
                </button>
              </div>
              
              <ul className="space-y-3">
                {stepsTips.slice(0, showTips ? stepsTips.length : 2).map((tip, index) => (
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
                  <p className="text-gray-300">Today's steps points</p>
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
            
            {/* Step Progress Insights */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                  <BarChart size={20} className="text-[#16DDE3]" />
                </span>
                Step Insights
              </h2>
              
              <div className="space-y-6">
                {/* Activity by hour */}
                <div className="bg-black/30 p-4 rounded-xl">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <ClockIcon size={16} className="mr-2 text-[#16DDE3]" />
                    Activity by Hour
                  </h3>
                  <div className="h-24 flex items-end gap-1 mt-4">
                    {/* Sample bar chart for hourly activity */}
                    {[10, 5, 8, 15, 20, 25, 30, 35, 25, 40, 30, 20, 15, 25, 35, 40, 35, 30, 20, 15, 10, 5, 2].map((height, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-t from-[#16DDE3] to-[#0B737A] rounded-sm flex-grow"
                        style={{ height: `${height * 2}px` }}
                        title={`${index}:00 - ${index+1}:00: ${height * 100} steps`}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Morning</span>
                    <span>Afternoon</span>
                    <span>Evening</span>
                  </div>
                </div>
                
                {/* Step Milestones */}
                <div className="bg-black/30 p-4 rounded-xl">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Target size={16} className="mr-2 text-[#16DDE3]" />
                    Step Milestones
                  </h3>
                  
                  <div className="space-y-3 mt-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">5,000 steps</span>
                        <span className="text-[#16DDE3]">Completed</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#16DDE3] w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">10,000 steps</span>
                        <span className="text-[#16DDE3]">{currentSteps >= 10000 ? 'Completed' : `${Math.min(Math.round((currentSteps / 10000) * 100), 100)}%`}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#16DDE3]" 
                          style={{ width: `${Math.min((currentSteps / 10000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">15,000 steps</span>
                        <span className="text-[#16DDE3]">{currentSteps >= 15000 ? 'Completed' : `${Math.min(Math.round((currentSteps / 15000) * 100), 100)}%`}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#16DDE3]" 
                          style={{ width: `${Math.min((currentSteps / 15000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connect Device Section */}
                <div className="bg-black/30 p-4 rounded-xl">
                  <h3 className="font-medium text-lg mb-2">Connect Devices</h3>
                  <p className="text-gray-300 text-sm">Connect a fitness tracker for more accurate step counting:</p>
                  <button className="mt-3 text-[#16DDE3] text-sm hover:underline">Connect Device</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepsPage;