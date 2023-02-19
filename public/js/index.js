
let coinsPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT = `/coins/markets?vs_currency=${getSelectedCurrency()}&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;

let MARKET_DATA_ENDPOINT = `/global`;
let coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
let sortOrder = { column: 'market_cap', order: 'DESC' };
let globaldata = 'https://api.coingecko.com/api/v3/global';
let trendingurl = "https://api.coingecko.com/api/v3/search/trending";

$(document).ready( () => {
  $('body').on('mouseenter mouseleave','.nav-item',function(e){
    if ($(window).width() > 750) {
      var _d=$(e.target).closest('.nav-item');_d.addClass('show');
      setTimeout(function(){
      _d[_d.is(':hover')?'addClass':'removeClass']('show');
      },1);
    }
});	
  document.body.classList.toggle("dark-mode");
  refreshGolbalData()
  refreshMarketTableBody();
  refreshCoinTableBody();
  fadePrev();
  refreshTrendBody();
});

function generateGolbalData(data){
  let number = Intl.NumberFormat("en-IN");
  $('#global_data').text("The global cryptocurrency market cap today is" + " " + "₹" + Math.abs(data.data.total_market_cap.inr / 1.0e+12).toFixed(2) + " " + "Trillion." + " " + "In last 24 Hrs the market changed by");
  $('#global_change').addClass(`${data.data.market_cap_change_percentage_24h_usd >= 0 ?
     "text-success" : "text-danger"}`);
     $('#global_change').text( " " + (data.data.market_cap_change_percentage_24h_usd).toFixed(2) + "%");
     $('#trading_vol').text("Total cryptocurrency trading volume in the last day is at" + " " + "₹" + Math.abs(data.data.total_volume.inr / 1.0e+9).toFixed(2) + " " + "Billion.");
     $('#btc_dom').text("Bitcoin dominance is at" + " " + data.data.market_cap_percentage.btc.toFixed(2) + "%");
     $('#eth_dom').text(" "+ "and Ethereum dominance is at" + " " + data.data.market_cap_percentage.eth.toFixed(2) + "%");
     $('#bnb_dom').text(" "+ "While Binance Coin dominance is at" + " " + data.data.market_cap_percentage.bnb.toFixed(2) + "%." + " " + "Crypto Matrix is now tracking 650 cryptocurrencies. Popular trends of the industry right now are DeFi and Play to Earn.");
}


function generateMarketTableBody(data) {
  let number = Intl.NumberFormat("en-IN");
  $('#coinSpan').text(data.data.active_cryptocurrencies);
  $('#exchangesSpan').text(data.data.markets);
  $('#totalMarketCapSpan').text("₹" + number.format(data.data.total_market_cap.usd.toFixed(0)));
  $('#totalMarketCapSpanPercent').addClass(`${data.market_cap_change_percentage_24h_usd >= 0 ?
     "text-success" : "text-danger"}`);
  $('#totalMarketCapSpanPercent').text(" " + (data.data.market_cap_change_percentage_24h_usd).toFixed(2) + "%");
  $('#_24hVolSpan').text("₹" + number.format(data.data.total_volume.usd.toFixed(0)));
  $('#btcSpan').text("BTC " + Number(data.data.market_cap_percentage.btc).toFixed(1) +"%");
  $('#ethSpan').text(" | ETH " + Number(data.data.market_cap_percentage.eth).toFixed(1) +"%");
}

function generateCoinTableBody(data) {
  let number = new Intl.NumberFormat("en-IN");
  let currencySymbol = getCurrenySymbol();
  $('#coinTableBody').html(""); //clears body of table
  for (let key in data) {
     $('#coinTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center sticky-col first-col"></td>').text(data[key].market_cap_rank),
        $('<td id="specific" class="text-left sticky-col second-col"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="25"> <a href="/coin.html?${data[key].id}">
            ${data[key].name}</a>`)),
        $('<td class="text-right boldText"></td>').text(`${currencySymbol}${number.format(data[key].current_price.toFixed(6))}`),
        
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"} 
        text-right'></td>`).text(`${Number(data[key].price_change_percentage_24h).toFixed(2)}%`),
        $('<td class="text-right"></td>').text(`${currencySymbol}${number.format(data[key].total_volume)}`),
        $('<td class="text-right"></td>').text(`${number.format(data[key].circulating_supply.toFixed())}${data[key].symbol.toUpperCase()}`),
        $('<td class="text-right"></td>').text(`${currencySymbol}${number.format(data[key].market_cap)}`),
        $('<td class="text-right"></td>').text(`${currencySymbol}${number.format(data[key].ath.toFixed(2))}`),
        $('<td class="text-right"></td>').text(`${currencySymbol}${number.format(data[key].atl.toFixed(6))}`)
      )
    );
  };
}



