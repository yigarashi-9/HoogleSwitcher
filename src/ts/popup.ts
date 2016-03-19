import snapshot = require("./Models/Snapshot");

document.addEventListener("DOMContentLoaded", function() {
  // open a new tab for the result of a query on the snapshot
  let searchButton = document.getElementById("search");
  searchButton.addEventListener("click", openSearchResult);

  // list snapshots
  snapshot.SnapshotList.loadAll().then(createRadioButtons);
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


function createRadioButtons(snaplist) {
  let snapshotSpanList = document.getElementById("snaplist");
  snaplist.map((snapshot) => {
    let span = document.createElement("span");
    span.classList.add("snapshot");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "snapshot";
    radio.id = snapshot.id;
    radio.value = snapshot.id;

    if (snapshot.id === "hackage") {
      radio.checked = true;
    }
    span.appendChild(radio);

    let label = document.createElement("label");
    label.htmlFor = snapshot.id;
    label.innerHTML = snapshot.name;
    span.appendChild(label);

    snapshotSpanList.appendChild(span);
  });
}
