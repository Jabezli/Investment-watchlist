var form = document.querySelector('#form-submit');
function handleSearchFormSubmit(event) {
   event.preventDefault();
  

  var textInput = document.querySelector('#input_text').value;
  var picklistValue = document.querySelector('.first-page-picklist').value;

  if (!textInput) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-result-index.html?=' + textInput + ',' + picklistValue;
  console.log(queryString)

  location.assign(queryString);
}

form.addEventListener('submit', handleSearchFormSubmit);