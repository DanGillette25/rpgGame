let gameData = {
 vanguardStats: [
  
  {
  attack: 3,
  maxAttack: 3,
  defense: 5,
  maxDefense: 5,
  hitPoints: 30,
  maxHP: 30,
  special: 3,
  sp: 3
  },

  {
    attack: 5,
    maxAttack: 5,
    defense: 8,
    maxDefense: 8,
    hitPoints: 35,
    maxHP: 35,
    special: 5,
    sp: 3
  },

  {
    attack: 6,
    maxAttack: 6,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 7,
    sp: 3
  },

  {
    attack: 9,
    maxAttack: 9,
    defense: 14,
    maxDefense: 14,
    hitPoints: 43,
    maxHP: 43,
    special: 9,
    sp: 3
  },

  {
    attack: 12,
    maxAttack: 12,
    defense: 19,
    maxDefense: 19,
    hitPoints: 47,
    maxHP: 47,
    special: 11,
    sp: 3
  },

],

warriorStats: [

  {
  attack: 4,
  maxAttack: 4,
  defense: 4,
  maxDefense: 4,
  hitPoints: 25,
  maxHP: 25,
  special: 3,
  sp: 3
  },

  {
    attack: 6,
    maxAttack: 6,
    defense: 6,
    maxDefense: 6,
    hitPoints: 29,
    maxHP: 29,
    special: 5,
    sp: 3
  },

  {
    attack: 7,
    maxAttack: 7,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 7,
    sp: 3
  },

  {
    attack: 9,
    maxAttack: 9,
    defense: 14,
    maxDefense: 14,
    hitPoints: 43,
    maxHP: 43,
    special: 9,
    sp: 3
  },

  {
    attack: 12,
    maxAttack: 12,
    defense: 19,
    maxDefense: 19,
    hitPoints: 47,
    maxHP: 47,
    special: 11,
    sp: 3
  },

],

elfStats: [

  {
  attack: 5,
  maxAttack: 5,
  defense: 3,
  maxDefense: 3,
  hitPoints: 20,
  maxHP: 20,
  special: 3,
  sp: 3
  },

  {
    attack: 8,
    maxAttack: 8,
    defense: 5,
    maxDefense: 5,
    hitPoints: 25,
    maxHP: 25,
    special: 5,
    sp: 3
  },

  {
    attack: 11,
    maxAttack: 11,
    defense: 6,
    maxDefense: 6,
    hitPoints: 28,
    maxHP: 28,
    special: 7,
    sp: 3
  },

  {
    attack: 14,
    maxAttack: 14,
    defense: 9,
    maxDefense: 9,
    hitPoints: 34,
    maxHP: 34,
    special: 9,
    sp: 3
  },

  {
    attack: 19,
    maxAttack: 19,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 11,
    sp: 3
  },

],

goblinStats: [

  {
    type: 'Goblin Squire',
    png: 'goblinsquire',
    attack: 4,
    defense: 2,
    hitPoints: 10,
    counterAttack: 0,
    baseExp: 3
  },

  {
    type: 'Goblin Ranger',
    png: 'goblinranger',
    attack: 7,
    defense: 6,
    hitPoints: 13,
    counterAttack: 1,
    baseExp: 5
  },

  {
    type: 'Goblin Berserker',
    png: 'goblinberserker',
    attack: 12,
    defense: 7,
    hitPoints: 15,
    counterAttack: 0,
    baseExp: 7
  },

  {
    type: 'Goblin Knight',
    png: 'goblinknight',
    attack: 15,
    defense: 12,
    hitPoints: 30,
    counterAttack: 1,
    baseExp: 12
  },

  {
    type: 'Goblin Destroyer',
    png: 'goblindestroyer',
    attack: 25,
    defense: 15,
    hitPoints: 50,
    counterAttack: 1,
    baseExp: 15
  },

],

}

let saveData = {
  xp: [
    {elf: 0},
    {warrior: 0},
    {vanguard: 0},
  ],

  lvl: [
    {elf: 0},
    {warrior: 0},
    {vanguard: 0},
  ]
}

if (localStorage.getItem('goblinSaveData')){
  let characterLevels = JSON.parse(localStorage.getItem('goblinSaveData'))
} else{
  localStorage.setItem('goblinSaveData', JSON.stringify(saveData))
}

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

let storageData = JSON.parse(localStorage.getItem('goblinSaveData'))

let battleGoblins = []
let selectedGoblin = 0
let goblinLvl = 1
let vanguardLvl = storageData.lvl[2].vanguard
let warriorLvl = storageData.lvl[1].warrior
let elfLvl = storageData.lvl[0].elf
let elfExp = storageData.xp[0].elf
let warriorExp = storageData.xp[1].warrior
let vanguardExp = storageData.xp[2].vanguard
let warriorSpc = 0
let vanguardSpc = 0
let vanguardAlive = 1
let elfAlive = 1
let warriorAlive = 1

let vanguardHP = gameData.vanguardStats[vanguardLvl].hitPoints
let vanguardMaxHP = gameData.vanguardStats[vanguardLvl].maxHP
let vanguardAtk = gameData.vanguardStats[vanguardLvl].attack
let vanguardMaxAtk = gameData.vanguardStats[vanguardLvl].maxAttack
let vanguardDef = gameData.vanguardStats[vanguardLvl].defense
let vanguardMaxDef = gameData.vanguardStats[vanguardLvl].maxDefense
let vanguardSpecMove = gameData.vanguardStats[vanguardLvl].special
let vanguardSP = gameData.vanguardStats[vanguardLvl].sp
let vanguardPE = 0

let warriorHP = gameData.warriorStats[warriorLvl].hitPoints
let warriorMaxHP = gameData.warriorStats[warriorLvl].maxHP
let warriorAtk = gameData.warriorStats[warriorLvl].attack
let warriorMaxAtk = gameData.warriorStats[warriorLvl].maxAttack
let warriorDef = gameData.warriorStats[warriorLvl].defense
let warriorMaxDef = gameData.warriorStats[warriorLvl].maxDefense
let warriorSpecMove = gameData.warriorStats[warriorLvl].special
let warriorSP = gameData.warriorStats[warriorLvl].sp
let warriorPE = 0

let elfHP = gameData.elfStats[elfLvl].hitPoints
let elfMaxHP = gameData.elfStats[elfLvl].maxHP
let elfAtk = gameData.elfStats[elfLvl].attack
let elfMaxAtk = gameData.elfStats[elfLvl].maxAttack
let elfDef = gameData.elfStats[elfLvl].defense
let elfMaxDef = gameData.elfStats[elfLvl].maxDefense
let elfSpecMove = gameData.elfStats[elfLvl].special
let elfSP = gameData.elfStats[elfLvl].sp
let elfPE = 0

let goblinHP = gameData.goblinStats[goblinLvl].hitPoints
let goblinType = gameData.goblinStats[goblinLvl].type
let goblinAttack = gameData.goblinStats[goblinLvl].attack
let goblinDefense = gameData.goblinStats[goblinLvl].defense
let goblinCounterAtk = gameData.goblinStats[goblinLvl].counterAttack

let playerTurn = 0
let textArray = []
let elfLvlFactor = elfLvl + 1
let warriorLvlFactor = warriorLvl + 1
let vanguardLvlFactor = vanguardLvl + 1