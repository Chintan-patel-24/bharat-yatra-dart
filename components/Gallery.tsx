
import React, { useState } from 'react';
import { MapPin, Info, ArrowRight, Camera, X, Calendar, Landmark, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../types';

const visitedPlaces: GalleryItem[] = [
  {
    id: '1',
    title: 'Ajanta Caves',
    location: 'Aurangabad, Maharashtra',
    image: 'https://images.unsplash.com/photo-1626248674987-a3a8a914397a?w=800&q=80',
    description: '30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.'
  },
  {
    id: '2',
    title: 'Ellora Caves',
    location: 'Aurangabad, Maharashtra',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=800&q=80',
    description: 'One of the largest rock-cut monastery-temple cave complexes in the world, featuring Hindu, Buddhist and Jain monuments.'
  },
  {
    id: '3',
    title: 'Khajuraho Temples',
    location: 'Chhatarpur, Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1596395819057-e37f55a85199?w=800&q=80',
    description: 'UNESCO World Heritage site famous for its Nagara-style architectural symbolism and erotic sculptures.'
  },
  {
    id: '4',
    title: 'Sun Temple',
    location: 'Konark, Odisha',
    image: 'https://images.unsplash.com/photo-1621213233866-993f7734a742?w=800&q=80',
    description: 'A 13th-century CE Sun temple built in the shape of a gigantic chariot with elaborately carved stone wheels.'
  },
  {
    id: '5',
    title: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    description: 'Historic Hindu temple located on the southern bank of the Vaigai River, famous for its towering gopurams.'
  },
  {
    id: '6',
    title: 'Golden Temple',
    location: 'Amritsar, Punjab',
    image: 'https://images.unsplash.com/photo-1588096344316-f5f405efca7a?w=800&q=80',
    description: 'Harmandir Sahib, the preeminent spiritual site of Sikhism, known for its stunning gold-covered architecture.'
  }
];

const Gallery: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex items-center gap-4">
        <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-2xl">
          <Camera className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Heritage Gallery</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Explore iconic destinations you have visited or plan to see.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visitedPlaces.map((place) => (
          <div key={place.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={place.image} 
                alt={place.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                <MapPin className="w-3 h-3" />
                {place.location.split(',')[0]}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{place.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                {place.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Historical Site
                </div>
                <button 
                  onClick={() => setSelectedPlace(place)}
                  className="text-orange-600 font-bold text-sm flex items-center gap-1 group/btn"
                >
                  Details 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-2xl font-black text-white">Missing a place?</h3>
          <p className="text-slate-400 max-w-md mx-auto">Upload your travel photos to the Bharat Yatra Cloud to automatically verify your visits and build your heritage map.</p>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20 active:scale-95">
            UPLOAD TRAVEL MEMORIES
          </button>
        </div>
      </div>

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedPlace(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-6 right-6 z-20 bg-black/20 backdrop-blur p-2 rounded-full text-white hover:bg-black/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-72 relative">
              <img src={selectedPlace.image} alt={selectedPlace.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <p className="text-orange-400 font-black text-xs uppercase tracking-[0.2em] mb-1">UN Heritage Site</p>
                <h2 className="text-4xl font-black text-white tracking-tight">{selectedPlace.title}</h2>
              </div>
            </div>

            <div className="p-10 space-y-8 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex-1">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">{selectedPlace.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex-1">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Tier</p>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">Zone A - High Security</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-orange-600" />
                  Historical Overview
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {selectedPlace.description} This site represents a significant era of Indian history and architectural brilliance. Visitors can explore various structural elements that showcase the artistic depth of ancient artisans.
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-500/10 p-6 rounded-3xl border border-orange-100 dark:border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <h4 className="font-bold text-orange-900 dark:text-orange-400">Visitor Advisory</h4>
                </div>
                <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-300 font-medium">
                  <li className="flex gap-2">• Best visited between October and March</li>
                  <li className="flex gap-2">• Guides are available at the entrance</li>
                  <li className="flex gap-2">• Photography might require a special permit in some areas</li>
                </ul>
              </div>

              <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-5 rounded-2xl font-black text-center shadow-xl active:scale-95 transition-all">
                PLAN A VISIT TO {selectedPlace.title.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
