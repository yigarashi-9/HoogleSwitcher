import message = require("./Utils/Message");
import snapshot = require("./Models/Snapshot");

document.addEventListener("DOMContentLoaded", function() {
  // add a new snapshot input by user
  document.forms["addSnapshotForm"].addEventListener("submit", addSnapshot);

  // delete a snapshot selected in <select>
  document.forms["deleteSnapshotForm"].addEventListener("submit", deleteSnapshot);

  // display candidates of snapshot to delete
  snapshot.SnapshotList.loadAll().then(renderDeleteCandidates);
});

let messenger = new message.Message("message");

function addSnapshot(event) {
  event.preventDefault();
  let form = this;
  let snapName = form.snapshot.value;
  checkSnapshotName(snapName, function() {
    snapshot.SnapshotList.loadAll().then(function(snaplist) {
      snaplist.push(new snapshot.Snapshot(snapName, snapName, false));
      snaplist.set().then(function(snaplist) {
        messenger.success(snapName + " has been added.");
        form.reset();
        renderDeleteCandidates(snaplist);
      }, function() {
        messenger.error("Fail to add " + snapName + ", Please retry.");
      });
    });
  });
  return false;
}


function checkSnapshotName(snapName: string, callback) {
  if (snapName === "") {
    messenger.error("Empty input is not allowed.");
    return;
  }

  snapshot.SnapshotList.loadAll().then(function(snaplist) {
    if (snaplist.findIndex(snapName) !== -1) {
      messenger.warning(snapName + " already exists.");
      return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.stackage.org/" + snapName, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 404) {
          messenger.error("Invalid snapshot name: " + snapName + ", see its url.");
        } else if (xhr.status === 200) {
          callback();
        }
      }
    };
    xhr.send();
  });
}


function deleteSnapshot(event) {
  event.preventDefault();
  let id = this.deleteCandidate.value;
  snapshot.SnapshotList.loadAll().then(function (snaplist) {
    snaplist.deleteSnapshot(id);
    snaplist.set().then((snaplist) => {
      renderDeleteCandidates(snaplist);
      messenger.success(id + " has been deleted.");
    }, () => {
      messenger.error("Fail to delete " + id + ". Please retry.");
    });
  });
  return false;
}


function renderDeleteCandidates(snaplist: snapshot.SnapshotList) {
  let select = document.getElementById("deleteCandidate");
  // delete all candidates
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  snaplist.map((snapshot) => {
    if (!snapshot.isPrim) {
      let option = document.createElement("option");
      option.value = snapshot.id;
      option.innerHTML = snapshot.name;
      select.appendChild(option);
    }
  });
}
