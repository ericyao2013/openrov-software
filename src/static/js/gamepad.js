//http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html
//useful for testing the buttons and finding the numbers
//
//Requires the https://github.com/kallaspriit/HTML5-JavaScript-Gamepad-Controller-Library
//library.
var GAMEPAD = new Object();

var GamePad = function() {
  var gamepad = new Gamepad();
  var gp = {};
  
    var isSupported = function () {
    };

    var ignoreInputUntil = 0;

    gp.getPositions = function() {
        window.requestAnimationFrame(updateStatus);
        return padStatus.position;
    }

  
    
    gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
      GAMEPAD[e.control].Gamepad.Event.BUTTON_DOWN();
    });
    
    gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
      if ((new Date().getTime()) < ignoreInputUntil) return; //avoids inacurrate readings when the gamepad has just been connected from affecting the ROV
      GAMEPAD[e.control].Gamepad.Event.AXIS_CHANGED(e.value);
    });

  var updateStatus = function() {
     window.requestAnimationFrame(updateStatus);
  }

  gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
    ignoreInputUntil = new Date().getTime() + 1000;
    console.log('Controller connected', device);
    detectionHandler();
  });

  gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
    console.log('Controller disconnected', device);
    detectionHandler();
  });

  gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
    console.log('Unsupported controller connected', device);
  });  

  gp.isAvailable = function() {
    if(gamepad.count() == 0) return false;
      return true;
  }
  
  if (!gamepad.init()) {
          console.log('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
  }  

  return gp;
}
