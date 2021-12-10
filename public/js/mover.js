
let globaldata = 'https://api.coingecko.com/api/v3/global';
let trendingurl = "https://api.coingecko.com/api/v3/search/trending";


$(document).ready(function () {
  
    $('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
          var _d=$(e.target).closest('.nav-item');_d.addClass('show');
          setTimeout(function(){
          _d[_d.is(':hover')?'addClass':'removeClass']('show');
          },1);
        }
    });

    

    

    
    // FETCHING DATA FROM JSON FILE
    $.getJSON("js/gainers.json", 
            function (data) {
        var student = '';

        // ITERATING THROUGH OBJECTS
        $.each(data, function (key, value) {

            //CONSTRUCTION OF ROWS HAVING
            // DATA FROM JSON OBJECT
            student += '<tr>';
            student += '<td>' + 
                value.name + '</td>';

            student += '<td>' + 
                value.volume + '</td>';

            student += '<td>' + 
                value.price + '</td>';

            student += '<td>' + 
                value.change + '</td>';

            student += '</tr>';
        });
          
        //INSERTING ROWS INTO TABLE 
        $('#table').append(student);
    });


   
    refreshMarketTableBody();
      
    
});

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

  async function refreshMarketTableBody() {
    generateMarketTableBody(await  getGlobalData());
  }