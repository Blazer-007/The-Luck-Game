console.log('enter');
var doorImage1 = document.getElementById("door1");
var doorImage2 = document.getElementById("door2");
var doorImage3 = document.getElementById("door3");
var startButton = document.getElementById("start");
var botDoorPath = "./images/robot.svg";

var beachDoorPath = "./images/beach.svg";

var spaceDoorPath = "./images/space.svg";

var closedDoorPath = "./images/closed_door.svg";

var numClosedDoors = 3;
var openDoor1 , openDoor2 , openDoor3 ;
var currentPlaying = true;

var isBot = door => {
  let path1 = door.src.split('/');
  let path2 = botDoorPath.split('/');
  if (path1[path1.length-1] === path2[path2.length-1]) {
    return true;
  } else {
    return false;
  }
};

var isClicked = door => {
  var path1 = door.src.split('/');
  var path2 = closedDoorPath.split('/');
  console.log(typeof path1);
  console.log(path1.length);
  console.log(path2.length);
  if (path1[path1.length-1] === path2[path2.length-1]) {
    return false;
  } else {
    return true;
  }
  // if (door.src === closedDoorPath) {
  //   return false;
  // } else {
  //   return true;
  // }
};

var playDoor = door => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if(isBot(door)) {
    gameOver();
  }
};

var randomChoreDoorGenerator = () => {
  var choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

doorImage1.onclick = () => {
  console.log("clicked");
  console.log(currentPlaying);
  // console.log(isClicked(doorImage1));
  // console.log(doorImage1.src);
  // console.log(closedDoorPath);
  if (currentPlaying && !isClicked(doorImage1)) {
    console.log('insode');
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  console.log("clicked2");
  if (currentPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  console.log("clicked3");
  if (currentPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if (currentPlaying === false) {
    startRound();
  }
};

var startRound = () => {
  numClosedDoors = 3;
  currentPlaying = true;
  startButton.innerHTML = 'Good Luck!!!';
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  console.log(doorImage1.src);
  randomChoreDoorGenerator();
}

var gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?';
  }
  currentPlaying = false;
};

startRound();
