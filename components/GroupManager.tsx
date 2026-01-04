
import React from 'react';
import { Users, MapPin, Phone, MessageCircle, MoreVertical, Plus, HeartPulse } from 'lucide-react';
import { GroupMember } from '../types';

const mockMembers: GroupMember[] = [
  { id: '1', name: 'Arjun (Me)', status: 'active', lastSeen: 'Just now', location: { lat: 27.1751, lng: 78.0421 } },
  { id: '2', name: 'Sneha', status: 'active', lastSeen: '2m ago', location: { lat: 27.1752, lng: 78.0422 } },
  { id: '3', name: 'Amit', status: 'away', lastSeen: '15m ago', location: { lat: 27.1748, lng: 78.0418 } },
  { id: '4', name: 'Rajesh', status: 'emergency', lastSeen: '1m ago', location: { lat: 27.1755, lng: 78.0425 } },
];

const GroupManager: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Family Trip '24</h2>
          <p className="text-slate-500">8 Members • Shared Location Enabled</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            Settings
          </button>
          <button className="flex-1 sm:flex-none bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Invite Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Live Status</h3>
          {mockMembers.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-all">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden shadow-inner border-2 border-white">
                  <img src={`https://picsum.photos/seed/${member.id}/100/100`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                  member.status === 'active' ? 'bg-green-500' : 
                  member.status === 'away' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
                }`}></div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{member.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <p className="text-[10px] text-slate-400 font-medium">Last seen {member.lastSeen}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"><Phone className="w-4 h-4" /></button>
                <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200"><MessageCircle className="w-4 h-4" /></button>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
            </div>
          ))}
        </div>

        {/* Map View Mock */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Live Group Tracking</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All Members Accounted For
            </div>
          </div>
          <div className="flex-1 bg-slate-100 relative overflow-hidden p-8">
            {/* Visual Placeholder for Map */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/78.0421,27.1751,15/800x600?access_token=pk.xxx')] bg-cover opacity-60"></div>
            
            {/* User Pins */}
            {mockMembers.map((member, i) => (
              <div key={member.id} className="absolute transition-all duration-1000" style={{
                top: `${40 + (i * 10)}%`,
                left: `${45 + (i * 8)}%`
              }}>
                <div className="relative group flex flex-col items-center">
                  <div className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <p className="text-xs font-bold">{member.name}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-4 border-white shadow-xl overflow-hidden ${
                    member.status === 'emergency' ? 'ring-4 ring-red-500 ring-offset-2' : ''
                  }`}>
                    <img src={`https://picsum.photos/seed/${member.id}/100/100`} alt={member.name} />
                  </div>
                  <div className="w-3 h-3 bg-white rotate-45 -mt-1.5 shadow-lg"></div>
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 space-y-2">
              <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col">
                <button className="p-3 text-slate-600 hover:text-slate-900 border-b border-slate-100">+</button>
                <button className="p-3 text-slate-600 hover:text-slate-900">-</button>
              </div>
              <button className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                Center Map
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safety Score for Group */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8">
        <div className="w-24 h-24 rounded-full border-[12px] border-slate-100 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="36" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="226" strokeDashoffset="22" />
          </svg>
          <span className="text-2xl font-black text-slate-800">92%</span>
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-slate-800">Group Cohesion Score</h4>
          <p className="text-slate-500 mt-1 max-w-lg">Based on member proximity, signal strength, and activity levels. Your group is currently well-coordinated and safe.</p>
        </div>
        <div className="hidden sm:flex gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center px-8">
            <p className="text-xs font-black text-slate-400 uppercase mb-1">Alerts</p>
            <p className="text-xl font-bold text-slate-800">0</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center px-8">
            <p className="text-xs font-black text-slate-400 uppercase mb-1">Health</p>
            <div className="flex items-center gap-1 justify-center text-green-600">
               <HeartPulse className="w-5 h-5" />
               <p className="text-xl font-bold">Stable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManager;
