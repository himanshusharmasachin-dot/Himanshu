
import React, { useState } from 'react';
import Header from './components/Header';
import Roadmap from './components/Roadmap';
import PortfolioReviewer from './components/PortfolioReviewer';
import LiveInterview from './components/LiveInterview';
import ChatBot from './components/ChatBot';
import { RoadmapItem } from './types';
import { ROADMAP_DATA } from './constants';

const App: React.FC = () => {
  const [kalaaPoints, setKalaaPoints] = useState<number>(0);
  const [completedQuarters, setCompletedQuarters] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('roadmap');

  const handleCompleteQuarter = (quarterIndex: number, points: number) => {
    if (!completedQuarters.has(quarterIndex)) {
      setCompletedQuarters(prev => new Set(prev).add(quarterIndex));
      setKalaaPoints(prev => prev + points);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'roadmap':
        return <Roadmap roadmapData={ROADMAP_DATA} completedQuarters={completedQuarters} onCompleteQuarter={handleCompleteQuarter} />;
      case 'portfolio':
        return <PortfolioReviewer />;
      case 'interview':
        return <LiveInterview />;
      default:
        return <Roadmap roadmapData={ROADMAP_DATA} completedQuarters={completedQuarters} onCompleteQuarter={handleCompleteQuarter} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Header kalaaPoints={kalaaPoints} />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <div className="mb-6 border-b border-gray-700">
            <nav className="flex space-x-2 sm:space-x-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'roadmap' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'portfolio' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                Portfolio AI Review
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'interview' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                Mock Interview
              </button>
            </nav>
          </div>
          <div>{renderContent()}</div>
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default App;
