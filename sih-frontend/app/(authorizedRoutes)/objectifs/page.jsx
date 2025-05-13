"use client";

import React, { useState } from "react";
import { 
  FootprintsIcon, 
  Droplet, 
  UtensilsCrossed, 
  Moon, 
  Dumbbell, 
  Award, 
  Crown, 
  Target,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock
} from 'lucide-react';

const ObjectivesPage = () => {
  const [userLevel, setUserLevel] = useState("Débutant"); // Options: "Débutant", "Intermédiaire", "Avancé"
  const [activeTab, setActiveTab] = useState("daily");
  const [expandedObjective, setExpandedObjective] = useState(null);
  
  // Function to toggle objective expansion
  const toggleObjective = (id) => {
    if (expandedObjective === id) {
      setExpandedObjective(null);
    } else {
      setExpandedObjective(id);
    }
  };
  
  // Daily objectives based on level
  const dailyObjectives = {
    "Débutant": [
      {
        id: "steps-beginner",
        title: "10,000 Steps",
        description: "Walk 10,000 steps in a day to improve cardiovascular health.",
        icon: <FootprintsIcon className="text-green-400" />,
        points: 25,
        progress: 65,
        completed: false,
        category: "Activity",
        details: "Walking 10,000 steps daily (about 8 km) can help improve heart health, boost energy levels, and aid in weight management."
      },
      {
        id: "water-beginner",
        title: "Drink 1.5L of Water",
        description: "Stay hydrated by drinking at least 1.5 liters of water daily.",
        icon: <Droplet className="text-blue-400" />,
        points: 15,
        progress: 83,
        completed: false,
        category: "Hydration",
        details: "Proper hydration is essential for maintaining energy levels, supporting digestion, and helping your body function optimally."
      },
      {
        id: "sleep-beginner",
        title: "8 Hours of Sleep",
        description: "Get 8 hours of quality sleep for optimal recovery.",
        icon: <Moon className="text-purple-400" />,
        points: 30,
        progress: 100,
        completed: true,
        category: "Recovery",
        details: "Quality sleep is crucial for physical recovery, mental clarity, and overall well-being. Create a consistent sleep schedule for best results."
      },
      {
        id: "nutrition-beginner",
        title: "2000 Calories Balanced",
        description: "Maintain a balanced diet with approximately 2000 calories.",
        icon: <UtensilsCrossed className="text-yellow-400" />,
        points: 15,
        progress: 70,
        completed: false,
        category: "Nutrition",
        details: "A balanced diet provides essential nutrients and energy. Focus on whole foods and a good mix of proteins, carbs, and healthy fats."
      },
      {
        id: "workout-beginner",
        title: "20-Minute Workout",
        description: "Complete a 20-minute workout session of any type.",
        icon: <Dumbbell className="text-red-400" />,
        points: 20,
        progress: 0,
        completed: false,
        category: "Fitness",
        details: "Even short workouts are beneficial. Focus on consistency rather than intensity when starting your fitness journey."
      }
    ],
    "Intermédiaire": [
      {
        id: "steps-intermediate",
        title: "20,000 Steps",
        description: "Walk 20,000 steps in a day to improve cardiovascular health.",
        icon: <FootprintsIcon className="text-green-400" />,
        points: 25,
        progress: 45,
        completed: false,
        category: "Activity",
        details: "Doubling the standard step goal helps build endurance and can significantly improve your cardiovascular health."
      },
      {
        id: "water-intermediate",
        title: "Drink 3L of Water",
        description: "Stay hydrated by drinking at least 3 liters of water daily.",
        icon: <Droplet className="text-blue-400" />,
        points: 15,
        progress: 60,
        completed: false,
        category: "Hydration",
        details: "Increased water intake supports more intense physical activity and helps maintain optimal bodily functions."
      },
      {
        id: "sleep-intermediate",
        title: "8 Hours of Sleep",
        description: "Get 8 hours of quality sleep for optimal recovery.",
        icon: <Moon className="text-purple-400" />,
        points: 30,
        progress: 88,
        completed: false,
        category: "Recovery",
        details: "Quality sleep becomes even more important as you increase your activity levels to ensure proper recovery."
      },
      {
        id: "nutrition-intermediate",
        title: "2200 Calories Balanced",
        description: "Maintain a balanced diet with approximately 2200 calories.",
        icon: <UtensilsCrossed className="text-yellow-400" />,
        points: 15,
        progress: 50,
        completed: false,
        category: "Nutrition",
        details: "A slightly higher calorie intake supports your increased activity level while maintaining a balance of nutrients."
      },
      {
        id: "workout-intermediate",
        title: "40-Minute Workout",
        description: "Complete a 40-minute workout session of moderate intensity.",
        icon: <Dumbbell className="text-red-400" />,
        points: 20,
        progress: 75,
        completed: false,
        category: "Fitness",
        details: "Longer workouts with moderate intensity help build strength and endurance consistently."
      }
    ],
    "Avancé": [
      {
        id: "steps-advanced",
        title: "40,000 Steps",
        description: "Walk 40,000 steps in a day for exceptional cardiovascular benefits.",
        icon: <FootprintsIcon className="text-green-400" />,
        points: 25,
        progress: 30,
        completed: false,
        category: "Activity",
        details: "This challenging step count is ideal for those who want to push their limits and maximize their daily activity level."
      },
      {
        id: "water-advanced",
        title: "Drink 3.5L of Water",
        description: "Stay optimally hydrated by drinking at least 3.5 liters of water daily.",
        icon: <Droplet className="text-blue-400" />,
        points: 15,
        progress: 40,
        completed: false,
        category: "Hydration",
        details: "Optimal hydration is crucial for high-performance activities and intense workouts."
      },
      {
        id: "sleep-advanced",
        title: "8 Hours of Quality Sleep",
        description: "Get 8 hours of deep, restorative sleep for peak recovery.",
        icon: <Moon className="text-purple-400" />,
        points: 30,
        progress: 62,
        completed: false,
        category: "Recovery",
        details: "Recovery is a critical component of advanced fitness. Focus on sleep quality metrics like REM and deep sleep cycles."
      },
      {
        id: "nutrition-advanced",
        title: "2500 Calories Optimized",
        description: "Maintain an optimized diet with approximately 2500 calories.",
        icon: <UtensilsCrossed className="text-yellow-400" />,
        points: 15,
        progress: 45,
        completed: false,
        category: "Nutrition",
        details: "An advanced nutritional approach focuses on timing, macronutrient ratios, and quality of food sources for peak performance."
      },
      {
        id: "workout-advanced",
        title: "90-Minute Intense Workout",
        description: "Complete a 90-minute high-intensity workout session.",
        icon: <Dumbbell className="text-red-400" />,
        points: 20,
        progress: 20,
        completed: false,
        category: "Fitness",
        details: "High-intensity training for longer durations challenges your body and helps break through plateaus."
      }
    ]
  };
  
  // Weekly objectives (common across levels, but with adjusted targets)
  const weeklyObjectives = [
    {
      id: "weekly-steps",
      title: "Weekly Step Goal",
      description: userLevel === "Débutant" ? "Reach 70,000 steps this week" : userLevel === "Intermédiaire" ? "Reach 140,000 steps this week" : "Reach 280,000 steps this week",
      icon: <FootprintsIcon className="text-green-400" />,
      points: 75,
      progress: 40,
      completed: false,
      category: "Activity",
      details: "Consistency in your daily step count adds up to significant health benefits over the week."
    },
    {
      id: "weekly-workouts",
      title: "Complete Workouts",
      description: userLevel === "Débutant" ? "Complete 3 workouts this week" : userLevel === "Intermédiaire" ? "Complete 4 workouts this week" : "Complete 5 workouts this week",
      icon: <Dumbbell className="text-red-400" />,
      points: 100,
      progress: 66,
      completed: false,
      category: "Fitness",
      details: "Regular workout sessions throughout the week help build a consistent fitness routine."
    },
    {
      id: "weekly-sleep",
      title: "Sleep Score",
      description: "Maintain an average sleep score of 80% this week",
      icon: <Moon className="text-purple-400" />,
      points: 80,
      progress: 75,
      completed: false,
      category: "Recovery",
      details: "Your weekly sleep score reflects both the quantity and quality of your sleep patterns."
    }
  ];
  
  // Monthly challenges
  const monthlyChallenges = [
    {
      id: "monthly-steps",
      title: "Million Step Challenge",
      description: "Walk one million steps in a month",
      icon: <FootprintsIcon className="text-green-400" />,
      points: 500,
      progress: 35,
      completed: false,
      category: "Activity",
      locked: userLevel === "Débutant",
      details: "This ambitious challenge will transform your activity level and cardiovascular health over the month."
    },
    {
      id: "monthly-strength",
      title: "Strength Transformation",
      description: "Complete 20 strength training sessions in a month",
      icon: <Dumbbell className="text-red-400" />,
      points: 450,
      progress: 25,
      completed: false,
      category: "Fitness",
      locked: false,
      details: "Focusing on strength training consistently for a month can dramatically improve your muscle tone and functional fitness."
    },
    {
      id: "monthly-nutrition",
      title: "Clean Eating Challenge",
      description: "Maintain a balanced diet for 25 days this month",
      icon: <UtensilsCrossed className="text-yellow-400" />,
      points: 400,
      progress: 48,
      completed: false,
      category: "Nutrition",
      locked: false,
      details: "This challenge helps you establish long-term healthy eating habits that will benefit your overall health."
    },
    {
      id: "monthly-hydration",
      title: "Hydration Master",
      description: "Meet your daily water intake goal for 30 consecutive days",
      icon: <Droplet className="text-blue-400" />,
      points: 350,
      progress: 60,
      completed: false,
      category: "Hydration",
      locked: userLevel === "Débutant",
      details: "Perfect hydration for an entire month will reset your body's hydration patterns and improve overall health."
    }
  ];

  // Render an objective card
  const renderObjectiveCard = (objective, index) => {
    const isExpanded = expandedObjective === objective.id;
    
    return (
      <div 
        key={objective.id}
        className={`bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.01] transition-transform duration-200 ${
          objective.completed ? 'border border-[#16DDE3]/30' : ''
        } ${objective.locked ? 'opacity-70' : ''}`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-black/40 mr-4">
              {objective.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center">
                {objective.title}
                {objective.locked && <Lock size={16} className="ml-2 text-gray-400" />}
                {objective.completed && <CheckCircle2 size={16} className="ml-2 text-[#16DDE3]" />}
              </h3>
              <p className="text-gray-400 text-sm">{objective.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center bg-[#16DDE3]/10 px-3 py-1 rounded-full">
              <Award size={14} className="text-[#16DDE3] mr-1" />
              <span className="text-[#16DDE3] text-sm font-medium">+{objective.points}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{objective.category}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-[#16DDE3] font-medium">{objective.progress}%</span>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#16DDE3] to-[#0B737A] rounded-full"
              style={{ width: `${objective.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Toggle details button */}
        <div className="mt-4">
          <button 
            className="w-full flex items-center justify-center bg-black/30 hover:bg-black/40 py-1.5 rounded-lg text-xs text-gray-300 transition-colors"
            onClick={() => toggleObjective(objective.id)}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={14} className="mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown size={14} className="mr-1" />
                Show Details
              </>
            )}
          </button>
        </div>
        
        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300">
            <p>{objective.details}</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Objectives
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Set goals, track progress, and earn rewards for maintaining a healthy lifestyle
          </p>
          
          {/* Level Selector */}
          <div className="mt-8 inline-flex bg-black/30 rounded-full p-1">
            {["Débutant", "Intermédiaire", "Avancé"].map((level) => (
              <button
                key={level}
                onClick={() => setUserLevel(level)}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${
                  userLevel === level
                    ? 'bg-[#16DDE3] text-black font-medium'
                    : 'text-gray-300 hover:bg-black/40'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* User Stats Summary */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 mb-10 hover:scale-[1.01] transition-transform duration-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-[#16DDE3]/10 rounded-full mr-4">
                <Target size={24} className="text-[#16DDE3]" />
              </div>
              <div>
                <h2 className="font-bold text-2xl">Your Objectives</h2>
                <p className="text-gray-400">Current level: <span className="text-[#16DDE3]">{userLevel}</span></p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#16DDE3]">3/5</div>
                <p className="text-sm text-gray-400">Daily Goals</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#16DDE3]">1/3</div>
                <p className="text-sm text-gray-400">Weekly Goals</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#16DDE3]">2/4</div>
                <p className="text-sm text-gray-400">Monthly Challenges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            className={`py-3 px-6 text-sm font-medium relative ${
              activeTab === "daily" ? 'text-[#16DDE3]' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab("daily")}
          >
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              Daily Objectives
            </div>
            {activeTab === "daily" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#16DDE3]"></div>
            )}
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium relative ${
              activeTab === "weekly" ? 'text-[#16DDE3]' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab("weekly")}
          >
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-2" />
              Weekly Goals
            </div>
            {activeTab === "weekly" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#16DDE3]"></div>
            )}
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium relative ${
              activeTab === "monthly" ? 'text-[#16DDE3]' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Monthly Challenges
            </div>
            {activeTab === "monthly" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#16DDE3]"></div>
            )}
          </button>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === "daily" && dailyObjectives[userLevel].map((objective, index) => 
            renderObjectiveCard(objective, index)
          )}
          
          {activeTab === "weekly" && weeklyObjectives.map((objective, index) => 
            renderObjectiveCard(objective, index)
          )}
          
          {activeTab === "monthly" && monthlyChallenges.map((objective, index) => 
            renderObjectiveCard(objective, index)
          )}
        </div>
        
        {/* Create Custom Objective Section */}
        <div className="mt-16 bg-gradient-to-r from-[#16DDE3]/20 to-transparent backdrop-blur-sm rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Create Your <span className="text-[#16DDE3]">Custom</span> Objectives
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Set personalized health and fitness goals tailored to your specific needs
          </p>
          <button className="px-8 py-4 bg-[#16DDE3] text-black font-semibold rounded-full hover:bg-[#0B737A] hover:text-white transition-colors duration-200 hover:scale-105 active:scale-95 transition-transform flex items-center mx-auto">
            <Plus size={20} className="mr-2" />
            Create Custom Objective
          </button>
        </div>
      </section>
    </div>
  );
};

export default ObjectivesPage;