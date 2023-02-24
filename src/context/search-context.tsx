import * as React from "react";
import { useContext } from "react";

interface SearchResultsType {
  searchResults: SearchResultsContext[];
}

interface SearchResultsContext {
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  media_type: string;
  nasa_id: string;
  title: string;
}

interface CurrentUserContextType {
  searchResults: SearchResultsContext;
}

const SearchContext = React.createContext<CurrentUserContextType | null>({
  searchResults: {
    center: "",
    date_created: "",
    description:
      'AS11-40-5874 (20 July 1969) --- Astronaut Edwin E. Aldrin Jr., lunar module pilot of the first lunar landing mission, poses for a photograph beside the deployed United States flag during Apollo 11 extravehicular activity (EVA) on the lunar surface. The Lunar Module (LM) is on the left, and the footprints of the astronauts are clearly visible in the soil of the moon. Astronaut Neil A. Armstrong, commander, took this picture with a 70mm Hasselblad lunar surface camera. While astronauts Armstrong and Aldrin descended in the LM the "Eagle" to explore the Sea of Tranquility region of the moon, astronaut Michael Collins, command module pilot, remained with the Command and Service Modules (CSM) "Columbia" in lunar orbit.',
    keywords: [
      "APOLLO 11 FLIGHT",
      "MOON",
      "LUNAR SURFACE",
      "LUNAR BASES",
      "LUNAR MODULE",
      "ASTRONAUTS",
      "EXTRAVEHICULAR ACIVITY",
    ],
    media_type: "image",
    nasa_id: "as11-40-5874",
    title: "Apollo 11 Mission image - Astronaut Edwin Aldrin poses beside th",
  },
});

SearchContext.displayName = "SearchContext";

const SearchProvider = ({
  searchResults,
  ...props
}: CurrentUserContextType): JSX.Element => {
  return <SearchContext.Provider value={{ searchResults }} {...props} />;
};

function useSearch() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearch };
