import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Globe,
  Plus,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function OnboardingPage() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    schoolName: '',
    email: '',
    phone: '',
    address: '',
    schoolType: 'Secondary',
    otherType: '',
  });

  const schoolTypes = [
    { id: 'primary', label: 'Primary', desc: 'Creche • Nurs • Pry' },
    { id: 'secondary', label: 'Secondary', desc: 'JSS 1 • SS 3' },
    { id: 'both', label: 'Both', desc: 'Integrated K-12' },
    { id: 'other', label: 'Other', desc: 'Specialized / Tech' },
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-5 bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 border overflow-hidden">
        {/* Progress Sidebar */}
        <div className="lg:col-span-2 bg-blue-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -z-0"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-blue-900 rounded-xl font-black text-2xl shadow-xl mb-12">S</div>
            <h1 className="text-3xl font-black tracking-tighter mb-4 leading-tight">Complete your SchoolProfile</h1>
            <p className="text-blue-200 font-medium">Join 500+ Nigerian schools using SchoolPulse to digitize operations.</p>
          </div>

          <div className="space-y-4 pt-12 relative z-10">
            {[
              { id: 1, label: 'Basic Info' },
              { id: 2, label: 'Institution Type' },
              { id: 3, label: 'Configuration' },
            ].map((s) => (
              <div key={s.id} className="flex items-center gap-4 group">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all border-2",
                  step === s.id ? "bg-white text-blue-900 border-white shadow-lg" : 
                  step > s.id ? "bg-emerald-500 border-emerald-500 text-white" : "border-blue-700 text-blue-400"
                )}>
                  {step > s.id ? <CheckCircle2 size={18} /> : s.id}
                </div>
                <span className={cn(
                  "font-bold text-sm uppercase tracking-widest",
                  step === s.id ? "text-white" : "text-blue-400"
                )}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-12 text-blue-300 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
              <ShieldCheck size={14} /> Encrypted Session
            </div>
            <p className="text-[10px] leading-relaxed opacity-40">Your data is stored securely using Nigerian Data Protection Regulation (NDPR) compliant standards.</p>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3 p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col justify-between"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1 mb-8">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">School Details</h2>
                    <p className="text-gray-500 text-sm font-medium">Let's start with the basics of your institution.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">School Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Federal Science & Tech College"
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 flex pl-12 pr-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Institutional Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="email" 
                          placeholder="admin@school.com"
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 flex pl-12 pr-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="tel" 
                          placeholder="+234 800 000 0000"
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 flex pl-12 pr-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-1 mb-6">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Institutional Profile</h2>
                    <p className="text-gray-500 font-medium">Select the type of education your school provides.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {schoolTypes.map((type) => (
                      <button 
                        key={type.id}
                        onClick={() => setFormData({ ...formData, schoolType: type.id })}
                        className={cn(
                          "relative p-4 rounded-2xl text-left border-2 transition-all group overflow-hidden",
                          formData.schoolType === type.id 
                            ? "bg-blue-50 border-blue-600" 
                            : "bg-white border-gray-100 hover:border-blue-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-2 right-2 transition-opacity",
                          formData.schoolType === type.id ? "opacity-100" : "opacity-0"
                        )}>
                          <CheckCircle2 size={16} className="text-blue-600" />
                        </div>
                        <div className={cn(
                          "font-black text-lg",
                          formData.schoolType === type.id ? "text-blue-600" : "text-gray-900"
                        )}>{type.label}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{type.desc}</div>
                      </button>
                    ))}
                  </div>

                  {formData.schoolType === 'other' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 pt-2"
                    >
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Specify Institution Type</label>
                      <input 
                        type="text" 
                        value={formData.otherType}
                        onChange={(e) => setFormData({ ...formData, otherType: e.target.value })}
                        placeholder="e.g. Technical College, Vocational Center"
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-gray-900 shadow-inner" 
                      />
                    </motion.div>
                  )}
                </div>
              )}

              <div className="pt-12 flex items-center justify-between border-t border-gray-50 mt-12">
                {step > 1 ? (
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Cancel</Link>
                )}
                
                <button 
                  onClick={step === 3 ? () => {} : nextStep}
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                  {step === 3 ? 'Finalize Onboarding' : 'Continue'} <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
