"use client";

import React, { useState, useEffect } from 'react';
import { PieChart, Pizza, Plus, Minus, TrendingUp, Award, Apple, Carrot, Egg, Fish, Drumstick, Crown } from 'lucide-react';

const NutritionPage = () => {
  
  const [userLevel, setUserLevel] = useState("Débutant"); 
  const [isPremium, setIsPremium] = useState(true); 

  // Initialize calorie goal based on user level
  const getCalorieGoalByLevel = () => {
    switch(userLevel) {
      case "Intermédiaire": return 2200;
      case "Avancé": return 2500;
      default: return 2000; // Débutant
    }
  };
  
  const [calories, setCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(getCalorieGoalByLevel());
  const [showGoalAdjuster, setShowGoalAdjuster] = useState(false);
  
  // Meal data with macronutrient information
  const [meals, setMeals] = useState([
    { 
      id: 1, 
      name: 'Breakfast', 
      calories: 0, 
      logged: false, 
      icon: 'Apple',
      protein: 0,
      carbs: 0,
      fats: 0,
      defaultValues: {
        calories: 500,
        protein: 20, // ~20% from protein
        carbs: 65,   // ~50% from carbs
        fats: 17     // ~30% from fats
      }
    },
    { 
      id: 2, 
      name: 'Lunch', 
      calories: 0, 
      logged: false, 
      icon: 'Fish',
      protein: 0,
      carbs: 0,
      fats: 0,
      defaultValues: {
        calories: 700,
        protein: 35, // higher protein for lunch
        carbs: 80,
        fats: 22
      } 
    },
    { 
      id: 3, 
      name: 'Dinner', 
      calories: 0, 
      logged: false, 
      icon: 'Drumstick',
      protein: 0,
      carbs: 0,
      fats: 0,
      defaultValues: {
        calories: 600,
        protein: 30,
        carbs: 60,
        fats: 20
      }
    },
    { 
      id: 4, 
      name: 'Snacks', 
      calories: 0, 
      logged: false, 
      icon: 'Carrot',
      protein: 0,
      carbs: 0,
      fats: 0,
      defaultValues: {
        calories: 300,
        protein: 10,
        carbs: 40,
        fats: 10
      }
    }
  ]);
  
  // Total macronutrients calculation
  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0
  });
  
  // Update macros when meals change
  useEffect(() => {
    const newMacros = {
      protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      fats: meals.reduce((sum, meal) => sum + meal.fats, 0)
    };
    setMacros(newMacros);
  }, [meals]);
  
  const [nutritionHistory, setNutritionHistory] = useState([
    { date: '2025-05-09', calories: 1850, goal: dailyGoal },
    { date: '2025-05-08', calories: 2100, goal: dailyGoal },
    { date: '2025-05-07', calories: 1920, goal: dailyGoal },
    { date: '2025-05-06', calories: 1750, goal: dailyGoal },
    { date: '2025-05-05', calories: 2050, goal: dailyGoal },
  ]);
  
  const [showTips, setShowTips] = useState(false);

  // Calculate the progress percentage
  const progressPercentage = Math.min((calories / dailyGoal) * 100, 100);
  
  // Calculate points based on Athleo's system
  const calculatePoints = () => {
    if (!isPremium) return { earned: 0, potential: 0, message: "Nutrition tracking is a premium feature" };
    
    
    const lowerLimit = dailyGoal * 0.9;
    const upperLimit = dailyGoal * 1.1;
    const isWithinGoal = calories >= lowerLimit && calories <= upperLimit;
    
    
    const potentialPoints = 15;
    const earnedPoints = isWithinGoal ? 15 : Math.floor((calories / dailyGoal) * 15);
    
    let message = "";
    if (isWithinGoal) {
      message = "You've successfully met your daily calorie goal! +15 points";
    } else if (calories < lowerLimit) {
      message = `You're under your calorie goal. Try to reach at least ${lowerLimit} calories.`;
    } else if (calories > upperLimit) {
      message = `You've exceeded your optimal calorie range. Try to stay under ${upperLimit} calories.`;
    }
    
    return { earned: earnedPoints, potential: potentialPoints, message };
  };
  
  const points = calculatePoints();
  
  // Add calories (with proportional macros)
  const addCalories = (amount) => {
    if (amount <= 0) return;
    
    setCalories(prev => Math.min(prev + amount, dailyGoal * 1.5));
    
    // Update macros based on a balanced distribution
    // For quick adds, assume a balanced macro distribution: 25% protein, 50% carbs, 25% fat
    // Protein: 4 calories per gram
    // Carbs: 4 calories per gram
    // Fat: 9 calories per gram
    
    const proteinCalories = amount * 0.25; // 25% from protein
    const carbCalories = amount * 0.5;    // 50% from carbs
    const fatCalories = amount * 0.25;    // 25% from fat
    
    const proteinGrams = Math.round(proteinCalories / 4);
    const carbGrams = Math.round(carbCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);
    
    setMacros(prev => ({
      protein: prev.protein + proteinGrams,
      carbs: prev.carbs + carbGrams,
      fats: prev.fats + fatGrams
    }));
  };

  // Remove calories (with proportional macros)
  const removeCalories = (amount) => {
    if (amount <= 0 || calories <= 0) return;
    
    const actualAmount = Math.min(amount, calories);
    setCalories(prev => Math.max(prev - actualAmount, 0));
    
    // Remove macros proportionally to current distribution
    // This ensures we don't go negative on any macro
    const totalMacroCalories = (macros.protein * 4) + (macros.carbs * 4) + (macros.fats * 9);
    
    if (totalMacroCalories > 0) {
      const ratio = actualAmount / totalMacroCalories;
      
      const proteinToRemove = Math.min(Math.round(macros.protein * ratio), macros.protein);
      const carbsToRemove = Math.min(Math.round(macros.carbs * ratio), macros.carbs);
      const fatsToRemove = Math.min(Math.round(macros.fats * ratio), macros.fats);
      
      setMacros(prev => ({
        protein: prev.protein - proteinToRemove,
        carbs: prev.carbs - carbsToRemove,
        fats: prev.fats - fatsToRemove
      }));
    }
  };

  // Toggle meal logging
  const toggleMeal = (id) => {
    setMeals(prevMeals => 
      prevMeals.map(meal => {
        if (meal.id !== id) return meal;
        
        // If currently not logged, populate with default values
        if (!meal.logged) {
          return { 
            ...meal, 
            logged: true, 
            calories: meal.defaultValues.calories,
            protein: meal.defaultValues.protein,
            carbs: meal.defaultValues.carbs,
            fats: meal.defaultValues.fats
          };
        } 
        // If already logged, reset the values
        else {
          return { 
            ...meal, 
            logged: false, 
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0
          };
        }
      })
    );
    
    // Total calories will be updated via useEffect
    const meal = meals.find(m => m.id === id);
    if (!meal.logged) {
      // If meal is being logged, add its calories to total
      setCalories(prev => prev + meal.defaultValues.calories);
    } else {
      // If meal is being un-logged, remove its calories from total
      setCalories(prev => Math.max(prev - meal.calories, 0));
    }
  };

  // Adjust daily goal
  const adjustGoal = (increment) => {
    setDailyGoal(prev => Math.max(1000, prev + increment));
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  // Toggle goal adjuster visibility
  const toggleGoalAdjuster = () => {
    setShowGoalAdjuster(!showGoalAdjuster);
  };

  // Change user level (for demonstration purposes)
  const changeUserLevel = (level) => {
    setUserLevel(level);
    // Update goal based on selected level
    switch(level) {
      case "Intermédiaire":
        setDailyGoal(2200);
        break;
      case "Avancé":
        setDailyGoal(2500);
        break;
      default:
        setDailyGoal(2000); // Débutant
    }
  };

  const nutritionTips = [
    "Aim for a rainbow of colors on your plate for a variety of nutrients.",
    "Protein helps with muscle repair and growth after workouts.",
    "Healthy fats are essential for hormone production and vitamin absorption.",
    "Complex carbs provide sustained energy for your workouts.",
    "Stay hydrated! Water helps with digestion and nutrient transport."
  ];
  
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'Apple': return <Apple size={24} />;
      case 'Fish': return <Fish size={24} />;
      case 'Drumstick': return <Drumstick size={24} />;
      case 'Carrot': return <Carrot size={24} />;
      default: return <Pizza size={24} />;
    }
  };

  const totalMacroCalories = (macros.protein * 4) + (macros.carbs * 4) + (macros.fats * 9);
  const macroPercentages = {
    protein: totalMacroCalories > 0 ? Math.round((macros.protein * 4 / totalMacroCalories) * 100) : 0,
    carbs: totalMacroCalories > 0 ? Math.round((macros.carbs * 4 / totalMacroCalories) * 100) : 0,
    fats: totalMacroCalories > 0 ? Math.round((macros.fats * 9 / totalMacroCalories) * 100) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/*Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Nutrition
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your daily nutrition to fuel your performance
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

        {!isPremium && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6 mb-8 text-center">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">Premium Feature</h3>
            <p className="text-gray-300">Nutrition tracking is available exclusively for Premium members.</p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold">
              Upgrade to Premium
            </button>
          </div>
        )}

        {/* Main Content */}
        {isPremium && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Progress Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                  <PieChart size={20} className="text-[#16DDE3]" />
                </span>
                Today's Nutrition
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
              
              {/* Calories Counter */}
              <div className="flex flex-col items-center my-10">
                <div className="text-6xl font-bold text-white mb-2 relative">
                  <span className="text-[#16DDE3]">{calories}</span>
                  <span className="text-2xl font-normal text-gray-400 absolute bottom-2 ml-2">/{dailyGoal}</span>
                </div>
                <p className="text-gray-300 mb-8">calories consumed</p>
                
                {/* Quick Add/Remove Buttons */}
                <div className="flex space-x-6">
                  <button 
                    onClick={() => removeCalories(100)}
                    className="bg-black/30 hover:bg-black/50 text-white px-5 py-3 rounded-xl flex items-center hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Minus size={20} className="text-[#16DDE3]" />
                    <span className="ml-2">-100</span>
                  </button>
                  
                  <button 
                    onClick={() => addCalories(100)}
                    className="bg-[#16DDE3] hover:bg-[#0B737A] text-black px-5 py-3 rounded-xl flex items-center font-semibold hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Plus size={20} />
                    <span className="ml-2">+100</span>
                  </button>
                </div>
              </div>
              
              {/* Daily Goal */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Daily Calorie Goal</h3>
                  <button 
                    onClick={toggleGoalAdjuster}
                    className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                  >
                    {showGoalAdjuster ? 'Done' : 'Adjust'}
                  </button>
                </div>
                
                {showGoalAdjuster && (
                  <div className="mt-6">
                    <div className="flex justify-center items-center space-x-6 mb-6">
                      <button 
                        onClick={() => adjustGoal(-100)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Minus size={24} className="text-[#16DDE3]" />
                      </button>
                      
                      <div className="text-3xl font-bold text-white">{dailyGoal}</div>
                      
                      <button 
                        onClick={() => adjustGoal(100)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Plus size={24} className="text-[#16DDE3]" />
                      </button>
                    </div>
                    
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
                        Débutant (2000)
                      </button>
                      <button 
                        onClick={() => changeUserLevel("Intermédiaire")}
                        className={`text-sm py-2 px-1 rounded-lg transition-all ${
                          userLevel === "Intermédiaire" 
                            ? 'bg-[#16DDE3] text-black font-bold' 
                            : 'bg-black/30 text-gray-300 hover:bg-black/50'
                        }`}
                      >
                        Intermédiaire (2200)
                      </button>
                      <button 
                        onClick={() => changeUserLevel("Avancé")}
                        className={`text-sm py-2 px-1 rounded-lg transition-all ${
                          userLevel === "Avancé" 
                            ? 'bg-[#16DDE3] text-black font-bold' 
                            : 'bg-black/30 text-gray-300 hover:bg-black/50'
                        }`}
                      >
                        Avancé (2500)
                      </button>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-400 mt-3">
                  Recommended goal based on your level: <span className="text-[#16DDE3]">{dailyGoal} calories</span>
                </p>
              </div>
            </div>
            
            {/* Meal Tracking */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                  <Pizza size={20} className="text-[#16DDE3]" />
                </span>
                Today's Meals
              </h2>
              
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div key={meal.id} className="group bg-black/30 hover:bg-black/40 p-4 rounded-xl transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${meal.logged ? 'bg-[#16DDE3]/20' : 'bg-gray-800'} mr-3`}>
                          <span className={meal.logged ? 'text-[#16DDE3]' : 'text-gray-400'}>
                            {getIconComponent(meal.icon)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{meal.name}</h3>
                          {meal.logged ? (
                            <div>
                              <p className="text-sm text-[#16DDE3]">
                                {meal.calories} calories
                              </p>
                              <p className="text-xs text-gray-400">
                                P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">
                              Not logged yet
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleMeal(meal.id)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          meal.logged 
                            ? 'bg-[#16DDE3]/20 text-[#16DDE3] hover:bg-[#16DDE3]/30' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {meal.logged ? 'Logged' : 'Log Meal'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold mb-4">Macronutrients</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-black/30 p-3 rounded-xl text-center">
                    <div className="text-[#16DDE3] text-lg font-bold">{macros.protein}g</div>
                    <div className="text-gray-400 text-sm">Protein</div>
                    <div className="text-xs text-gray-500">{macroPercentages.protein}%</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl text-center">
                    <div className="text-[#16DDE3] text-lg font-bold">{macros.carbs}g</div>
                    <div className="text-gray-400 text-sm">Carbs</div>
                    <div className="text-xs text-gray-500">{macroPercentages.carbs}%</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-xl text-center">
                    <div className="text-[#16DDE3] text-lg font-bold">{macros.fats}g</div>
                    <div className="text-gray-400 text-sm">Fats</div>
                    <div className="text-xs text-gray-500">{macroPercentages.fats}%</div>
                  </div>
                </div>
                
                {/* Macro distribution bar */}
                <div className="mt-4 h-4 bg-black/30 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${macroPercentages.protein}%` }}
                    title={`Protein: ${macroPercentages.protein}%`}
                  ></div>
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${macroPercentages.carbs}%` }}
                    title={`Carbs: ${macroPercentages.carbs}%`}
                  ></div>
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${macroPercentages.fats}%` }}
                    title={`Fats: ${macroPercentages.fats}%`}
                  ></div>
                </div>
                <div className="flex text-xs justify-between mt-1 text-gray-400">
                  <span>Protein</span>
                  <span>Carbs</span>
                  <span>Fats</span>
                </div>
              </div>
            </div>
            
            {/* Tips and History */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                      <Apple size={20} className="text-[#16DDE3]" />
                    </span>
                    Nutrition Tips
                  </h2>
                  <button 
                    onClick={toggleTips}
                    className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                  >
                    {showTips ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                
                <ul className="space-y-3">
                  {nutritionTips.slice(0, showTips ? nutritionTips.length : 2).map((tip, index) => (
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
                    <p className="text-gray-300">Today's nutrition points</p>
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
              
              {/* Weekly History */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                    <TrendingUp size={20} className="text-[#16DDE3]" />
                  </span>
                  Weekly Stats
                </h2>
                
                <div className="space-y-4">
                  {nutritionHistory.map((day, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center mb-1">
                        <div className="w-28 text-sm text-gray-400">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="ml-auto text-sm font-medium text-white">
                          <span className={
                            day.calories >= day.goal * 0.9 && day.calories <= day.goal * 1.1 
                              ? 'text-[#16DDE3]' 
                              : 'text-red-400'
                          }>
                            {day.calories}
                          </span>/{day.goal}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="relative h-6 bg-gray-800 rounded-lg overflow-hidden group-hover:bg-gray-700 transition-all">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded-lg transition-all ${
                              day.calories >= day.goal * 0.9 && day.calories <= day.goal * 1.1
                                ? 'bg-gradient-to-r from-[#16DDE3]/80 to-[#0B737A]/80 group-hover:from-[#16DDE3] group-hover:to-[#0B737A]'
                                : 'bg-gradient-to-r from-red-400/80 to-red-600/80 group-hover:from-red-400 group-hover:to-red-600'
                            }`}
                            style={{ width: `${Math.min((day.calories / day.goal) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default NutritionPage;