chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "getMessages") {
      var counter = 0;
      var messagesElem = document.getElementById('webMessengerRecentMessages');
      if (messagesElem === null)
        return true;
      var reloadInterval = setInterval(function(){
        console.log('interval '+counter);
        if (counter < 200 && messagesElem.parentNode.children[0].className.indexOf('hidden_elem') === -1)
          messagesElem.parentNode.children[0].children[0].children[0].click();
        else {
          console.log('interval done!');
          clearInterval(reloadInterval);
          var webMessengerRecentMessages = messagesElem.outerHTML;
          sendResponse({messages: webMessengerRecentMessages, counter: counter});
        }
        counter += 1;
      },2000);

      return true;
    }
  });