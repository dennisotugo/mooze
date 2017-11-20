function hello() {
  chrome.tabs.executeScript({
    file: '/static/js/main.72f323ed.js'
  }); 
}

chrome.runtime.getBackgroundPage(backgroundPage => backgroundPage.testMethod());

// event listener for the button inside popup window
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('button');
    button.addEventListener('click', function() {
        addLink();
    });
});
