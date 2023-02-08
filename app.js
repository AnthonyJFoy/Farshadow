// Assign let variables for game values to change
let battleLevel = 9;
let combatLevel = 0;
let itemsOwnedArray = [];
let roomLevel = 0;
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

const battleLevelDisplay = document.getElementById("battle-level")
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

// Array of monsters to fight
const monsterArray = [
    {
        monsterName: "Liquid Snake",
        monsterLevel: 5,
    },
    {
        monsterName: "Revolver Ocelot",
        monsterLevel: 4,
    },
    {
        monsterName: "Sniper Wolf",
        monsterLevel: 3,
    },
    {
        monsterName: "Raven",
        monsterLevel: 2,
    },
    {
        monsterName: "Psycho Mantis",
        monsterLevel: 1,
    },
    {
        monsterName: "Grey Fox",
        monsterLevel: 10,
    },

]

// Array of loot items
const lootArray = [
    {
        weaponName: "Sword",
        weaponLevel: 5,
    },
    {
        weaponName: "Shield",
        weaponLevel: 3,
    },
    {
        weaponName: "Armour",
        weaponLevel: 2,
    }
    
]

updateStats();

// Update all stats on screen with those held in variables
function updateStats() {
// Assign numbers to character stats
battleLevelDisplay.innerHTML = battleLevel;
combatLevelDisplay.innerHTML = combatLevel;
itemsOwnedDisplay.innerHTML = itemsOwnedArray;

// Assign numbers to battle-stats
currentRoomLevelDisplay.innerHTML = roomLevel;
battlesWonDisplay.innerHTML = battlesWon;
battlesLostDisplay.innerHTML = battlesLost;
}


function enterRoom() {
    // hide Enter Room button and next room button when clicked
    enterRoomButton.style.display = "none";
    nextRoomButton.style.display = "none";
    respawnButton.style.display = "none";
    randomRoomGenerator();
    if (roomResultString.includes("clear")) {
        lootRoomButton.style.display = "block";
    } else {
        var monsterToFace = monsterGenerator()
        monsterLevel = monsterToFace.monsterLevel;
        showMonsterName.innerHTML = "Monster: " + (monsterToFace.monsterName);
        showMonsterLevel.innerHTML = "Level: " + (monsterToFace.monsterLevel);
        // Show fight and run buttons
        fightMonsterButton.style.display = "block";
        runAwayButton.style.display = "block";
    }

}

function randomRoomGenerator() {
    var roomNumber = Math.floor((Math.random() * 2) + 1);
    if (roomNumber == 1) {
        roomResultString = "The room is clear, there are no monsters! You may loot the room."
        // show string on page
        showRoomResult.innerHTML = roomResultString;
    } else {
        roomResultString = "A monster waits in the room! You can choose to fight or to run."
        showRoomResult.innerHTML = roomResultString;
    }
    return roomResultString;
}

// Choose random monster from monsterArray and return
function monsterGenerator() {
    const randomMonster = Math.floor(Math.random() * monsterArray.length);
    monsterChosen = monsterArray[randomMonster];
    // return the monster from the array
    return monsterChosen;
}

// Choose random loot from lootArray and return
function lootRoom() {
    // remove lootRoomButton 
    lootRoomButton.style.display = 'none';
    showRoomResult.innerHTML = "";
    showMonsterLevel.innerHTML = "";
    showMonsterName.innerHTML = "";
    const randomLoot = Math.floor(Math.random() * lootArray.length)
    lootChosen = lootArray[randomLoot];
    // console.log(lootChosen); // test return value
    itemGained = lootChosen.weaponName;
    console.log(itemGained); // test itemGained
    itemLevel = lootChosen.weaponLevel;
    console.log(itemLevel); // test itemLevel
    combatLevel = combatLevel + itemLevel;
    // push item gained onto items owned array
    itemsOwnedArray.push(itemGained);
    // update on screen stats to show new combat level and items owned.
    updateStats();
    showGameStatus.innerHTML = "You have found a " + itemGained + "! It is worth " + itemLevel + " combat levels. Your combat level is now " + combatLevel;
    // show next room button
    nextRoomButton.style.display = "block";
}

function fightMonster() {
    fightMonsterButton.style.display = "none";
    runAwayButton.style.display = "none";
    showMonsterLevel.innerHTML = "";
    showMonsterName.innerHTML = "";
    if (battleLevel >= monsterLevel) {
        showRoomResult.innerHTML = "";
        showGameStatus.innerHTML = "You are stronger than the monster and the fight is won! You may loot the room.";
        battleLevel ++;
        roomLevel ++;
        battlesWon ++;
        updateStats();
        lootRoomButton.style.display = "block";
    } else if (battleLevel < monsterLevel) {
        showGameStatus.innerHTML = "The fight is LOST! You were too weak.";
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

function youAreDead() {
    // lose battle and update stats
    battlesLost ++;
    // clear array to drop all items
    itemsOwnedArray = [];
    combatLevel = 0;
    updateStats();
    respawnButton.style.display = "block";
}

function respawn() {
    enterRoom();
}