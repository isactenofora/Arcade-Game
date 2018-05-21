'use strict;'
/*Enemies our player must avoid
*/
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
      this.x = 0;
      this.speed =  70 + Math.floor(Math.random() * 150);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.moveCounter = 0;
};

Player.prototype.update = function (dt) {
    //not implemented
};

Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (firstMove == true && (direction == 'up') || (direction == 'down') || (direction == 'right') || (direction == 'left')) {
    if (startTime == true) {
        refreshInterval = setInterval(incrementSeconds, 1000); //function that call incrementSeconds every 1 seconds (1000ms)
        startTime = false;
    }
    firstMove = false; }
    if (direction == 'up' && this.y > 0) {
        this.y -= 83;
        this.moveCounter++; //add a move
        document.getElementsByClassName("moves")[0].innerText = this.moveCounter; //change the move counter
    } if (direction == 'down' && this.y < 405) {
        this.y += 83;
        this.moveCounter++; //add a move
        document.getElementsByClassName("moves")[0].innerText = this.moveCounter; //change the move counter
    } if (direction == 'left' && this.x > 0) {
        this.x -= 101;
        this.moveCounter++; //add a move
        document.getElementsByClassName("moves")[0].innerText = this.moveCounter; //change the move counter
    } if (direction == 'right' && this.x < 305) {
        this.x += 101;
        this.moveCounter++; //add a move
        document.getElementsByClassName("moves")[0].innerText = this.moveCounter; //change the move counter
    } if (this.y < 0) {
        swal({ //add the library sweetalert to make the alert message more pretty
           title: "Congratulations! You win in " + seconds + " seconds and " + this.moveCounter + " moves!",
           text: "To play again press ok",
           icon: "success",
         });
         score.push(this.moveCounter); //add the total number of needed moves to complete the game
         score = score.sort((a, b) => a - b); // function to sort the list score
         let rankingElements = document.getElementsByClassName('topTenRanking');
         while(rankingElements.length > 0) //delete all label elements with class topTenRanking
         {
             rankingElements[0].remove();
         }
         for(let i = 0; i < score.length; i++) {
           if(i < 10) {
             let topTen = document.createElement('label');
             topTen.className = 'topTenRanking';
             movesPanel.appendChild(topTen);
             topTen.innerHTML= score[i] + " moves";
            } else {
              break;
            }
          }

        let self = this;
        setTimeout(function() {
           self.x = 202;  //set the player to the initial position in x
           self.y = 405; //set the player to the initial position in y

         }, 500);
        clearInterval(refreshInterval); //to clean the timer
        seconds = 0; //set value of seconds to zero
        document.getElementsByClassName("time")[0].innerText = 0;
        this.moveCounter = 0;
        document.getElementsByClassName("moves")[0].innerText = 0; //take all elements with moves class and change its text to 0
        startTime = true;
        firstMove = true;
      }
  };

// Function to set the player to the initial position and to clean the timer and the move counter
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 405;
  clearInterval(refreshInterval);
  seconds = 0;
  document.getElementsByClassName("time")[0].innerText = 0;
  this.moveCounter = 0;
  document.getElementsByClassName("moves")[0].innerText = 0;
  startTime = true;
  firstMove = true;

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy = new Enemy();
let allEnemies = []; //create an empty array
let enemyPosition = [63, 147, 230];

enemyPosition.forEach(function (locationY) {
  let enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);  //save the enemies in the array allEnemies at their position and with an initial speed
});

let player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
