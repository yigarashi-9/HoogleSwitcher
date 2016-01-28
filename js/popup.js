document.addEventListener('DOMContentLoaded', function(){
  // check local storage
  chrome.storage.local.get('snapshots', function(storage){
    if(!storage.snapshots){
      chrome.storage.local.set({'snapshots': {
        'hackage': {'name': 'Hackage', 'prim': true},
        'lts': {'name': 'LTS (latest)', 'prim': true},
        'nightly': {'name': 'Nightly (latest)', 'prim': true}
      }});
    }
    main();
  });
});

function main(){
  // open a new tab for the result of a query on the snapshot
  var searchButton = document.getElementById('search');
  searchButton.addEventListener('click', function(){
    var query = document.getElementById('searchForm').query.value;
    var snapshot = document.querySelector('input[name="snapshot"]:checked').value;

    var url;

    if(snapshot === 'hackage'){
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
      var snapshotDict = storage.snapshots;
      for(var snapId in snapshotDict){
        var span = document.createElement('span');
        span.classList.add('snapshot');

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'snapshot';
        radio.id = snapId;
        radio.value = snapId;

        if(snapId === 'hackage'){
          radio.checked = true;
        }
        span.appendChild(radio);

        var label = document.createElement('label');
        label.htmlFor = snapId;
        label.innerHTML = snapshotDict[snapId].name;
        span.appendChild(label);

        snapshots.appendChild(span);
      }
    }
  });
}
