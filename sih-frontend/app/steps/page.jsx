// app/steps/page.jsx
'use client';

import { useState, useEffect } from 'react';
import GoogleFitAuth from '../components/GoogleFitAuth';
import StepCounter from '../components/StepCounter';

export default function StepsPage() {
  const [user, setUser] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);

  // Suppression du code d'initialisation de l'API qui dépend de googleApi.js
  // puisque nous n'avons pas encore créé ce fichier utilitaire

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
    setIsSimulated(false);
  };

  const handleSimulate = () => {
    setUser({ simulated: true });
    setIsSimulated(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Step Tracking</h1>
      
      <div className="mb-8">
        <GoogleFitAuth 
          onAuthenticated={handleAuthenticated} 
          onSimulate={handleSimulate}
        />
      </div>
      
      {user ? (
        <StepCounter user={user} isSimulated={isSimulated} />
      ) : (
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            Connect to Google Fit to view your step count data, or use simulated data for testing
          </p>
        </div>
      )}
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About Step Tracking</h2>
        <p className="mb-4">
          This feature allows you to track your daily steps using data from Google Fit. Connect your Google account to see your step count for the last 7 days.
        </p>
        <p>
          Your data is only used for display purposes and is not stored on our servers.
        </p>
        {isSimulated && (
          <div className="mt-4 bg-yellow-100 p-3 rounded">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> You are currently viewing simulated data for testing purposes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}