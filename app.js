    document.addEventListener('DOMContentLoaded', function () {
      //define variables
      var playersOnField = document.querySelector('.players');
      var button = document.getElementById('button');
        // set time for each frame to be displayed
      var frameTime = data.interval;
      //define variable for later use of setInterval;
      var playMatch = null;
      //using timeBar as indicator of current time frame
      var timeBar = document.querySelector('#time');
      //indicate time counters - left for current time and right for total match time
      var counter = document.getElementById('time-counter');
      var counterTotal = document.getElementById('total-time-counter');


      //its maximum value needs to be adjusted to the number of the frames we have
      timeBar.setAttribute("max", parseInt(data.player_positions.length)-1);

      //set up right hand "total time counter"
      //use number of all frames to determine the lenght of whole match
      var totalMinutes = Math.floor((parseInt(data.player_positions.length)-1)/600);
      var totalSeconds = Math.floor(((parseInt(data.player_positions.length)-1)/10)%60);
      //precede numbers with 0 if lesser than 10, and display
      if (totalSeconds < 10) {
        totalSeconds = '0' + totalSeconds;
      }
      if (totalMinutes < 10) {
        totalMinutes = '0' + totalMinutes;
      }
      counterTotal.innerHTML = totalMinutes +":"+totalSeconds;


      //display the players position for current frame
      positionPlayers = function() {
        var time = timeBar.value;
        var currentFrame = data.player_positions[time];
        //check if DOM element representing each player of current frame already exists, if not - create it
        for (var i = 0; i < currentFrame.length; i++) {
          var playerId = currentFrame[i][0];
          if (!document.getElementById(`${playerId}`)) {
            var newPlayer = document.createElement('div');
            newPlayer.classList.add('player');
            newPlayer.innerHTML = playerId;
            newPlayer.id = `${playerId}`;
            playersOnField.appendChild(newPlayer);
          }
          //select player that is described by current ID
          var currentPlayer = document.getElementById(`${playerId}`);
          //set position values, derived from data and set as percentage
          var positionX = (currentFrame[i][1]*100), positionY = (currentFrame[i][2]*100);
          //set player position, using given coordinates as percentage of height/width of soccer field
          currentPlayer.style.cssText = `left: ${positionX}%; bottom: ${positionY}%;`;
        }

        //setup the left counter: format time given in number of 100ms-frames
        var currentMinutes = Math.floor(time/600);
        var currentSeconds = Math.floor((time/10)%60);
        var setTimer = function() {
          //precede numbers with 0 if lesser than 10
          if (currentSeconds < 10) {
            currentSeconds = '0' + currentSeconds;
          }
          if (currentMinutes < 10) {
            currentMinutes = '0' + currentMinutes;
          }
          counter.innerHTML = currentMinutes +":"+currentSeconds;
        }
        setTimer();
      }
      //call function first time to ensure players are on the field already when match starts  ;)
      positionPlayers();

      //define function that will be called when play button is clicked
      playPause = function() {
        //check if the game is currently being played or paused
        if (button.classList.contains('paused')) {
          //start passing time, if game was paused using data.interval as interval value and re-position player every frame; stop when time bar reaches maximum value
          playMatch = setInterval(function() {
                                  timeBar.value != timeBar.getAttribute('max') ? timeBar.value = parseInt(timeBar.value)+1 : clearInterval(playMatch);
                                  positionPlayers();
                                }, frameTime);
            button.innerHTML = "Pause the game";
        } else if (!button.classList.contains('paused')) {
          //pause the game if it wasn't
          clearInterval(playMatch);
          button.innerHTML = "Play the game";
        }
        button.classList.toggle('paused');
      }
      button.addEventListener('click', playPause);
      //every time the bar changes its postion (and therefore its value) it should trigger the action to set up the players in the current position on the field
      timeBar.addEventListener('change', positionPlayers);
      timeBar.addEventListener('input', positionPlayers);
      //the match should be paused, when input is manually changed
      timeBar.addEventListener('click', function() {
        clearInterval(playMatch);
        if(!button.classList.contains('paused')){
          button.classList.add('paused');
        }
        button.innerHTML = "Play the game";
      });
    })
