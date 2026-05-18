import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Search, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PlatformAdminDashboard() {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isProvisioning, setIsProvisioning] = React.useState(false);
  const [provisioned, setProvisioned] = React.useState(false);

  const schools = [
    { id: 's1', name: 'Nigeria International School', admin: 'Mrs. Adebayo', students: 450, plan: 'Premium', status: 'Active' },
    { id: 's2', name: 'Eco Learning Academy', admin: 'Mr. Jude', students: 85, plan: 'Starter', status: 'Active' },
    { id: 's3', name: 'Global Excellence School', admin: 'Sr. Mary', students: 120, plan: 'Trial', status: 'Expiring' },
  ];

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setProvisioned(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setProvisioned(false);
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-1">Global System Controller</p>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Institute Network</h2>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 active:scale-95"
        >
          <Plus size={18} /> Provision New Tenant
        </button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Schools', val: '1,284', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Global Students', val: '412.5k', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Monthly Revenue', val: '₦14.2M', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Growth Velocity', val: '+12.4%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border shadow-sm hover:shadow-md transition-shadow group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* School Management Table */}
      <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden" id="schools">
        <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-black text-xl text-gray-900 tracking-tight">Registered Institutions</h3>
            <p className="text-sm text-gray-500 font-medium">Monitoring and management for all Nigerian schools on the platform.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search schools or admins..." className="w-full bg-gray-50 border rounded-2xl py-3 pl-12 pr-4 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Institution Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Admin</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subscribers</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-6 text-center">
                    <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded">{school.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{school.name}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Nigeria</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">{school.admin}</td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">{school.students} Students</td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{school.plan}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", school.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500')}></div>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", school.status === 'Active' ? 'text-emerald-600' : 'text-amber-600')}>{school.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-gray-300 hover:text-gray-900 p-2"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeModal}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-xl w-full rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
          >
            <button 
              onClick={closeModal}
              className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors p-2"
            >
              Close
            </button>

            {provisioned ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Provisioned!</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">The new institutional workspace is ready. Invitation sent to the school admin.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleProvision} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Provision Tenant</h3>
                  <p className="text-gray-500 text-sm font-medium">Register a new Nigeria institution and primary administrator.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Institution Full Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        required
                        type="text" 
                        placeholder="Nigeria International Academy" 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-50"
                        disabled={isProvisioning}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Primary Admin Email</label>
                      <div className="relative">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          required
                          type="email" 
                          placeholder="head@institution.com" 
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-50"
                          disabled={isProvisioning}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Subscription Plan</label>
                      <select 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
                        disabled={isProvisioning}
                      >
                        <option>Starter (Free)</option>
                        <option>Premium (₦1,000/Std)</option>
                        <option>Global Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProvisioning}
                    className={cn(
                      "w-full rounded-2xl py-5 font-black text-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3",
                      isProvisioning ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40"
                    )}
                  >
                    {isProvisioning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        Syncing Tenant Data...
                      </>
                    ) : (
                      'Provision Institutional Account'
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-10 leading-relaxed">
                    This triggers a unique database partition and institutional ID generation.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
