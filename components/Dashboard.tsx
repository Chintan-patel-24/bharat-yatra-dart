
import React from 'react';
import { AppView } from '../types';
import { 
  Shield, 
  AlertCircle, 
  MapPin, 
  Users, 
  ChevronRight, 
  CheckCircle2,
  MessageSquare,
  Camera
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const safetyData = [
  { name: '08:00', score: 98 },
  { name: '10:00', score: 95 },
  { name: '12:00', score: 92 },
  { name: '14:00', score: 94 },
  { name: '16:00', score: 97 },
  { name: '18:00', score: 99 },
];

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-4">
        <div className="bg-amber-100 p-2 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-amber-900">Regional Weather Alert: Heavy Fog</h4>
          <p className="text-amber-800 text-sm">Reduced visibility reported in Uttarakhand region. Drive with caution near mountain passes.</p>
        </div>
        <button className="text-amber-700 text-sm font-semibold hover:underline">Dismiss</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Cards */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Safety Score</span>
            <div className="bg-green-100 p-2 rounded-xl">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-bold text-slate-800">98</h3>
            <span className="text-green-600 font-semibold mb-1">Excellent</span>
          </div>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[98%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Active Group</span>
            <div className="bg-blue-100 p-2 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-slate-800">Family Trip '24</h3>
            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-bold">8 Online</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">Currently at: Taj Mahal, Agra</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-sm font-medium">Verified Identity</span>
            <div className="bg-orange-100 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-md text-white">
              <span className="text-xs font-black">ID</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">BY-8832-7721</h3>
          </div>
          <p className="text-slate-400 text-sm mt-2">Secured on Polygon Blockchain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Safety Trend Chart */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            Real-time Safety Monitor
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={safetyData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis hide domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Nearby Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Nearby Resources</h3>
            <div className="space-y-3">
              {[
                { label: 'Verified Tourist Police Station', distance: '0.8km', type: 'security' },
                { label: 'Apollo First Aid Center', distance: '1.2km', type: 'medical' },
                { label: 'Tourist Information Bureau', distance: '2.5km', type: 'info' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                      <MapPin className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.distance} away</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setView(AppView.CHATBOT)}
              className="bg-orange-600 p-6 rounded-3xl text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 group"
            >
              <MessageSquare className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-bold">Ask AI Guide</p>
                <p className="text-xs text-orange-200">Local insights & help</p>
              </div>
            </button>
            <button 
              onClick={() => setView(AppView.VISION)}
              className="bg-slate-900 p-6 rounded-3xl text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 group"
            >
              <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-bold">Identify</p>
                <p className="text-xs text-slate-400">Landmark scanner</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
