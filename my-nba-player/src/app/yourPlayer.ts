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

export function calculateEuclideanDistance(player1: PlayerAttributes, player2: PlayerAttributes): number {
    const keys = Object.keys(player1).filter(key => key !== 'name' && key !== 'team');
    let sum = 0;

    for (const key of keys) {
        const k = key as keyof PlayerAttributes;
        sum += Math.pow((player1[k] as unknown as number) - (player2[k] as unknown as number), 2);
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

const league: PlayerAttributes[] = leagueData;

const customPlayer: PlayerAttributes = {
    closeShot: 80,
    midRangeShot: 60,
    threePointShot: 70,
    freeThrow: 50,
    shotIQ: 70,
    layup: 75,
    postHook: 75,
    postFade: 85,
    postControl: 90,
    hands: 70,
    interiorDefense: 99,
    perimeterDefense: 60,
    steal: 56,
    block: 99,
    helpDefenseIQ: 90,
    speed: 60,
    strength: 60,
    hustle: 70,
    passAccuracy: 70,
    ballHandle: 40,
    passIQ: 60,
    offensiveRebound: 90,
    defensiveRebound: 90
};

const { player, distance } = findMostSimilarPlayer(customPlayer, league);
console.log(player.name, distance);
