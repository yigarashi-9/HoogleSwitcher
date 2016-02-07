var snapshot = require('./lib/snapshot');
var message = require('./lib/message');

document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot input by user
  document.getElementById('addSnapshot').addEventListener('click', addSnapshot);

  // delete a snapshot selected in <select>
  var deleteSnapshotButton = document.getElementById('deleteSnapshot');
  deleteSnapshotButton.addEventListener('click', deleteSnapshot);

  // display candidates of snapshot to delete
  snapshot.get.then(showDeleteCandidates);
});


function addSnapshot(){
  var form = document.forms['addSnapshotForm'];
  var snapName = form.snapshot.value;
  snapshot.get.then(function(snapshots){
    snapshots[snapName] = {'name': snapName, 'prim': false};
    chrome.storage.local.set({'snapshots': snapshots}, function(){
      if(chrome.runtime.lastError){
        message.send.error('Fail to add ' + snapName + ', Please retry.');
      }else{
        message.send.success(snapName + ' has been added.');
        form.reset();
        showDeleteCandidates(snapshots);
      }
    });
  });
}


function deleteSnapshot(){
  var candidate = document.getElementById('deleteSnapshotForm').deleteCandidate.value;
  snapshot.get.then(function (snapshots){
    if(candidate in snapshots){
      delete snapshots[candidate];
    }
    chrome.storage.local.set({'snapshots': snapshots}, function(){
      if(chrome.runtime.lastError){
        message.send.error('Fail to delete ' + candidate + ', Please retry.');
      }else{
        message.send.success(candidate + ' has been deleted.');
      }
    });
  });
}


function showDeleteCandidates(snapshots){
  var select = document.getElementById('deleteCandidate');

  // delete all candidates
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  for(var snapId in snapshots){
    if(!snapshots[snapId].prim){
      var option = document.createElement('option');
      option.value = snapId;
      option.innerHTML = snapshots[snapId].name;
      select.appendChild(option);
    }
  }
}
