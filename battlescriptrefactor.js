$(document).ready(function(){
    
    generateGoblins()
    selectRandomGoblin()
  
    function generateGoblins() {
      let numGoblins = Math.floor(Math.random()*3)+1
      for (let i=0;i<numGoblins;i++){
        let newGoblin = new Goblin(goblinType,
          goblinAttack,
          goblinDefense,
          goblinHP,
          goblinCounterAtk,
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
    $('#vanguardspecial').hide()
    $('#warriorattack').hide()
    $('#warriorspecial').hide()
    $('#elfattack').hide()
    $('#elfspecial').hide()
    
    
    $('#elf').on("click", function(){
      $(this).addClass('playerselected')
      $('#warrior').removeClass('playerselected')
      $("#vanguard").removeClass('playerselected')
      showElfAbilities()
    })
    
    $('#warrior').on("click", function(){
      $(this).addClass('playerselected')
      $('#elf').removeClass('playerselected')
      $("#vanguard").removeClass('playerselected')
      showWarriorAbilities()
    })
    
    $('#vanguard').on("click", function(){
      $(this).addClass('playerselected')
      $('#warrior').removeClass('playerselected')
      $("#elf").removeClass('playerselected')
      showVanguardAbilities()
    })

    $('#elfattack').on("click", function(){
      elfAttack()
    })

    $('#elfspecial').on("click", function(){
      elfSpecial()})

    $('#warriorattack').on("click", function(){
      warriorAttack()
    })
  
    $('#warriorspecial').on("click", function(){
      warriorSpecial()})

    $('#vanguardattack').on("click", function(){
      vanguardAttack()
    })
  
    $('#vanguardspecial').on("click", function(){
      vanguardSpecial()})
  
    $('.goblinButton').on("click", function(){
      selectedGoblinStr = $(this).attr('id')
      selectedGoblin = parseInt(selectedGoblinStr,10)
      goblinHP = battleGoblins[selectedGoblin].hitPoints
      
      $(this).addClass('enemyselected')
      $('.goblinButton').each(function(){
        if ($(this).attr('id') != selectedGoblin){
          $(this).removeClass('enemyselected')
         }
       
      
    })

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
          console.log('victory')
        }
      }
  
    }
  
    generateAttack()
  
      }  
    
    function attackVanguard(atk){
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*vanguardDef)+1
        if (damage <= 0){
          damage = 0
          console.log(goblinType+" Missed!")
          playerAttack();
        } else {
        vanguardHP = vanguardHP - damage
    
        console.log(goblinType+ " Attacks Vanguard and deals"+damage+"damage. "+atk)
      
        determineIfDead()
        playerAttack();
        }
    }
    
      function attackWarrior(atk){
    
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*warriorDef)+1
        if (damage <= 0){
          damage = 0
          console.log(goblinType+" Missed!")
          playerAttack();
        } else {
        warriorHP = warriorHP - damage
    
        console.log(goblinType+ " Attacks Warrior and deals"+damage+"damage. " +atk)
        
        determineIfDead()
        playerAttack();
        }
      }
    
      
    
      function attackElf(atk){
    
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*elfDef)+1
        if (damage <= 0){
          damage = 0
          console.log(goblinType+" Missed!")
          playerAttack();
        } else {
        elfHP = elfHP - damage
  
        console.log(goblinType+" Attacks Elf and deals"+damage+"damage. " +atk)
        
        determineIfDead();
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
    
        console.log("Elf Attacks " +goblinType + " and deals "+damage+" damage.")
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else {
  
        playerTurn = false
        goblinCounterAttack('elf', elfDef);
        }}
    
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
    
        console.log("Warrior Attacks "+goblinType+" and deals "+damage+" damage.")
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else{
        playerTurn = false
        goblinCounterAttack('warrior', warriorDef);
        }}
    
      } else {
        console.log("It's not your turn!")
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
        console.log("Vanguard Attacks "+goblinType+" and deals "+damage+" damage.")
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else {
        playerTurn = false
        goblinCounterAttack('vanguard', vanguardDef);
        }}
    
      } else {
        console.log("It's not your turn!")
      }
    }

    function selectRandomGoblin(){
      let selected = Math.floor(Math.random()*battleGoblins.length)
      if (battleGoblins[selected].alive < 1){
        selectRandomGoblin()
      } else {
        selectedGoblin = selected
        goblinHP = battleGoblins[selectedGoblin].hitPoints
        console.log(goblinHP)
        highlightSelectedGoblin(selectedGoblin)
      }
    }

    function highlightSelectedGoblin(select){

      $('.goblinButton').each(function(){
        if ($(this).attr('id') != select){
          $(this).removeClass('enemyselected')
        }

        if ($(this).attr('id') == select){
          $(this).addClass('enemyselected')
        }
      
      })
  
      }
  
    function showElfAbilities(){
  
    $('#elfattack').show()
    $('#elfspecial').show()
    $('#vanguardattack').hide()
    $('#vanguardspecial').hide()
    $('#warriorattack').hide()
    $('#warriorspecial').hide()
  
    }
    
    function killElf() {
      $('#elf').hide();
      $('#elfattack').hide();
      $('#elfspecial').hide();
      elfAlive = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      console.log('Elf has been eliminated from the battle')
      alert('Elf has been eliminated from the battle')
    }

    function showWarriorAbilities(){
  
      $('#elfattack').hide()
      $('#elfspecial').hide()
      $('#vanguardattack').hide()
      $('#vanguardspecial').hide()
      $('#warriorattack').show()
      $('#warriorspecial').show()
    
      }
    
    function killWarrior() {
      $('#warrior').hide();
      $('#warriorattack').hide();
      $('#warriorspecial').hide();
      warriorAlive = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      console.log('warrior has been eliminated from the battle')
      alert('warrior has been eliminated from the battle')
    }

    function showVanguardAbilities(){
  
      $('#elfattack').hide()
      $('#elfspecial').hide()
      $('#vanguardattack').show()
      $('#vanguardspecial').show()
      $('#warriorattack').hide()
      $('#warriorspecial').hide()
    
      }
    
    function killVanguard() {
      $('#vanguard').hide();
      $('#vanguardattack').hide();
      $('#vanguardspecial').hide();
      vanguardAlive = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      console.log('Vanguard has been eliminated from the battle')
      alert('Vanguard has been eliminated from the battle')
    }
  
    function killGoblin(gob) {
      battleGoblins[gob].alive = 0
      $(`#`+gob).hide()
      console.log("Goblin "+gob+" has been eliminated.")
      alert("Goblin "+gob+" has been eliminated.")
       if (battleGoblins.some(battleGoblin => battleGoblin.alive === 1)){
      selectRandomGoblin()
    }
      enemyAttack()
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
      if (battleGoblins[selectedGoblin].counterAttack > 0){
        determineCounterAttack()
      } else {
        enemyAttack()
      }
      function determineCounterAttack(){
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
        determineIfDead()
        updateHP()
        enemyAttack()
      }
      }else{
        enemyAttack()
      }
    }
    
    }

    function determineIfDead(){
      if (vanguardHP < 1 && vanguardAlive > 0) {
        killVanguard();
      }
      if (elfHP < 1 && elfAlive > 0) {
        killElf();
      }
      if (warriorHP < 1 && warriorAlive > 0) {
        killWarrior();
      }
    }

    function updateHP(){
  
      $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
      $('#warriorHP').text('Warrior:'+ ''+warriorHP)
      $('#elfHP').text('Elf:'+ ''+elfHP)
      
      }
    
    function gameOver() {
      console.log('Game Over')
    }
    
    })
    
    