var snapshot = require('./lib/snapshot');
var message = require('./lib/message');

document.addEventListener('DOMContentLoaded', function(){
  // add a new snapshot input by user
  document.forms['addSnapshotForm'].addEventListener('submit', addSnapshot);

  // delete a snapshot selected in <select>
  document.forms['deleteSnapshotForm'].addEventListener('submit', deleteSnapshot);

  // display candidates of snapshot to delete
  snapshot.get.then(showDeleteCandidates);
});


function addSnapshot(event){
  event.preventDefault();
  var form = this;
  var snapName = form.snapshot.value;
  checkSnapshotName(snapName, function(){
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
  });
  return false;
}


function checkSnapshotName(snapName, callback){
  if(snapName === ''){
    message.send.error('Empty input is not allowed.');
    return;
  }

  snapshot.get.then(function(snapshots){
    if(snapName in snapshots){
      message.send.warning(snapName + ' already exists.');
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.stackage.org/' + snapName, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 404){
          message.send.error('Invalid snapshot name: ' + snapName + ', see its url.');
        }else if(xhr.status === 200){
          callback();
        }
      }
    };
    xhr.send();
  });
}


function deleteSnapshot(event){
  event.preventDefault();
  var candidate = this.deleteCandidate.value;
  snapshot.get.then(function (snapshots){
    if(candidate in snapshots){
      delete snapshots[candidate];
    }
    chrome.storage.local.set({'snapshots': snapshots}, function(){
      if(chrome.runtime.lastError){
        message.send.error('Fail to delete ' + candidate + ', Please retry.');
      }else{
        showDeleteCandidates(snapshots);
        message.send.success(candidate + ' has been deleted.');
      }
    });
  });
  return false;
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
