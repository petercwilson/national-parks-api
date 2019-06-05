'use strict';

const api_key = 'kWSmA8a1lM5M5VscIAoYqjQiYWUSCWZ2NwRm4Jt4'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName} - Location: ${responseJson.data[i].states}</h3>
      <p>Address: ${responseJson.data[i].latLong}</p>
      <p>Description: ${responseJson.data[i].description}</p>
      <p>URL: <a href="${responseJson.data[i].url}"</a>${responseJson.data[i].url}</p>
      </li>`
    )}; 
  $('#results').removeClass('hidden');
};

function getParks(stateCode, limit=10) {
  const params = {
    api_key,
    stateCode,
    limit,
    start:0
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

function resetForm() {
    $(':reset').click(event => {
    $('#results-list').empty();
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const searchTerm2 = $('#js-search-term2').val();
    const maxResults = $('#js-max-results').val();
    getParks([searchTerm, searchTerm2], maxResults);
  });
}

$(watchForm);
$(resetForm);
