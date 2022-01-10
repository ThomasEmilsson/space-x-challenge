import { Box, IconButton } from "@chakra-ui/core";
import { Context } from "../utils/use-favorites";

import React, { useContext } from "react";

export const FavoriteButton = ({ id, type, data }) => {
  const { favorites, addFavorite, deleteFavorite } = useContext(Context);

  const determineTypeId = (type) => {
    switch (type) {
      case "launch":
        return "flight_number";
      case "launchPad":
        return "site_id";
      default:
        throw Error("no type defined");
    }
  };

  const typeId = determineTypeId(type);

  const isFavorite = favorites.find((item) => {
    return item.favorite[typeId] === id;
  });

  return (
    <Box
      d="flex"
      marginLeft="auto"
      padding="1rem"
      alignItems="center"
      color="gray.700"
    >
      {isFavorite ? (
        <IconButton
          variant="solid"
          aria-label="favorite"
          variantColor="blue"
          size="lg"
          icon="star"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteFavorite(id, typeId);
          }}
        />
      ) : (
        <IconButton
          variant="outline"
          aria-label="favorite"
          size="lg"
          variantColor="blue"
          icon="star"
          onClick={(e) => {
            e.preventDefault();
            addFavorite(data, type);
          }}
        />
      )}
    </Box>
  );
};
