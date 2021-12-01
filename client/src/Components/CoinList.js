import Coin from "./Coin";

const CoinList = ({ coins, onDelete, updateCoin }) => {
  return (
    <div className="coin-list">
      {coins.map((coin) => {
        return (
          <Coin
            updateCoin={updateCoin}
            coin={coin}
            key={coin.id}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default CoinList;
