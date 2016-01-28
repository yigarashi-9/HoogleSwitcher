var lib = require('./lib');

document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot input by user
  var addSnapshotButton = document.getElementById('addSnapshot');
  addSnapshotButton.addEventListener('click', addSnapshot);

  // delete a snapshot selected in <select>
  var deleteSnapshotButton = document.getElementById('deleteSnapshot');
  deleteSnapshotButton.addEventListener('click', deleteSnapshot);

  // display candidates of snapshot to delete
  lib.getSnapshots.then(createSelectList);
});


function addSnapshot(){
  var snapshot = document.getElementById('addSnapshotForm').snapshot.value;
  lib.getSnapshots.then(function(snapshots){
    snapshots[snapshot] = {'name': snapshot, 'prim': false};
    chrome.storage.local.set({'snapshots': snapshots});
  });
}


function deleteSnapshot(){
  var candidate = document.getElementById('deleteSnapshotForm').deleteCandidate.value;
  lib.getSnapshots.then(function (snapshots){
    if(candidate in snapshots){
      delete snapshots[candidate];
    }
    chrome.storage.local.set({'snapshots': snapshots});
  });
}


function createSelectList(snapshots){
  var select = document.getElementById('deleteCandidate');
  for(var snapId in snapshots){
    if(!snapshots[snapId].prim){
      var option = document.createElement('option');
      option.value = snapId;
      option.innerHTML = snapshots[snapId].name;
      select.appendChild(option);
    }
  }
}
