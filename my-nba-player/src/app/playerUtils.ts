const leagueData = require('./league.json');

export interface PlayerAttributes {
    name?: string;
    team?: string;
    overallAttribute?: number;
    closeShot?: number;
    midRangeShot?: number;
    threePointShot?: number;
    freeThrow?: number;
    shotIQ?: number;
    offensiveConsistency?: number;
    layup?: number;
    standingDunk?: number;
    drivingDunk?: number;
    postHook?: number;
    postFade?: number;
    postControl?: number;
    drawFoul?: number;
    hands?: number;
    interiorDefense?: number;
    perimeterDefense?: number;
    steal?: number;
    block?: number;
    lateralQuickness?: number;
    helpDefenseIQ?: number;
    passPerception?: number;
    defensiveConsistency?: number;
    speed?: number;
    acceleration?: number;
    strength?: number;
    vertical?: number;
    stamina?: number;
    hustle?: number;
    overallDurability?: number;
    passAccuracy?: number;
    ballHandle?: number;
    speedWithBall?: number;
    passIQ?: number;
    passVision?: number;
    offensiveRebound?: number;
    defensiveRebound?: number;
}

export function calculateEuclideanDistance(customPlayer: PlayerAttributes, nbaPlayer: PlayerAttributes): number {
    const keys = Object.keys(customPlayer).filter(key => key !== 'name' && key !== 'team');
    let sum = 0;

    for (const key of keys) {
        const k = key as keyof PlayerAttributes;
        sum += Math.pow((customPlayer[k] as unknown as number) * 10 + 5 - (nbaPlayer[k] as unknown as number), 2);
    }

    return Math.sqrt(sum);
}

export function findMostSimilarPlayer(customPlayer: PlayerAttributes, league: PlayerAttributes[]): { player: PlayerAttributes, distance: number } {
    let mostSimilarPlayer: PlayerAttributes | null = null;
    let smallestDistance = Infinity;

    for (const player of league) {
        const distance = calculateEuclideanDistance(customPlayer, player);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            mostSimilarPlayer = player;
        }
    }

    return { player: mostSimilarPlayer!, distance: smallestDistance };
}


export function calculateAverage(values: number[]): number {
    const validValues = values.filter(value => value !== undefined);
    const sum = validValues.reduce((a, b) => a + b, 0);
    return validValues.length ? sum / validValues.length : 0;
  }
  
  export function getPlayerAverages(player: PlayerAttributes) {
    const outsideScoring = calculateAverage([
        player.closeShot || 0,
        player.midRangeShot || 0,
        player.threePointShot || 0,
        player.freeThrow || 0,
        player.shotIQ || 0,
    ]);
  
    const insideScoring = calculateAverage([
        player.layup || 0,
        player.postHook || 0,
        player.postFade || 0,
        player.postControl || 0,
    ]);
  
    const playmaking = calculateAverage([
        player.passAccuracy || 0,
        player.ballHandle || 0,
        player.passIQ || 0,
    ]);
  
    const rebounding = calculateAverage([
        player.offensiveRebound || 0,
        player.defensiveRebound || 0,
    ]);
  
    const athleticism = calculateAverage([
        player.speed || 0,
        player.strength || 0,
        player.hustle || 0,
    ]);
  
    const defense = calculateAverage([
        player.interiorDefense || 0,
        player.perimeterDefense || 0,
        player.steal || 0,
        player.block || 0,
        player.helpDefenseIQ || 0,
    ]);
  
    return {
        outsideScoring,
        insideScoring,
        playmaking,
        rebounding,
        athleticism,
        defense
    };
  }