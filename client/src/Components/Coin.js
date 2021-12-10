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
  const priceChange =coin.price_change_percentage_24h;

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
        <div className="coin font-weight-bold">
          
          <img
            src={coin.image}
            alt=""
            style={{ height: "30px", width: "30px" }}
          />
          <p className = "nothing">{coin.name}</p>
         
          <div className ="">
          <span className = "price font-weight-bold">Current Price</span>
          <p title="Hooray!"> 
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(coin.current_price)}
          </p>
          </div>
          {/* Current value of coins */}
          {(coin.cost !== undefined) | (coin.amount !== undefined) ? (
            <div className="total-value">
               <span className = "price">Total Value</span>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(totalValue)}
              </p>
              <span className = "price">No of Coin</span>
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
              <span className = "price">Profit / Loss</span>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(profitOrLoss)}
              </p>
              <span className = "price">Profit / Loss Percent</span> 
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