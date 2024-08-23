'use client';

import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import { PlayerAttributes, findMostSimilarPlayer, calculateAverageStats } from './yourPlayer';
import league from './league.json';
import ApexChart from './apexchart';
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJFAybhRpTgE2vH8bj0gGXb_BnefTjrLQ",
  authDomain: "nbaplayercomparison.firebaseapp.com",
  projectId: "nbaplayercomparison",
  storageBucket: "nbaplayercomparison.appspot.com",
  messagingSenderId: "218226279696",
  appId: "1:218226279696:web:6887e00eea3b9b59099195",
  measurementId: "G-JRDRHG7M46"
};

const IndexPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const app = initializeApp(firebaseConfig);
      
      isAnalyticsSupported().then((supported) => {
        if (supported) {
          getAnalytics(app);
        }
      });
    }
  }, []);
  
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

  const debouncedFetchLeagueData = useDebounce(() => {
    const fetchLeagueData = async () => {
      try {
        const { player, distance } = findMostSimilarPlayer(customPlayer, league);
        setMostSimilarPlayer({ player, distance });
      } catch (error) {
        console.error('Error fetching league data:', error);
      }
    };
    fetchLeagueData();
  }, 300);

  useEffect(() => {
    debouncedFetchLeagueData();
  }, [customPlayer]);

  const handleCustomPlayerChange = (stat: keyof PlayerAttributes, value: number) => {
    if (value >= 0 && value <= 100) {
      setCustomPlayer((prev) => ({ ...prev, [stat]: value }));
    }
  };

  const renderAttributeInputs = (stat: string, value: number | undefined) => {
    const sliderValue = value ?? 50; // Use the value if defined, otherwise fallback to 50
  
    return (
      <div className="mb-4">
        <h2 className="text-sm font-medium mb-1">{stat}</h2>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) =>
              handleCustomPlayerChange(stat as keyof PlayerAttributes, parseInt(e.target.value))
            }
            className="flex-grow"
          />
          <span className="w-12 text-center">{sliderValue}</span>
        </div>
      </div>
    );
  };

  const customPlayerAverages = calculateAverageStats(customPlayer);
  const mostSimilarPlayerAverages = mostSimilarPlayer.player ? calculateAverageStats(mostSimilarPlayer.player) : {
    outsideScoring: 50,
    insideScoring: 50,
    playmaking: 50,
    athleticism: 50,
    rebounding: 50,
    defense: 50,
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
            {renderAttributeInputs('closeShot', customPlayer.closeShot)}
            {renderAttributeInputs('midRangeShot', customPlayer.midRangeShot)}
            {renderAttributeInputs('threePointShot', customPlayer.threePointShot)}
            {renderAttributeInputs('freeThrow', customPlayer.freeThrow)}
            {renderAttributeInputs('shotIQ', customPlayer.shotIQ)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Inside Scoring</h3>
            {renderAttributeInputs('layup', customPlayer.layup)}
            {renderAttributeInputs('postHook', customPlayer.postHook)}
            {renderAttributeInputs('postFade', customPlayer.postFade)}
            {renderAttributeInputs('postControl', customPlayer.postControl)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Playmaking</h3>
            {renderAttributeInputs('passAccuracy', customPlayer.passAccuracy)}
            {renderAttributeInputs('ballHandle', customPlayer.ballHandle)}
            {renderAttributeInputs('passIQ', customPlayer.passIQ)}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Athleticism</h3>
            {renderAttributeInputs('speed', customPlayer.speed)}
            {renderAttributeInputs('strength', customPlayer.strength)}
            {renderAttributeInputs('hustle', customPlayer.hustle)}
          </div>
        </div>
        <div className="flex flex-row items-start">
          <div className="mr-5">
            <h3 className="text-lg underline">Rebounding</h3>
            {renderAttributeInputs('offensiveRebound', customPlayer.offensiveRebound)}
            {renderAttributeInputs('defensiveRebound', customPlayer.defensiveRebound)}
          </div>
          <div className="mr-5">
            <h3 className="text-lg underline">Defense</h3>
            {renderAttributeInputs('interiorDefense', customPlayer.interiorDefense)}
            {renderAttributeInputs('perimeterDefense', customPlayer.perimeterDefense)}
            {renderAttributeInputs('steal', customPlayer.steal)}
            {renderAttributeInputs('block', customPlayer.block)}
            {renderAttributeInputs('helpDefenseIQ', customPlayer.helpDefenseIQ)}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around my-5">
        <div className="mr-2.5 w-96">
          <h3 className="text-lg underline">Custom Player Chart</h3>
          <ApexChart
            series={[{ name: 'Your Chart', data: [
              customPlayerAverages.outsideScoring,
              customPlayerAverages.insideScoring,
              customPlayerAverages.playmaking,
              customPlayerAverages.athleticism,
              customPlayerAverages.rebounding,
              customPlayerAverages.defense
            ] }]}
            categories={['Outside Scoring', 'Inside Scoring', 'Playmaking', 'Athleticism', 'Rebounding', 'Defense']}
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
            series={[{ name: 'Player Chart', data: [
              mostSimilarPlayerAverages.outsideScoring,
              mostSimilarPlayerAverages.insideScoring,
              mostSimilarPlayerAverages.playmaking,
              mostSimilarPlayerAverages.athleticism,
              mostSimilarPlayerAverages.rebounding,
              mostSimilarPlayerAverages.defense
            ] }]}
            categories={['Outside Scoring', 'Inside Scoring', 'Playmaking', 'Athleticism', 'Rebounding', 'Defense']}
          />
        </div>
      </div>
    </div>
  );  
};

export default IndexPage;