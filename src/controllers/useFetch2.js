import { useState, useEffect } from 'react';

const useFetch2 = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      let authTokens = localStorage.getItem("authTokens")
      authTokens = JSON.parse(authTokens)
      fetch(url, {
        method:'GET',
        headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authTokens.access}`  
            }  
        // ,signal: abortCont.signal,
     })
      .then(response => {
        if (!response.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return response.json();
      })
      .then(data => {
          
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch2;