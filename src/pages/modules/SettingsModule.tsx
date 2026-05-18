import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Building, Upload, CheckCircle2, CloudLightning } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SettingsModule() {
  const [schoolName, setSchoolName] = React.useState('SchoolPulse Demo School');
  const [address, setAddress] = React.useState('123 Education Way, Lagos Nigeria');
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      localStorage.setItem('pulse_school_identity', JSON.stringify({
        name: schoolName,
        address: address
      }));
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('pulse_school_identity');
    if (saved) {
      const { name, address } = JSON.parse(saved);
      setSchoolName(name);
      setAddress(address);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">System Settings</h2>
        <p className="text-gray-500 font-medium">Configure your institution's profile and document branding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { id: 'profile', label: 'School Profile', icon: Building, active: true },
            { id: 'branding', label: 'Branding & PDF', icon: CloudLightning },
            { id: 'security', label: 'Security & Access', icon: Shield },
            { id: 'preferences', label: 'Preferences', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                item.active ? "bg-white text-blue-600 shadow-sm border border-blue-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="bg-white p-8 rounded-[40px] border shadow-sm space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">School Identity</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">This information appears on all official documents.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full School Name</label>
                  <input 
                    type="text" 
                    value={schoolName}
                    onChange={e => setSchoolName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Physical Address</label>
                  <textarea 
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all resize-none" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-dashed">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1">Branding Assets</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Upload your official stamp and principal's signature for automated watermarking.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-600 transition-all bg-gray-50 hover:bg-white">
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Upload School Stamp</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">PNG with Transparent BG</p>
                </div>
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-600 transition-all bg-gray-50 hover:bg-white">
                  <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Upload Authority Signature</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">Principal / Registrar</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={saving}
              className={cn(
                "w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2",
                success ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700"
              )}
            >
              {saving ? "Deploying Changes..." : success ? <><CheckCircle2 size={18} /> Settings Updated!</> : "Save Identity Settings"}
            </button>
          </form>

          <div className="p-8 rounded-[40px] bg-amber-50 border border-amber-100">
            <div className="flex items-start gap-4">
              <CloudLightning className="text-amber-600 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="text-xs font-black text-amber-900 uppercase tracking-tight">Pro Tip</p>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest leading-relaxed">
                  The uploaded stamp and signature will be used to automatically generate receipts and result sheets. Ensure high resolution for clear prints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
