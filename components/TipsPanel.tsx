
import React, { useState, useEffect, useCallback } from 'react';
import { getIndustryTip, generateSpeech } from '../services/geminiService';

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const VolumeUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10 1.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5zM6.5 6a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-7zM5 9.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM15 9.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
        <path fillRule="evenodd" d="M3 13.25a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-1.5 0v.75H4.5v-.75a.75.75 0 00-1.5 0v1.5z" clipRule="evenodd" />
    </svg>
);

const TipsPanel: React.FC = () => {
  const [tip, setTip] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const fetchTip = useCallback(async () => {
    setIsLoading(true);
    const newTip = await getIndustryTip();
    setTip(newTip);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTip();
  }, [fetchTip]);

  const handleSpeak = async () => {
    if (isSpeaking || !tip) return;
    setIsSpeaking(true);
    const audioData = await generateSpeech(tip);
    if (audioData) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const binaryString = atob(audioData);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Raw PCM data assumes specific format, here we create a buffer for it.
        // NOTE: TTS model sample rate is 24000
        const sampleRate = 24000;
        const dataInt16 = new Int16Array(bytes.buffer);
        const frameCount = dataInt16.length;
        const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i] / 32768.0;
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
    } else {
        setIsSpeaking(false);
    }
  };

  return (
    <div className="sticky top-8 bg-gray-700/50 rounded-lg p-6 shadow-lg">
      <h3 className="flex items-center font-bold text-xl text-indigo-300 mb-4">
        <LightBulbIcon className="mr-2" />
        Regular Tips
      </h3>
      <div className="text-gray-300 mb-4 min-h-[100px]">
        {isLoading ? <p>Fetching a new tip...</p> : <p>"{tip}"</p>}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={fetchTip}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Loading...' : 'New Tip'}
        </button>
        <button
          onClick={handleSpeak}
          disabled={isSpeaking || isLoading || !tip}
          className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-bold p-2 rounded-lg transition-colors duration-200"
          aria-label="Read tip aloud"
        >
          <VolumeUpIcon />
        </button>
      </div>
    </div>
  );
};

export default TipsPanel;
