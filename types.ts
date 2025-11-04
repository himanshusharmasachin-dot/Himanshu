
export interface RoadmapItem {
  quarter: number;
  year: number;
  title: string;
  theme: string;
  skills: string[];
  software: string[];
  portfolio: string;
  networking: string;
  points: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  sources?: { uri: string; title: string }[];
}
