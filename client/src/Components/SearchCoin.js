const SearchCoin = ({ searchCoin, toggle, onAdd }) => {
  return (
    <div
      className="search-list-coin"
      onClick={() => {
        onAdd(searchCoin);
        toggle();
      }}
    >
      <img
        src={searchCoin.image}
        alt=""
        style={{ height: "30px", width: "30px" }}
      />
      <p>{searchCoin.name}</p>
      <p>{searchCoin.symbol.toUpperCase()}</p>
      <p>
        {new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(searchCoin.current_price)}
      </p>
    </div>
  );
};

export default SearchCoin;
