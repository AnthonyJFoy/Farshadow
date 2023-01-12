// Assign let variables for game to change
let battleLevel = 0;
let roomLevel = 0;
let battlesWon = 0;
let battlesLost = 0;
let swordLevel = 0;
let armourLevel = 0;
let shieldLevel = 0;
let monsterLevel = 0;

// Array of monsters to fight
const monsterArray = [
    {
        monsterName: "Liquid Snake",
        monsterLevel: 15,
    },
    {
        monsterName: "Revolver Ocelot",
        monsterLevel: 12,
    },
    {
        monsterName: "Sniper Wolf",
        monsterLevel: 10,
    },
    {
        monsterName: "Raven",
        monsterLevel: 8,
    },
    {
        monsterName: "Psycho Mantis",
        monsterLevel: 5,
    },
    {
        monsterName: "Grey Fox",
        monsterLevel: 3,
    },

]

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

// Assign numbers to character stats
document.getElementById("battle-level").innerHTML = battleLevel;
document.getElementById("sword").innerHTML = swordLevel;
document.getElementById("shield").innerHTML = shieldLevel;
document.getElementById("armour").innerHTML = armourLevel;

// Assign numbers to battle-stats
document.getElementById("current-room-level").innerHTML = roomLevel;
document.getElementById("battles-won").innerHTML = battlesWon;
document.getElementById("battles-lost").innerHTML = battlesLost;

// window.onload = function()
// rollDice();
// randomRoomGenerator();
// monsterGenerator();

document.getElementById("enter-room").addEventListener("click", enterRoom);

function enterRoom() {
    randomRoomGenerator();

}

function randomRoomGenerator() {
    var roomNumber = Math.floor((Math.random() * 2) + 1);
    console.log(roomNumber); // testing roomNumber is between 1 and 2
    var roomStringTreasure = "";
        // create <div> for results
    if (roomNumber == 1) {
        roomStringTreasure = "The room is clear, there are no monsters"
           // create button to loot room
    } else {
        roomStringTreasure = "A monster waits in the room"
            // create button to fight and create button to run
    }
    // console.log(roomStringTreasure); // testing roomStringTreasure
    return roomStringTreasure;
}

function monsterGenerator() {
    const randomMonster = Math.floor(Math.random() * monsterArray.length);
    // console.log(monsterChosen, monsterArray[monsterChosen]);
    monsterChosen = monsterArray[randomMonster];
    console.log(monsterChosen);
    return monsterChosen;
}

function lootRoom() {

}

// function fightMonster() {
//     if (battleLevel => )
// }

//dice roll function numbers 1-6 and assign image to web page
function rollDice() {
    var randomNumber = Math.floor((Math.random() * 6) + 1);
    console.log(randomNumber); // test dice roll
    document.querySelector(".diceImg").setAttribute("src", "./images/" + "dice-" + randomNumber + ".png"); // take dice image from diceRoll area, create new image from randomNumber and dice image and assign new image to diceRoll area.
    return randomNumber;
}