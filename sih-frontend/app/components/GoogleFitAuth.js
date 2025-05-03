// app/components/GoogleFitAuth.js
import { useState, useEffect } from 'react';

const GoogleFitAuth = ({ onAuthenticated, onSimulate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Google Fit API configuration
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_FIT_CLIENT_ID;
  const SCOPES = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.location.read'
  ];

  useEffect(() => {
    // Cette fonction charge l'API Google
    const loadGoogleApi = () => {
      setIsLoading(true);
      
      // Si le script est déjà chargé
      if (window.gapi) {
        window.gapi.load('client:auth2', initClient);
        return;
      }
      
      // Crée un élément script pour charger l'API Google
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        window.gapi.load('client:auth2', initClient);
      };
      
      script.onerror = () => {
        setError('Failed to load Google API client');
        setIsLoading(false);
      };
      
      document.body.appendChild(script);
    };

    // Cette fonction initialise le client Google
    const initClient = () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES.join(' '),
        // Utiliser la méthode de la page entière au lieu d'une popup
        ux_mode: 'redirect',
        // Utiliser exactement l'URI de redirection configurée dans Google Cloud Console
        redirect_uri: 'http://localhost:3000/steps',
        cookie_policy: 'single_host_origin'
      }).then(() => {
        // Vérifie si l'utilisateur est déjà connecté
        const authInstance = window.gapi.auth2.getAuthInstance();
        const isSignedIn = authInstance.isSignedIn.get();
        
        setIsAuthenticated(isSignedIn);
        
        if (isSignedIn && onAuthenticated) {
          onAuthenticated(authInstance.currentUser.get());
        }
        
        // Écoute les changements d'état de connexion
        authInstance.isSignedIn.listen(updateSigninStatus);
        
        setIsLoading(false);
      }).catch(error => {
        console.error('Error initializing Google API client:', error);
        setError(`Error initializing Google API: ${error.message}`);
        setIsLoading(false);
      });
    };

    // Cette fonction est appelée quand l'état de connexion change
    const updateSigninStatus = (isSignedIn) => {
      setIsAuthenticated(isSignedIn);
      
      if (isSignedIn && onAuthenticated) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        onAuthenticated(authInstance.currentUser.get());
      }
    };

    // Charge l'API Google au démarrage
    loadGoogleApi();
  }, [onAuthenticated, CLIENT_ID]);

  // Gère le clic sur le bouton de connexion
  const handleAuthClick = () => {
    setError(null);
    
    if (!window.gapi || !window.gapi.auth2) {
      setError('Google API client not loaded yet. Please try again in a moment.');
      return;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    
    // Si déjà connecté, met à jour l'état
    if (authInstance.isSignedIn.get()) {
      updateSigninStatus(true);
      return;
    }
    
    try {
      // Au lieu d'utiliser une popup, redirige l'utilisateur
      authInstance.signIn({
        ux_mode: 'redirect',
        // Utiliser exactement l'URI de redirection configurée dans Google Cloud Console
        redirect_uri: 'http://localhost:3000/steps'
      });
    } catch (err) {
      console.error('Authentication error:', err);
      setError(`Authentication failed: ${err.message || 'Unknown error'}`);
    }
  };

  // Gère le clic sur le bouton de déconnexion
  const handleSignoutClick = () => {
    if (window.gapi && window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut().then(() => {
        setIsAuthenticated(false);
      });
    }
  };

  // Gère le clic sur le bouton de simulation
  const handleSimulateClick = () => {
    if (onSimulate) {
      onSimulate();
    }
  };

  return (
    <div className="google-fit-auth">
      {error && <div className="error-message text-red-500 mb-2">{error}</div>}
      
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Loading Google API...</span>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        ) : !isAuthenticated ? (
          <button 
            onClick={handleAuthClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Connect to Google Fit
          </button>
        ) : (
          <div className="flex items-center">
            <span className="text-green-500 font-medium">Connected to Google Fit</span>
            <button 
              onClick={handleSignoutClick}
              className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        )}
        
        <button 
          onClick={handleSimulateClick}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
        >
          Use Simulated Data
        </button>
      </div>
    </div>
  );
};

export default GoogleFitAuth;