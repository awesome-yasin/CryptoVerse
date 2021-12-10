import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { useTransition, animated } from "react-spring";

const AddForm = ({ toggleForm, coin, updateCoin }) => {
  // Set the cost of each coin and the amount bought of said coin.
  const [cost, setCost] = useState(coin.current_price);
  const [amount, setAmount] = useState("");

  const transition = useTransition(toggleForm, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Check max length on inputs
  const maxLengthCheck = (input) => {
    if (input.target.value.length > input.target.maxLength) {
      input.target.value = input.target.value.slice(0, input.target.maxLength);
    }
  };

  const displayWorth = (e) => {
    e.preventDefault();

    if (!cost | !amount) {
      alert("You forgot to input something!");
    } else {
      toggleForm();

      // Adds cost and amount to coin.
      updateCoin({ coin, cost, amount });

      // Input values back to default
      setCost(coin.current_price);
      setAmount("");
    }
  };

  return transition(
    (style, item) =>
      item && (
        <>
          <div className="form-mask" onClick={toggleForm}></div>
          <animated.form
            style={style}
            onSubmit={displayWorth}
            className="form-container containerzz"
          >
            <BsXCircleFill className="exit-form-btn" onClick={toggleForm} />
            <p style={{ fontWeight: "bold" }}>{coin.name}</p>
            <label>Cost per coin:</label>
            <input
              step="any"
              className="input-style"
              type="number"
              maxLength="10"
              value={cost}
              onInput={maxLengthCheck}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
            <label>Amount bought:</label>
            <input
              className="input-style"
              type="number"
              maxLength="10"
              value={amount}
              step="any"
              onInput={maxLengthCheck}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <input type="submit" value="Add coin" className="submit-btn" />
          </animated.form>
        </>
      )
  );
};

export default AddForm;
