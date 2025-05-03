// app/utils/googleApi.js
let gapiPromise = null;

export const loadGoogleApi = () => {
  if (gapiPromise) return gapiPromise;

  gapiPromise = new Promise((resolve, reject) => {
    // Vérifier si déjà chargé
    if (window.gapi) {
      resolve(window.gapi);
      return;
    }
    
    // Créer le script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Script chargé, maintenant charger le client et auth2
      window.gapi.load('client:auth2', () => {
        resolve(window.gapi);
      });
    };
    
    script.onerror = (error) => {
      reject(new Error('Failed to load Google API script'));
    };
    
    document.body.appendChild(script);
  });
  
  return gapiPromise;
};

export const initGoogleAuthClient = async (clientId, scopes) => {
  try {
    const gapi = await loadGoogleApi();
    
    await gapi.client.init({
      clientId: clientId,
      scope: scopes.join(' '),
      cookie_policy: 'single_host_origin',
      ux_mode: 'popup'
    });
    
    return gapi;
  } catch (error) {
    console.error('Failed to initialize Google Auth client:', error);
    throw error;
  }
};

export const isSignedIn = () => {
  if (!window.gapi || !window.gapi.auth2) return false;
  
  try {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    return false;
  }
};

export const signIn = async () => {
  if (!window.gapi || !window.gapi.auth2) {
    throw new Error('Google Auth API not initialized');
  }
  
  try {
    const authInstance = window.gapi.auth2.getAuthInstance();
    const result = await authInstance.signIn({
      prompt: 'consent'
    });
    return result;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  if (!window.gapi || !window.gapi.auth2) return;
  
  try {
    await window.gapi.auth2.getAuthInstance().signOut();
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};