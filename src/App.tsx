import { useState } from "react";
import "./App.css";
import imgUrl from "./assets/images/nasa.jpg";
import Search from "./pages/Search/Search";
import { Box, Container, Heading, Stack } from "@chakra-ui/react";

function App() {
  return (
    <Container
      w="100%"
      maxW={"1200px"}
      centerContent
      pl={["1rem", "3rem", "5rem", "4rem", "0rem"]}
      pr={["1rem", "3rem", "5rem", "4rem", "0rem"]}
      pt={["1rem", "2rem", "2.5rem", "5rem"]}
      pb={["1rem", "2rem", "2.5rem", "10rem"]}
    >
      <Stack
        w="100%"
        maxW={"1200px"}
        pt={["1rem", "2rem", "2.5rem", "5rem"]}
        pb={["1rem", "2rem", "2.5rem", "2rem"]}
      >
        <Heading>NASA MEDIA LIBRARY </Heading>
        <h2>Search for images on NASA's images' API</h2>

        <Search />
      </Stack>
    </Container>
  );
}

export default App;
