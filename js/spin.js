

$(document).ready(function () {
  var opts = {
  lines: 20, // The number of lines to draw
  length: 0, // The length of each line
  width: 15, // The line thickness
  radius: 42, // The radius of the inner circle
  scale: 0.85, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#41d62b', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  opacity: 0.05, // Opacity of the lines
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 74, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '40%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: 0, // Box-shadow for the lines
  position: 'absolute' // Element positioning
};

var target = document.getElementById('spinnerContainer');
var spinner = new Spinner(opts).spin(target);
});