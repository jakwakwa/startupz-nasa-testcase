import { useState } from "react";
// import reactLogo from './assets/react.svg'
import "./App.css";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <div></div>
      <h1>NASA MEDIA LIBRARY </h1>
      <h2>Search for images on NASA's images API</h2>
      <div className="card">
        <div className="card card-col--flexRow">
          <div className="card card-col card-col--flexCol card-firstItem">
            <label>Image</label>
            <input type="text" placeholder="Search for images" />
          </div>
          <div className="card card-col card-col--flexCol card-otherItems">
            <label>Start Date</label>
            <input className="dateStart" type="date" />
          </div>
          <div className="card card-col card-col--flexCol card-otherItems">
            <label>End Date</label>
            <input className="dateEnd" type="date" />
          </div>
          <div className="card card-col card-col--flexCol card-lastItems">
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
