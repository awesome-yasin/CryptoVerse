import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {
  const [apiCoins, setApiCoins] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    
    setApiCoins({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setApiCoins({
          loading: false,
          data: res.data,
          error: false,
        });
      })
      .catch(() => {
        setApiCoins({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, []);

  return apiCoins;
};

export default useAxios;
