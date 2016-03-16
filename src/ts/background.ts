chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get("snapshots", function(storage) {
    if (!storage["snapshots"]) {
      // initialize local storage
      chrome.storage.local.set({"snapshots": {
        "hackage": {"name": "Hackage", "prim": true},
        "lts": {"name": "LTS (latest)", "prim": true},
        "nightly": {"name": "Nightly (latest)", "prim": true}
      }});
    }
  });
});
