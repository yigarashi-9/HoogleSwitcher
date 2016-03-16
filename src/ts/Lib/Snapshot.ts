export let get = new Promise(
  function(resolve, reject) {
    chrome.storage.local.get("snapshots", function(storage) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else if (storage["snapshots"]) {
        resolve(storage["snapshots"]);
      } else {
        alert("Snapshots does not exist...\nPlease reinstall the extension,sorry.");
      }
    });
  });
