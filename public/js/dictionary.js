let coinUrl = "https://api.coingecko.com/api/v3/coins/categories";



$(document).ready( () => {
    $('body').on('mouseenter mouseleave','.nav-item',function(e){
      if ($(window).width() > 750) {
        var _d=$(e.target).closest('.nav-item');_d.addClass('show');
        setTimeout(function(){
        _d[_d.is(':hover')?'addClass':'removeClass']('show');
        },1);
      }
  });	
    
    refreshCoinTableBody();
  });


// <div class="card text-center">
//   <div class="card-header">
//     Featured
//   </div>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
//   <div class="card-footer text-muted">
//     2 days ago
//   </div>
// </div>

  function generateCoinTableBody(data) {
    let number = Intl.NumberFormat("en-IN");
    $('#dict').html("");
    for (let key in data) {
       $('#dict').append(
        $('<div class="card text-center"></div>').append(
          $('<div class="card-header h3"></div>').text(data[key].name),
          $('<div class="card-body"></div>').append(
              $('<p class="card-text font-weight-bold"></p>').html(data[key].content),
          
          $('<div class="card-footer text-muted" style = "height: 60px"></div>').append(
            $('<p class="text-left d-inline card-text font-weight-bold" style = "float: left;"></p>').html("Market Cap :" +" "+ "$"+ " " + number.format(data[key].market_cap / 1000000000) + " " + "Billion"),
            $(`<p class='d-inline font-weight-bold ${data[key].market_cap_change_24h >= 0 ? "text-success" : "text-danger"} 
            text-right' style = "float: right;"></p>`).html("24H Market Change"+" "+Number(data[key].market_cap_change_24h).toFixed(2) + "%"),
          )
          )
        )
      );
    };
  }


  function getCoinData() {
    return fetch(coinUrl)
      .then(res => {
        return res.json();
      }).then(data => {
          return data;
        }).catch(err => {
        console.log(err);
          });
  };





  async function refreshCoinTableBody() {
    generateCoinTableBody(await getCoinData());
  }