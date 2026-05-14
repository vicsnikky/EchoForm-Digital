/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Building2, 
  UserPlus, 
  Search, 
  TrendingUp, 
  Globe, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';

export default function PlatformAdminDashboard() {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [isProvisioning, setIsProvisioning] = React.useState(false);
  const [provisioned, setProvisioned] = React.useState(false);

  const schools = [
    { id: 's1', name: 'Emerald Academy', admin: 'Mrs. Adebayo', students: 450, plan: 'Premium', status: 'Active' },
    { id: 's2', name: 'Lekki Heights', admin: 'Mr. Jude', students: 820, plan: 'Premium', status: 'Active' },
    { id: 's3', name: 'Stella Maris', admin: 'Sr. Mary', students: 120, plan: 'Trial', status: 'Expiring' },
  ];

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProvisioning(true);
    // Simulate API call
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900 text-white p-8 rounded-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
            <Shield size={14} /> Platform Control Center
          </div>
          <h2 className="text-3xl font-black tracking-tight">Manage the Pulse</h2>
          <p className="text-blue-200 mt-1">Directly provisioning schools and managing subscriptions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="relative z-10 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-900/40 transition-all active:scale-95"
        >
          <Plus size={20} /> Register New School
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Schools', value: '542', icon: Building2, color: 'text-blue-600' },
          { title: 'Active Students', value: '184k', icon: Globe, color: 'text-emerald-600' },
          { title: 'Monthly Revenue', value: formatCurrency(12500000), icon: TrendingUp, color: 'text-purple-600' },
          { title: 'SMS Sent', value: '42.5k', icon: AlertCircle, color: 'text-amber-600' },
        ].map(kpi => (
          <div key={kpi.title} className="bg-white p-6 rounded-2xl border shadow-sm">
            <kpi.icon size={20} className={cn("mb-4", kpi.color)} />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{kpi.title}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* School Management Table */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden" id="schools">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-gray-900">Registered Institutions</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by school or admin..."
              className="w-full bg-gray-50 border rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 ring-blue-50 focus:border-blue-600 outline-none" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-medium">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">School Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Admin</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                        {school.name[0]}
                      </div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{school.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{school.admin}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {school.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                      school.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'
                    )}>
                      <CheckCircle2 size={12} /> {school.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Registration Modal (Simulation) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
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
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Provisioning Successful!</h3>
                  <p className="text-gray-500 font-medium">The new school workspace has been created. An invitation email with temporary credentials has been sent to the admin.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleProvision} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Provision Tenant</h3>
                  <p className="text-gray-500 text-sm font-medium">Create a new institutional instance and register the first admin.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">School Full Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        required
                        type="text" 
                        placeholder="Emerald City Academy" 
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
                          placeholder="owner@school.com" 
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-50"
                          disabled={isProvisioning}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Initial Plan</label>
                      <select 
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
                        disabled={isProvisioning}
                      >
                        <option>Starter (Free)</option>
                        <option>Premium (₦1,000/Std)</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProvisioning}
                    className={cn(
                      "w-full rounded-2xl py-5 font-black text-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3",
                      isProvisioning ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700"
                    )}
                  >
                    {isProvisioning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        Syncing Tenant Data...
                      </>
                    ) : (
                      'Provision School Account'
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">
                    This will create a unique sub-domain and database partition
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
