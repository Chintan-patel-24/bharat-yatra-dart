
import React from 'react';
import { ShieldCheck, Share2, Download, History, ExternalLink, QrCode } from 'lucide-react';

const IdentityVault: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Digital Identity Vault</h2>
        <p className="text-slate-500">Securely anchored to India Stack & Polygon Blockchain</p>
      </div>

      {/* Main Card */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -z-10 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-30"></div>
        
        <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-orange-100/50">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center rounded-xl text-white font-black text-xl italic">
                BY
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passport for Bharat</p>
                <p className="text-sm font-bold text-slate-800">Bharat Yatra Verified ID</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100 text-xs font-bold">
              <ShieldCheck className="w-3 h-3" />
              VERIFIED
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <div className="w-32 h-40 bg-slate-200 rounded-2xl overflow-hidden shadow-inner border-4 border-white">
              <img src="https://picsum.photos/seed/traveler/200/300" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-400">Full Name</p>
                <p className="text-xl font-bold text-slate-800">ARJUN SHARMA</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-400">Nationality</p>
                  <p className="font-bold text-slate-800">INDIAN</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Issued Date</p>
                  <p className="font-bold text-slate-800">12 SEP 2024</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Blockchain Address</p>
                <p className="text-[10px] font-mono font-bold text-slate-500 break-all bg-slate-50 p-2 rounded-lg border border-slate-100">
                  0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ID Number</p>
              <p className="text-2xl font-black text-slate-800 tracking-tighter">BY-8832-7721-0004</p>
            </div>
            <div className="bg-slate-100 p-2 rounded-xl">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Share Securely', icon: Share2 },
          { label: 'Download PDF', icon: Download },
          { label: 'Access History', icon: History },
          { label: 'Verify Link', icon: ExternalLink },
        ].map((action, idx) => (
          <button key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50 transition-all group flex flex-col items-center gap-2">
            <action.icon className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
            <span className="text-xs font-bold text-slate-600 group-hover:text-orange-700">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Safety Note */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
        <div className="flex gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">
            This identity is cryptographically signed. In case of emergency, authorities can verify your identity even offline using the pre-shared Bharat Yatra public keys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentityVault;
