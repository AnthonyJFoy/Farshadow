// Assign let variables for game values to change
let battleLevel = 9;
let combatLevel = 0;
let itemsOwned = [];
let roomLevel = 0;
let battlesWon = 0;
let battlesLost = 0;
let monsterLevel = 0;

// Assign various html elements to constants
const showRoomResult = document.getElementById("room-result-display");
const showMonsterName = document.getElementById("monster-name-display");
const showMonsterLevel = document.getElementById("monster-level-display");

const enterRoomButton = document.getElementById("enter-room")
const fightMonsterButton = document.getElementById("fight-monster");
const runAwayButton = document.getElementById("run-away");
const lootRoomButton = document.getElementById("loot-room");
const nextRoomButton = document.getElementById("next-room");

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

// hide fight, loot, next room and run away buttons until needed
fightMonsterButton.style.display = "none";
runAwayButton.style.display = "none";
lootRoomButton.style.display = "none";
nextRoomButton.style.display = "none";

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
itemsOwnedDisplay.innerHTML = itemsOwned;


// Assign numbers to battle-stats
currentRoomLevelDisplay.innerHTML = roomLevel;
battlesWonDisplay.innerHTML = battlesWon;
battlesLostDisplay.innerHTML = battlesLost;
}


function enterRoom() {
    // hide Enter Room button and next room button when clicked
    enterRoomButton.style.display = "none";
    nextRoomButton.style.display = "none";
    randomRoomGenerator();
    if (roomResultString.includes("clear")) {
        // console.log("clear");
        // lootRoom();
        // show lootRoomButton to enable the room to be looted
        lootRoomButton.style.display = "block";
    } else {
        // console.log("monster");
        var monsterToFace = monsterGenerator()
        monsterLevel = monsterToFace.monsterLevel;
        // console.log(typeof monsterLevel);
        showMonsterName.innerHTML = (monsterToFace.monsterName);
        showMonsterLevel.innerHTML = (monsterToFace.monsterLevel);
        // Show fight and run buttons
        fightMonsterButton.style.display = "block";
        runAwayButton.style.display = "block";
    }

}

function randomRoomGenerator() {
    var roomNumber = Math.floor((Math.random() * 2) + 1);
    if (roomNumber == 1) {
        roomResultString = "The room is clear, there are no monsters"
        // show string on page
        showRoomResult.innerHTML = roomResultString;
    } else {
        roomResultString = "A monster waits in the room"
        showRoomResult.innerHTML = roomResultString;
    }
    // console.log(roomResultString); // testing roomResultString
    return roomResultString;
}

// Choose random monster from monsterArray and return
function monsterGenerator() {
    const randomMonster = Math.floor(Math.random() * monsterArray.length);
    // console.log(monsterChosen, monsterArray[monsterChosen]);
    monsterChosen = monsterArray[randomMonster];
    // console.log(monsterChosen); // test return value
    return monsterChosen;
}

// Choose random loot from lootArray and return
function lootRoom() {
    // remove lootRoomButton 
    lootRoomButton.style.display = 'none';
    const randomLoot = Math.floor(Math.random() * lootArray.length)
    lootChosen = lootArray[randomLoot];
    // console.log(lootChosen); // test return value
    itemGained = lootChosen.weaponName;
    console.log(itemGained); // test itemGained
    itemLevel = lootChosen.weaponLevel;
    console.log(itemLevel); // test itemLevel
    combatLevel = combatLevel + itemLevel;
    // push item gained onto items owned array
    itemsOwned.push(itemGained);
    // update on screen stats to show new combat level and items owned.
    updateStats();
    // show next room button
    nextRoomButton.style.display = "block";
}

function fightMonster() {
    fightMonsterButton.style.display = "none";
    runAwayButton.style.display = "none";
    console.log(battleLevel);
    console.log(monsterLevel);
    if (battleLevel >= monsterLevel) {
        // Prompt player of win
        console.log("Won fight");
        battleLevel ++;
        roomLevel ++;
        battlesWon ++;
        updateStats();
        // console.log(battleLevel);
    } else if (battleLevel < monsterLevel) {
        // decide loss scenario
        console.log("failed fight")
        battlesLost ++;
        battleLevel --;
        updateStats();
        // console.log(battlesLost);
        // console.log(battleLevel);
    }
}

function runAway() {
    rollDice();
    // if (diceRoll >= 3) {
    //     // successful escape
    // } else {
    //     // failed escape
    // }
}

//dice roll function numbers 1-6 and assign image to web page
function rollDice() {
    var randomNumber = Math.floor((Math.random() * 6) + 1);
    console.log(randomNumber); // test dice roll
    document.querySelector(".diceImg").setAttribute("src", "./images/" + "dice-" + randomNumber + ".png"); // take dice image from diceRoll area, create new image from randomNumber and dice image and assign new image to diceRoll area.
    return randomNumber;
}

function nextRoom() {
    enterRoom();
}