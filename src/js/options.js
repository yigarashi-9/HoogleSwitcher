var lib = require('./lib/snapshot');
var message = require('./lib/message');

document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot input by user
  var addSnapshotButton = document.getElementById('addSnapshot');
  addSnapshotButton.addEventListener('click', addSnapshot);

  // delete a snapshot selected in <select>
  var deleteSnapshotButton = document.getElementById('deleteSnapshot');
  deleteSnapshotButton.addEventListener('click', deleteSnapshot);

  // display result message
  message.get.then(function(msg){
    var title = document.querySelector('.options h1');
    var p = document.createElement('p');
    p.textContent = msg.body;
    p.classList.add('message', msg.label);

    // add after h1 title
    title.parentNode.insertBefore(p, title.nextSibling);
    message.clear();
  });

  // display candidates of snapshot to delete
  lib.getSnapshots.then(createSelectList);
});


function addSnapshot(){
  var snapshot = document.getElementById('addSnapshotForm').snapshot.value;
  lib.getSnapshots.then(function(snapshots){
    snapshots[snapshot] = {'name': snapshot, 'prim': false};
    chrome.storage.local.set({'snapshots': snapshots}, function(){
      if(chrome.runtime.lastError){
        message.send.error('Fail to add ' + snapshot + ', Please retry.');
      }else{
        message.send.success(snapshot + ' has been added.');
      }
    });
  });
}


function deleteSnapshot(){
  var candidate = document.getElementById('deleteSnapshotForm').deleteCandidate.value;
  lib.getSnapshots.then(function (snapshots){
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
