// Enemies our player must avoid
class Enemy{
  constructor(x=0, y=55, speed=150){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y+55;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step*5;
    this.resetPos = -this.step;
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundary){ //enemy not out of bounds
      this.x += this.speed*dt;
    }
    else{
      this.x = this.resetPos; //reset enemy position
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.step = 101; //based on block size
    this.jump = 83; // based on block size
    this.startX = this.step*2;
    this.startY = this.jump*4 + 55; //some padding
    this.x = this.startX;
    this.y = this.startY;
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(){
    for(let enemy of allEnemies){
      if(this.y === enemy.y &&
        (enemy.x+enemy.step/2 > this.x &&
          enemy.x < this.x + this.step/2)){
        this.reset();
      }
    }
  }
  reset(){ //reset hero back to the start of the level
    this.x = this.startX;
    this.y = this.startY;
  }
  /*
   * Update hero's x/y position based on keyboard input
   * @param {string} input - direction to travel
   */
   handleInput(input){
     if(input == 'left'){
       if(this.x > 0){
         this.x -= this.step;
       }
     }
     else if(input == 'right'){
       if(this.x < this.step*4){
         this.x += this.step;
       }
     }
     else if(input == 'up'){
       if(this.y > this.jump){
         this.y -= this.jump;
       }
     }
     else if(input == 'down'){
       if(this.y < this.jump*4){
         this.y += this.jump;
       }
     }
   }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy(-101*2.5, 83, 300);
const allEnemies = [];
allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
