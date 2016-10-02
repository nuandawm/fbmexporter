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
      if (request.action === "getMessages") {
        var messagesElem = document.getElementById('webMessengerRecentMessages');
        if (messagesElem === null)
          return true;

        var messagesLoaded = false;
        var webMessengerRecentMessages = '';
        var remainingMessages = getRemainingMessages(messagesElem);
        if (counter == 0)
          remainingMessagesInitial = remainingMessages;

        if (messagesElem.parentNode.children[0].className.indexOf('hidden_elem') === -1) {
          console.log('loading... '+counter);
          messagesElem.parentNode.children[0].children[0].children[0].click();
          counter += 1;
        }
        else {
          console.log('loading done!');
          remainingMessagesInitial = 0;
          messagesLoaded = true;
          webMessengerRecentMessages = messagesElem.innerHTML;
          counter = 0;
        }

        setTimeout(function(){
          sendResponse({
            messages: webMessengerRecentMessages,
            counter: counter,
            remainingMessagesInitial: remainingMessagesInitial,
            remainingMessages: remainingMessages,
            messagesLoaded: messagesLoaded
          });
        },2000);

        return true;
      }
    });
})();