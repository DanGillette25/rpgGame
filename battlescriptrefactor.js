$(document).ready(function(){

    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById('instrModal')

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    

    $('#goblins').hide()
    $('#credits').show()
    $('#instructions').hide()
    $('#instructionsBtn').show()
    $('#creditsBtn').hide()


    $('#instructionsBtn').on('click',function(){
      $('#credits').hide()
      $('#creditsBtn').show()
      $('#instructions').show()
      $('#instructionsBtn').hide()
    })

    $('#creditsBtn').on('click',function(){
      $('#credits').show()
      $('#creditsBtn').hide()
      $('#instructions').hide()
      $('#instructionsBtn').show()
    })

    updateDifficulty()

    if (goblinLvl < 1) {
      $('#lvldown').hide()
    }
 
   $('#startbutton').on("click", function(){
    $('#startbutton').hide()
    $('#lvldown').hide()
    $('#lvlup').hide()
    startBattle()
   })

   $(document).on("click", "#lvldown", function(event){
    event.preventDefault()
    $('#lvlup').show()
    goblinLvl = goblinLvl - 1
    if (goblinLvl < 1) {
      goblinLvl = 0
      $('#lvldown').hide()
      
    }
    updateDifficulty();
  })

  $(document).on("click", "#lvlup", function(event){
    event.preventDefault()
    $('#lvldown').show()
    goblinLvl = goblinLvl + 1
    if (goblinLvl > 4) {
      goblinLvl = 4
      $('#lvlup').hide()
      
    }
    updateDifficulty();
  })

  $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP)
    $('#warriorHP').text('Warrior:'+ ''+warriorHP)
    $('#elfHP').text('Elf:'+ ''+elfHP)
    
  
    
    $(document).on("click", ".goblinButton", function(){
      
      selectedGoblinStr = $(this).attr('name')
      selectedGoblin = parseInt(selectedGoblinStr,10)
      goblinHP = battleGoblins[selectedGoblin].hitPoints
      
      $(this).addClass('enemyselected')
      $('.goblinButton').each(function(){
        if ($(this).attr('name') != selectedGoblin){
          $(this).removeClass('enemyselected')
         }
       
    })

  })

})

    function startBattle(){
    elfLvl = storageData.lvl[0].elf

    elfHP = gameData.elfStats[elfLvl].hitPoints
    elfMaxHP = gameData.elfStats[elfLvl].maxHP
    elfAtk = gameData.elfStats[elfLvl].attack
    elfMaxAtk = gameData.elfStats[elfLvl].maxAttack
    elfDef = gameData.elfStats[elfLvl].defense
    elfMaxDef = gameData.elfStats[elfLvl].maxDefense
    elfSpecMove = gameData.elfStats[elfLvl].special
    elfPE = 0
    elfSP = 3

    warriorHP = gameData.warriorStats[warriorLvl].hitPoints
    warriorMaxHP = gameData.warriorStats[warriorLvl].maxHP
    warriorAtk = gameData.warriorStats[warriorLvl].attack
    warriorMaxAtk = gameData.warriorStats[warriorLvl].maxAttack
    warriorDef = gameData.warriorStats[warriorLvl].defense
    warriorMaxDef = gameData.warriorStats[warriorLvl].maxDefense
    warriorSpecMove = gameData.warriorStats[warriorLvl].special
    warriorPE = 0
    warriorSP = 3

    vanguardHP = gameData.vanguardStats[vanguardLvl].hitPoints
    vanguardMaxHP = gameData.vanguardStats[vanguardLvl].maxHP
    vanguardAtk = gameData.vanguardStats[vanguardLvl].attack
    vanguardMaxAtk = gameData.vanguardStats[vanguardLvl].maxAttack
    vanguardDef = gameData.vanguardStats[vanguardLvl].defense
    vanguardMaxDef = gameData.vanguardStats[vanguardLvl].maxDefense
    vanguardSpecMove = gameData.vanguardStats[vanguardLvl].special
    vanguardPE = 0
    vanguardSP = 3

    elfLvlFactor = elfLvl + 1
    warriorLvlFactor = warriorLvl + 1
    vanguardLvlFactor = vanguardLvl + 1

    // $('#elf').show()
    // $('#warrior').show()
    // $('#vanguard').show()
    $('#goblins').show()
    // $('#hpdiv').show()
    $('#difficulty').hide()
    generateCharacters()
    generateHPbar()
    generateGoblins()
    selectRandomGoblin()
    enemyAttack();
    
   }
  
    function generateGoblins() {
      goblinHP = gameData.goblinStats[goblinLvl].hitPoints
      goblinType = gameData.goblinStats[goblinLvl].type
      goblinAttack = gameData.goblinStats[goblinLvl].attack
      goblinDefense = gameData.goblinStats[goblinLvl].defense
      goblinCounterAtk = gameData.goblinStats[goblinLvl].counterAttack
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
        let goblinDiv = $('<div>')
        goblinDiv.attr('id','goblinDiv'+i)
        goblinDiv.attr('class', 'goblinDivC')
        let goblinButton = $('<img>')
        goblinButton.attr('src','graphics/'+gameData.goblinStats[goblinLvl].png+'.png')
        goblinButton.attr('name',i)
        goblinButton.attr('id','goblin'+i)
        goblinButton.attr('class','goblinButton')
        goblinButton.attr('height',75)
        // goblinButton.text("Goblin"+' '+i)
        $("#goblins").append(goblinDiv)
        $(goblinDiv).append(goblinButton)
      }
      
    }
  
    function selectElf() {
      $('#elf').addClass('playerselected')
      $('#warrior').removeClass('playerselected')
      $("#vanguard").removeClass('playerselected')
      $('#elfattack').show()
      $('#elfspecial').show()
      $('#vanguardattack').hide()
      $('#vanguardspecial').hide()
      $('#warriorattack').hide()
      $('#warriorspecial').hide()
     // showElfAbilities()
    }
    
    function selectWarrior(){
      $('#warrior').addClass('playerselected')
      $('#elf').removeClass('playerselected')
      $("#vanguard").removeClass('playerselected')
      $('#elfattack').hide()
      $('#elfspecial').hide()
      $('#vanguardattack').hide()
      $('#vanguardspecial').hide()
      $('#warriorattack').show()
      $('#warriorspecial').show()
     // showWarriorAbilities()
    }
    
    function selectVanguard(){
      $('#vanguard').addClass('playerselected')
      $('#warrior').removeClass('playerselected')
      $("#elf").removeClass('playerselected')
      $('#elfattack').hide()
      $('#elfspecial').hide()
      $('#vanguardattack').show()
      $('#vanguardspecial').show()
      $('#warriorattack').hide()
      $('#warriorspecial').hide()
     // showVanguardAbilities()
    }
    
    
  function enemyAttack(){
  
  setTimeout(function(){
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
          textArray.push('Victory')
          updateText()
          victorySeq(elfPE, warriorPE, vanguardPE)
        }
      }
  
    }
  
    generateAttack()
  
      }  },1000)
    
    function attackVanguard(atk){
        let divVan = $('#vanguarddiv')
        generateGoblinSlash(divVan)
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*vanguardDef)+1
        if (damage <= 0){
          damage = 0
          textArray.push(goblinType+" Missed!")
          updateText()
          playerAttack();
        } else {
        $("#vanguard").effect('shake')
        vanguardHP = vanguardHP - damage
    
        textArray.push(goblinType+ " Attacks Vanguard and deals "+damage+"damage. "+atk)
        updateText()
        updateHP()
        determineIfDead()
        playerAttack();
        }
    }
    
      function attackWarrior(atk){
        let divWar = $('#warriordiv')
        generateGoblinSlash(divWar)
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*warriorDef)+1
        if (damage <= 0){
          damage = 0
          textArray.push(goblinType+" Missed!")
          updateText()
          playerAttack();
        } else {
        $("#warrior").effect('shake')
        warriorHP = warriorHP - damage
    
        textArray.push(goblinType+ " Attacks Warrior and deals "+damage+"damage. ")
        updateText()
        updateHP()
        determineIfDead()
        playerAttack();
        }
      }

      function attackElf(atk){
        let divElf = $('#elfdiv')
        generateGoblinSlash(divElf)
        let damage = Math.floor(Math.random()*battleGoblins[atk].attack)+1 - Math.floor(Math.random()*elfDef)+1
        if (damage <= 0){
          damage = 0
          textArray.push(goblinType+" Missed!")
          updateText()
          playerAttack();
        } else {
        $("#elf").effect('shake')
        elfHP = elfHP - damage
        
        textArray.push(goblinType+" Attacks Elf and deals "+damage+"damage. " )
        updateText()
        updateHP()
        determineIfDead();
        playerAttack();
        }}
  
    updateHP();
    
    }
    
    function playerAttack(){
      playerTurn = 1;
    }
    
    function elfAttack(){
      
      if (playerTurn > 0){
        playerTurn = 0

      generatePlayerSlash()
        
        setTimeout(function(){
        let damage = Math.floor(Math.random()*elfAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
        if (damage <= 0){
          damage = 0
          playerTurn = 0
          textArray.push("Elf Missed!")
          updateText()
          enemyAttack();
        } else {
          
        $("#goblin"+selectedGoblin).effect('shake')
        
        goblinHP = goblinHP - damage
        elfPE = elfPE +1
        textArray.push("Elf Attacks " +goblinType + " and deals "+damage+" damage.")
        updateText()
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else {
  
        playerTurn = 0
        goblinCounterAttack('elf', elfDef);
        }}
      }, 1000)
      } else {
        textArray.push("It's not your turn!")
        updateText()
      }

    
    }
    
    function warriorAttack(){

      if (playerTurn > 0){
        generatePlayerSlash()
        playerTurn = 0
        setTimeout(function(){
        let damage = Math.floor(Math.random()*warriorAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
        if (damage <= 0){
          damage = 0
          textArray.push("Warrior Missed!")
          updateText()
          playerTurn = 0
          enemyAttack();
        } else {
        $("#goblin"+selectedGoblin).effect('shake')
        playterTurn = 0
        goblinHP = goblinHP - damage
        warriorPE = warriorPE +1
        textArray.push("Warrior Attacks "+goblinType+" and deals "+damage+" damage.")
        updateText()
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else{
        playerTurn = 0
        goblinCounterAttack('warrior', warriorDef);
        }}
      },1000)
      } else {
        textArray.push("It's not your turn!")
        updateText()
      }
    
    }
    
    function vanguardAttack(){
  
      
      if (playerTurn > 0){
        playerTurn = 0

        generatePlayerSlash()

        setTimeout(function(){
        let damage = Math.floor(Math.random()*vanguardAtk)+1 - Math.floor(Math.random()*battleGoblins[selectedGoblin].defense)+1
        if (damage <= 0){
          damage = 0
          textArray.push("Vanguard Missed!")
          updateText()
          playerTurn = 0
          enemyAttack();
        } else {
        $("#goblin"+selectedGoblin).effect('shake')
        goblinHP = goblinHP - damage
        vanguardPE = vanguardPE +1
        textArray.push("Vanguard Attacks "+goblinType+" and deals "+damage+" damage.")
        updateText()
        if (goblinHP < 1) {
          killGoblin(selectedGoblin);
        } else {
        
        goblinCounterAttack('vanguard', vanguardDef);
        }}
      },1000)
      } else {
      textArray.push("It's not your turn!")
      updateText()
    }

  }

    function selectRandomGoblin(){
      let selected = Math.floor(Math.random()*battleGoblins.length)
      if (battleGoblins[selected].alive < 1){
        selectRandomGoblin()
      } else {
        selectedGoblin = selected
        goblinHP = battleGoblins[selectedGoblin].hitPoints
        highlightSelectedGoblin(selectedGoblin)
      }
    }

    function highlightSelectedGoblin(select){

      $('.goblinButton').each(function(){
        if ($(this).attr('name') != select){
          $(this).removeClass('enemyselected')
        }

        if ($(this).attr('name') == select){
          $(this).addClass('enemyselected')
        }
      
      })
  
      }
  
    // function showElfAbilities(){
  
    // $('#elfattack').show()
    // $('#elfspecial').show()
    // $('#vanguardattack').hide()
    // $('#vanguardspecial').hide()
    // $('#warriorattack').hide()
    // $('#warriorspecial').hide()
  
    // }
    
    function killElf() {
      
      $(`#elf`).finish().animate({
        top: '+=400',
        left: '+=250'
      },1000)
      
      $('#elf').remove();
      $('#elfattack').remove();
      $('#elfspecial').remove();
      $('#elfHP').remove();
    
      elfAlive = 0
      elfPE = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      textArray.push('Elf has been eliminated from the battle')
      updateText()
      //alert('Elf has been eliminated from the battle')
    }

    // function showWarriorAbilities(){
  
    //   $('#elfattack').hide()
    //   $('#elfspecial').hide()
    //   $('#vanguardattack').hide()
    //   $('#vanguardspecial').hide()
    //   $('#warriorattack').show()
    //   $('#warriorspecial').show()
    
    //   }
    
    function killWarrior() {
      $(`#warrior`).finish().animate({
        top: '+=400',
        left: '+=250'
      },1000)
      
      $('#warrior').remove();
      $('#warriorattack').remove();
      $('#warriorspecial').remove();
      $('#warriorHP').remove();
    
      warriorAlive = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      textArray.push('warrior has been eliminated from the battle')
      updateText()
      //alert('warrior has been eliminated from the battle')
    }

    // function showVanguardAbilities(){
  
    //   $('#elfattack').hide()
    //   $('#elfspecial').hide()
    //   $('#vanguardattack').show()
    //   $('#vanguardspecial').show()
    //   $('#warriorattack').hide()
    //   $('#warriorspecial').hide()
    
    //   }
    
    function killVanguard() {
      $(`#vanguard`).finish().animate({
        top: '+=400',
        left: '+=250'
      },1000)
      
      $('#vanguard').remove();
      $('#vanguardattack').remove();
      $('#vanguardspecial').remove();
      $('#vanguardHP').remove();
    
      vanguardAlive = 0
      if (warriorHP < 1 && vanguardHP < 1 && elfHP < 1){
        gameOver();
      }
      textArray.push('Vanguard has been eliminated from the battle')
      updateText()
      //alert('Vanguard has been eliminated from the battle')
    }
  
    function killGoblin(gob) {
      battleGoblins[gob].alive = 0
      $(`#goblin`+gob).finish().animate({
        top: '-=400',
        left: '-=250'
      },100)
      
      setTimeout(function(){
      $(`#goblin`+gob).hide()
    },700)
      textArray.push(goblinType+" has been eliminated.")
      updateText()
      //alert("Goblin "+gob+" has been eliminated.")
       if (battleGoblins.some(battleGoblin => battleGoblin.alive === 1)){
      selectRandomGoblin()
    }
      enemyAttack()
    }
  
    function elfSpecial() {
  
      if (elfSP > 0 && playerTurn > 0){
        playerTurn = 0
      
      vanguardHP = vanguardHP + elfSpecMove
      warriorHP = warriorHP + elfSpecMove
      elfHP = elfHP + elfSpecMove

      elfSP = elfSP - 1
  
      if (elfHP > elfMaxHP){
        elfHP = elfMaxHP
      }
  
      if (vanguardHP > vanguardMaxHP){
        vanguardHP = vanguardMaxHP
      }
  
      if (warriorHP > warriorMaxHP){
        warriorHP = warriorMaxHP
      }
      setTimeout(function(){
      textArray.push("Elf restores "+elfSpecMove+" HP to all party members.")
      updateText()
      updateHP();
  
      enemyAttack();

    },1000)

  } else if(elfSP < 1){
    
      textArray.push('Not enough SP')
      updateText()
  } else{

    textArray.push("It's not your turn")
      updateText()

  }
  
    }
  
    function warriorSpecial() {
    if (playerTurn > 0 && warriorSP > 0){
      playerTurn = 0
      setTimeout(function(){
      warriorSpc = 2
      warriorSP = warriorSP - 1
      textArray.push("Warrior Rallies and boosts attack of all characters by "+warriorSpecMove)
      updateText()
      enemyAttack()
    },1000)

  } else if(warriorSP < 1){
      
        textArray.push('Not enough SP')
        updateText()
      
  } else {

      textArray.push("It's not your turn")
      updateText()

  }
    
    }
  
    function vanguardSpecial() {

      if (playerTurn > 0 && vanguardSP > 0){
        playerTurn = 0
        setTimeout(function(){
        vanguardSpc = 2
        vanguardSP = vanguardSP - 1
        textArray.push("Vanguard boosts defense of all characters by "+vanguardSpecMove)
        updateText()
        enemyAttack()
      },1000)
  
    } else if(vanguardSP < 1){
        
          textArray.push('Not enough SP')
          updateText()
        
    } else {
  
        textArray.push("It's not your turn")
        updateText()
  
    }
    }
  
    

    function goblinCounterAttack(char, def){
      if (battleGoblins[selectedGoblin].counterAttack > 0){
        setTimeout(function(){
        determineCounterAttack()
      },1000)
      } else {
        enemyAttack()
      }
      function determineCounterAttack(){
        
      let atkOrNot = Math.floor(Math.random()*2)
    
      if (atkOrNot >0){
        let damageFactor = Math.floor(Math.random()*battleGoblins[selectedGoblin].attack)+1 - Math.floor(Math.random()*def)+1
        let damage = Math.floor(damageFactor/2)

        if (damage < 1){
          enemyAttack()
        }else{
        switch (char){
          case "vanguard":
            vanguardHP = vanguardHP - damage;
            let vanG = $('#vanguarddiv')
            $('#vanguard').effect('shake')
            generateGoblinSlash(vanG)
          case "warrior":
            warriorHP = warriorHP - damage;
            let warR = $('#warriordiv')
            $('#warrior').effect('shake')
            generateGoblinSlash(warR)
          case "elf":
            elfHP = elfHP - damage;
            let elf = $('#elf')
            $('#elf').effect('shake')
            generateGoblinSlash(elf)
        }
        textArray.push(goblinType+" counterattacks "+char+" and deals "+damage+" damage")
      
        updateText()
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
  
      $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP+'HP/'+vanguardSP+'SP')
      $('#warriorHP').text('Warrior:'+ ''+warriorHP+'HP/'+warriorSP+'SP')
      $('#elfHP').text('Elf:'+ ''+elfHP+'HP/'+elfSP+'SP')
      
      }

    function updateText() {

      if (textArray.length > 3){
        textArray.splice(0,1)
      }

      $('#messagea').text(textArray[0])
      $('#messageb').text(textArray[1])
      $('#messagec').text(textArray[2])
    
    }

    function updateDifficulty(){
      $('#goblinType').text('Goblin Type: '+gameData.goblinStats[goblinLvl].type)
      $('#goblinHP').text('HP: '+gameData.goblinStats[goblinLvl].hitPoints)
      $('#goblinAtk').text("Atk: "+gameData.goblinStats[goblinLvl].attack)
      $('#goblinDef').text('Def: '+gameData.goblinStats[goblinLvl].defense)
      if (gameData.goblinStats[goblinLvl].counterAttack > 0){
      $('#goblinCounterAtk').text('This goblin has a counterattack move.')
      } else {
        $('#goblinCounterAtk').text('This goblin does not have a counterattack move.')
      }
      $('#goblinImg').attr('src','graphics/'+gameData.goblinStats[goblinLvl].png+'.png')
    }

    function victorySeq(elfxp, warriorxp, vanguardxp){

      let battleBaseExp = gameData.goblinStats[goblinLvl].baseExp
      elfExp = elfExp + elfxp + battleBaseExp
      warriorExp = warriorExp + warriorxp + battleBaseExp
      vanguardExp = vanguardExp + vanguardxp + battleBaseExp

      storageData.xp[0].elf = elfExp
      let xpStringE = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpStringE)
      elfExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[0].elf

      storageData.xp[1].warrior = warriorExp
      let xpStringW = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpStringW)
      warriorExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[1].warrior
      
      storageData.xp[2].vanguard = vanguardExp
      let xpStringV = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpStringV)
      vanguardExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[2].vanguard

      if (elfExp > elfLvl*10){
        elfLevelUp()
      } else if (warriorExp > warriorLvlFactor*10){
        warriorLevelUp()
      } else if (vanguardExp > vanguardLvlFactor*10){
        vanguardLevelUp()
      } else {
        resetBattleScreen()
      }

    }

    function elfLevelUp() {
      elfLvl = elfLvl + 1
      if (elfLvl>4){
        elfLvl=4
        resetBattleScreen()
        return;
      } else{
      storageData.lvl[0].elf = elfLvl
      let levelString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', levelString)
      elfLvl = JSON.parse(localStorage.getItem('goblinSaveData')).lvl[0].elf
      alert('elf has leveled up')
      elfExp = 0
      storageData.xp[0].elf = elfExp
      let xpString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpString)
      elfExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[0].elf

      if (warriorExp > warriorLvlFactor*10){
        warriorLevelUp()
      } else if (vanguardExp > vanguardLvlFactor*10){
        vanguardLevelUp()
      } else{
      resetBattleScreen()
      }
    }
    }

    function warriorLevelUp() {
      warriorLvl = warriorLvl + 1
      if (warriorLvl>4){
        warriorLvl=4
        resetBattleScreen()
        return;
      } else{
      storageData.lvl[1].warrior = warriorLvl
      let levelString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', levelString)
      warriorLvl = JSON.parse(localStorage.getItem('goblinSaveData')).lvl[1].warrior
      alert('warrior has leveled up')
      warriorExp = 0
      storageData.xp[1].warrior = warriorExp
      let xpString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpString)
      warriorExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[1].warrior
      
      if (vanguardExp > vanguardLvlFactor*10){
        vanguardLevelUp()
      } else {
      resetBattleScreen()
      }

    }
    }

    function vanguardLevelUp() {
      vanguardLvl = vanguardLvl + 1
      if (vanguardLvl>4){
        vanguardLvl=4
        resetBattleScreen()
        return;
      } else {
      storageData.lvl[2].vanguard = vanguardLvl
      let levelString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', levelString)
      vanguardLvl = JSON.parse(localStorage.getItem('goblinSaveData')).lvl[2].vanguard
      alert('vanguard has leveled up')
      vanguardExp = 0
      storageData.xp[2].vanguard = vanguardExp
      let xpString = JSON.stringify(storageData)
      localStorage.setItem('goblinSaveData', xpString)
      vanguardExp = JSON.parse(localStorage.getItem('goblinSaveData')).xp[2].vanguard
      resetBattleScreen()
      }
    }

    function resetBattleScreen() {

      elfHP = gameData.elfStats[elfLvl].hitPoints
      warriorHP = gameData.warriorStats[warriorLvl].hitPoints
      gameData.vanguardStats[vanguardLvl].hitPoints

      battleGoblins = []

      $('#elf').remove()
      $('#warrior').remove()
      $('#vanguard').remove()
      $('#vanguardattack').remove()
      $('#vanguardspecial').remove()
      $('#warriorattack').remove()
      $('#warriorspecial').remove()
      $('#elfattack').remove()
      $('#elfspecial').remove()
      $(".goblinButton").remove()
      $("#goblinDiv0").remove()
      $("#goblinDiv1").remove()
      $("#goblinDiv2").remove()
      $("#elfHP").remove()
      $("#warriorHP").remove()
      $("#vanguardHP").remove()
      // $('#hpdiv').hide()
      $('#startbutton').show()
      $('#lvldown').show()
      $('#lvlup').show()
      $('#difficulty').show()
      $('#messageb').empty()
      $('#messagea').empty()

    }

    function generatePlayerSlash() {

      let slashDiv = $('<img>')
        slashDiv.attr('src','graphics/blueslash.gif')
        slashDiv.attr('class','slash')
        $('#goblinDiv'+selectedGoblin).append(slashDiv)
        
      
        setTimeout(function(){
        $(slashDiv).remove()

      },600)

    }

    function generateGoblinSlash(char) {

      let slashDiv = $('<img>')
        slashDiv.attr('src','graphics/redslash.gif')
        slashDiv.attr('class','slash')
        char.append(slashDiv)
        setTimeout(function(){
        $(slashDiv).remove()
      },600)
    }

    function generateCharacters(){
      let newElf = $('<img id="elf" src="graphics/elf.png" height="100" onclick="selectElf()">')
      let elfAtkB = $("<button id='elfattack' class='playerbtn' onclick='elfAttack()'>")
      elfAtkB.text('Attack')
      let elfSpecB = $("<button id='elfspecial' class='playerbtn' onclick='elfSpecial()'>")
      elfSpecB.text('Special')

      let newVanguard = $('<img id="vanguard" src="graphics/vanguard.png" height="100" onclick="selectVanguard()">')
      let vanguardAtkB = $("<button id='vanguardattack' class='playerbtn' onclick='vanguardAttack()'>")
      vanguardAtkB.text('Attack')
      let vanguardSpecB = $("<button id='vanguardspecial' class='playerbtn' onclick='vanguardSpecial()'>")
      vanguardSpecB.text('Special')

      let newWarrior = $('<img id="warrior" src="graphics/warrior.png" height="100" onclick="selectWarrior()">')
      let warriorAtkB = $("<button id='warriorattack' class='playerbtn' onclick='warriorAttack()'>")
      warriorAtkB.text('Attack')
      let warriorSpecB = $("<button id='warriorspecial' class='playerbtn' onclick='warriorSpecial()'>")
      warriorSpecB.text('Special')

      $('#elfdiv').append(newElf, elfAtkB, elfSpecB)
      elfAtkB.hide()
      elfSpecB.hide()
      $('#vanguarddiv').append(newVanguard, vanguardAtkB, vanguardSpecB)
      vanguardAtkB.hide()
      vanguardSpecB.hide()
      $('#warriordiv').append(newWarrior, warriorAtkB, warriorSpecB)
      warriorAtkB.hide()
      warriorSpecB.hide()
    }

    function generateHPbar() {
      
      let newElfHP = $("<p id='elfHP' class='stats'></p>")
      let newWarriorHP = $("<p id='warriorHP' class='stats'></p>")
      let newVanguardHP = $("<p id='vanguardHP' class='stats'></p>")

      $('#hpdiv').append(newElfHP, newWarriorHP, newVanguardHP)

      $('#vanguardHP').text('Vanguard:'+ ''+vanguardHP+'HP/'+vanguardSP+'SP')
      $('#warriorHP').text('Warrior:'+ ''+warriorHP+'HP/'+warriorSP+'SP')
      $('#elfHP').text('Elf:'+ ''+elfHP+'HP/'+elfSP+'SP')
    }
    
    function gameOver() {
      textArray.push('Defeat')
      updateText()
      resetBattleScreen();
    }

    
    
    
    
    