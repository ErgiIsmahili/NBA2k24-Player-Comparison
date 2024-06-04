"use client"
import { useEffect, useState } from 'react';
import { PlayerAttributes, findMostSimilarPlayer, calculateEuclideanDistance } from './yourPlayer';
import league from './league.json';

const IndexPage: React.FC = () => {
  const [mostSimilarPlayer, setMostSimilarPlayer] = useState<{ player: PlayerAttributes | null, distance: number | null }>({ player: null, distance: null });
  const [customPlayer, setCustomPlayer] = useState<PlayerAttributes>({
    closeShot: 50,
    midRangeShot: 50,
    threePointShot: 50,
    freeThrow: 50,
    shotIQ: 50,
    layup: 50,
    postHook: 50,
    postFade: 50,
    postControl: 50,
    hands: 50,
    interiorDefense: 50,
    perimeterDefense: 50,
    steal: 50,
    block: 50,
    helpDefenseIQ: 50,
    speed: 50,
    strength: 50,
    hustle: 50,
    passAccuracy: 50,
    ballHandle: 50,
    passIQ: 50,
    offensiveRebound: 50,
    defensiveRebound: 50
  });

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const { player, distance } = findMostSimilarPlayer(customPlayer, league);
        setMostSimilarPlayer({ player, distance });
      } catch (error) {
        console.error('Error fetching league data:', error);
      }
    };
    fetchLeagueData();
  }, [customPlayer]);

  const handleCustomPlayerChange = (stat: keyof PlayerAttributes, value: number) => {
    setCustomPlayer({ ...customPlayer, [stat]: value });
  };

  return (
    <div>
      <div>
        <h2>Custom Player</h2>
        {Object.keys(customPlayer).map((stat) => (
          <div key={stat}>
            <label>{stat}: </label>
            <input
              type="range"
              min="0"
              max="99"
              value={customPlayer[stat as keyof PlayerAttributes]}
              onChange={(e) => handleCustomPlayerChange(stat as keyof PlayerAttributes, parseInt(e.target.value))}
            />
            <span>{customPlayer[stat as keyof PlayerAttributes]}</span>
          </div>
        ))}
      </div>
      {mostSimilarPlayer.player && (
        <div>
          <h1>Most Similar Player:</h1>
          <p>Name: {mostSimilarPlayer.player.name}</p>
          <p>Distance: {mostSimilarPlayer.distance}</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;