(function(){
  var counter = 0;
  var remainingMessagesInitial = 0;

  var getRemainingMessages = function(elem){
    var spans = elem.parentNode.children[0].children[0].children[0].children;
    var remainingMessages = '';
    for (var i in spans) {
      if (spans[i].className.indexOf('uiMorePagerLoader') < 0) {
        remainingMessages = parseInt(spans[i].textContent.replace(/.*\(([0-9]+)\).*/,'$1'));
        break;
      }
    }
    return remainingMessages;
  };

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      var messagesElem = document.getElementById('webMessengerRecentMessages');

      if (request.action === "loadMessages") {
        if (messagesElem === null)
          return true;

        var messagesLoaded = false;
        if (counter == 0)
          remainingMessagesInitial = getRemainingMessages(messagesElem);

        if (messagesElem.parentNode.children[0].className.indexOf('hidden_elem') === -1) {
          console.log('loading... '+counter);
          messagesElem.parentNode.children[0].children[0].children[0].click();
          counter += 1;
        }
        else {
          console.log('loading done!');
          remainingMessagesInitial = 0;
          messagesLoaded = true;
          counter = 0;
        }

        setTimeout(function(){
          sendResponse({
            counter: counter,
            remainingMessagesInitial: remainingMessagesInitial,
            remainingMessages: getRemainingMessages(messagesElem),
            messagesLoaded: messagesLoaded
          });
        },2000);

        return true;
      }

      if (request.action === "getMessages") {
        var webMessengerRecentMessages = messagesElem.innerHTML;
        sendResponse({
          messages: webMessengerRecentMessages
        });
        return true;
      }

      if (request.action === "popupLog") {
        console.log('Popup log: '+JSON.stringify(request.logMessage));
        return true;
      }
    });
})();