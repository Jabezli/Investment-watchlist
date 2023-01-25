var button = document.querySelector('#homebutton');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var textInput = document.querySelector('#input_text').value;
  var picklistValue = document.querySelector('.first-page-picklist').value;

  if (!textInput) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html' + textInput + ',' + picklistValue;

  location.assign(queryString);
}

button.addEventListener('submit', handleSearchFormSubmit);