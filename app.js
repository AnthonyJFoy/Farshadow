// Assign let variables for game values to change
let combatLevel = 1;
let itemsOwnedArray = [];
let roomLevel = 1;
let battlesWon = 0;
let battlesLost = 0;
let monsterLevel = 0;

// Assign various html elements to constants
const showRoomResult = document.getElementById("room-result-display");
const showMonsterName = document.getElementById("monster-name-display");
const showMonsterLevel = document.getElementById("monster-level-display");
const showGameStatus = document.getElementById("status-display");

const enterRoomButton = document.getElementById("enter-room")
const fightMonsterButton = document.getElementById("fight-monster");
const runAwayButton = document.getElementById("run-away");
const lootRoomButton = document.getElementById("loot-room");
const nextRoomButton = document.getElementById("next-room");
const respawnButton = document.getElementById("respawn");

const combatLevelDisplay = document.getElementById("combat-level")
const itemsOwnedDisplay = document.getElementById("items-owned")

const currentRoomLevelDisplay = document.getElementById("current-room-level")
const battlesWonDisplay = document.getElementById("battles-won")
const battlesLostDisplay = document.getElementById("battles-lost")

//Assign buttons to functions
enterRoomButton.addEventListener("click", enterRoom);
fightMonsterButton.addEventListener("click", fightMonster);
runAwayButton.addEventListener("click", runAway);
lootRoomButton.addEventListener("click", lootRoom);
nextRoomButton.addEventListener("click", nextRoom);
respawnButton.addEventListener("click", respawn);

// hide all buttons until needed
fightMonsterButton.style.display = "none";
runAwayButton.style.display = "none";
lootRoomButton.style.display = "none";
nextRoomButton.style.display = "none";
respawnButton.style.display = "none";

// Assign variables to used in multiple functions
let roomResultString = "";

// Run updateStats to show starting stats on screen.
updateStats();

// Update all stats on screen with those held in variables
function updateStats() {
combatLevelDisplay.innerHTML = combatLevel;
itemsOwnedDisplay.innerHTML = itemsOwnedArray;
currentRoomLevelDisplay.innerHTML = roomLevel;
battlesWonDisplay.innerHTML = battlesWon;
battlesLostDisplay.innerHTML = battlesLost;
}

function enterRoom() {
    // hide appropriate html elements
    enterRoomButton.style.display = "none";
    nextRoomButton.style.display = "none";
    respawnButton.style.display = "none";
    showGameStatus.innerHTML = "";
    randomRoomGenerator();
}

// Chooses a random room and returns a string to HTML
function randomRoomGenerator() {
    var roomNumber = Math.floor((Math.random() * 4) + 1);
    if (roomNumber == 1) {
        showRoomResult.innerHTML = "This room is clear from monsters. It's filled with old chests and boxes. You may safely loot the room."; // show string on page
        lootRoomButton.style.display = "block";
    } 
    else if (roomNumber == 1) {
        showRoomResult.innerHTML= "This room contains skeletons and dried blood, remnants from an earlier battle. There is nothing of value here. You move on."
        nextRoomButton.style.display = "block";
    }
    else if (roomNumber == 2){
        showRoomResult.innerHTML = "You're met with a monster, its extremely hostile towards you! You can choose to either fight or attempt to run away!"
        var monsterToFace = monsterGenerator()
        monsterLevel = monsterToFace.monsterLevel;
        showMonsterName.innerHTML = "Monster: " + (monsterToFace.monsterName);
        showMonsterLevel.innerHTML = "Level: " + (monsterToFace.monsterLevel);
        // Show fight and run buttons
        fightMonsterButton.style.display = "block";
        runAwayButton.style.display = "block";
    }
    else if (roomNumber == 3) {
        showRoomResult.innerHTML = "A horde of Goblins ambush you! They attempt take one of your items."
        nextRoomButton.style.display = "block";
        goblinItemSteal();
    }
    else if (roomNumber == 4) {
        showRoomResult.innerHTML = "The ground starts to rumble, you worry what you have just disturbed! This foe may be beyond you, good luck!";
        var monsterToFace = monsterGeneratorBoss()
        monsterLevel = monsterToFace.monsterLevel;
        showMonsterName.innerHTML = "Monster: " + (monsterToFace.monsterName);
        showMonsterLevel.innerHTML = "Level: " + (monsterToFace.monsterLevel);
        // Show fight and run buttons
        fightMonsterButton.style.display = "block";
        runAwayButton.style.display = "block";
    }
    return roomResultString;
}

// Choose random monster from monsterArray and return.
function monsterGenerator() {
    const randomMonster = Math.floor(Math.random() * monsterArray.length);
    monsterChosen = monsterArray[randomMonster];
    return monsterChosen;
}

