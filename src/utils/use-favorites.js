import React, { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "./storage";

const Context = React.createContext();

const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesData = getFromLocalStorage("favorites");
    if (favoritesData) setFavorites(favoritesData);
  }, []);

  useEffect(() => {
    saveToLocalStorage("favorites", favorites);
  }, [favorites]);

  const addFavorite = (favorite, type) => {
    setFavorites((prevItems) => {
      return [...prevItems, { favorite, type }];
    });
  };

  const deleteFavorite = (id, type) => {
    setFavorites((prevItems) =>
      prevItems.filter((item) => {
        return item.favorite[type] !== id;
      })
    );
  };

  return (
    <Context.Provider
      value={{
        favorites,
        addFavorite,
        deleteFavorite,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { FavoriteContextProvider, Context };
