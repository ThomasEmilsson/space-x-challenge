import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import React, { useContext } from "react";
import { Context } from "../utils/use-favorites";
import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";

export const FavoritesDrawer = () => {
  const { favorites } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  let launches = favorites.filter((favorite) => favorite.type === "launch");
  let launchPads = favorites.filter(
    (favorite) => favorite.type === "launchPad"
  );

  return (
    <>
      <Button ref={btnRef} variantColor="blue" onClick={onOpen}>
        Favorites
      </Button>

      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        scrollBehavior="overflow"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="2rem">Favorites</DrawerHeader>
          <DrawerBody overflow="auto">
            {launches.length !== 0 && (
              <>
                <Text fontSize="1.25rem" as="i">
                  Launches
                </Text>
                {launches.map((item) => {
                  return (
                    <Box
                      marginBottom="2"
                      borderWidth="1px"
                      rounded="lg"
                      key={item.favorite.flight_number}
                    >
                      <LaunchItem
                        launch={item.favorite}
                        key={item.favorite.flight_number}
                        showFavorite
                      />
                    </Box>
                  );
                })}
              </>
            )}
            <Box padding={1} />
            {launchPads.length !== 0 && (
              <>
                <Text fontSize="1.25rem" as="i">
                  Launch Pads
                </Text>
                {launchPads.map((item) => {
                  return (
                    <Box
                      marginBottom="2"
                      borderWidth="1px"
                      key={item.favorite.site_id}
                      rounded="lg"
                    >
                      <LaunchPadItem
                        launchPad={item.favorite}
                        key={item.favorite.site_id}
                        showFavorite
                      />
                    </Box>
                  );
                })}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
