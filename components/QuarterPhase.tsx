
import React, { useState } from 'react';
import { RoadmapItem } from '../types';

interface QuarterPhaseProps {
  item: RoadmapItem;
  isCompleted: boolean;
  onComplete: () => void;
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const QuarterPhase: React.FC<QuarterPhaseProps> = ({ item, isCompleted, onComplete }) => {
  const [isExpanded, setIsExpanded] = useState(item.quarter === 1);

  return (
    <div className={`transition-all duration-300 rounded-lg shadow-md ${isCompleted ? 'bg-green-900/50 border-l-4 border-green-500' : 'bg-gray-700/50 border-l-4 border-indigo-500'}`}>
      <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-semibold text-indigo-300">Year {item.year} | Quarter {item.quarter}</span>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{item.theme}</p>
          </div>
          <div className="flex items-center">
            {isCompleted && <span className="text-green-400 font-bold mr-4">Completed!</span>}
            <svg className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-indigo-400 mb-2">Skills to Learn:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {item.skills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-400 mb-2">Software Focus:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {item.software.map(sw => <li key={sw}>{sw}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-400 mb-2">Portfolio Goal:</h4>
              <p className="text-gray-300">{item.portfolio}</p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-400 mb-2">Networking Goal:</h4>
              <p className="text-gray-300">{item.networking}</p>
            </div>
          </div>
          {!isCompleted && (
            <div className="mt-4 text-right">
              <button
                onClick={onComplete}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <CheckIcon/>
                Mark as Complete (+{item.points} Points)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuarterPhase;
