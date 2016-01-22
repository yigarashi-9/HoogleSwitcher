document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('search');
  document.querySelector('input[name="engine"]:checked').focus();

  searchButton.addEventListener('click', (function() {
    var query = document.getElementById('form').query.value;
    var engine = document.querySelector('input[name="engine"]:checked').value;
    var urls = {
      'hackage': 'https://www.haskell.org/hoogle/?hoogle=',
      'lts': 'https://www.stackage.org/lts/hoogle?q=',
      'nightly': 'https://www.stackage.org/nightly/hoogle?q='
    };
    var url = urls[engine] + query;
    chrome.tabs.create({url: url});
  }));
});
