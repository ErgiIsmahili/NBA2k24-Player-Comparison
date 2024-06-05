import { getPlayerAverages, PlayerAttributes } from './playerUtils';

const testPlayer: PlayerAttributes = {
    name: 'Test Player',
    team: 'Test Team',
    closeShot: 70,
    midRangeShot: 60,
    threePointShot: 80,
    freeThrow: 75,
    shotIQ: 85,
    layup: 65,
    postHook: 55,
    postFade: 60,
    postControl: 70,
    hands: 50,
    interiorDefense: 60,
    perimeterDefense: 65,
    steal: 70,
    block: 55,
    helpDefenseIQ: 75,
    speed: 80,
    strength: 70,
    hustle: 85,
    passAccuracy: 60,
    ballHandle: 70,
    passIQ: 75,
    offensiveRebound: 55,
    defensiveRebound: 65
};

const averages = getPlayerAverages(testPlayer);

console.log('Averages for Test Player:');
console.log('Outside Scoring:', averages.outsideScoring);
console.log('Inside Scoring:', averages.insideScoring);
console.log('Playmaking:', averages.playmaking);
console.log('Rebounding:', averages.rebounding);
console.log('Athleticism:', averages.athleticism);
console.log('Defense:', averages.defense);
