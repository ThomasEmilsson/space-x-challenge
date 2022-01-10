import React from "react";

import Breadcrumbs from "./breadcrumbs";
import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/core";
import offices from "../utils/pleo-offices.js";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

export default function Offices() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Offices" }]} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {offices.map((office) => (
          <OfficeItem office={office} key={office.country} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export function OfficeItem({ office }) {
  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link
        to={{
          pathname: `/offices/${office.country
            .replace(/\s+/g, "-")
            .toLowerCase()}`,
        }}
      >
        <Image
          src={office.image}
          alt={`${office.image} country`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />
        <Flex>
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Box
                color="gray.500"
                letterSpacing="wide"
                fontSize="xs"
                mt="1"
                textTransform="uppercase"
              >
                {office.street} &bull; {office.street2}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {office.country}
            </Box>

            <Flex paddingTop={2} alignItems="center">
              <Text color="gray.500" fontSize="sm" marginRight={6}>
                Click to find the closest Starlink
              </Text>
              <Box color="gray.500" as={ArrowRight} />
            </Flex>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
}
