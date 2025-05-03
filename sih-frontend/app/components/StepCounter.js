// app/components/StepCounter.js
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const StepCounter = ({ user, isSimulated = false }) => {
  const [stepCount, setStepCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (user) {
      if (isSimulated) {
        simulateStepData();
      } else {
        fetchStepCount();
      }
    }
  }, [user, isSimulated]);

  const fetchStepCount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting to fetch step data with user:', user);
      
      // Vérifier si Google API est disponible
      if (!window.gapi || !window.gapi.client) {
        throw new Error('Google API client not initialized properly');
      }
      
      // Vérifier si l'utilisateur est connecté
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        throw new Error('User not signed in to Google');
      }
      
      // Set time range for the query (last 7 days)
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(startTime.getDate() - 7);
      
      // Convert time to milliseconds
      const endTimeMillis = endTime.getTime();
      const startTimeMillis = startTime.getTime();
      
      console.log('Fetching step data from', new Date(startTimeMillis), 'to', new Date(endTimeMillis));
      
      // Essayer d'abord une requête plus simple pour tester la connexion
      try {
        const testResponse = await window.gapi.client.request({
          path: 'https://www.googleapis.com/fitness/v1/users/me/dataSources',
          method: 'GET'
        });
        console.log('Test API response:', testResponse);
      } catch (testErr) {
        console.error('Test request failed:', testErr);
        // Continue quand même avec la vraie requête
      }
      
      // Build the fitness data request
      const response = await window.gapi.client.request({
        path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        method: 'POST',
        body: {
          aggregateBy: [{
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }],
          bucketByTime: { durationMillis: 86400000 }, // 1 day in milliseconds
          startTimeMillis: startTimeMillis,
          endTimeMillis: endTimeMillis
        }
      });
      
      console.log('Google Fit API response:', response);
      
      // Process the step count data
      let totalSteps = 0;
      if (response.result.bucket && response.result.bucket.length > 0) {
        console.log('Number of buckets:', response.result.bucket.length);
        
        response.result.bucket.forEach((bucket, index) => {
          console.log(`Bucket ${index} - Start: ${new Date(bucket.startTimeMillis)}, End: ${new Date(bucket.endTimeMillis)}`);
          
          if (bucket.dataset && bucket.dataset.length > 0) {
            console.log(`Bucket ${index} has ${bucket.dataset[0].point.length} data points`);
            
            bucket.dataset[0].point.forEach(point => {
              if (point.value && point.value.length > 0) {
                const steps = point.value[0].intVal || 0;
                console.log(`Found ${steps} steps for time: ${new Date(point.startTimeNanos / 1000000)}`);
                totalSteps += steps;
              }
            });
          } else {
            console.log(`Bucket ${index} has no datasets or points`);
          }
        });
      } else {
        console.log('No step data found in the response');
      }
      
      console.log('Total steps calculated:', totalSteps);
      
      setStepCount(totalSteps);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Detailed error:', err);
      
      // Message d'erreur plus convivial
      if (err.result && err.result.error) {
        setError(`Google Fit error: ${err.result.error.message}`);
      } else if (err.message) {
        setError(`Error fetching step count: ${err.message}`);
      } else {
        setError('Unable to fetch step data. Please try again later.');
      }
      
      // Si l'erreur est liée à l'authentification, essayez de vous reconnecter
      if (err.status === 401 || (err.result && err.result.error && err.result.error.code === 401)) {
        console.log('Authentication error, attempting to refresh...');
        try {
          await window.gapi.auth2.getAuthInstance().signIn();
          // Si la reconnexion réussit, réessayez de récupérer les données
          fetchStepCount();
          return;
        } catch (authErr) {
          console.error('Re-authentication failed:', authErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const simulateStepData = () => {
    setLoading(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      // Générer un nombre aléatoire de pas entre 5000 et 12000
      const simulatedSteps = Math.floor(Math.random() * 7000) + 5000;
      console.log('Simulating step data:', simulatedSteps);
      
      setStepCount(simulatedSteps);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  // Format step count with commas for thousands
  const formatStepCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="step-counter bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Step Count {isSimulated && <span className="text-sm text-gray-500">(Simulated)</span>}</h2>
      
      {loading && <p className="text-gray-500">Loading step data...</p>}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && stepCount !== null && (
        <div>
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span className="text-3xl font-bold">{formatStepCount(stepCount)}</span>
          </div>
          <p className="text-gray-500 text-sm">Total steps in the last 7 days</p>
          {lastUpdated && (
            <p className="text-gray-400 text-xs mt-2">
              Last updated: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </p>
          )}
          <div className="mt-4 flex">
            {!isSimulated ? (
              <button 
                onClick={fetchStepCount}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
              >
                Refresh
              </button>
            ) : (
              <button 
                onClick={simulateStepData}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
              >
                Generate New Data
              </button>
            )}
            
            {!isSimulated && (
              <button 
                onClick={simulateStepData}
                className="ml-2 bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded"
              >
                Simulate Data
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCounter;