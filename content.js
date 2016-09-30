chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "getMessages") {
      /*var counter = 0;
      var reloadInterval = setInterval(function(){
        console.log('interval reloaded');
        if (counter < 3)
          document.getElementById('webMessengerRecentMessages').parentNode.children[0].children[0].children[0].click();
        else {
          clearInterval(reloadInterval);
          console.log('interval stopped');*/

          var webMessengerRecentMessages = document.getElementById('webMessengerRecentMessages').outerHTML;
          sendResponse({messages: webMessengerRecentMessages});
        /*}
        counter += 1;
      },2000);*/
    }
  });