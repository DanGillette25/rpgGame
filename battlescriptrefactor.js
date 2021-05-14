$(document).ready(function(){
    
    generateGoblins()
  
    function generateGoblins() {
      let numGoblins = Math.floor(Math.random()*3)+1
      for (let i=0;i<numGoblins;i++){
        let newGoblin = new Goblin(goblinType,
          goblinAttack,
          goblinDefense,
          goblinHP,
          goblinCounterAttack,
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
          elfAtk = elfAtk + warriorSpecMove
          warriorAtk = warriorAtk + warriorSpecMove
          vanguardAtk = vanguardAtk + warriorSpecMove
        } else {
          elfAtk = elfMaxAtk
          warriorAtk = warriorMaxAtk
          vanguardAtk = vanguardMaxAtk
        }
  
        if (vanguardSpc > 0) {
          elfDef = elfDef + vanguardSpecMove
          warriorDef = warriorDef + vanguardSpecMove
          vanguardDef = vanguardDef + vanguardSpecMove
          
        } else {
          elfDef = elfMaxDef
          warriorDef = warriorMaxDef
          vanguardDef = vanguardMaxDef
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
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*vanguardDef)+1
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
    
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*warriorDef)+1
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
    
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*elfDef)+1
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
    
        let damage = Math.floor(Math.random()*elfAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
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
        goblinCounterAttack('elf', elfDef);
        }
    
      } else {
        console.log("It's not your turn!")
      }
    }
    
    function warriorAttack(){
      if (playerTurn = true){
    
        let damage = Math.floor(Math.random()*warriorAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
        if (damage <= 0){
          damage = 0
          console.log("Warrior Missed!")
          playerTurn = false
          enemyAttack();
        } else {
        goblinHP = goblinHP - damage
    
        console.log("Warrior Attacks Goblin "+selectedGoblin+" and deals "+damage+" damage.")
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        }
        playerTurn = false
        goblinCounterAttack('warrior', warriorDef);
        }
    
      } else {
        alert("It's not your turn!")
      }
    }
    
    function vanguardAttack(){
  
      if (playerTurn = true){
    
        let damage = Math.floor(Math.random()*vanguardAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
        if (damage <= 0){
          damage = 0
          console.log("Vanguard Missed!")
          playerTurn = false
          enemyAttack();
        } else {
        goblinHP = goblinHP - damage
        console.log("Vanguard Attacks Goblin "+selectedGoblin+" and deals "+damage+" damage.")
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        }
        playerTurn = false
        goblinCounterAttack('vanguard', vanguardDef);
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
  
      
      vanguardHP = vanguardHP + elfSpecMove
      warriorHP = warriorHP + elfSpecMove
      elfHP = elfHP + elfSpecMove
  
      if (elfHP > elfMaxHP){
        elfHP = elfMaxHP
      }
  
      if (vanguardHP > vanguardMaxHP){
        vanguardHP = vanguardMaxHP
      }
  
      if (warriorHP > warriorMaxHP){
        warriorHP = warriorMaxHP
      }
  
      console.log("Elf restores "+elfSpecMove+" HP to all party members.")
  
      updateHP();
  
      enemyAttack();
  
    }
  
    function warriorSpecial() {
      warriorSpc = 2
      console.log("Warrior Rallys")
      enemyAttack()
    }
  
    function vanguardSpecial() {
      vanguardSpc = 2
      console.log("Vanguard boosts defense of all characters by ")
      enemyAttack()
    }
  
    

    function goblinCounterAttack(char, def){
      let atkOrNot = Math.floor(Math.random()*2)
      if (atkOrNot === 1){
        let damageFactor = Math.floor(Math.random()*battleGoblins[selectedGoblin].attack)+1 - Math.floor(Math.random()*def)+1
        let damage = Math.floor(damageFactor/2)

        if (damage < 1){
          console.log(goblinType+" counterattack missed!")
          enemyAttack()
        }else{
        switch (char){
          case "vanguard":
            vanguardHP = vanguardHP - damage;
          case "warrior":
            warriorHP = warriorHP - damage;
          case "elf":
            elfHP = elfHP - damage;
        }
        console.log(goblinType+" counterattacks "+char+" and deals "+damage+" damage")
        
        updateHP()
        enemyAttack()
      }
      }else{
        enemyAttack()
      }
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
    
    