if (ethereum) { ethereum.autoRefreshOnNetworkChange = false; }; //avoids MetaMask errors in console.
let exchangesPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
let MARKET_DATA_ENDPOINT = `/global`;
let BTC_ENDPOINT = `/simple/price?ids=bitcoin&vs_currencies=USD`;
let exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
let btcUrl = BASE_URL + BTC_ENDPOINT;
let price;
let sortOrder = { column: 'trust_score_rank', order: 'ASC' };

$(document).ready( () => {
  document.body.classList.toggle("dark-mode");
  fadePrev();
  refreshTableBody();
  refreshMarketTableBody();
});

function generateTableBody(data, price) {
  let number = Intl.NumberFormat("en-US");
  $('#exchangeTableBody').html(""); //clears body of table
  for (let key in data) {
    $('#exchangeTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].trust_score_rank),
        $('<td class="text-left"></td>').append(
          $('<div></div>').append(`<img src="${data[key].image}" width="25"> 
          <a href="${data[key].url}" target="_blank">${data[key].name}</a>`)),
        $('<td class="text-right"></td>').text("$" + 
          number.format((data[key].trade_volume_24h_btc*price).toFixed(2))),
        $('<td class="text-right"></td>').text(data[key].year_established),
        $('<td class="text-right"></td>').text(data[key].country)
      )
    );
  };
};

function getApiData() {
  return fetch(exchangeUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

function getBitcoinPrice() {
  return fetch(btcUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshTableBody() {
  var btc = await getBitcoinPrice();
  price = btc.bitcoin.usd;
  generateTableBody(await getApiData(), price);
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

// Pagination
$("#nAnchor").click(() => {
  currentPage++;
  EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
  exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

$("#pAnchor").click(() => {
  currentPage--;
  EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
  exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
  refreshTableBody();
  fadePrev();
});

function fadePrev() {
  $("#pageNumber").text("Page: " + currentPage);
  if (currentPage == 1) {
    $("#pAnchor").hide();
  } else {
    $("#pAnchor").show();
  }
};

/* Sorting

   Table headers can be accessed through the class 'sortable' to connect a click event handler
   Each column has a unique name by which it can be identified. 
   The data comes presorted by Market Cap in descending order as defined in URL endpoint.*/

$('a.sortable').click(() => {
  sortExchangeList($('this').prevObject[0].activeElement.name, 
  getSortOrder($('this').prevObject[0].activeElement.name));
});

function getSortOrder(columnName) {
  if (sortOrder.column == columnName) {
    if (sortOrder.order == 'DESC') {
      return 'ASC';
    }
    return 'DESC';
  }
  return 'ASC';
};

async function sortExchangeList(headerName, order) {
  generateTableBody(sortData(await getApiData(), headerName, order), price);
};

function updateSortOrder(headerName, order) {
  sortOrder.column = headerName;
  sortOrder.order = order;
};

function sortData(data, headerName, order) {
  if (order == 'ASC') {
    sortAscending(data, headerName);
  } else {
    sortDescending(data, headerName);
  };
  updateSortOrder(headerName, order);
  return data;
};

function sortAscending(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return 1;
    } else if (a[headerName] < b[headerName]) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
};

function sortDescending(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return -1;
    } else if (a[headerName] < b[headerName]) {
      return 1;
    } else {
      return 0;
    }
  });
  return data;
};