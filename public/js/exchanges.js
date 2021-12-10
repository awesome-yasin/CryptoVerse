
let exchangesPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let EXCHANGE_DATA_ENDPOINT = `/exchanges?per_page=${exchangesPerPage}&page=${currentPage}`;
let MARKET_DATA_ENDPOINT = `/global`;
let BTC_ENDPOINT = `/simple/price?ids=bitcoin&vs_currencies=inr`;
let exchangeUrl = BASE_URL + EXCHANGE_DATA_ENDPOINT;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
let btcUrl = BASE_URL + BTC_ENDPOINT;
let price;
let globaldata = 'https://api.coingecko.com/api/v3/global';
let trendingurl = "https://api.coingecko.com/api/v3/search/trending";
let sortOrder = { column: 'trust_score_rank', order: 'ASC' };

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
  fadePrev();
  refreshGolbalData()
  refreshTableBody();
  refreshMarketTableBody();
  refreshTrendBody()
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

function generateTableBody(data, price) {
  let number = Intl.NumberFormat("en-IN");
  $('#exchangeTableBody').html(""); //clears body of table
  for (let key in data) {
    $('#exchangeTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center boldText"></td>').text(data[key].trust_score_rank),
        $('<td class="text-left"></td>').append(
          $('<div></div>').append(`<img src="${data[key].image}" width="25"> 
          <a href="${data[key].url}" target="_blank">${data[key].name}</a>`)),
        $('<td class="text-right boldText" style="color: rgb(0, 0, 0);"></td>').text("₹" + 
          number.format((data[key].trade_volume_24h_btc*price).toFixed(2))),
        $('<td class="text-right boldText" style="color: rgb(0, 0, 0);"></td>').text(data[key].year_established),
        $('<td class="text-right boldText" style="color: rgb(0, 0, 0);"></td>').text(data[key].country),
        $('<td class="text-right boldText" style="color: rgb(0, 0, 0);"></td>').text(data[key].trust_score),
        $('<td class="text-right boldText" style="color: rgb(0, 0, 0);"></td>').text(data[key].trust_score_rank)
      )
    );
  };
};

function generateTrendBody(data){
  let btc = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  btcData()
  btcData2()
  btcData3()
  btcData4()
  btcData5()
  btcData6()
  function btcData() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price').text(("The current price is" + " " + "₹" + number.format(data.coins[0].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[0].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[0].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }
  function btcData2() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price_2').text(("The current price is" + " " + "₹" + number.format(data.coins[1].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[1].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[1].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }
  function btcData3() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price_3').text(("The current price is" + " " + "₹" + number.format(data.coins[2].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[2].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[2].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }

  function btcData4() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price_4').text(("The current price is" + " " + "₹" + number.format(data.coins[3].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[3].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[3].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }

  function btcData5() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price_5').text(("The current price is" + " " + "₹" + number.format(data.coins[4].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[4].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[4].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }

  function btcData6() {
    return fetch(btc)
    .then (res => {
      return res.json()
    }).then(databtc => {
      return $('#trend_price_6').text(("The current price is" + " " + "₹" + number.format(data.coins[5].item.price_btc * databtc.bitcoin.inr) + "." + " " + "With Current Score of" +" "+ number.format(data.coins[5].item.score) + " " + "and Market Rank of" +" "+ number.format(data.coins[5].item.market_cap_rank) ));
    }).catch (err => {
      console.log(err)
    })
  }

  let number = Intl.NumberFormat("en-IN");

    $('#trending').text( (data.coins[0].item.name))
    $('#trend_img').append(
      `<img src="${data.coins[0].item.thumb}" width="25">`)

      $('#trending_2').text( (data.coins[1].item.name))
    $('#trend_img_2').append(
      `<img src="${data.coins[1].item.thumb}" width="25">`)

      $('#trending_3').text( (data.coins[2].item.name))
      $('#trend_img_3').append(
        `<img src="${data.coins[2].item.thumb}" width="25">`)

        $('#trending_4').text( (data.coins[3].item.name))
        $('#trend_img_4').append(
          `<img src="${data.coins[3].item.thumb}" width="25">`)

          $('#trending_5').text( (data.coins[4].item.name))
        $('#trend_img_5').append(
          `<img src="${data.coins[4].item.thumb}" width="25">`)

          $('#trending_6').text( (data.coins[5].item.name))
          $('#trend_img_6').append(
            `<img src="${data.coins[5].item.thumb}" width="25">`)

            var html = '<blockquote class="col-sm-9">';
html += '<h3 class="leada">What is cryptocurrency market cap?</h3>';
html += '<p>Market cap is one of the most popular metrics in the industry that is used to gauge the value of an asset. The market cap of a cryptocurrency is calculated based on the coins total circulating supply multiplied by the current price. For detailed examples on how the market capitalization of a coin is calculated, please view our methodology page.</p>';
html += '<h3 class="leada">How can I use market cap?</h3>';
html += '<p>As a financial metric, market cap allows you to compare the total circulating value of one cryptocurrency with another. Large cap cryptocurrencies such as Bitcoin and Ethereum have a market cap of over $10 billion. They typically consist of protocols that have demonstrated track record, and have a vibrant ecosystem of developers maintaining and enhancing the protocol, as well as building new projects on top of them. From a trading perspective, large caps would typically be hosted on more exchanges, have higher liquidity, and are less volatile when compared against other mid and small cap cryptocurrencies.</p>';
html += '<br>'
html+= 'While market cap is a simple and intuitive comparison metric, it is not a perfect point of comparison. Some cryptocurrency projects may appear to have inflated market cap through price swings and the tokenomics of their supply. As such, it is best to use this metric as a reference alongside other metrics such as trading volume, liquidity, fully diluted valuation, and fundamentals during your research process.'
html += '<h3 class="leada">What are candlesticks in crypto charts?</h3>';
html += '<p>Candlestick charts give an overview to traders on the price movement based on previous trends. The body of the candlestick shows where the price of a coin opened and closed for the particular period of time which the candlestick represents. If the candle is green in a crypto chart, it represents positive changes in price while red candle represents negative changes in price. The shadow indicates the high price and low price for the period.</p>';

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

async function refreshTableBody() {
  var btc = await getBitcoinPrice();
  price = btc.bitcoin.inr;
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
async function refreshGolbalData() {
  generateGolbalData(await getGlobalData())
}


async function refreshMarketTableBody() {
  generateMarketTableBody(await getMarketData());
};

async function refreshTrendBody() {
  generateTrendBody(await getTrendData());
}

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