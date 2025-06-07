 var myObstacles = [];
//create an array of obstacles

var myGameArea = {
  canvas : document.createElement("canvas"),//create a game area
  //The start() method creates a <canvas> element and inserts it as the first childnode of the <body> element.
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.canvas.style.cursor = "none"; //hide the original cursor
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
     this.frameNo = 0; 
    this.interval = setInterval(updateGameArea, 20); // 50 times per second
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = myGameArea.keys || {};
      myGameArea.keys[e.key] = true;
    })
    window.addEventListener('keyup', function (e) {
      if (myGameArea.keys) myGameArea.keys[e.key] = false;
    })
    window.addEventListener('mousemove', function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
   stop : function() {
    clearInterval(this.interval);
  }
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
var  myGamePiece;//create a game piece <// it is an object of tyxpe component
//The start() method creates a <canvas> element and inserts it as the first childnode of the <body> element.
function startGame() {
  myGameArea.start();
  myGamePiece = new component(140, 30, "red", 10, 120);
   myObstacle = new component(10, 200, "green", 300, 120);
   
  myScore = new component("30px", "Consolas", "black", 280, 40, "text");
} // my Function to start the game

class component {
  constructor(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.text = "";
    this.color = color;
  }

  update() {
    const ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
function updateGameArea() {
  var x;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();

  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (let i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myObstacle.x += -1;
  myGamePiece.newPos();
  myGamePiece.update();
  myObstacle.update();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.x && myGameArea.y) {
    myGamePiece.x = myGameArea.x;
    myGamePiece.y = myGameArea.y;
  }

  // Keyboard controls using 'key'
  if (myGameArea.keys) {
    if (myGameArea.keys["ArrowLeft"]) {
      myGamePiece.speedX -= 1;
    }
    if (myGameArea.keys["ArrowRight"]) {
      myGamePiece.speedX += 1;
    }
    if (myGameArea.keys["ArrowUp"]) {
      myGamePiece.speedY -= 1;
    }
    if (myGameArea.keys["ArrowDown"]) {
      myGamePiece.speedY += 1;
    }
  }

  if (myGamePiece.x < 0) {
    myGamePiece.x = 0;
  }
  if (myGamePiece.x > myGameArea.canvas.width) {
    myGamePiece.x = myGameArea.canvas.width;
  }
  if (myGamePiece.y < 0) {
    myGamePiece.y = 0;
  }
  if (myGamePiece.y > myGameArea.canvas.height) {
    myGamePiece.y = myGameArea.canvas.height;
  }
} //update the game area
      myGamePiece.y = 0;
    }
    if(myGamePiece.y > myGameArea.canvas.height) { //if the game piece is out of the canvas
      myGamePiece.y = myGameArea.canvas.height;
    }
} //update the game area

function moveup() { //move the game piece up
  myGamePiece.speedY -= 1;
}

function movedown() {
  myGamePiece.speedY += 1;
}

function moveleft() {
  myGamePiece.speedX -= 1;
}

function moveright() {
  myGamePiece.speedX += 1;
}
function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
} //stop the game piece
