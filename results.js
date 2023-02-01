var resultContentEL = document.querySelector('.data-block');
var form = document.querySelector('#form-submit');

function getParams() {
  // Get the search params out of the URL
  var searchParamsArr = document.location.search.split(',');

  // Get the query and format values
  var company = searchParamsArr[0].split('=').pop();
  
  var type = searchParamsArr[1];
  

  searchApi(company, type);
}

function searchApi(company, type) {
  var queryUrl = '';
  if (type === '1') {
    queryUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + company + '&apikey=DKPCKHGPNOI6P0P6';
    
    $.ajax ({
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      jsonp: 'json_callback',
      url: queryUrl,
      complete: function() {},
      success: function(data) {
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
      complete: function() {},
      success: function(data) {
          printCrypto(data);
      }
    });
  }
}

getParams();

function printStock(data) {
  var resultCard = document.createElement('div');
  resultCard.className = "card-container";
  var titleEL = document.createElement('h3');
  titleEL.classList.add('title'); 
  titleEL.textContent = data['Global Quote']['01. symbol'];
  var date = document.createElement('p')
  date.textContent = 'Trading Day: ' + data['Global Quote']['07. latest trading day']
  var price = document.createElement('p');
  price.classList.add('price');
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
  resultCard.className = "card-container";
  var titleEL = document.createElement('h3');
  titleEL.classList.add('title'); 
  titleEL.textContent = data.name;
  var symbol = document.createElement('p');
  symbol.textContent = 'Symbol: ' + data.symbol;
  var image = document.createElement('img');
  image.src = data.image.small;
  var price = document.createElement('p');
  price.classList.add('price'); 
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
  resultContentEL.innerHTML = "";
  var textInput = document.querySelector('#input_text').value;
  var picklistValue = document.querySelector('.page2picklist').value;

  if (!textInput) {
    console.error('You need a search input value!');
    return;tItem
  }
  searchApi(textInput, picklistValue);
}  
 
form.addEventListener('submit', handleSearchFormSubmit);
  

//wen's code below
function saveInfo (){ 
  //add new stock into watch list
  let addedStockCrypto = {};
  addedStockCrypto.name = document.querySelector(".title").textContent; 
  addedStockCrypto.price = document.querySelector(".price").textContent; 
  //now getStockCryptoArray should have exisiting saved stock from local stroage. so I will push the addedStorckCrypto - new info into the array.
  let getStockCryptoArray = getLocalInfo();
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
  searchStoredLocal ();
})

function searchStoredLocal (){
  //Get the local storage array. 
  let StockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
  //target the "title" class.
  let checker = document.querySelector(".title").textContent;
   //if there is nothing in the array, saveInfo and return. 
  if (StockCryptoArray.length === 0) {
    saveInfo();
    return;
  }; 
  //boolean to the new variable. starting with false ==> will save info
  let checkerExists = false;

  // run a loop, if any name in the array is same as checker, then the checkExists boolean becomes true, break the loop. go to next line.
  for(var i = 0; i < StockCryptoArray.length; i++){
    if (StockCryptoArray[i].name === checker) {
      checkerExists = true;
      break;
    }
  }
  // if checkerExists = false; call saveinfo()
  if (!checkerExists) {
    saveInfo();
  }
}
