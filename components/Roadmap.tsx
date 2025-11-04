
import React from 'react';
import QuarterPhase from './QuarterPhase';
import TipsPanel from './TipsPanel';
import { RoadmapItem } from '../types';

interface RoadmapProps {
  roadmapData: RoadmapItem[];
  completedQuarters: Set<number>;
  onCompleteQuarter: (quarterIndex: number, points: number) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ roadmapData, completedQuarters, onCompleteQuarter }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-400 mb-2">Your 3-Year Journey</h1>
      <p className="text-gray-300 mb-8">A step-by-step guide to becoming a professional game artist. Complete each quarter to earn Kalaa Points!</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {roadmapData.map((item) => (
            <QuarterPhase
              key={item.quarter}
              item={item}
              isCompleted={completedQuarters.has(item.quarter)}
              onComplete={() => onCompleteQuarter(item.quarter, item.points)}
            />
          ))}
        </div>
        <div className="lg:col-span-1">
          <TipsPanel />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
