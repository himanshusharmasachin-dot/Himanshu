
import React, { useState, useCallback } from 'react';
import { analyzeArt } from '../services/geminiService';

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const PortfolioReviewer: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                setError('File is too large. Please upload an image under 4MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setAnalysis('');
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyzeClick = useCallback(async () => {
        if (!image) return;
        setIsLoading(true);
        setError('');
        setAnalysis('');

        try {
            // image is a data URL like "data:image/jpeg;base64,..."
            const base64Data = image.split(',')[1];
            const mimeType = image.match(/:(.*?);/)?.[1];

            if (!base64Data || !mimeType) {
                throw new Error("Invalid image format");
            }

            const result = await analyzeArt(base64Data, mimeType);
            setAnalysis(result);
        } catch (e: any) {
            setError("Failed to analyze the artwork. Please try again.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [image]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-indigo-400 mb-2">AI Portfolio Review</h1>
            <p className="text-gray-300 mb-6">Upload a piece of your artwork to get a constructive critique from an AI art director.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-gray-700/50 rounded-lg p-4 h-full flex flex-col items-center justify-center">
                        {image ? (
                            <img src={image} alt="Uploaded artwork" className="max-h-96 w-auto object-contain rounded-md" />
                        ) : (
                            <div className="w-full text-center p-8 border-2 border-dashed border-gray-500 rounded-lg">
                                <UploadIcon className="mx-auto" />
                                <p className="mt-2 text-gray-400">Upload an image (PNG, JPG, WEBP)</p>
                            </div>
                        )}
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="imageUpload"
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200"
                        >
                            {image ? 'Change Image' : 'Select Image'}
                        </label>
                        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                        {image && (
                            <button
                                onClick={handleAnalyzeClick}
                                disabled={isLoading}
                                className="mt-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-200"
                            >
                                {isLoading ? 'Analyzing...' : 'Get Critique'}
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <div className="bg-gray-700/50 rounded-lg p-6 min-h-[400px]">
                        <h3 className="font-semibold text-xl text-indigo-300 mb-4">Art Director's Feedback</h3>
                        {isLoading && <p className="text-gray-300 animate-pulse">AI is analyzing your work...</p>}
                        {analysis && (
                             <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{analysis}</div>
                        )}
                        {!isLoading && !analysis && <p className="text-gray-400">Your feedback will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioReviewer;
