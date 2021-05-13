$(document).ready(function(){

//   if (localStorage.getItem('saveData')) {
//     var savedData = JSON.parse(localStorage.getItem("saveData"))
//     saveData = savedData
// } else {

//     var saveString = JSON.stringify(saveData)
//     localStorage.setItem("saveData", saveString)
//     var saveData = JSON.parse(localStorage.getItem("saveData"))
//     savedData = saveData

// }

  class Goblin {
    constructor (type, attack, defense, hitPoints, counterAttack, alive){
      this.type = type;
      this.attack = attack;
      this.defense = defense;
      this.hitPoints = hitPoints;
      this.counterAttack = counterAttack;
      this.alive = alive;
    }
  }

  let battleGoblins = []
  let selectedGoblin = 0
  let vanguardLvl = 0
  let warriorLvl = 0
  let elfLvl = 0
  let warriorSpc = 0
  let vanguardSpc = 0
  
  let vanguardHP = gameData.vanguardStats[vanguardLvl].hitPoints
  let warriorHP = gameData.warriorStats[warriorLvl].hitPoints
  let elfHP = gameData.elfStats[elfLvl].hitPoints
  let goblinHP = gameData.goblinStats[0].hitPoints
  
  let playerTurn = false
  
  generateGoblins()

  function generateGoblins() {
    let numGoblins = Math.floor(Math.random()*3)+1
    for (let i=0;i<numGoblins;i++){
      let newGoblin = new Goblin(gameData.goblinStats[0].type,
        gameData.goblinStats[0].attack,
        gameData.goblinStats[0].defense,
        gameData.goblinStats[0].hitPoints,
        gameData.goblinStats[0].counterAttack,
        1)

        battleGoblins.push(newGoblin)

        
    }

    for (let i=0; i<battleGoblins.length; i++){
      let goblinButton = $('<button>')
      goblinButton.attr('id',i)
      goblinButton.attr('class','goblinButton')
      goblinButton.text("Goblin"+' '+i)
      $('#goblins').append(goblinButton)
    }

  }

  $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
  $('#warriorHP').text('Warrior:'+ ''+warriorHP)
  $('#elfHP').text('Elf:'+ ''+elfHP)
  $('#vanguardattack').hide()
  // $('#vanguardspecial').hide()
  $('#warriorattack').hide()
  // $('#warriorspecial').hide()
  $('#elfattack').hide()
  // $('#elfspecial').hide()
  
  
  $('#elf').on("click", function(){
    elfAttack()
  })
  
  $('#warrior').on("click", function(){
    warriorAttack()
  })
  
  $('#vanguard').on("click", function(){
    vanguardAttack()
  })

  $('#elfspecial').on("click", function(){
  elfSpecial()})

  $('#warriorspecial').on("click", function(){
    warriorSpecial()})

  $('#vanguardspecial').on("click", function(){
    vanguardSpecial()})

  $('.goblinButton').on("click", function(){
    selectedGoblinStr = $(this).attr('id')
    selectedGoblin = parseInt(selectedGoblinStr,10)
    goblinHP = battleGoblins[selectedGoblin].hitPoints
  })
  
  enemyAttack();
  
  function enemyAttack(){


    determineAttack()

    function determineAttack(){
      let attackerGob = Math.floor(Math.random()*battleGoblins.length)
      let attackedChar = Math.floor(Math.random()*3)


    function generateAttack() {
      
      warriorSpc = warriorSpc - 1
      vanguardSpc = vanguardSpc - 1

      if (warriorSpc > 0){
        gameData.elfStats[elfLvl].attack = gameData.elfStats[elfLvl].attack + gameData.warriorStats[warriorLvl].special
        gameData.warriorStats[warriorLvl].attack = gameData.warriorStats[warriorLvl].attack + gameData.warriorStats[warriorLvl].special
        gameData.vanguardStats[vanguardLvl].attack = gameData.vanguardStats[vanguardLvl].attack + gameData.warriorStats[warriorLvl].special
      } else {
        gameData.elfStats[elfLvl].attack = gameData.elfStats[elfLvl].maxAttack
        gameData.warriorStats[warriorLvl].attack = gameData.warriorStats[warriorLvl].maxAttack
        gameData.vanguardStats[vanguardLvl].attack = gameData.vanguardStats[vanguardLvl].maxAttack
      }

      if (vanguardSpc > 0) {
        gameData.elfStats[elfLvl].defense = gameData.elfStats[elfLvl].defense + gameData.vanguardStats[vanguardLvl].special
        gameData.warriorStats[warriorLvl].defense = gameData.warriorStats[warriorLvl].defense + gameData.vanguardStats[vanguardLvl].special
        gameData.vanguardStats[vanguardLvl].defense = gameData.vanguardStats[vanguardLvl].defense + gameData.vanguardStats[vanguardLvl].special
        
      } else {
        gameData.elfStats[elfLvl].defense = gameData.elfStats[elfLvl].maxDefense
        gameData.warriorStats[warriorLvl].defense = gameData.warriorStats[warriorLvl].maxDefense
        gameData.vanguardStats[vanguardLvl].defense = gameData.vanguardStats[vanguardLvl].maxDefense
      }
    
    if (attackedChar === 0 && vanguardHP > 0 && battleGoblins[attackerGob].alive > 0) {
      attackVanguard(attackerGob);
    } else if (attackedChar === 1 &&  warriorHP > 0 && battleGoblins[attackerGob].alive > 0) {
      attackWarrior(attackerGob);
    } else if (attackedChar === 2 && elfHP > 0 && battleGoblins[attackerGob].alive > 0) {
      attackElf(attackerGob);
    } else {
      if (battleGoblins.some(battleGoblin => battleGoblin.alive === 1)){
      enemyAttack();
      var x = 1
      } else {
        alert('victory')
      }
    }

  }

  generateAttack()

    }  
  
  function attackVanguard(atk){
      let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*gameData.vanguardStats[vanguardLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      vanguardHP = vanguardHP - damage
  
      console.log("Goblin "+atk+ " Attacks Vanguard and deals"+damage+"damage.")
      if (vanguardHP < 1) {
        killVanguard();
      }
      playerAttack();
      }
  }
  
    function attackWarrior(atk){
  
      let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*gameData.warriorStats[warriorLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      warriorHP = warriorHP - damage
  
      console.log("Goblin "+atk+ " Attacks Warrior and deals"+damage+"damage.")
      if (warriorHP < 1) {
        killWarrior();
      }
      playerAttack();
      }
    }
  
    
  
    function attackElf(atk){
  
      let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*gameData.elfStats[elfLvl].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Goblin Missed!")
        playerAttack();
      } else {
      elfHP = elfHP - damage
  
      
  
      console.log("Goblin" +atk+ "Attacks Elf and deals"+damage+"damage.")
      if (elfHP < 1) {
        killElf();
      }
      playerAttack();
      }}

  updateHP();
  
    
  }
    
  
  function playerAttack(){
    playerTurn = true;
  }
  
  function elfAttack(){
    if (playerTurn = true){
  
      let damage = Math.floor(Math.random()*gameData.elfStats[elfLvl].attack)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Elf Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
  
      console.log("Elf Attacks Goblin " +selectedGoblin + " and deals "+damage+" damage.")
      if (goblinHP < 1) {
        killGoblin(selectedGoblin);
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
  
      let damage = Math.floor(Math.random()*gameData.warriorStats[warriorLvl].attack)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Warrior Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
  
      console.log("Warrior Attacks Goblin "+selectedGoblin+" and deals"+damage+"damage.")
      if (goblinHP < 1) {
        killGoblin(selectedGoblin);
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
  
      let damage = Math.floor(Math.random()*gameData.vanguardStats[vanguardLvl].attack)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
      if (damage <= 0){
        damage = 0
        console.log("Vanguard Missed!")
        playerTurn = false
        enemyAttack();
      } else {
      goblinHP = goblinHP - damage
      console.log("Vanguard Attacks Goblin "+selectedGoblin+" and deals"+damage+"damage.")
      if (goblinHP < 1) {
        killGoblin(selectedGoblin);
      }
      playerTurn = false
      enemyAttack();
      }
  
    } else {
      console.log("It's not your turn!")
    }
  }

  function showElfAbilities(){

  $('#elfattack').show()
  $('#elfspecial').show()

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

  function killGoblin(gob) {
    battleGoblins[gob].alive = 0
    $(`#`+gob).hide()
    alert("Goblin "+gob+" has been eliminated.")
  }

  function elfSpecial() {

    
    vanguardHP = vanguardHP + gameData.elfStats[elfLvl].special
    warriorHP = warriorHP + gameData.elfStats[elfLvl].special
    elfHP = elfHP + gameData.elfStats[elfLvl].special

    if (elfHP > gameData.elfStats[elfLvl].maxHP){
      elfHP = gameData.elfStats[elfLvl].maxHP
    }

    if (vanguardHP > gameData.vanguardStats[vanguardLvl].maxHP){
      vanguardHP = gameData.vanguardStats[vanguardLvl].maxHP
    }

    if (warriorHP > gameData.warriorStats[warriorLvl].maxHP){
      warriorHP = gameData.warriorStats[warriorLvl].maxHP
    }

    console.log("Elf restores "+gameData.elfStats[elfLvl].special+" HP to all characters.")

    updateHP();

    enemyAttack();

  }

  function warriorSpecial() {
    warriorSpc = 2
    console.log("Warrior boosts attack of all characters by "+gameData.warriorStats[warriorLvl].special)
    enemyAttack()
  }

  function vanguardSpecial() {
    vanguardSpc = 2
    console.log("Vanguard boosts defense of all characters by "+gameData.vanguardStats[vanguardLvl].special)
    enemyAttack()
  }

  function updateHP(){

  $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
  $('#warriorHP').text('Warrior:'+ ''+warriorHP)
  $('#elfHP').text('Elf:'+ ''+elfHP)

  }
  
  function gameOver() {
    alert('Game Over')
  }
  
  })
  
  