import { useState } from "react";
import SearchCoin from "./SearchCoin";
import Loader from "./Loader";

const SearchBar = ({ apiCoins, toggle, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");

  let content;

  if (apiCoins.data) {
    content = (
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search coin"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="search-list">
          {apiCoins.data
            .filter((value) => {
              if (searchTerm === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              } else {
                return null;
              }
            })
            .map((coin) => (
              <SearchCoin
                onAdd={onAdd}
                searchCoin={coin}
                key={apiCoins.data.indexOf(coin)}
                toggle={toggle}
              />
            ))}
        </div>
      </div>
    );
  }

  if (apiCoins.loading) {
    content = <Loader />;
  }

  if (apiCoins.error) {
    content = <p>There was an error fetching the API. Try again later.</p>;
  }

  return content;
};

export default SearchBar;
