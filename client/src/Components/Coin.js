import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import AddTxBtn from "./AddTxBtn";
import AddForm from "./AddForm";

const Coin = ({ coin, onDelete, updateCoin }) => {
  const [showForm, setShowForm] = useState(false);

  // Accounting
  let totalValue = coin.current_price * coin.amount;
  let totalCost = coin.cost * coin.amount;
  let profitOrLoss = totalValue - totalCost;
  let ROI = (100 * profitOrLoss) / totalCost;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div
        className="coin-container"
        onClick={() => {
          // Opens up AddForm again to edit coin amount and cost if needed.
          if ((coin.cost !== undefined) | (coin.amount !== undefined)) {
            toggleForm();
          }
        }}
      >
        <div className="coin">
          <img
            src={coin.image}
            alt=""
            style={{ height: "30px", width: "30px" }}
          />
          <p>{coin.symbol.toUpperCase()}</p>
          <p>
            {new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.current_price)}
          </p>

          {/* Current value of coins */}
          {(coin.cost !== undefined) | (coin.amount !== undefined) ? (
            <div className="total-value">
              <p>
                {new Intl.NumberFormat("us-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalValue)}
              </p>
              <p>{new Intl.NumberFormat().format(coin.amount)}</p>
            </div>
          ) : (
            ""
          )}

          {/* Profit or Loss */}
          {(coin.cost !== undefined) | (coin.amount !== undefined) ? (
            <div
              className={
                profitOrLoss > 0
                  ? "profit"
                  : profitOrLoss < 0
                  ? "loss"
                  : profitOrLoss === 0 && "even"
              }
            >
              <p>
                {new Intl.NumberFormat("us-US", {
                  style: "currency",
                  currency: "USD",
                }).format(profitOrLoss)}
              </p>
              <p>{new Intl.NumberFormat().format(ROI)}%</p>
            </div>
          ) : (
            ""
          )}

          {/* Add coins button */}
          {(coin.cost === undefined) & (coin.amount === undefined) ? (
            <AddTxBtn setShowForm={setShowForm} showForm={showForm} />
          ) : (
            ""
          )}

          <BsFillTrashFill
            className="trash-btn"
            onClick={() => {
              onDelete(coin.id);
            }}
          />
        </div>
      </div>
      {showForm && (
        <AddForm updateCoin={updateCoin} coin={coin} toggleForm={toggleForm} />
      )}
    </>
  );
};

export default Coin;
