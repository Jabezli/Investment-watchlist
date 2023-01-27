var resultContentEL = document.querySelector('.data-block');

function getParams() {
    // Get the search params out of the URL
    var searchParamsArr = document.location.search.split(',');
  
    // Get the query and format values
    var company = searchParamsArr[0].split('=').pop(); // ...['?q', 'cats'].pop() -> 'cats'
    var type = searchParamsArr[1].split('=').pop(); // ...['format', 'audio'].pop() -> 'audio'
  
    searchApi(company, type);
  }