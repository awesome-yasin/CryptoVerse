if (ethereum) { ethereum.autoRefreshOnNetworkChange = false; }; //avoids MetaMask errors in console.
let coinID = location.search.slice(1);
let BASE_URL = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT = 
`/coins/${coinID}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`;
let MARKET_DATA_ENDPOINT = `/global`;
let coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;

$(document).ready( () => {
  document.body.classList.toggle("dark-mode");
  getApiData();
  refreshMarketTableBody();
});

function generateListElements(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinList').html(""); //clears list
  $('#coinList').append(
    $('<li class="list-group-item"></li>').text("Name: " + data.name),
    $('<li class="list-group-item"></li>').html(
      `<coingecko-coin-price-chart-widget  coin-id="${data.name}" currency="usd" height="300" locale="en" background-color="#ffffff"></coingecko-coin-price-chart-widget>`),
    $('<li class="list-group-item"></li>').html(
      `<coingecko-coin-market-ticker-list-widget  coin-id="${data.name}" currency="inr" height="300" locale="en" background-color="#ffffff"></coingecko-coin-market-ticker-list-widget>`),
    $('<li class="list-group-item"></li>').text("Blocktime: " + 
      data.block_time_in_minutes + " minutes"),
    $('<li class="list-group-item"></li>').text("Algorithm: " + 
      data.hashing_algorithm),
    $('<li class="list-group-item"></li>').html("Description: " + 
      data.description.en),
    $('<li class="list-group-item"></li>').html("Homepage: " + 
      data.links.homepage[0].link(data.links.homepage[0])),
    $('<li class="list-group-item"></li>').text("Genesis: " + data.genesis_date),
    $('<li class="list-group-item"></li>').text("All Time High: " + "$" + 
      number.format(data.market_data.ath.usd)),
    $('<li class="text-danger list-group-item"></li>').text("From ATH: " + 
      Number(data.market_data.ath_change_percentage.usd).toFixed(2) + "%"),
  );
};

function getApiData() {
  fetch(coinUrl)
    .then(res => {
      res.json().then(res => {
        generateListElements(res);
      })
    })
    .catch(err => {
      console.log(err);
    });
};

function generateMarketTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinSpan').text(data.data.active_cryptocurrencies);
  $('#exchangesSpan').text(data.data.markets);
  $('#totalMarketCapSpan').text("$" + number.format(data.data.total_market_cap.usd.toFixed(0)));
  $('#totalMarketCapSpanPercent').addClass(`${data.market_cap_change_percentage_24h_usd >= 0 ?
     "text-success" : "text-danger"}`);
  $('#totalMarketCapSpanPercent').text(" " + (data.data.market_cap_change_percentage_24h_usd).toFixed(2) + "%");
  $('#_24hVolSpan').text("$" + number.format(data.data.total_volume.usd.toFixed(0)));
  $('#btcSpan').text("BTC " + Number(data.data.market_cap_percentage.btc).toFixed(1) +"%");
  $('#ethSpan').text(" | ETH " + Number(data.data.market_cap_percentage.eth).toFixed(1) +"%");
};

function getMarketData() {
  return fetch(marketUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshMarketTableBody() {
  generateMarketTableBody(await getMarketData());
};

