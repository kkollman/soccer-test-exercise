    document.addEventListener('DOMContentLoaded', function () {
      //define variables
      var playersOnField = document.querySelector('.players');

      //using timeBar as indicator of current time frame
      var timeBar = document.querySelector('#time');

      //its maximum value needs to be adjusted to the number of the frames we have
      timeBar.setAttribute("max", data.player_positions.length);

      //display the players position for current frame
      positionPlayers = function() {
        time = timeBar.value;
        currentFrame = data.player_positions[time];
        //check if DOM element representing each player of current frame already exists, if not - create it
        for (var i = 0; i < currentFrame.length; i++) {
          var playerId = currentFrame[i][0];
          if (!document.getElementById(`${playerId}`)) {
            var newPlayer = document.createElement('div');
            newPlayer.classList.add('player');
            newPlayer.innerHTML = playerId;
            newPlayer.id = `${playerId}`;
            playersOnField.appendChild(newPlayer);
          } else {
            //select player that is described by current ID
            var currentPlayer = document.getElementById(`${playerId}`);
            //set position values, derived from data
            var positionX = (currentFrame[i][1]*100), positionY = (currentFrame[i][2]*100);
            //set position
            currentPlayer.style.cssText = `left: ${positionX}%; bottom: ${positionY}%;`;
          }
        }
      }

      //call function first time to ensure players are on the field already when match starts  ;) plus, it has to be run twice: once to crate players, second - to move them
      positionPlayers();
      positionPlayers();


      //every time the bar changes its postion (and therefore its value) it should trigger the action to set up the players in the current position on the field
      timeBar.addEventListener('change', positionPlayers);
      timeBar.addEventListener('input', positionPlayers);


    })
