"use client"
import { useEffect, useState } from 'react';
import { PlayerAttributes, findMostSimilarPlayer, calculateEuclideanDistance } from './yourPlayer';
import league from './league.json';
import ApexChart from './apexchart';

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
    defensiveRebound: 50,
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
    <div className="mb-4">
      <h2 className="text-sm font-medium mb-1">{stat}</h2>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) =>
            handleCustomPlayerChange(stat as keyof PlayerAttributes, parseInt(e.target.value))
          }
          className="flex-grow"
        />
        <span className="w-12 text-center">{value}</span>
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
            {renderAttributeInputs('closeShot', customPlayer.closeShot || 50)}
            {renderAttributeInputs('midRangeShot', customPlayer.midRangeShot || 50)}
            {renderAttributeInputs('threePointShot', customPlayer.threePointShot || 50)}
            {renderAttributeInputs('freeThrow', customPlayer.freeThrow || 50)}
            {renderAttributeInputs('shotIQ', customPlayer.shotIQ || 50)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Inside Scoring</h3>
            {renderAttributeInputs('layup', customPlayer.layup || 50)}
            {renderAttributeInputs('postHook', customPlayer.postHook || 50)}
            {renderAttributeInputs('postFade', customPlayer.postFade || 50)}
            {renderAttributeInputs('postControl', customPlayer.postControl || 50)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Playmaking</h3>
            {renderAttributeInputs('passAccuracy', customPlayer.passAccuracy || 50)}
            {renderAttributeInputs('ballHandle', customPlayer.ballHandle || 50)}
            {renderAttributeInputs('passIQ', customPlayer.passIQ || 50)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Athleticism</h3>
            {renderAttributeInputs('speed', customPlayer.speed || 50)}
            {renderAttributeInputs('strength', customPlayer.strength || 50)}
            {renderAttributeInputs('hustle', customPlayer.hustle || 50)}
          </div>
        </div>
        <div className="flex flex-row items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Rebounding</h3>
            {renderAttributeInputs('offensiveRebound', customPlayer.offensiveRebound || 50)}
            {renderAttributeInputs('defensiveRebound', customPlayer.defensiveRebound || 50)}
          </div>
          <div className="mr-5">
            <h3 className="text-lg underline">Defense</h3>
            {renderAttributeInputs('interiorDefense', customPlayer.interiorDefense || 50)}
            {renderAttributeInputs('perimeterDefense', customPlayer.perimeterDefense || 50)}
            {renderAttributeInputs('steal', customPlayer.steal || 50)}
            {renderAttributeInputs('block', customPlayer.block || 50)}
            {renderAttributeInputs('helpDefenseIQ', customPlayer.helpDefenseIQ || 50)}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around my-5">
        <div className="mr-2.5 w-96">
          <h3 className="text-lg underline">Custom Player Chart</h3>
          <ApexChart
            series={[{ name: 'Your Chart', data: [6, 50, 50, 50, 50, 50, 6] }]}
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
            series={[{ name: 'Player Chart', data: [50, 9, 50, 50, 50, 7, 8] }]}
            categories={['Overall', 'Inside Scoring', 'Outside Scoring', 'Athleticism', 'Playmaking', 'Rebounding', 'Defense']}
          />
        </div>
      </div>
    </div>
  );  
};  

export default IndexPage;