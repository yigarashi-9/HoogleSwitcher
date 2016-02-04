module.exports.send = (function(){

  function sendMessage(label, body){
    var message = {'body': body, 'label': label};
    chrome.storage.local.set({'message': message});
  }

  return {'success': sendMessage.bind(null, 'message-success'),
          'error': sendMessage.bind(null, 'message-error')};
}());

module.exports.get = new Promise(
  function(resolve){
    chrome.storage.local.get('message', function(storage){
      if(!chrome.runtime.lastError && storage.message){
        resolve(storage.message);
      }
    });
  });

module.exports.clear = function(){
  chrome.storage.local.remove('message');
};
