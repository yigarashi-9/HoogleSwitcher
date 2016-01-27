document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot
  var addSnapshotButton = document.getElementById('addSnapshot');
  addSnapshotButton.addEventListener('click', function(){
    var snapshot = document.getElementById('addSnapshotForm').snapshot.value;
    chrome.storage.local.get('snapshots', function(storage){
      var snapshots = storage.snapshots;
      snapshots.push(snapshot);
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // delete a snapshot
  var deleteSnapshotButton = document.getElementById('deleteSnapshot');
  deleteSnapshotButton.addEventListener('click', function(){
    var candidate = document.getElementById('deleteSnapshotForm').deleteCandidate.value;
    chrome.storage.local.get('snapshots', function (storage){
      var snapshots = storage.snapshots;
      var index = snapshots.indexOf(candidate);
      if(index > -1){
        snapshots.splice(index, 1);
      }
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // display candidates of snapshot to delete
  var select = document.getElementById('deleteCandidate');
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
