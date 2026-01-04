
import React, { useState } from 'react';
import { Users, MapPin, Phone, MessageCircle, MoreVertical, Plus, HeartPulse, X, Search, Check } from 'lucide-react';
import { GroupMember } from '../types';

const initialMembers: GroupMember[] = [
  { id: '1', name: 'Arjun (Me)', status: 'active', lastSeen: 'Just now', location: { lat: 27.1751, lng: 78.0421 } },
  { id: '2', name: 'Sneha', status: 'active', lastSeen: '2m ago', location: { lat: 27.1752, lng: 78.0422 } },
  { id: '3', name: 'Amit', status: 'away', lastSeen: '15m ago', location: { lat: 27.1748, lng: 78.0418 } },
  { id: '4', name: 'Rajesh', status: 'emergency', lastSeen: '1m ago', location: { lat: 27.1755, lng: 78.0425 } },
];

const GroupManager: React.FC = () => {
  const [members, setMembers] = useState<GroupMember[]>(initialMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMember: GroupMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: newMemberName,
        status: 'active',
        lastSeen: 'Just joined',
        location: { lat: 27.1751, lng: 78.0421 }
      };
      setMembers([...members, newMember]);
      setNewMemberName('');
      setIsAdding(false);
      setShowAddModal(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Family Trip '24</h2>
          <p className="text-slate-500 dark:text-slate-400">{members.length} Members • Shared Location Enabled</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            Settings
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 dark:shadow-none flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Invite Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Live Status</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {members.map((member) => (
              <div key={member.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-orange-200 dark:hover:border-orange-500/30 transition-all">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner border-2 border-white dark:border-slate-700">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-sm ${
                    member.status === 'active' ? 'bg-green-500' : 
                    member.status === 'away' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 dark:text-white">{member.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <p className="text-[10px] text-slate-400 font-medium">Last seen {member.lastSeen}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700"><MessageCircle className="w-4 h-4" /></button>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Map View Mock */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 dark:text-white">Live Group Tracking</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All Members Accounted For
            </div>
          </div>
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden p-8">
            <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            {/* User Pins */}
            {members.map((member, i) => (
              <div key={member.id} className="absolute transition-all duration-1000" style={{
                top: `${30 + (i * 12)}%`,
                left: `${35 + (i * 10)}%`
              }}>
                <div className="relative group flex flex-col items-center">
                  <div className="absolute bottom-full mb-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <p className="text-xs font-bold dark:text-white">{member.name}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden ${
                    member.status === 'emergency' ? 'ring-4 ring-red-500 ring-offset-2' : ''
                  }`}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} alt={member.name} />
                  </div>
                  <div className="w-3 h-3 bg-white dark:bg-slate-800 rotate-45 -mt-1.5 shadow-lg"></div>
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 space-y-2">
              <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col">
                <button className="p-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-b border-slate-100 dark:border-slate-700">+</button>
                <button className="p-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">-</button>
              </div>
              <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                Center Map
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safety Score for Group */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8 transition-colors">
        <div className="w-24 h-24 rounded-full border-[12px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="36" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="226" strokeDashoffset="22" />
          </svg>
          <span className="text-2xl font-black text-slate-800 dark:text-white">92%</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold text-slate-800 dark:text-white">Group Cohesion Score</h4>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-lg">Based on member proximity, signal strength, and activity levels. Your group is currently well-coordinated and safe.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-center px-8">
            <p className="text-xs font-black text-slate-400 uppercase mb-1">Alerts</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">0</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-center px-8">
            <p className="text-xs font-black text-slate-400 uppercase mb-1">Health</p>
            <div className="flex items-center gap-1 justify-center text-green-600">
               <HeartPulse className="w-5 h-5" />
               <p className="text-xl font-bold">Stable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="bg-orange-100 dark:bg-orange-500/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">Invite Travel Buddy</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Connect with friends to share real-time locations and safety alerts.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Friend's Name / ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter name or BY-ID"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-white font-bold"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
              </div>
              <button 
                onClick={handleAddMember}
                disabled={isAdding || !newMemberName.trim()}
                className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isAdding ? <><HeartPulse className="w-5 h-5 animate-spin" /> SENDING INVITE...</> : <><Check className="w-5 h-5" /> SEND INVITATION</>}
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Only BY-Verified members can be added.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManager;
