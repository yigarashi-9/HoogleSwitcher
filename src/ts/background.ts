import snapshot = require("./Models/Snapshot");

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get("snaplist", function(storage) {
    if(!storage["snaplist"]){
      chrome.storage.local.set({"snaplist": snapshot.SnapshotList.initialData()});
    }
  });
});
