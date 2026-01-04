
export enum AppView {
  DASHBOARD = 'dashboard',
  IDENTITY = 'identity',
  GROUPS = 'groups',
  CHATBOT = 'chatbot',
  VISION = 'vision',
  WALKIE_TALKIE = 'walkie-talkie',
  SETTINGS = 'settings'
}

export interface User {
  id: string;
  name: string;
  idNumber: string; // Aadhaar/Passport mock
  verified: boolean;
  safetyScore: number;
  location: { lat: number; lng: number };
}

export interface GroupMember {
  id: string;
  name: string;
  status: 'active' | 'away' | 'emergency';
  lastSeen: string;
  location: { lat: number; lng: number };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LandmarkAnalysis {
  name: string;
  description: string;
  historicalFacts: string[];
  safetyTips: string[];
}
