import { useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";
import Search from "./pages/Search/Search";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <div></div>
      <h1>NASA MEDIA LIBRARY </h1>
      <h2>Search for images on NASA's images' API</h2>
      <Search />
    </div>
  );
}

export default App;