function monsterGeneratorBoss() {
    const randomMonster = Math.floor(Math.random() * bossMonsterArray.length);
    monsterChosen = bossMonsterArray[randomMonster];
    return monsterChosen;
}

// Choose random loot from lootArray and return
function lootRoom() {
    // Remove HTML elements from screen.
    lootRoomButton.style.display = 'none';
    showRoomResult.innerHTML = "";
    showMonsterLevel.innerHTML = "";
    showMonsterName.innerHTML = "";

    const randomLoot = Math.floor(Math.random() * lootArray.length)
    lootChosen = lootArray[randomLoot];
    itemGained = lootChosen.weaponName;
    itemLevel = lootChosen.weaponLevel;

    if (itemsOwnedArray.includes(itemGained)) { // Check for duplicates.
        showGameStatus.innerHTML = "You have found a " + itemGained + "! You already have this item. You discard it and get ready to continue.";
    } else {
        combatLevel = combatLevel + itemLevel;
        itemsOwnedArray.push(itemGained); // push item gained onto items owned array
        updateStats();
        showGameStatus.innerHTML = "You have found a " + itemGained + "! It is worth " + itemLevel + " combat levels. Your combat level is now " + combatLevel + ".";
    }
    nextRoomButton.style.display = "block"; // show next room button
}

function fightMonster() {
    fightMonsterButton.style.display = "none";
    runAwayButton.style.display = "none";
    showMonsterLevel.innerHTML = "";
    showMonsterName.innerHTML = "";
    if (combatLevel >= monsterLevel) {
        showRoomResult.innerHTML = "";
        showGameStatus.innerHTML = "You battle the monster with all you have. You WIN the battle. You may now loot the monsters items and continue on.";
        roomLevel ++;
        battlesWon ++;
        updateStats();
        lootRoomButton.style.display = "block";
        checkWinCondition();
    } else if (combatLevel < monsterLevel) {
        showGameStatus.innerHTML = "You battle the monster with all you have. You LOSE the battle. Your combat level was simply not high enough. You have died and you must respawn in the first room.";
        showRoomResult.innerHTML = "";
        youAreDead();
    }
}

function runAway() {
    var diceNumber = rollDice();
    fightMonsterButton.style.display = "none";
    runAwayButton.style.display = "none";
    showRoomResult.innerHTML = "";
    showMonsterLevel.innerHTML = "";
    showMonsterName.innerHTML = "";
    if (diceNumber >= 3) {
        // successful escape
        showGameStatus.innerHTML = "You rolled a " + diceNumber + " and MANAGED to escape! Continue forward...";
        nextRoomButton.style.display = "block";
    } else {
        // failed escape
        showGameStatus.innerHTML = "You rolled a " + diceNumber + " and FAILED to escape! The monster kills you! You must respawn to continue...";
        youAreDead();
    }
}

//dice roll function numbers 1-6 and assign image to web page
function rollDice() {
    var randomNumber = Math.floor((Math.random() * 6) + 1);
    console.log(randomNumber); // test dice roll
    document.querySelector(".diceImg").setAttribute("src", "./images/" + "dice-" + randomNumber + ".png"); // take dice image from diceRoll area, create new image from randomNumber and dice image and assign new image to diceRoll area.
    return randomNumber;
}

function nextRoom() {
    showGameStatus.innerHTML = "";
    enterRoom();
}

// lose battle, items and clear combat level
function youAreDead() {
    battlesLost ++;
    itemsOwnedArray = []; // clear array to drop all items
    combatLevel = 1;
    updateStats();
    respawnButton.style.display = "block";
}

function respawn() {
    enterRoom();
}

function checkWinCondition() {
    if (roomLevel >= 10) {
        showGameStatus.innerHTML = "You have reached room 10 of the adventure! You have completed your mission! Well done, feel free to play again";
        // Hide all buttons
        fightMonsterButton.style.display = "none";
        runAwayButton.style.display = "none";
        lootRoomButton.style.display = "none";
        nextRoomButton.style.display = "none";
        respawnButton.style.display = "none";
    }
}

function goblinItemSteal() {
    if (itemsOwnedArray.length >= 1) {
        var randomIndexNum = Math.floor(Math.random() * itemsOwnedArray.length)
        takenItem = itemsOwnedArray[randomIndexNum];
        if (rollDice() >= 3) {
            itemsOwnedArray.splice(randomIndexNum, 1);
            showGameStatus.innerHTML = "The Goblins take your " + takenItem + " and flee whilst laughing!";
            updateStats();
        } else {
            showGameStatus.innerHTML = "The Goblins try to take your " + takenItem + " but you manage to fight them off. They scurry away into the darkness.";
        }
    } else {
        showGameStatus.innerHTML = "The Goblins see you have nothing of value and berate you for twenty minutes. They leave knowing they will encounter you again!";
    }
    
}