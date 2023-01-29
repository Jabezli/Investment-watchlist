var resultContentEL = document.querySelector('.data-block');
var form = document.querySelector('#form-submit');

function getParams() {
    // Get the search params out of the URL
    var searchParamsArr = document.location.search.split(',');
  
    // Get the query and format values
    var company = searchParamsArr[0].split('=').pop();
    console.log(company);
    var type = searchParamsArr[1];
    console.log(type);
  
    searchApi(company, type);
  }


  function searchApi(company, type) {
    var queryUrl = '';
    if (type === '1') {
      queryUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + company + '&apikey=DKPCKHGPNOI6P0P6';
      console.log(queryUrl);
      $.ajax ({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        jsonp: 'json_callback',
        url: queryUrl,
        complete: function() {
            console.log('done');
        },
        success: function(data) {
            console.log(data);
            printStock(data);
        }
    });
    }
    else if (type === '2') {
      queryUrl = 'https://api.coingecko.com/api/v3/coins/' + company;
    $.ajax ({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        jsonp: 'json_callback',
        url: queryUrl,
        complete: function() {
            console.log('done');
        },
        success: function(data) {
            console.log(data);
            printCrypto(data);
        }
    });
    }
  }

  getParams();

  function printStock(data) {
    var resultCard = document.createElement('div');
    var titleEL = document.createElement('h3');
    titleEL.textContent = data['Global Quote']['01. symbol'];
    var date = document.createElement('p')
    date.textContent = 'Trading Day: ' + data['Global Quote']['07. latest trading day']
    var price = document.createElement('p')
    price.textContent = 'Price: $' + data['Global Quote']['05. price']
    var volume = document.createElement('p')
    volume.textContent = 'Volume: ' + data['Global Quote']['06. volume']
    var change = document.createElement('p')
    change.textContent = 'Price change: $' + data['Global Quote']['09. change']
    var changePercent = document.createElement('p')
    changePercent.textContent = 'Change %: ' + data['Global Quote']['10. change percent']
    resultCard.append(titleEL, date, price, volume, change, changePercent);
    resultContentEL.append(resultCard);
  }

  function printCrypto(data) {
    var resultCard = document.createElement('div');
    var titleEL = document.createElement('h3');
    titleEL.textContent = data.name;
    var symbol = document.createElement('p');
    symbol.textContent = 'Symbol: ' + data.symbol;
    var image = document.createElement('img');
    image.src = data.image.small;
    var price = document.createElement('p')
    price.textContent = 'Price: $' + data.market_data.current_price.usd;
    var dayHigh = document.createElement('p')
    dayHigh.textContent = '24h High: $' + data.market_data.high_24h.usd;
    var dayLow = document.createElement('p')
    dayLow.textContent = '24h Low: $' + data.market_data.low_24h.usd;
    var change = document.createElement('p')
    change.textContent = '24h Price change: $' + Math.round(data.market_data.price_change_24h);
    resultCard.append(titleEL, symbol, image, price, dayHigh, dayLow, change);
    resultContentEL.append(resultCard);
  }

  //Code to run new search
  function handleSearchFormSubmit(event) {
    event.preventDefault();
   
   var textInput = document.querySelector('#input_text').value;
   var picklistValue = document.querySelector('.page2picklist').value;
 
   if (!textInput) {
     console.error('You need a search input value!');
     return;
   }
   searchApi(textInput, picklistValue);
 }
 
 form.addEventListener('submit', handleSearchFormSubmit);
  

//wen's code below
function saveInfo (){
    
    //add new stock into watch list
    let addedStockCrypto = {};
    addedStockCrypto.name = titleEL.textContent; //this should be linked to the name in the returned data from API - Amir comment: I believe this should be titleEL, which is the variable that stores the name
    addedStockCrypto.price = price.textContent; //this should be linked to the price in the returned data from API - Amir comment: I believe this should be price, which is the variable that stores the price
    //retrieve exisiting localstorage info
    let getStockCryptoArray = getLocalInfo();
    console.log("addedStockCrypto", addedStockCrypto);
    //now getStockCryptoArray should have exisiting saved stock from local stroage. so I will push the addedStorckCrypto - new info into the array.
    getStockCryptoArray.push(addedStockCrypto);
    //ok, getStockCryptoArray is up-to-date. Time to store it to the local stroage.
    //the actual data I am setting is the "getStockCryptoArray" which is up-to-date. However, I am naming it "addedStockCrypto" which
    //doesn't relate to the first line of the function. Becasue in the "getLocalInfo" I am getting the info from "addedStockCrypto", I need to have the 
    //same name here.
    localStorage.setItem("addedStockCrypto", JSON.stringify(getStockCryptoArray));
}

function getLocalInfo (){
    let StockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
    return StockCryptoArray;
}
  const watchListBtn = document.querySelector('#addWatchList')

  watchListBtn.addEventListener('click',function(){
    // saveInfo();
    // console.log(titleEL.textContent);
    location.assign('./watchlist-index.html')
  })


  // function storeSearchResultInfoOb (){
  //   searchApi();
  //   let storeSearchResultInfoOb = {};    
  //   storeSearchResultInfoOb.name = titleEL.textContent;
  //   storeSearchResultInfoOb.price = price.textContent;
  //   return storeSearchResultInfoOb;
  // }