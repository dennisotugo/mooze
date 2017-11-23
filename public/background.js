chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'outerBounds': {
      'width': 335,
      'height': 350
    }
  });
});
