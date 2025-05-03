// app/components/StepWidget.js
import { useState, useEffect } from 'react';

const StepWidget = ({ user, isSimulated = false }) => {
  const [todaySteps, setTodaySteps] = useState(null);
  const [weeklySteps, setWeeklySteps] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      if (isSimulated) {
        simulateStepData();
      } else {
        fetchStepData();
      }
    }
  }, [user, isSimulated]);

  const fetchStepData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Set time range for today
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      
      // Set time range for last 7 days
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      
      // Convert times to milliseconds
      const nowMillis = now.getTime();
      const todayStartMillis = todayStart.getTime();
      const weekStartMillis = weekStart.getTime();
      
      // Fetch today's step count
      const todayResponse = await window.gapi.client.request({
        path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        method: 'POST',
        body: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }],
          bucketByTime: { durationMillis: 86400000 }, // 1 day
          startTimeMillis: todayStartMillis,
          endTimeMillis: nowMillis
        }
      });
      
      // Fetch weekly step count
      const weeklyResponse = await window.gapi.client.request({
        path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        method: 'POST',
        body: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }],
          bucketByTime: { durationMillis: 86400000 }, // 1 day
          startTimeMillis: weekStartMillis,
          endTimeMillis: nowMillis
        }
      });
      
      // Process today's step count
      let todayTotal = 0;
      if (todayResponse.result.bucket && todayResponse.result.bucket.length > 0) {
        todayResponse.result.bucket[0].dataset[0].point.forEach(point => {
          if (point.value && point.value.length > 0) {
            todayTotal += point.value[0].intVal || 0;
          }
        });
      }
      
      // Process weekly step count
      let weeklyTotal = 0;
      if (weeklyResponse.result.bucket && weeklyResponse.result.bucket.length > 0) {
        weeklyResponse.result.bucket.forEach(bucket => {
          if (bucket.dataset && bucket.dataset.length > 0) {
            bucket.dataset[0].point.forEach(point => {
              if (point.value && point.value.length > 0) {
                weeklyTotal += point.value[0].intVal || 0;
              }
            });
          }
        });
      }
      
      setTodaySteps(todayTotal);
      setWeeklySteps(weeklyTotal);
    } catch (err) {
      setError(`Error fetching step data: ${err.message}`);
      console.error('Error fetching step data:', err);
    } finally {
      setLoading(false);
    }
  };

  const simulateStepData = () => {
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      // Générer des nombres aléatoires de pas
      const todaySimulated = Math.floor(Math.random() * 3000) + 2000; // Entre 2000 et 5000
      const weeklySimulated = todaySimulated + Math.floor(Math.random() * 15000) + 5000; // Entre 7000 et 22000
      
      console.log('Simulating step data - Today:', todaySimulated, 'Weekly:', weeklySimulated);
      
      setTodaySteps(todaySimulated);
      setWeeklySteps(weeklySimulated);
      setLoading(false);
    }, 800);
  };

  // Daily step goal (adjustable)
  const dailyGoal = 10000;
  
  // Calculate percentage of goal reached
  const goalPercentage = todaySteps ? Math.min(Math.round((todaySteps / dailyGoal) * 100), 100) : 0;

  return (
    <div className="step-widget bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">
          Step Tracking {isSimulated && <span className="text-xs text-gray-500">(Simulated)</span>}
        </h3>
        <button 
          onClick={isSimulated ? simulateStepData : fetchStepData}
          disabled={loading}
          className="text-blue-500 hover:text-blue-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {todaySteps !== null ? (
            <div>
              <div className="flex items-end mb-2">
                <span className="text-2xl font-bold">{todaySteps.toLocaleString()}</span>
                <span className="text-gray-500 ml-1 mb-0.5 text-sm">steps today</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${goalPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{goalPercentage}% of daily goal</span>
                <span>{dailyGoal.toLocaleString()} steps</span>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">This week</span>
                  <span className="font-medium">{weeklySteps ? weeklySteps.toLocaleString() : '0'} steps</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Connect Google Fit to see your steps</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StepWidget;