import { useState, useEffect } from 'react';
import { useSession } from '@clerk/clerk-react'; // Clerk User Session

export const usefetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined); // Holds the fetched data
  const { session, isLoaded } = useSession(); // session-Contains the user session, isLoaded- Session data has finished loa
  const [isReady, setIsReady] = useState(false); // Session is loaded and available

  // Fetching data when session and isLoaded changes or true
  useEffect(() => {
    if (isLoaded && session) {
      setIsReady(true);
    } else {
      setIsReady(false); // Set to false if session or isLoaded is not there
    }
  }, [isLoaded, session]);

  // Updates the data if new response comes
  const fn = async (...args) => {
      try {
        const supabaseToken = await session.getToken(); // Retrieves the authentication token
        const res = await cb(supabaseToken, options, ...args); // Calls callback function  
        console.log("Data from usefetch:", res); 
        setData((prevData) => (JSON.stringify(prevData) !== JSON.stringify(res) ? res : prevData)); // Prevent unnecessary state updates
      // Handles error
      } catch (e) {
        console.error("Error fetching data:", e);
      }
  };

  return { data, fn, isReady }; // Return fetched data when session is ready
};

export default usefetch;