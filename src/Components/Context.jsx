import React, { useContext, useEffect, useState } from "react";

//My API Movie Key-http://www.omdbapi.com/?apikey=96e6f622&s= movieName
export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// We need to createProvider Function:
export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("Batman");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          message: "",
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Use TimeOut limit Response , that we get Search Response in 1 ms. ( We also called it "Debounce function()" ):
    let TimerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 100);

    return () => clearTimeout(TimerOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
