import { useState, useEffect } from "react";
import useAxios from "./Hooks/HttpRequest";
import { useTransition, animated } from "react-spring";
import Header from "./Components/Header";
import CoinList from "./Components/CoinList";
import ToggleBtn from "./Components/ToggleBtn";
import Search from "./Components/Search";

function App() {
  const [coins, setCoins] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);

  const transition = useTransition(toggleSearch, {
    from: { y: 800, opacity: 0 },
    enter: { y: 50, opacity: 1 },
    leave: { y: 800, opacity: 0 },
  });

  let apiCoins = useAxios();

  useEffect(() => {
    getLocalCoins();
  }, []);

  useEffect(() => {
    saveToLocal(coins);
  }, [coins]);

  // Local storage functions
  const saveToLocal = (e) => {
    localStorage.setItem("coins", JSON.stringify(e));
  };

  const getLocalCoins = () => {
    if (localStorage.getItem("coins") === null) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let localCoins = JSON.parse(localStorage.getItem("coins"));
      setCoins(localCoins);
    }
  };

  // Toggle search for coin.
  const toggle = () => {
    setToggleSearch(!toggleSearch);
  };

  // Add Coin
  const addCoin = (newCoin) => {
    // Check for duplicates before adding.
    if (coins.length > 0) {
      coins.find((coin) => coin.id === newCoin.id)
        ? alert("Coin already added!")
        : setCoins([...coins, newCoin]);
    } else {
      setCoins([...coins, newCoin]);
    }
  };

  // Delete coin
  const deleteCoin = (id) => {
    setCoins(coins.filter((coin) => coin.id !== id));
  };

  // Updates amount and cost of coin
  const updateCoin = (e) => {
    let coin = e.coin;
    let cost = e.cost;
    let amount = e.amount;
    let updatedCoin = { ...coin, cost, amount };
    // Delete the existing coin so we don't get duplicates.
    let filteredCoins = coins.filter((el) => el.id !== e.coin.id);

    setCoins([...filteredCoins, updatedCoin]);
  };

  // Updates coin price
  const updatePrice = () => {
    if (apiCoins.data) {
      if (JSON.parse(localStorage.getItem("coins")) !== null) {
        let savedCoinList = JSON.parse(localStorage.getItem("coins"));
        for (let i = 0; i < savedCoinList.length; i++) {
          for (let j = 0; j < apiCoins.data.length; j++) {
            if (apiCoins.data[j].id === savedCoinList[i].id) {
              savedCoinList[i].current_price = apiCoins.data[j].current_price;
            }
          }
        }
        saveToLocal(savedCoinList);
      }
    }
  };
  updatePrice();

  return (
    <div className="containerzz">
      
      {!toggleSearch && <Header coins={coins} />}

      {transition(
        (style, item) =>
          item && (
            <animated.div className="ani-div" style={style}>
              <Search apiCoins={apiCoins} onAdd={addCoin} toggle={toggle} />
            </animated.div>
          )
      )}

      {!toggleSearch && (
        <CoinList
          updateCoin={updateCoin}
          coins={coins}
          apiCoins={apiCoins}
          onDelete={deleteCoin}
        />
      )}
      <ToggleBtn toggle={toggle} toggleSearch={toggleSearch} />
    </div>
  );
}

export default App;
