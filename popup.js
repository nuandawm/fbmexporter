$(function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getMessages'}, function(response) {
      $('#status').html(response.counter+' messages loaded!');
      var htmlCode = '<html><head lang="it"><meta charset="UTF-8"></head><body>';
      htmlCode += response.messages;
      htmlCode += '</body></html>';
      var aFileParts = [htmlCode];
      var oMyBlob = new Blob(aFileParts, {type : 'text/html'});
      saveAs(oMyBlob, 'fbmessages.html');
    });
  });
});