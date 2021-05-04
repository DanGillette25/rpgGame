$(document).ready(function(){

  if (localStorage.getItem('goblinGameData')) {
    var gameData = JSON.parse(localStorage.getItem("goblinGameData"))
    goblinGameData = gameData
} else {

    var gameString = JSON.stringify(goblinGameData)
    localStorage.setItem("goblinGameData", gameString)
    var gameData = JSON.parse(localStorage.getItem("goblinGameData"))
    goblinGameData = gameData

}

  let vanguardLvl = 0
  let warriorLvl = 0
  let elfLvl = 0
  
  let vanguardXP = 0
  let warriorXP = 0
  let elfXP = 0
  
  let vanguardHP = gameData.vanguardStats[vanguardLvl].hitPoints
  let warriorHP = gameData.warriorStats[warriorLvl].hitPoints
  let elfHP = gameData.elfStats[elfLvl].hitPoints
  let goblinHP = gameData.goblinStats[0].hitPoints
  
  let playerTurn = false
  
  $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
  $('#warriorHP').text('Warrior:'+ ''+warriorHP)
  $('#elfHP').text('Elf:'+ ''+elfHP)
  
  
  enemyAttack();
  
  
  $('#elf').on("click", function(){
    elfAttack()
  })
  
  $('#warrior').on("click", function(){
    warriorAttack()
  })
  
  $('#vanguard').on("click", function(){
    vanguardAttack()
  })
  
  
  
  function enemyAttack(){
  
    determineAttack()
    
    function determineAttack(){
      let attackedChar = Math.floor(Math.random()*3)
    
    if (attackedChar === 0 && vanguardHP > 0) {
      attackVanguard();
    } else if (attackedChar === 1 &&  warriorHP > 0) {
      attackWarrior();
    } else if (attackedChar === 2 && elfHP > 0) {
      attackElf();
    } else {
      console.log("Does this work?")
      enemyAttack();
    }

    }  
  
  function attackVanguard(){
      let damage = Math.floor(Math.random()*gameData.goblinStats[0].attack)+1 - Math.floor(Math.random()*gameData.vanguardStats[vanguardLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      vanguardHP = vanguardHP - damage
  
      console.log("Goblin Attacks Vanguard and deals"+damage+"damage.")
      if (vanguardHP < 1) {
        killVanguard();
      }
      playerAttack();
      }
  }
  
    function attackWarrior(){
  
      let damage = Math.floor(Math.random()*gameData.goblinStats[0].attack)+1 - Math.floor(Math.random()*gameData.warriorStats[warriorLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      warriorHP = warriorHP - damage
  
      console.log("Goblin Attacks Warrior and deals"+damage+"damage.")
      if (warriorHP < 1) {
        killWarrior();
      }
      playerAttack();
      }
    }
  
    
  
    function attackElf(){
  
      let damage = Math.floor(Math.random()*gameData.goblinStats[0].attack)+1 - Math.floor(Math.random()*gameData.elfStats[elfLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      elfHP = elfHP - damage
  
      
  
      console.log("Goblin Attacks Elf and deals"+damage+"damage.")
      if (elfHP < 1) {
        killElf();
      }
      playerAttack();
      }}
  
  $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
  $('#warriorHP').text('Warrior:'+ ''+warriorHP)
  $('#elfHP').text('Elf:'+ ''+elfHP)
  
    
  }
    
  
  function playerAttack(){
    playerTurn = true;
  }
  
  function elfAttack(){
    if (playerTurn = true){
  
      let damage = Math.floor(Math.random()*gameData.elfStats[elfLvl].attack)+1 - Math.floor(Math.random()*gameData.goblinStats[0].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Elf Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
  
      console.log("Elf Attacks Goblin and deals"+damage+"damage.")
      if (goblinHP < 1) {
        killGoblin();
      }
      playerTurn = false
      enemyAttack();
      }
  
    } else {
      console.log("It's not your turn!")
    }
  }
  
  function warriorAttack(){
    if (playerTurn = true){
  
      let damage = Math.floor(Math.random()*gameData.warriorStats[warriorLvl].attack)+1 - Math.floor(Math.random()*gameData.goblinStats[0].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Warrior Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
  
      console.log("Warrior Attacks Goblin and deals"+damage+"damage.")
      if (goblinHP < 1) {
        killGoblin();
      }
      playerTurn = false
      enemyAttack();
      }
  
    } else {
      alert("It's not your turn!")
    }
  }
  
  function vanguardAttack(){
    if (playerTurn = true){
  
      let damage = Math.floor(Math.random()*gameData.vanguardStats[vanguardLvl].attack)+1 - Math.floor(Math.random()*gameData.goblinStats[0].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Vanguard Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
      console.log("Vanguard Attacks Goblin and deals"+damage+"damage.")
      if (goblinHP < 1) {
        killGoblin();
      }
      playerTurn = false
      enemyAttack();
      }
  
    } else {
      console.log("It's not your turn!")
    }
  }
  
  function killElf() {
    $('#elf').hide();
    if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
      gameOver();
    }
    alert('Elf has been eliminated from the battle')
  }
  
  function killWarrior() {
    $('#warrior').hide();
    if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
      gameOver();
    }
    alert('warrior has been eliminated from the battle')
  }
  
  function killVanguard() {
    $('#vanguard').hide();
    if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
      gameOver();
    }
    alert('Vanguard has been eliminated from the battle')
  }

  function killGoblin() {
    alert("Goblin has been eliminated.  You win the battle")
  }
  
  function gameOver() {
    alert('Game Over')
  }
  
  })
  
  