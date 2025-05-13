"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Award, ChevronUp, ChevronDown, Clock, TrendingUp, Crown, BedDouble, AlarmClock } from 'lucide-react';

const SleepPage = () => {
  // User level state (could be fetched from API/context in a real app)
  const [userLevel, setUserLevel] = useState("Débutant"); // Options: "Débutant", "Intermédiaire", "Avancé"
  
  // Sleep goals 8 h
  const sleepGoalHours = 8;
  const sleepGoalMinutes = sleepGoalHours * 60;
  
  
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [totalSleepMinutes, setTotalSleepMinutes] = useState(0);
  const [bedTime, setBedTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [showTimeAdjuster, setShowTimeAdjuster] = useState(false);
  
  const [sleepHistory, setSleepHistory] = useState([
    { date: '2025-05-09', hours: 7.5, goal: sleepGoalHours },
    { date: '2025-05-08', hours: 8.2, goal: sleepGoalHours },
    { date: '2025-05-07', hours: 6.8, goal: sleepGoalHours },
    { date: '2025-05-06', hours: 7.9, goal: sleepGoalHours },
    { date: '2025-05-05', hours: 8.0, goal: sleepGoalHours },
  ]);
  
  const [streakDays, setStreakDays] = useState(2);
  const [showTips, setShowTips] = useState(false);

  // Calculate total sleep minutes whenever sleep hours or minutes change
  useEffect(() => {
    setTotalSleepMinutes(sleepHours * 60 + sleepMinutes);
  }, [sleepHours, sleepMinutes]);
  
  // Update sleep hours and minutes when times change
  useEffect(() => {
    const calculateSleepDuration = () => {
      const [bedHours, bedMins] = bedTime.split(':').map(Number);
      const [wakeHours, wakeMins] = wakeTime.split(':').map(Number);
      
      let bedTimeMinutes = bedHours * 60 + bedMins;
      let wakeTimeMinutes = wakeHours * 60 + wakeMins;
      
      // si bedTime is after wakeTime, assume it's the previous day // IMPOOOOORTANT
      if (bedTimeMinutes > wakeTimeMinutes) {
        wakeTimeMinutes += 24 * 60; 
      }
      
      //diff in min
      const sleepDurationMinutes = wakeTimeMinutes - bedTimeMinutes;
      
      //Convert to H et min
      const hours = Math.floor(sleepDurationMinutes / 60);
      const minutes = sleepDurationMinutes % 60;
      
      setSleepHours(hours);
      setSleepMinutes(minutes);
    };
    
    calculateSleepDuration();
  }, [bedTime, wakeTime]);

  // prog percentage
  const progressPercentage = Math.min((totalSleepMinutes / sleepGoalMinutes) * 100, 100);
  
  // Calculate points based on Athleo's system
  const calculatePoints = () => {
    const potentialPoints = 30;
    const lowerLimit = sleepGoalMinutes * 0.9;
    const upperLimit = sleepGoalMinutes * 1.1;
    const isWithinGoal = totalSleepMinutes >= lowerLimit && totalSleepMinutes <= upperLimit;
    
    const earnedPoints = isWithinGoal ? 30 : Math.floor((totalSleepMinutes / sleepGoalMinutes) * 30);
    
    let message = "";
    if (isWithinGoal) {
      message = "You've reached your sleep goal! +30 points";
    } else if (totalSleepMinutes < lowerLimit) {
      const minutesNeeded = Math.ceil(lowerLimit - totalSleepMinutes);
      const hoursNeeded = Math.floor(minutesNeeded / 60);
      const minsNeeded = minutesNeeded % 60;
      message = `You need ${hoursNeeded > 0 ? `${hoursNeeded}h ` : ''}${minsNeeded > 0 ? `${minsNeeded}m` : ''} more sleep to reach your goal.`;
    } else if (totalSleepMinutes > upperLimit) {
      message = "You've slept more than recommended. While rest is important, too much sleep can affect your daily rhythm.";
    }
    
    return { earned: earnedPoints, potential: potentialPoints, message };
  };
  
  const points = calculatePoints();
  
  // Adjust bedTime
  const adjustBedTime = (minutes) => {
    const [hours, mins] = bedTime.split(':').map(Number);
    let totalMinutes = hours * 60 + mins + minutes;
    
    // Handle overflow
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);
    
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    
    setBedTime(`${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`);
  };
  
  // Adjust wakeTime
  const adjustWakeTime = (minutes) => {
    const [hours, mins] = wakeTime.split(':').map(Number);
    let totalMinutes = hours * 60 + mins + minutes;
    
    // Handle overflow
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);
    
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    
    setWakeTime(`${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`);
  };

  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  // Toggle time adjuster visibility
  const toggleTimeAdjuster = () => {
    setShowTimeAdjuster(!showTimeAdjuster);
  };

  // Change user level (for demonstration purposes)
  const changeUserLevel = (level) => {
    setUserLevel(level);
  };

  // Format time as hours and minutes
  const formatTimeHM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Sample sleep tips
  const sleepTips = [
    "Maintain a consistent sleep schedule, even on weekends.",
    "Create a relaxing bedtime routine to signal your body it's time to wind down.",
    "Avoid screens at least an hour before bedtime due to blue light exposure.",
    "Keep your bedroom cool, dark, and quiet for optimal sleep quality.",
    "Avoid caffeine and heavy meals in the evening."
  ];

  // Sleep quality factors
  const sleepQualityFactors = [
    { name: "Regular Schedule", score: 8, maxScore: 10 },
    { name: "Sleep Environment", score: 7, maxScore: 10 },
    { name: "Pre-Sleep Routine", score: 6, maxScore: 10 },
    { name: "Diet & Caffeine", score: 8, maxScore: 10 },
    { name: "Physical Activity", score: 9, maxScore: 10 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/*Section 1.1*/}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block hover:scale-105 transition-transform duration-200">
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
              Sleep
            </h1>
          </div>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your sleep quality and duration to enhance recovery and performance
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sleep Tracking Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <Moon size={20} className="text-[#16DDE3]" />
              </span>
              Last Night's Sleep
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
            
            {/* Sleep Duration Visualization */}
            <div className="flex flex-col items-center my-10">
              <div className="relative w-64 h-32 mb-6">
                {/* Night and day background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden">
                  {/* Stars effect */}
                  <div className="absolute inset-0 opacity-50">
                    <div className="absolute h-1 w-1 bg-white rounded-full top-5 left-10"></div>
                    <div className="absolute h-1 w-1 bg-white rounded-full top-12 left-20"></div>
                    <div className="absolute h-1 w-1 bg-white rounded-full top-8 left-40"></div>
                    <div className="absolute h-1 w-1 bg-white rounded-full top-20 left-32"></div>
                    <div className="absolute h-1 w-1 bg-white rounded-full top-15 left-52"></div>
                    <div className="absolute h-1 w-1 bg-white rounded-full top-6 left-60"></div>
                    <div className="absolute h-2 w-2 bg-white rounded-full top-3 left-30 opacity-70"></div>
                  </div>
                  
                  {/* Moon and sun icons */}
                  <div className="absolute bottom-4 left-4">
                    <Moon size={24} className="text-yellow-100" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Sun size={24} className="text-yellow-300" />
                  </div>
                  
                  {/* Sleep duration arc */}
                  <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white">
                        {sleepHours}<span className="text-xl">h</span> {sleepMinutes}<span className="text-xl">m</span>
                      </span>
                      <p className="text-cyan-200 text-sm">Sleep Duration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center mr-6">
                    <BedDouble size={20} className="text-[#16DDE3] mr-2" />
                    <span className="text-white">{bedTime}</span>
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#16DDE3] to-[#0B737A]"></div>
                  <div className="flex items-center ml-6">
                    <AlarmClock size={20} className="text-[#16DDE3] mr-2" />
                    <span className="text-white">{wakeTime}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Recommended: <span className="text-[#16DDE3]">{sleepGoalHours} hours</span> per night</p>
              </div>
              
              {/* Adjust Bedtime/Wake Time Buttons */}
              <div className="flex space-x-6">
                <button 
                  onClick={toggleTimeAdjuster}
                  className="bg-[#16DDE3] hover:bg-[#0B737A] text-black px-5 py-3 rounded-xl flex items-center font-semibold hover:scale-105 active:scale-95 transition-transform"
                >
                  <Clock size={20} />
                  <span className="ml-2">{showTimeAdjuster ? 'Done' : 'Adjust Times'}</span>
                </button>
              </div>
            </div>
            
            {/* Time adjuster */}
            {showTimeAdjuster && (
              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="grid grid-cols-2 gap-6">
                  {/* Bedtime adjuster */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <BedDouble size={18} className="mr-2 text-[#16DDE3]" />
                      Bedtime
                    </h3>
                    <div className="flex items-center">
                      <button 
                        onClick={() => adjustBedTime(-15)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <ChevronDown size={24} className="text-[#16DDE3]" />
                      </button>
                      
                      <div className="text-3xl font-bold text-white px-4">
                        {bedTime}
                      </div>
                      
                      <button 
                        onClick={() => adjustBedTime(15)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <ChevronUp size={24} className="text-[#16DDE3]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Wake time adjuster */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <AlarmClock size={18} className="mr-2 text-[#16DDE3]" />
                      Wake Time
                    </h3>
                    <div className="flex items-center">
                      <button 
                        onClick={() => adjustWakeTime(-15)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <ChevronDown size={24} className="text-[#16DDE3]" />
                      </button>
                      
                      <div className="text-3xl font-bold text-white px-4">
                        {wakeTime}
                      </div>
                      
                      <button 
                        onClick={() => adjustWakeTime(15)}
                        className="bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      >
                        <ChevronUp size={24} className="text-[#16DDE3]" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Quick presets */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-400">Quick presets:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => { setBedTime("22:30"); setWakeTime("06:30"); }}
                      className="text-sm py-2 px-1 rounded-lg bg-black/30 text-gray-300 hover:bg-black/50 transition-all"
                    >
                      10:30PM - 6:30AM
                    </button>
                    <button
                      onClick={() => { setBedTime("23:00"); setWakeTime("07:00"); }}
                      className="text-sm py-2 px-1 rounded-lg bg-black/30 text-gray-300 hover:bg-black/50 transition-all"
                    >
                      11:00PM - 7:00AM
                    </button>
                    <button
                      onClick={() => { setBedTime("00:00"); setWakeTime("08:00"); }}
                      className="text-sm py-2 px-1 rounded-lg bg-black/30 text-gray-300 hover:bg-black/50 transition-all"
                    >
                      12:00AM - 8:00AM
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sleep History */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                <TrendingUp size={20} className="text-[#16DDE3]" />
              </span>
              Weekly Sleep
            </h2>
            
            <div className="space-y-5">
              {sleepHistory.map((day, index) => (
                <div key={index} className="group">
                  <div className="flex items-center mb-1">
                    <div className="w-28 text-sm text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="ml-auto text-sm font-medium text-white">
                      <span className={
                        day.hours >= day.goal * 0.9 && day.hours <= day.goal * 1.1 
                          ? 'text-[#16DDE3]' 
                          : 'text-gray-400'
                      }>
                        {day.hours}h
                      </span> /{day.goal}h
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="relative h-6 bg-gray-800 rounded-lg overflow-hidden group-hover:bg-gray-700 transition-all">
                      <div 
                        className={`absolute top-0 left-0 h-full rounded-lg transition-all ${
                          day.hours >= day.goal * 0.9 && day.hours <= day.goal * 1.1
                            ? 'bg-gradient-to-r from-[#16DDE3]/80 to-[#0B737A]/80 group-hover:from-[#16DDE3] group-hover:to-[#0B737A]'
                            : day.hours < day.goal * 0.9
                              ? 'bg-gradient-to-r from-orange-400/80 to-red-500/80 group-hover:from-orange-400 group-hover:to-red-500'
                              : 'bg-gradient-to-r from-blue-400/80 to-indigo-600/80 group-hover:from-blue-400 group-hover:to-indigo-600'
                        }`}
                        style={{ width: `${Math.min((day.hours / day.goal) * 100, 100)}%` }}
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
                  <p className="text-gray-300">Sleep Consistency</p>
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
                    <Moon size={20} className="text-[#16DDE3]" />
                  </span>
                  Sleep Tips
                </h2>
                <button 
                  onClick={toggleTips}
                  className="text-[#16DDE3] hover:text-[#0B737A] text-sm font-semibold"
                >
                  {showTips ? 'Show Less' : 'Show More'}
                </button>
              </div>
              
              <ul className="space-y-3">
                {sleepTips.slice(0, showTips ? sleepTips.length : 2).map((tip, index) => (
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
                  <p className="text-gray-300">Today's sleep points</p>
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
            
            {/* Sleep Stats and Info */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-3 p-2 bg-[#16DDE3]/10 rounded-lg">
                  <Clock size={20} className="text-[#16DDE3]" />
                </span>
                Sleep Stats
              </h2>

              
              <div className="bg-black/30 p-4 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Sleep Cycle Analysis</h3>
                <p className="text-gray-300 text-sm mb-2">Connect a sleep tracker for detailed cycle analysis:</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Light Sleep: --</li>
                  <li>• Deep Sleep: --</li>
                  <li>• REM Sleep: --</li>
                  <li>• Awake Time: --</li>
                </ul>
                <button className="mt-3 text-[#16DDE3] text-sm hover:underline">Connect Device</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SleepPage;