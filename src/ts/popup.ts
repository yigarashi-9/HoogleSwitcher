import Snapshot = require("./Lib/Snapshot");

document.addEventListener("DOMContentLoaded", function() {
  // open a new tab for the result of a query on the snapshot
  let searchButton = document.getElementById("search");
  searchButton.addEventListener("click", openSearchResult);

  // list snapshots
  Snapshot.get.then(createRadioButtons);
});


function openSearchResult() {
  let query = document.getElementById("searchForm")["query"].value;
  let snapshotName = (<HTMLInputElement>document.querySelector("input[name='snapshot']:checked")).value;
  let url;

  if (snapshotName === "hackage") {
    url = "https://www.haskell.org/hoogle/?hoogle=";
  } else {
    url = "https://www.stackage.org/" + snapshotName + "/hoogle?q=";
  }

  url += query;
  chrome.tabs.create({"url": url});
}


function createRadioButtons(snapshots) {
  let snapshotSpanList = document.getElementById("snapshots");
  for (let snapId in snapshots) {
    let span = document.createElement("span");
    span.classList.add("snapshot");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "snapshot";
    radio.id = snapId;
    radio.value = snapId;

    if (snapId === "hackage") {
      radio.checked = true;
    }
    span.appendChild(radio);

    let label = document.createElement("label");
    label.htmlFor = snapId;
    label.innerHTML = snapshots[snapId].name;
    span.appendChild(label);

    snapshotSpanList.appendChild(span);
  }
}
