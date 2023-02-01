const stockList = document.querySelector('.Page3StockList');

function getLocalInfo() {
    // I am assuming I don't need the saveInfo function here because when data gets stored in page2, the name of the data in local storage is 
    //"addedStockCrypto", so the "getItem" should be able to get data per that name.
    let stockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
    return stockCryptoArray;
}

function createEl() {
    // the while loop below is to remove any exisiting html stocklist child before obtaining and printing new children to avoid duplication
    while (stockList.firstChild) {
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
        removeBtn.className = "btn waves-effect waves-light remove-button";
        removeBtnSection.append(removeBtn);
        tableRowName.textContent = theName;
        tableRowPrice.textContent = thePrice;
        removeBtn.textContent = "Remove";
        tableRow.append(tableRowName);
        tableRow.append(tableRowPrice);
        tableRow.append(removeBtnSection);
        stockList.append(tableRow);
    }
};

function removeWatchList(event) {
    // this is to know which removeBtn we are targetting.
    const current = event.target;
    // it will go up two levels to get the "tr", then target first child "name"'s textcontent.
    const item = current.parentElement.parentElement.children[0].textContent;
    let stockCryptoArray = JSON.parse(localStorage.getItem('addedStockCrypto')) || [];
    for (let i = 0; i < stockCryptoArray.length; i++) {
        // if the name of the btn is the same as the btn clicked, that object will be elimated from the array.
        // "1" means only delete the first one. if I put "2" here, then it will go down and delete another one.
        if (stockCryptoArray[i].name === item) {
            stockCryptoArray.splice(i, 1);
        }
    }
    localStorage.setItem("addedStockCrypto", JSON.stringify(stockCryptoArray));
    location.assign('./watchlist-index.html')
}

createEl();

const removeBtn = document.querySelectorAll(".remove-button");

//since all the removeBtns have the same class name, this is similar to a for-loop to check
//which btn was clicked.
removeBtn.forEach(function (btn) {
    btn.addEventListener("click", removeWatchList);
})

