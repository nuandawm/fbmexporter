$(function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var popupLog = function(logMessage){
      chrome.tabs.sendMessage(tabs[0].id, {action: 'popupLog', logMessage: logMessage});
    };

    var humanizeTime = function(seconds){
      seconds = Math.floor(seconds);
      return  (seconds>=3600 ? Math.floor(seconds/3600)+'h ' : '') +
              (seconds>=60 ? (Math.floor(seconds/60)%60)+'m ' : '') +
              (seconds%60)+'s';
    };

    var keepOnLoading = true;
    var lastRemainingMessages = null;
    var meanLoadedMessages = 0;

    $('#startButt').click(function(){
      $('#startButt').hide();
      $('#stopButt').show();
      $('#status').html('Loading messages...');
      keepOnLoading = true;

      var loadMessages = function(){
        chrome.tabs.sendMessage(tabs[0].id, {action: 'loadMessages'}, function(response) {
          var perc = 100 - 100 * response.remainingMessages / response.remainingMessagesInitial;
          if (lastRemainingMessages === null) {
            meanLoadedMessages = response.remainingMessagesInitial - response.remainingMessages;
          }
          else {
            // Calculating mean
            var loadedMessages = lastRemainingMessages - response.remainingMessages;
            if (response.counter === 7)
              loadedMessages = 0;
            meanLoadedMessages = meanLoadedMessages * (response.counter - 1) / response.counter
              + (loadedMessages / response.counter);
            var secondsRemaining = 2 * response.remainingMessages / meanLoadedMessages;
            if (!isNaN(secondsRemaining))
              $('#status').html('Time remaining: '+humanizeTime(secondsRemaining));
          }
          lastRemainingMessages = response.remainingMessages;

          //$('#status').html('Still to load: '+response.remainingMessages+' '+response.remainingMessagesInitial);

          if (response.messagesLoaded)
            $('.meter span').animate({width: '100%'},'fast');
          else
            $('.meter span').animate({width: perc+'%'},'fast');

          if (response.messagesLoaded || !keepOnLoading)
            getMessages();
          else
            loadMessages();
        });
      };

      var getMessages = function(){
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getMessages'}, function(response) {
          generatePage(response.messages);
        });
      };

      var generatePage = function(messages){
        $.get('../css/fbm_style.css', function(data){
          var htmlCode = '<html><head lang="it"><meta charset="UTF-8">';
          htmlCode += '<style>'+data+'</style>';
          htmlCode += '</head><body><ul>';
          htmlCode += messages;
          htmlCode += '</ul></body></html>';
          var aFileParts = [htmlCode];
          var oMyBlob = new Blob(aFileParts, {type : 'text/html'});
          saveAs(oMyBlob, 'fbmessages.html');

          $('#stopButt').hide();
          $('#startButt').show();
        });
      };

      loadMessages();
    });

    $('#stopButt').click(function(){
      keepOnLoading = false;
    });
  });
});