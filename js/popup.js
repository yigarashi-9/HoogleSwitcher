document.addEventListener('DOMContentLoaded', function(){
  // initilize local storage
  chrome.storage.local.get('snapshots', function(storage){
    if(!storage.snapshots){
      chrome.storage.local.set({'snapshots': ['hackage', 'lts', 'nightly']});
    };
  })

  // open a new tab for the result of a query on the snapshot
  var searchButton = document.getElementById('search');
  searchButton.addEventListener('click', function(){
    var query = document.getElementById('search-form').query.value;
    var snapshot = document.querySelector('input[name="snapshot"]:checked').value;

    var url;

    if(snapshot == 'hackage'){
      url = 'https://www.haskell.org/hoogle/?hoogle=';
    }else{
      url = 'https://www.stackage.org/' + snapshot + '/hoogle?q=';
    }

    url += query;
    chrome.tabs.create({'url': url});
  });

  // display snapshots
  var snapshots = document.getElementById('snapshots');
  chrome.storage.local.get('snapshots', function (storage){
    if(storage.snapshots){
      storage.snapshots.forEach(function(snapshotName){
        var span = document.createElement('span');
        span.classList.add('snapshot');

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'snapshot';
        radio.id = snapshotName;
        radio.value = snapshotName;

        if(snapshotName == 'hackage'){
          radio.checked = true;
        }
        span.appendChild(radio);

        var label = document.createElement('label');
        label.htmlFor = snapshotName;
        label.innerHTML = snapshotName;
        span.appendChild(label);

        snapshots.appendChild(span);

        // focus on a checked radio button
        document.querySelector('input[type="radio"]:checked').focus();
      })
    }
  });
});
