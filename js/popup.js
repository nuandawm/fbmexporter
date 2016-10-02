$(function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var keepOnLoading = true;

    $('#startButt').click(function(){
      $('#startButt').hide();
      $('#stopButt').show();
      $('#status').html('Loading messages...');
      keepOnLoading = true;

      var getMessages = function(){
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getMessages'}, function(response) {
          var perc = 100 - 100 * response.remainingMessages / response.remainingMessagesInitial;
          $('#status').html('Still to load: '+response.remainingMessages);
          $('.meter span').animate({width: perc+'%'},'fast');
          if (response.messagesLoaded || !keepOnLoading)
            generatePage(response.messages);
          else
            getMessages();
        });
      };

      var generatePage = function(messages){
        var htmlCode = '<html><head lang="it"><meta charset="UTF-8"></head><body><ul>';
        htmlCode += messages;
        htmlCode += '</ul></body></html>';
        var aFileParts = [htmlCode];
        var oMyBlob = new Blob(aFileParts, {type : 'text/html'});
        saveAs(oMyBlob, 'fbmessages.html');

        $('#stopButt').hide();
        $('#startButt').show();
      };

      getMessages();
    });

    $('#stopButt').click(function(){
      keepOnLoading = false;
    });
  });
});