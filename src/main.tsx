import React from "react";
import { Box, Center, ChakraProvider, Container } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ShowPage from "./pages/ShowPage/ShowPage";

import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
// import "@fontsource/aero03/400.css";
// import "@fontsource/aero03/500.css";
// import "@fontsource/aero03/700.css";

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

import imgUrl from "./assets/images/nasa2.jpg";
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
    heading: `'Aero_03', sans-serif`,
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        backgroundSize: "cover",
        background: `linear-gradient(100deg, #6200ff, rgba(255, 0, 149, 0.137)), url(${imgUrl})`,
        color: "white",
      },
      p: {
        lineHeight: "1.5rem",
      },
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/show/:showId",
    element: <ShowPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
