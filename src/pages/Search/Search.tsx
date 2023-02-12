import React from "react";

const Search = () => {
  return (
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
  );
};

export default Search;
