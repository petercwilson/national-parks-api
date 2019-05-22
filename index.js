'use strict';

// put your own value below!
const api_Key = 'kWSmA8a1lM5M5VscIAoYqjQiYWUSCWZ2NwRm4Jt4'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson[i].data.fullName}</h3>
      <p>${responseJson[i].data.description}</p>
      <p><a link="${responseJson[i].data.url}"</a>${responseJson[i].data.url}<?p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(stateCode, limit=10) {
  const params = {
    api_key: api_Key,
    stateCode: stateCode,
    limit: limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);