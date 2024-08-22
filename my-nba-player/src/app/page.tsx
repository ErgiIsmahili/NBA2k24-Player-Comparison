"use client"
import { useEffect, useState } from 'react';
import { PlayerAttributes, findMostSimilarPlayer, calculateEuclideanDistance } from './yourPlayer';
import league from './league.json';
import ApexChart from './apexchart';

const IndexPage: React.FC = () => {
  const [mostSimilarPlayer, setMostSimilarPlayer] = useState<{ player: PlayerAttributes | null, distance: number | null }>({ player: null, distance: null });
  const [customPlayer, setCustomPlayer] = useState<PlayerAttributes>({
    closeShot: 5,
    midRangeShot: 5,
    threePointShot: 5,
    freeThrow: 5,
    shotIQ: 5,
    layup: 5,
    postHook: 5,
    postFade: 5,
    postControl: 5,
    interiorDefense: 5,
    perimeterDefense: 5,
    steal: 5,
    block: 5,
    helpDefenseIQ: 5,
    speed: 5,
    strength: 5,
    hustle: 5,
    passAccuracy: 5,
    ballHandle: 5,
    passIQ: 5,
    offensiveRebound: 5,
    defensiveRebound: 5
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

  const renderAttributeInputs = (stat: string, value: number) => {
    return (
      <div>
        <h2>{stat}</h2>
        <div>
          <input
            type="range"
            min="0"
            max="10"
            value={value}
            onChange={(e) => handleCustomPlayerChange(stat as keyof PlayerAttributes, parseInt(e.target.value))}
          />
          <span>{value}</span>
        </div>
      </div>
    );
  };
  

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl underline">NBA 2k24 Player Comparison</h1>
      <div>
        <h2 className="max-w-2xl mx-auto text-center mb-5">
          Answer each of the following prompts by dragging the slider.
          Afterward, you can filter the list of current players by their 2K rating.
          You will be matched with a player whose rating is greater than or equal to the filter value.
          Once matched, you can view your own radar chart and the player. Enjoy!
        </h2>
      </div>
      <div className="flex flex-row justify-around max-w-5xl mx-auto">
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Outside Scoring</h3>
            {renderAttributeInputs('closeShot', customPlayer.closeShot || 5)}
            {renderAttributeInputs('midRangeShot', customPlayer.midRangeShot || 5)}
            {renderAttributeInputs('threePointShot', customPlayer.threePointShot || 5)}
            {renderAttributeInputs('freeThrow', customPlayer.freeThrow || 5)}
            {renderAttributeInputs('shotIQ', customPlayer.shotIQ || 5)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Inside Scoring</h3>
            {renderAttributeInputs('layup', customPlayer.layup || 5)}
            {renderAttributeInputs('postHook', customPlayer.postHook || 5)}
            {renderAttributeInputs('postFade', customPlayer.postFade || 5)}
            {renderAttributeInputs('postControl', customPlayer.postControl || 5)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Playmaking</h3>
            {renderAttributeInputs('passAccuracy', customPlayer.passAccuracy || 5)}
            {renderAttributeInputs('ballHandle', customPlayer.ballHandle || 5)}
            {renderAttributeInputs('passIQ', customPlayer.passIQ || 5)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Athleticism</h3>
            {renderAttributeInputs('speed', customPlayer.speed || 5)}
            {renderAttributeInputs('strength', customPlayer.strength || 5)}
            {renderAttributeInputs('hustle', customPlayer.hustle || 5)}
          </div>
        </div>
        <div className="flex flex-row items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Rebounding</h3>
            {renderAttributeInputs('offensiveRebound', customPlayer.offensiveRebound || 5)}
            {renderAttributeInputs('defensiveRebound', customPlayer.defensiveRebound || 5)}
          </div>
          <div className="mr-5">
            <h3 className="text-lg underline">Defense</h3>
            {renderAttributeInputs('interiorDefense', customPlayer.interiorDefense || 5)}
            {renderAttributeInputs('perimeterDefense', customPlayer.perimeterDefense || 5)}
            {renderAttributeInputs('steal', customPlayer.steal || 5)}
            {renderAttributeInputs('block', customPlayer.block || 5)}
            {renderAttributeInputs('helpDefenseIQ', customPlayer.helpDefenseIQ || 5)}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around my-5">
        <div className="mr-2.5 w-96">
          <h3 className="text-lg underline">Custom Player Chart</h3>
          <ApexChart
            series={[{ name: 'Your Chart', data: [6, 5, 5, 5, 5, 5, 6] }]}
            categories={['Overall', 'Inside Scoring', 'Outside Scoring', 'Athleticism', 'Playmaking', 'Rebounding', 'Defense']}
          />
        </div>
        <div className="mr-2.5 mb-[315px] border-3 border-gray-300 p-2.5 rounded-lg">
          <h3 className="text-lg underline">Most Similar Player</h3>
          {mostSimilarPlayer.player && (
            <div>
              <h4>{mostSimilarPlayer.player.name}</h4>
            </div>
          )}
        </div>
        <div className="mr-2.5 w-96">
          <h3 className="text-lg underline">Most Similar Player Chart</h3>
          <ApexChart
            series={[{ name: 'Player Chart', data: [5, 9, 5, 5, 5, 7, 8] }]}
            categories={['Overall', 'Inside Scoring', 'Outside Scoring', 'Athleticism', 'Playmaking', 'Rebounding', 'Defense']}
          />
        </div>
      </div>
    </div>
  );  
};  

export default IndexPage;