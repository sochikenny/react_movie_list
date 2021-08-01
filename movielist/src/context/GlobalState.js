import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

//create context
export const GlobalContext = createContext(initialState);

//Provider Components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //using local storage with useEffect hook
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  //actions --> adding movie to watchlist
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  //actions --> removing movie from watchlist
  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id })
  }

  //actions --> add movie to "watched" category
  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie })
  }

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist, //state
        watched: state.watched,     //state
        addMovieToWatchlist,        //action (influences state)
        removeMovieFromWatchlist,    //action
        addMovieToWatched            //action
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
