import React from 'react';
import useSWR from 'swr';
import {
  Box,
  Link,
  Flex,
  Text,
  SimpleGrid,
  Image,
  useColorMode
} from '@chakra-ui/core';

import fetcher from '../lib/fetcher';

const Artist = (artist) => {
  const { colorMode } = useColorMode();

  return (
    <Link
      href={artist.url}
      isExternal
      transition="transform 0.15s ease"
      _hover={{
        transform: 'scale(1.02)'
      }}
    >
      <Box
        w="110px"
        h="110px"
        backgroundImage={`linear-gradient(to bottom, rgba(145, 145, 145, 0.52), rgba(0, 0, 0, 0.7)),
        url('${artist.image}')`}
        backgroundSize="cover"
        borderRadius={16}
      >
        <Flex
          align="flex-end"
          h="full"
          padding={2}
          color="white"
          fontWeight="bold"
          lineHeight="1.25"
          letterSpacing="-0.02rem"
        >
          {artist.name}
        </Flex>
      </Box>
    </Link>
  );
};

const TopArtists = () => {
  const { data } = useSWR('/api/top-artists', fetcher);

  if (!data) {
    return null;
  }

  return (
    <SimpleGrid columns={[2, null, 5]} spacing={4} mb={16}>
      {data.artists.map((artist, index) => (
        <Artist ranking={index + 1} key={artist.name} {...artist} />
      ))}
    </SimpleGrid>
  );
};

export default TopArtists;
