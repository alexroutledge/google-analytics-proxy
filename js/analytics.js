var template = 'Between {{data.query.results.json.query.start-date}} and {{data.query.results.json.query.end-date}}, there were {{data.query.results.json.totalsForAllResults.ga:visitors}} visitors'
$.ajax({
  url: 'http://query.yahooapis.com/v1/public/yql/alexroutledge/analytics',
  data: {
    'ids': 'ga:123456',
    'metrics': 'ga:visitors',
    'start-date': '2012-10-04',
    'end-date': '2013-10-04',
    'format': 'json',
    '_maxage': 3600
  }
}).done(function(data) {
  $('#query').html(Mustache.render(template, data));
});
