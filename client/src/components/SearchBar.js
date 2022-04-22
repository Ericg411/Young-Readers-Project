import React from "react";

const SearchBar = ( ) => {
    return (
      <div className="search-bar">
        <form onSubmit={props.SearchBook} action="">
          <input onChange={props.handleSearch} type="text" />
          <button type="submit"> Search </button>
          <select defaultValue="sort" onChange={props.handleSort}>
            <option disabled value="newest">
              {" "}
              Newest{" "}
            </option>
            <option value="oldest"> Oldest </option>
          </select>
        </form>
      </div>
    );
  }


export default SearchBar;
