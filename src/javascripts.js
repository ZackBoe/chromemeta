document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.executeScript(null, {file: "src/inject.js"});
    var port = chrome.runtime.connect();
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request) {
            $('.none').hide();
            pop(request);
        }
        else alert('Error selecting meta');
      });


    $('.title').click(function() { copy(meta.title) })
    $('.keywords').click(function() { copy(meta.meta.keywords) })
    $('.description').click(function() { copy(meta.meta.description) })
    $('.link').click(function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });

});


function pop(content) {
    window.meta = content;
    if (!content.title && !content.meta.description && !content.meta.keywords) $('.none').css('display', 'inline-block');
    if (content.title) $('.title').css('display', 'inline-block');
    if (content.meta.description) $('.description').css('display', 'inline-block');
    if (content.meta.keywords) $('.keywords').css('display', 'inline-block');
}


function copy(text) {
    var copy = document.createElement('div');
    copy.contentEditable = true;
    document.body.appendChild(copy);
    copy.innerHTML = text;
    copy.unselectable = "off";
    copy.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy");
    document.body.removeChild(copy);
    window.close();
}
