import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import ShowPage from "./pages/ShowPage/ShowPage";
import "@fontsource/montserrat/900.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";
import bgImgURL from "./assets/images/page-bg.jpg";

const theme = extendTheme({
  fonts: {
    body: `'Montserrat', sans-serif`,
    heading: `'Montserrat', sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundSize: "cover",
        background: `linear-gradient(100deg, #6200ff, rgba(255, 0, 149, 0.137)), url(${bgImgURL})`,
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
