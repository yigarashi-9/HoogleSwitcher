document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot
  var addSnapshotButton = document.getElementById('addSnapshot');
  addSnapshotButton.addEventListener('click', function(){
    var snapshot = document.getElementById('addSnapshotForm').snapshot.value;
    chrome.storage.local.get('snapshots', function(storage){
      var snapshots = storage.snapshots;
      snapshots[snapshot] = {'name': snapshot, 'prim': false};
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // delete a snapshot
  var deleteSnapshotButton = document.getElementById('deleteSnapshot');
  deleteSnapshotButton.addEventListener('click', function(){
    var candidate = document.getElementById('deleteSnapshotForm').deleteCandidate.value;
    chrome.storage.local.get('snapshots', function (storage){
      var snapshots = storage.snapshots;
      if(candidate in snapshots){
        delete snapshots[candidate];
      }
      chrome.storage.local.set({'snapshots': snapshots});
    });
  });

  // display candidates of snapshot to delete
  var select = document.getElementById('deleteCandidate');
  chrome.storage.local.get('snapshots', function (storage){
    if(storage.snapshots){
      var snapshots = storage.snapshots;
      for(var snapId in snapshots){
        if(!snapshots[snapId].prim){
          var option = document.createElement('option');
          option.value = snapId;
          option.innerHTML = snapshots[snapId].name;
          select.appendChild(option);
        }
      }
    }
  });
});
