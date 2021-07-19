import { useState, useEffect } from "react";

export default function useFetch(requestUrl) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // ! Token must be retrieved from a global user state at the top level 
  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!requestUrl) throw Error(`Yo dude this url <${requestUrl}> is invalid`);

    const asyncFetch = async () => {
      setLoading(true)

      const res = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ access_token }`
        }
      })

      const data = await res.json();
      if (data) setData(data)
      return data
    }

    asyncFetch()
      .catch(error => {
        console.error('Error fetching', error);
        setError(error);
      })
      .finally(() => setLoading(false));

  }, [access_token, requestUrl]);

  return {
    data,
    error,
    isLoading
  };
};
