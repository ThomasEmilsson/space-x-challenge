import React from "react";
import { useParams } from "react-router-dom";
import { format as timeAgo } from "timeago.js";

import {
  Flex,
  Box,
  Spinner,
  SimpleGrid,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  AspectRatioBox,
} from "@chakra-ui/core";
import { FaRuler, FaSatellite } from "react-icons/fa";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Breadcrumbs from "./breadcrumbs";
import offices from "../utils/pleo-offices.js";
import Error from "./error";
import { handleStarlinksData } from "../utils/starlink-helper";

export default function Office() {
  const { office } = useParams();

  const officeData = offices.find(
    (item) => office === item.country.replace(/\s+/g, "-").toLowerCase()
  );

  const { data, error } = useSpaceXPaginated("/starlink", {}, "v4");

  console.log(data);

  if (error) return <Error />;
  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Offices", to: ".." },
          { label: `${officeData.country}` },
        ]}
      />
      <Header office={officeData} />
      <Box m={[3, 6]}>
        {data && <StarlinkItem props={handleStarlinksData(data, officeData)} />}
        <Map
          office={officeData}
          starlink={handleStarlinksData(data, officeData)[0]}
        />
      </Box>
    </div>
  );
}

const StarlinkItem = (props) => {
  const starlink = props.props[0];
  const distance = props.props[1];

  console.log(starlink);
  console.log(distance);

  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel alignItems="center" display="flex">
          <Box as={FaSatellite} width="1em" />{" "}
          <Box ml="2" as="span">
            Name
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          {starlink.spaceTrack.OBJECT_NAME}
        </StatNumber>
        <StatHelpText>
          Launched {timeAgo(starlink.spaceTrack.LAUNCH_DATE)}
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel alignItems="center" display="flex">
          <Box as={FaRuler} width="1em" />{" "}
          <Box ml="2" as="span">
            Distance Away
          </Box>
        </StatLabel>
        <StatNumber alignItems="center" fontSize={["md", "xl"]}>
          {Math.round(distance)} kilometers
        </StatNumber>
        <StatHelpText>
          + {Math.round(starlink.height_km)} km into space
        </StatHelpText>
      </Stat>
    </SimpleGrid>
  );
};

function Header({ office }) {
  return (
    <Flex
      bgImage={`url(${office.image})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
    ></Flex>
  );
}

function Map({ office, starlink }) {
  return (
    <AspectRatioBox ratio={16 / 5}>
      <Box
        as="iframe"
        src={`https://maps.google.com?saddr=${office.latitude},${office.longitude}&daddr=${starlink.latitude},${starlink.longitude}&t=k&output=embed`}
        alt="demo"
      />
    </AspectRatioBox>
  );
}
