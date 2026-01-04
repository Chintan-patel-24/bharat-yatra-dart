
import React, { useState } from 'react';
import { ShieldCheck, Share2, Download, History, ExternalLink, QrCode, Check, CreditCard, Loader2, Fingerprint, Cpu } from 'lucide-react';

const IdentityVault: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<'view' | 'verify'>('view');
  const [docType, setDocType] = useState<'aadhar' | 'pan' | 'license'>('aadhar');
  const [docValue, setDocValue] = useState('');
  const [verifiedId, setVerifiedId] = useState('BY-8832-7721-0004');
  const [status, setStatus] = useState('Active');

  const handleShare = async () => {
    const shareUrl = "https://github-readme-stats.vercel.app";
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Bharat Yatra Verified ID',
          text: 'Check out my verified travel identity on Bharat Yatra.',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      await navigator.clipboard.writeText(shareUrl);
    } finally {
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  const startVerification = () => {
    setIsVerifying(true);
    // Simulate Blockchain Minting Process
    setTimeout(() => {
      const newId = `BY-${docType.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setVerifiedId(newId);
      setIsVerifying(false);
      setStep('view');
      setStatus('Minted on Ledger');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">Digital Identity Vault</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Secured by India Stack & Polygon L2 Blockchain</p>
      </div>

      {step === 'view' ? (
        <div className="relative overflow-visible">
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-100 dark:bg-orange-500/10 rounded-full blur-[100px] -z-10 opacity-40 animate-pulse"></div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 p-10 rounded-[3rem] shadow-2xl shadow-orange-100/50 dark:shadow-none transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 dark:bg-slate-800 flex items-center justify-center rounded-2xl text-white font-black text-2xl italic shadow-lg">
                  BY
                </div>
                <div>
                  <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.2em] mb-0.5">Global Protocol</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">Verified Travel ID</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full border border-green-100 dark:border-green-500/20 text-xs font-black shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  {status.toUpperCase()}
                </div>
                <button 
                  onClick={() => setStep('verify')}
                  className="text-[10px] font-black text-slate-400 hover:text-orange-600 underline uppercase tracking-widest"
                >
                  Update Records
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mb-12">
              <div className="w-full md:w-40 h-52 bg-slate-100 dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-inner border-4 border-white dark:border-slate-700 shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-2xl font-black text-slate-800 dark:text-white">ARJUN SHARMA</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nationality</p>
                    <p className="font-bold text-slate-800 dark:text-white">INDIAN</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expiry Date</p>
                    <p className="font-bold text-slate-800 dark:text-white">DEC 2029</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ledger Fingerprint</p>
                  <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 break-all bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                    0x71C7...B751B74...01B5f6d8976F
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unique Protocol Number</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter tabular-nums">{verifiedId}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                <QrCode className="w-16 h-16 text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 animate-in zoom-in-95 duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">Secure Verification</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Submit documents to mint your travel identity on the blockchain.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['aadhar', 'pan', 'license'].map((t) => (
              <button
                key={t}
                onClick={() => setDocType(t as any)}
                className={`py-4 px-2 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                  docType === t 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Document Number</label>
              <input 
                type="text" 
                value={docValue}
                onChange={(e) => setDocValue(e.target.value)}
                placeholder={`Enter ${docType.toUpperCase()} number`}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-white font-bold"
              />
            </div>
          </div>

          <button 
            disabled={!docValue || isVerifying}
            onClick={startVerification}
            className="w-full bg-orange-600 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-orange-100 dark:shadow-none flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 transition-all"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                MINTING TO LEDGER...
              </>
            ) : (
              <>
                <Cpu className="w-6 h-6" />
                GENERATE SECURE ID
              </>
            )}
          </button>
          
          <button 
            onClick={() => setStep('view')}
            className="w-full py-4 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
          >
            Cancel and Return
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'share', label: 'Share Securely', icon: isSharing ? Check : Share2, onClick: handleShare, active: isSharing },
          { id: 'download', label: 'Download PDF', icon: Download },
          { id: 'history', label: 'Access History', icon: History },
          { id: 'verify', label: 'Verify External', icon: ExternalLink },
        ].map((action, idx) => (
          <button 
            key={idx} 
            onClick={action.onClick}
            className={`p-5 rounded-[2rem] border transition-all group flex flex-col items-center gap-3 active:scale-90 ${
              action.active 
              ? 'bg-green-600 border-green-600 shadow-lg shadow-green-100 dark:shadow-none' 
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30 hover:bg-orange-50 dark:hover:bg-orange-500/5 shadow-sm'
            }`}
          >
            <action.icon className={`w-7 h-7 transition-colors ${
              action.active ? 'text-white' : 'text-slate-400 group-hover:text-orange-600'
            }`} />
            <span className={`text-[11px] font-black uppercase tracking-tighter ${
              action.active ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-orange-700'
            }`}>{action.active ? 'COPIED!' : action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdentityVault;