function generateTrendBody(data){
  
  
    function btcData(itemId, priceElem, scoreElem, marketCapElem) {
      const selectedCurrency = getSelectedCurrency();
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency}`;
      return fetch(apiUrl)
        .then(res => res.json())
        .then(databtc => {
          const price = data.coins[itemId].item.price_btc * databtc.bitcoin[selectedCurrency.toLowerCase()];
          const score = data.coins[itemId].item.score;
          const marketRank = data.coins[itemId].item.market_cap_rank;
          const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: selectedCurrency }).format(price);
          const formattedScore = new Intl.NumberFormat('en-IN').format(score);
          const formattedMarketRank = new Intl.NumberFormat('en-IN').format(marketRank);
          const text = `The current price is ${formattedPrice}. With Current Score of ${formattedScore} and Market Rank of ${formattedMarketRank}`;
          $(priceElem).text(text);
        })
        .catch(err => console.error(err));
    }
  
    // Call btcData for each item on page load
    btcData(0, '#trend_price', '#trend_score', '#trend_market_cap_rank');
    btcData(1, '#trend_price_2', '#trend_score_2', '#trend_market_cap_rank_2');
    btcData(2, '#trend_price_3', '#trend_score_3', '#trend_market_cap_rank_3');
    btcData(3, '#trend_price_4', '#trend_score_4', '#trend_market_cap_rank_4');
    btcData(4, '#trend_price_5', '#trend_score_5', '#trend_market_cap_rank_5');
    btcData(5, '#trend_price_6', '#trend_score_6', '#trend_market_cap_rank_6');
  
    // Attach event listener to currency select element
    $('#currency-select').on('change', function() {
      // Call btcData again for each item whenever the selected currency changes
      btcData(0, '#trend_price', '#trend_score', '#trend_market_cap_rank');
      btcData(1, '#trend_price_2', '#trend_score_2', '#trend_market_cap_rank_2');
      btcData(2, '#trend_price_3', '#trend_score_3', '#trend_market_cap_rank_3');
      btcData(3, '#trend_price_4', '#trend_score_4', '#trend_market_cap_rank_4');
      btcData(4, '#trend_price_5', '#trend_score_5', '#trend_market_cap_rank_5');
      btcData(5, '#trend_price_6', '#trend_score_6', '#trend_market_cap_rank_6');
   
    })
       
  
    $('#trending').text(data.coins[0].item.name);
    $('#trend_img').append(`<img src="${data.coins[0].item.thumb}" width="25">`);
  
    $('#trending_2').text(data.coins[1].item.name);
    $('#trend_img_2').append(`<img src="${data.coins[1].item.thumb}" width="25">`);
  
    $('#trending_3').text(data.coins[2].item.name);
    $('#trend_img_3').append(`<img src="${data.coins[2].item.thumb}" width="25">`);
  
    $('#trending_4').text(data.coins[3].item.name);
    $('#trend_img_4').append(`<img src="${data.coins[3].item.thumb}" width="25">`);
  
    $('#trending_5').text(data.coins[4].item.name);
    $('#trend_img_5').append(`<img src="${data.coins[4].item.thumb}" width="25">`);

  
            var html = '<blockquote class="col-sm-9">';
html += '<h3 class="leada">What is cryptocurrency market cap?</h3>';
html += '<p style = "text-align : left; margin-bottom: 20px">Market cap is one of the most popular metrics in the industry that is used to gauge the value of an asset. The market cap of a cryptocurrency is calculated based on the coins total circulating supply multiplied by the current price. For detailed examples on how the market capitalization of a coin is calculated, please view our methodology page.</p>';
html += '<h3 class="leada">How can I use market cap?</h3>';
html += '<p style = "text-align : left; margin-bottom: 20px">As a financial metric, market cap allows you to compare the total circulating value of one cryptocurrency with another. Large cap cryptocurrencies such as Bitcoin and Ethereum have a market cap of over $10 billion. They typically consist of protocols that have demonstrated track record, and have a vibrant ecosystem of developers maintaining and enhancing the protocol, as well as building new projects on top of them. From a trading perspective, large caps would typically be hosted on more exchanges, have higher liquidity, and are less volatile when compared against other mid and small cap cryptocurrencies.</p>';
html += '<br>'
html+= 'While market cap is a simple and intuitive comparison metric, it is not a perfect point of comparison. Some cryptocurrency projects may appear to have inflated market cap through price swings and the tokenomics of their supply. As such, it is best to use this metric as a reference alongside other metrics such as trading volume, liquidity, fully diluted valuation, and fundamentals during your research process.'
html += '<h3 class="leada">What are candlesticks in crypto charts?</h3>';
html += '<p style = "text-align : left; margin-bottom: 20px">Candlestick charts give an overview to traders on the price movement based on previous trends. The body of the candlestick shows where the price of a coin opened and closed for the particular period of time which the candlestick represents. If the candle is green in a crypto chart, it represents positive changes in price while red candle represents negative changes in price. The shadow indicates the high price and low price for the period.</p>';

html += '</blockquote>'

$( "#test" ).append( html );
  
}

function getGlobalData() {
  return fetch(globaldata)
  .then(res => {
    return res.json()
  }).then(data => {
    return data;
  }).catch(err => {
    console.log(err)
  })
}

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
function getSelectedCurrency() {
  return $('#currencyDropdown').val();
}

function getCurrenySymbol() {
  const currency = getSelectedCurrency();
  switch (currency) {
    case "aed":
      return "د.إ"  ;
    case "ars":
      return "$"  ;
    case "aud":
      return "$"  ;
    case "bdt":
      return "৳"  ;
    case "bhd":
      return "ب.د"  ;
    case "bmd":
      return "$"  ;
    case "brl":
      return "R$"  ;
    case "cad":
      return "$"  ;
    case "chf":
      return "CHF"  ;
    case "clp":
      return "$"  ;
    case "czk":
      return "Kč"  ;
    case "dkk":
      return "kr"  ;
    case "gbp":
      return "£"  ;
    case "hkd":
      return "$"  ;
    case "huf":
      return "Ft"  ;
    case "ils":
      return "₪"  ;
    case "inr":
      return "₹";
    case "kwd":
      return "ك.د"  ;
    case "lkr":
      return "රු"  ;
    case "mmk":
      return "K"  ;
    case "mxn":
      return "$"  ;
    case "myr":
      return "RM"  ;
    case "ngn":
      return "₦"  ;
    case "nok":
      return "kr"  ;
    case "nzd":
      return "$"  ;
    case "php":
      return "₱"  ;
    case "pkr":
      return "₨"  ;
    case "pln":
      return "zł"  ;
    case "sar":
      return "ر.س"  ;
    case "sek":
      return "kr"  ;
    case "sgd":
      return "$"  ;
    case "thb":
      return "฿"  ;
    case "try":
      return "₺"  ;
    case "uah":
      return "₴"  ;
    case "vef":
      return "Bs.F."  ;
    case "vnd":
      return "₫"  ;
    case "zar":
      return "R"  ;
    case "xdr":
      return "SDR"  ;
      case "usd":
    return "$"  ;
  case "idr":
    return "Rp"  ;
  case "twd":
    return "NT$"  ;
  case "eur":
    return "€"  ;
  case "krw":
    return "₩"  ;
  case "jpy":
    return "¥"  ;
  case "rub":
    return "₽"  ;
  case "cny":
    return "¥"  ;
  
    // Add cases for other currencies as needed
    default:
      return '';
  }
}



function getTrendData() {
  return fetch(trendingurl)
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
        return data;
      }).catch(err => {
      console.log(err);
        });
};
function getCoinData() {
  COIN_DATA_ENDPOINT = `/coins/markets?vs_currency=${getSelectedCurrency()}&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
  return fetch(coinUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

function getSelectedCurrency() {
  return document.getElementById("currency-select").value;
}

async function refreshGolbalData() {
  generateGolbalData(await getGlobalData())
}

async function refreshMarketTableBody() {
  generateMarketTableBody(await getMarketData());
}

async function refreshCoinTableBody() {
  generateCoinTableBody(await getCoinData());
}

async function refreshTrendBody() {
  generateTrendBody(await getTrendData());
}

// Pagination

$("#nAnchor").click(async () => {
  currentPage++;
  COIN_DATA_ENDPOINT = 
  `/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
  await refreshCoinTableBody();
  fadePrev();
});

$("#pAnchor").click(async () => {
  currentPage--;
  COIN_DATA_ENDPOINT = 
  `/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
  await refreshCoinTableBody();
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
  sortCoinList($('this').prevObject[0].activeElement.name, 
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
}

async function sortCoinList(headerName, order) {
  generateCoinTableBody(sortData(await getCoinData(), headerName, order));
}

function updateSortOrder(headerName, order) {
  sortOrder.column = headerName;
  sortOrder.order = order;
}

function sortData(data, headerName, order) {
  if (order == 'ASC') {
    sortAscending(data, headerName);
  } else {
    sortDescending(data, headerName);
  };
  updateSortOrder(headerName, order);
  return data;
}

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
}

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
}
