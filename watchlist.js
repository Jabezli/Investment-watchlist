//once save button on the 2nd page is clicked, certain (maybe 3 types of info ) will be shown on the page. the event listener should be on the 2nd page 
//and use location.assign to go to the 3rd page.
//a remove button needs to be added

//an object to store stock info

const stockList = document.querySelector('.Page3StockList');
//const tableRowName = document.querySelector('.page3Name');
//const tableRowPrice = document.querySelector('.page3Price');

var fakeData = [
    {
        name: "apple",
        price: 100,
    },
    {
        name: "google",
        price: 150,
    },
    {
        name: "meta",
        price: 120,
    },
    {
        name: "Tesla",
        price: 130,
    },
]
// saveInfo();
// function saveInfo (){
//     //add new stock into watch list
//     let addedStockCrypto = {};
//     addedStockCrypto.name = "Apple"; //this should be linked to the name in the returned data from API
//     addedStockCrypto.price = 100; //this should be linked to the price in the returned data from API
//     //retrieve exisiting localstorage info
//     let getStockCryptoArray = getLocalInfo();
//     //console.log("addedStockCrypto", addedStockCrypto);
//     //now getStockCryptoArray should have exisiting saved stock from local stroage. so I will push the addedStorckCrypto - new info into the array.
//     getStockCryptoArray.push(addedStockCrypto);
//     //ok, getStockCryptoArray is up-to-date. Time to store it to the local stroage.
//     //the actual data I am setting is the "getStockCryptoArray" which is up-to-date. However, I am naming it "addedStockCrypto" which
//     //doesn't relate to the first line of the function. Becasue in the "getLocalInfo" I am getting the info from "addedStockCrypto", I need to have the 
//     //same name here.
//     localStorage.setItem("addedStockCrypto", JSON.stringify(getStockCryptoArray));
// }

function getLocalInfo (){
    // I am assuming I don't need the saveInfo function here because when data gets stored in page2, the name of the data in local storage is 
    //"addedStockCrypto", so the "getItem" should be able to get data per that name.
    let stockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
    return stockCryptoArray;
    
}


function createEl(){
    // the while loop below is to remove any exisiting html stocklist child before obtaining and printing new children to avoid duplication
    while(stockList.firstChild) {
        stockList.removeChild(stockList.firstChild);
    };
    //now, retrieve the array from local storage
    let getStockCryptoArray = getLocalInfo();

    for (var i = 0; i < getStockCryptoArray.length; i++) {
        let tableRow = document.createElement('tr');
        let tableRowName = document.createElement('td');
        let tableRowPrice = document.createElement('td');
        let theName = getStockCryptoArray[i].name;
        let thePrice = getStockCryptoArray[i].price;
        tableRowName.textContent = theName;
        tableRowPrice.textContent = thePrice;
        tableRow.append(tableRowName);
        tableRow.append(tableRowPrice);
        stockList.append(tableRow);
        //console.log(tableRowName.textContent);
    }

};

createEl();
