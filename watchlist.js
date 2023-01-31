//once save button on the 2nd page is clicked, certain (maybe 3 types of info ) will be shown on the page. the event listener should be on the 2nd page 
//and use location.assign to go to the 3rd page.
//a remove button needs to be added

//an object to store stock info

const stockList = document.querySelector('.Page3StockList');



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
        let removeBtnSection = document.createElement('td');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add("remove-button");

        removeBtnSection.append(removeBtn);
        
        tableRowName.textContent = theName;
        tableRowPrice.textContent = thePrice;
        removeBtn.textContent = "Remove";
        tableRow.append(tableRowName);
        tableRow.append(tableRowPrice);
        tableRow.append(removeBtnSection);
        stockList.append(tableRow);
        //console.log(tableRowName.textContent);
    }

};

function removeWatchList(event) {
    const current = event.target;

    const item = current.parentElement.parentElement.children[0].textContent;

    console.log(item);

    let stockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
    console.log(stockCryptoArray);
    
    for (let i=0; i<stockCryptoArray.length; i++) {
        if (stockCryptoArray[i].name === item) {
            stockCryptoArray.splice(i, 1);
        }
    }

    localStorage.setItem("addedStockCrypto", JSON.stringify(stockCryptoArray));

    location.assign('./watchlist-index.html')
}

createEl();

const removeBtn = document.querySelectorAll(".remove-button");

console.log(removeBtn);

removeBtn.forEach(function(btn) {
    btn.addEventListener("click", removeWatchList);
})

