"use client";

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const StepsPage = () => {
  // États pour la saisie des pas
  const [steps, setSteps] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États pour les objectifs et statistiques
  const [dailyObjective, setDailyObjective] = useState(10000);
  const [totalSteps, setTotalSteps] = useState(8547);
  const [progressPercentage, setProgressPercentage] = useState(85);

  // Statistiques additionnelles
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);

  // Historique des pas (donnée simulée)
  const [weeklyData, setWeeklyData] = useState([6000, 8200, 7500, 9100, 6800, 7200, 8547]);
  const [monthlyData, setMonthlyData] = useState(new Array(30).fill(0).map(() => Math.floor(Math.random() * 5000) + 5000));

  // Prévalidation du formulaire
  const validateInput = () => {
    const stepsNum = parseInt(steps);
    const timeNum = parseInt(time);
    
    if (isNaN(stepsNum) || isNaN(timeNum)) return false;
    if (stepsNum < 0 || stepsNum > 50000) return false;
    if (timeNum < 0 || timeNum > 1440) return false; // max 24h en minutes
    
    return true;
  };

  // Calcul automatique des statistiques
  const calculateStats = (stepsValue, timeValue) => {
    const stepsNum = parseInt(stepsValue);
    const timeNum = parseInt(timeValue);
    
    // Distance (en km, moyenne de 0.75m par pas)
    const calculatedDistance = (stepsNum * 0.75) / 1000;
    
    // Calories (0.04 calories par pas en moyenne)
    const calculatedCalories = stepsNum * 0.04;
    
    // Vitesse moyenne (en km/h)
    const calculatedSpeed = timeNum > 0 ? (calculatedDistance / (timeNum / 60)) : 0;
    
    setDistance(calculatedDistance.toFixed(2));
    setCalories(calculatedCalories.toFixed(0));
    setAverageSpeed(calculatedSpeed.toFixed(1));
  };

  // Gestion de la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      alert('Please enter valid data (steps: 0-50000, time: 0-1440 minutes)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const stepsNum = parseInt(steps);
      // Calcul des statistiques
      calculateStats(steps, time);
      
      // Mise à jour du total
      const newTotal = stepsNum;
      setTotalSteps(newTotal);
      
      // Mise à jour du pourcentage
      const newProgress = Math.min(Math.round((newTotal / dailyObjective) * 100), 100);
      setProgressPercentage(newProgress);
      
      // Déclenchement des récompenses
      checkRewards(newTotal);
      
      // Reset du formulaire
      setSteps('');
      setTime('');
      
    } catch (error) {
      console.error('Error submitting steps:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vérification des récompenses
  const checkRewards = (totalSteps) => {
    if (totalSteps >= dailyObjective) {
      // Notification de récompense
      alert('🎉 Congratulations! You reached your daily goal! +100 points');
    }
  };

  // Objectif adaptatif basé sur la moyenne des 7 derniers jours
  useEffect(() => {
    const weeklyAverage = weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length;
    const adaptiveObjective = Math.ceil(weeklyAverage * 1.1); // 10% de plus que la moyenne
    setDailyObjective(adaptiveObjective);
  }, [weeklyData]);

  // Configuration du graphique circulaire
  useEffect(() => {
    const ctx = document.getElementById('progressChart');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [progressPercentage, 100 - progressPercentage],
          backgroundColor: ['#16DDE3', '#gray-700'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => myChart.destroy();
  }, [progressPercentage]);

  // Boutons rapides
  const quickEntryButtons = [
    { steps: 5000, label: '5K' },
    { steps: 10000, label: '10K' },
    { steps: 15000, label: '15K' },
    { steps: 20000, label: '20K' }
  ];

  const handleQuickEntry = (value) => {
    setSteps(value.toString());
    // Estimation du temps: environ 12 pas par minute
    const estimatedTime = Math.round(value / 12);
    setTime(estimatedTime.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#16DDE3] to-[#0B737A]">
            Steps Tracking
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Track your daily steps and reach your fitness goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaire de saisie intelligent */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Manual Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Steps
                </label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-[#16DDE3] focus:outline-none"
                  placeholder="Enter steps"
                  min="0"
                  max="50000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Walking Time (minutes)
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-[#16DDE3] focus:outline-none"
                  placeholder="Enter duration"
                  min="0"
                  max="1440"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#16DDE3] text-black hover:bg-[#0B737A]'
                } transition-colors`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Steps'}
              </button>
            </form>

            {/* Boutons d'entrée rapide */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Quick Entry</p>
              <div className="grid grid-cols-4 gap-2">
                {quickEntryButtons.map((btn) => (
                  <button
                    key={btn.steps}
                    onClick={() => handleQuickEntry(btn.steps)}
                    className="py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Objectif dynamique et progrès */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Today's Progress</h3>
            
            {/* Graphique circulaire */}
            <div className="relative h-48 mb-6">
              <canvas id="progressChart"></canvas>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold">{progressPercentage}%</p>
                  <p className="text-gray-400">Completed</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Steps</span>
                <span className="font-bold">{totalSteps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Objective</span>
                <span className="font-bold">{dailyObjective.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#16DDE3] to-[#0B737A] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Statistiques enrichies */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Statistics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">📏</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Distance</p>
                    <p className="text-xl font-bold">{distance} km</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">🔥</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Calories Burned</p>
                    <p className="text-xl font-bold">{calories} kcal</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#16DDE3]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#16DDE3] text-2xl">⚡</span>
                  </div>
                  <div>
                    <p className="text-gray-400">Average Speed</p>
                    <p className="text-xl font-bold">{averageSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualisations avancées */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Weekly Overview</h3>
            <div className="relative">
              <canvas id="weeklyChart" style={{maxHeight: '300px'}}></canvas>
            </div>
          </div>

          {/* Carte de chaleur mensuelle */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Monthly Heat Map</h3>
            <div className="grid grid-cols-10 gap-1">
              {monthlyData.map((value, index) => {
                const intensity = value / 15000; // Normalisation
                return (
                  <div
                    key={index}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `rgba(22, 221, 227, ${intensity})`,
                      borderColor: '#16DDE3',
                      borderWidth: '1px'
                    }}
                    title={`Day ${index + 1}: ${value} steps`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepsPage;