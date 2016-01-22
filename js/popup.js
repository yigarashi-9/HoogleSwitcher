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

  // add a new snapshot
  var addSnapshotButton = document.getElementById('add-snapshot');
  addSnapshotButton.addEventListener('click', function(){
    var snapshot = document.getElementById('add-snapshot-form').snapshot.value;
    chrome.storage.local.get('snapshots', function(storage){
      var snapshots = storage.snapshots;
      snapshots.push(snapshot);
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // delete a snapshot
  var deleteSnapshotButton = document.getElementById('delete-snapshot');
  deleteSnapshotButton.addEventListener('click', function(){
    var candidate = document.getElementById('delete-snapshot-form')['delete-candidate'].value;
    chrome.storage.local.get('snapshots', function (storage){
      var snapshots = storage.snapshots;
      var index = snapshots.indexOf(candidate);
      if(index > -1){
        snapshots.splice(index, 1);
      }
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // display snapshots
  var snapshots = document.getElementById('snapshots');
  chrome.storage.local.get('snapshots', function (storage){
    if(storage.snapshots){
      storage.snapshots.forEach(function(snapshotName){
        var span = document.createElement('span');

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
        label.classList.add('snapshot-label');
        span.appendChild(label);

        snapshots.appendChild(span);

        // focus on a checked radio button
        document.querySelector('input[name="snapshot"]:checked').focus();
      })
    }
  });

  // display candidates of snapshot to delete
  var select = document.getElementById('delete-candidate');
  chrome.storage.local.get('snapshots', function (storage){
    if(storage.snapshots){
      storage.snapshots.forEach(function(snapshotName){
        var option = document.createElement('option');
        option.value = snapshotName;
        option.innerHTML = snapshotName;
        select.appendChild(option);
      });
    }
  });
});
