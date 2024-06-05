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

  const renderAttributeInputs = (stat: string, value: number) => {
    return (
      <div>
        <h2>{stat}</h2>
        <div>
          <input
            type="range"
            min="0"
            max="99"
            value={value}
            onChange={(e) => handleCustomPlayerChange(stat as keyof PlayerAttributes, parseInt(e.target.value))}
          />
          <span>{value}</span>
        </div>
      </div>
    );
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2rem', textDecoration: 'underline' }}>NBA 2k24 Player Comparison</h1>
      <div>
      <h2 style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '20px'  }}>
        Answer each of the following prompts by dragging the slider. 
        Afterward, you can filter the list of current players by their 2K rating. 
        You will be matched with a player whose rating is greater than or equal to the filter value. 
        Once matched, you can view your own radar chart and the player. Enjoy!
      </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '50px' }}>
        <div style={{ marginBottom: '10px' }}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Outside Scoring</h3>
          {renderAttributeInputs('closeShot', customPlayer.closeShot ? customPlayer.closeShot : 50)}
          {renderAttributeInputs('midRangeShot', customPlayer.midRangeShot ? customPlayer.midRangeShot : 50)}
          {renderAttributeInputs('threePointShot', customPlayer.threePointShot ? customPlayer.threePointShot : 50)}
          {renderAttributeInputs('freeThrow', customPlayer.freeThrow ? customPlayer.freeThrow : 50)}
          {renderAttributeInputs('shotIQ', customPlayer.shotIQ ? customPlayer.shotIQ : 50)}
        </div>
        <div style={{ marginBottom: '10px'}}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Playmaking</h3>
          {renderAttributeInputs('passAccuracy', customPlayer.passAccuracy ? customPlayer.passAccuracy : 50)}
          {renderAttributeInputs('ballHandle', customPlayer.ballHandle ? customPlayer.ballHandle : 50)}
          {renderAttributeInputs('passIQ', customPlayer.passIQ ? customPlayer.passIQ : 50)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 20px' }}>
        <div style={{ marginBottom: '10px' }}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Inside Scoring</h3>
          {renderAttributeInputs('layup', customPlayer.layup ? customPlayer.layup : 50)}
          {renderAttributeInputs('postHook', customPlayer.postHook ? customPlayer.postHook : 50)}
          {renderAttributeInputs('postFade', customPlayer.postFade ? customPlayer.postFade : 50)}
          {renderAttributeInputs('postControl', customPlayer.postControl ? customPlayer.postControl : 50)}
        </div>
        <div style={{ marginBottom: '10px' }}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Athleticism</h3>
          {renderAttributeInputs('speed', customPlayer.speed ? customPlayer.speed : 50)}
          {renderAttributeInputs('strength', customPlayer.strength ? customPlayer.strength : 50)}
          {renderAttributeInputs('hustle', customPlayer.hustle ? customPlayer.hustle : 50)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px'}}>
        <div style={{ marginBottom: '10px' }}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Defense</h3>
          {renderAttributeInputs('hands', customPlayer.hands ? customPlayer.hands : 50)}
          {renderAttributeInputs('interiorDefense', customPlayer.interiorDefense ? customPlayer.interiorDefense : 50)}
          {renderAttributeInputs('perimeterDefense', customPlayer.perimeterDefense ? customPlayer.perimeterDefense : 50)}
          {renderAttributeInputs('steal', customPlayer.steal ? customPlayer.steal : 50)}
          {renderAttributeInputs('block', customPlayer.block ? customPlayer.block : 50)}
          {renderAttributeInputs('helpDefenseIQ', customPlayer.helpDefenseIQ ? customPlayer.helpDefenseIQ : 50)}
        </div>
        <div style={{ marginBottom: '10px' }}>
        <h3 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Rebounding</h3>
          {renderAttributeInputs('offensiveRebound', customPlayer.offensiveRebound ? customPlayer.offensiveRebound : 50)}
          {renderAttributeInputs('defensiveRebound', customPlayer.defensiveRebound ? customPlayer.defensiveRebound : 50)}
        </div>
      </div>
      </div>
      {mostSimilarPlayer.player && (
        <div>
          <h1 style={{fontSize: '1.2rem', textDecoration: 'underline' }}>Most Similar Player:</h1>
          <p>Name: {mostSimilarPlayer.player.name}</p>
          <p>Distance: {mostSimilarPlayer.distance}</p>
        </div>
      )}
    </div>
  );
};  

export default IndexPage;