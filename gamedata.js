let gameData = {
 vanguardStats: [
  
  {
  attack: 3,
  maxAttack: 3,
  defense: 5,
  maxDefense: 5,
  hitPoints: 30,
  maxHP: 30,
  special: 3
  },

  {
    attack: 5,
    maxAttack: 5,
    defense: 8,
    maxDefense: 8,
    hitPoints: 35,
    maxHP: 35,
    special: 5
  },

  {
    attack: 6,
    maxAttack: 6,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 7
  },

  {
    attack: 9,
    maxAttack: 9,
    defense: 14,
    maxDefense: 14,
    hitPoints: 43,
    maxHP: 43,
    special: 9
  },

  {
    attack: 12,
    maxAttack: 12,
    defense: 19,
    maxDefense: 19,
    hitPoints: 47,
    maxHP: 47,
    special: 11
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
  special: 3
  },

  {
    attack: 6,
    maxAttack: 6,
    defense: 6,
    maxDefense: 6,
    hitPoints: 29,
    maxHP: 29,
    special: 5
  },

  {
    attack: 7,
    maxAttack: 7,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 7
  },

  {
    attack: 9,
    maxAttack: 9,
    defense: 14,
    maxDefense: 14,
    hitPoints: 43,
    maxHP: 43,
    special: 9
  },

  {
    attack: 12,
    maxAttack: 12,
    defense: 19,
    maxDefense: 19,
    hitPoints: 47,
    maxHP: 47,
    special: 11
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
  special: 3
  },

  {
    attack: 8,
    maxAttack: 8,
    defense: 5,
    maxDefense: 5,
    hitPoints: 25,
    maxHP: 25,
    special: 5
  },

  {
    attack: 11,
    maxAttack: 11,
    defense: 6,
    maxDefense: 6,
    hitPoints: 28,
    maxHP: 28,
    special: 7
  },

  {
    attack: 14,
    maxAttack: 14,
    defense: 9,
    maxDefense: 9,
    hitPoints: 34,
    maxHP: 34,
    special: 9
  },

  {
    attack: 19,
    maxAttack: 19,
    defense: 11,
    maxDefense: 11,
    hitPoints: 38,
    maxHP: 38,
    special: 11
  },

],

goblinStats: [

  {
    type: 'Goblin Squire',
    attack: 4,
    defense: 2,
    hitPoints: 10,
    counterAttack: false
  },

  {
    type: 'Goblin Ranger',
    attack: 7,
    defense: 6,
    hitPoints: 13,
    counterAttack: true
  },

  {
    type: 'Goblin Berserker',
    attack: 7,
    defense: 6,
    hitPoints: 13,
    counterAttack: false
  },

  {
    type: 'Goblin Knight',
    attack: 7,
    defense: 6,
    hitPoints: 13,
    counterAttack: true
  },

  {
    type: 'Goblin King',
    attack: 7,
    defense: 6,
    hitPoints: 13,
    counterAttack: true
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
let goblinLvl = 0
let warriorSpc = 0
let vanguardSpc = 0

let vanguardHP = gameData.vanguardStats[vanguardLvl].hitPoints
let vanguardMaxHP = gameData.vanguardStats[vanguardLvl].maxHP
let vanguardAtk = gameData.vanguardStats[vanguardLvl].attack
let vanguardMaxAtk = gameData.vanguardStats[vanguardLvl].maxAttack
let vanguardDef = gameData.vanguardStats[vanguardLvl].defense
let vanguardMaxDef = gameData.vanguardStats[vanguardLvl].maxDefense
let vanguardSpecMove = gameData.vanguardStats[vanguardLvl].special

let warriorHP = gameData.warriorStats[warriorLvl].hitPoints
let warriorMaxHP = gameData.warriorStats[warriorLvl].maxHP
let warriorAtk = gameData.warriorStats[warriorLvl].attack
let warriorMaxAtk = gameData.warriorStats[warriorLvl].maxAttack
let warriorDef = gameData.warriorStats[warriorLvl].defense
let warriorMaxDef = gameData.warriorStats[warriorLvl].maxDefense
let warriorSpecMove = gameData.warriorStats[warriorLvl].special

let elfHP = gameData.elfStats[elfLvl].hitPoints
let elfMaxHP = gameData.elfStats[elfLvl].maxHP
let elfAtk = gameData.elfStats[elfLvl].attack
let elfMaxAtk = gameData.elfStats[elfLvl].maxAttack
let elfDef = gameData.elfStats[elfLvl].defense
let elfMaxDef = gameData.elfStats[elfLvl].maxDefense
let elfSpecMove = gameData.elfStats[elfLvl].special

let goblinHP = gameData.goblinStats[goblinLvl].hitPoints
let goblinType = gameData.goblinStats[goblinLvl].type
let goblinAttack = gameData.goblinStats[goblinLvl].attack
let goblinDefense = gameData.goblinStats[goblinLvl].defense
let goblinCounterAttack = gameData.goblinStats[0].counterAttack

let playerTurn = false