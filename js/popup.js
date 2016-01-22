document.addEventListener('DOMContentLoaded', function(){
  // initilize local storage
  chrome.storage.local.get('subjects', function(storage){
    if(!storage.subjects){
      chrome.storage.local.set({'subjects': ['hackage', 'lts', 'nightly']});
    };
  })

  // open a new tab for the result of a query on the subject
  var searchButton = document.getElementById('search');
  searchButton.addEventListener('click', function(){
    var query = document.getElementById('search-form').query.value;
    var subject = document.querySelector('input[name="subject"]:checked').value;

    var url;

    if(subject == 'hackage'){
      url = 'https://www.haskell.org/hoogle/?hoogle=';
    }else{
      url = 'https://www.stackage.org/' + subject + '/hoogle?q=';
    }

    url += query;
    chrome.tabs.create({'url': url});
  });

  // add a new snapshot to search subjects
  var addSnapshotButton = document.getElementById('add-snapshot');
  addSnapshotButton.addEventListener('click', function(){
    var snapshot = document.getElementById('add-snapshot-form').snapshot.value;
    chrome.storage.local.get('subjects', function(storage){
      var subjects = storage.subjects;
      subjects.push(snapshot);
      chrome.storage.local.set({'subjects': subjects});
    });
  });

  // display search subject
  var subjects = document.getElementById('subjects');
  chrome.storage.local.get('subjects', function (storage){
    if(storage.subjects){
      storage.subjects.forEach(function(subjectName){
        console.log(subjectName);
        var span = document.createElement('span');

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'subject';
        radio.id = subjectName;
        radio.value = subjectName;

        if(subjectName == 'hackage'){
          radio.checked = true;
        }
        span.appendChild(radio);

        var label = document.createElement('label');
        label.htmlFor = subjectName;
        label.innerHTML = subjectName;
        span.appendChild(label);

        subjects.appendChild(span);

        // focus on a checked radio button
        document.querySelector('input[name="subject"]:checked').focus();
      })
    }
  });
});
