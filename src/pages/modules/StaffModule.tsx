import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Mail, Phone, Trash2, ShieldCheck, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StaffRole = 'teacher' | 'bursar' | 'gate' | 'admin' | 'subject_teacher' | 'class_teacher';

interface StaffMember {
  id: string;
  name: string;
  roles: StaffRole[];
  email: string;
  phone: string;
  joinedDate: string;
}

export default function StaffModule() {
  const [staff, setStaff] = React.useState<StaffMember[]>([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Form states
  const [newStaff, setNewStaff] = React.useState({
    name: '',
    roles: [] as StaffRole[],
    email: '',
    phone: '',
  });

  React.useEffect(() => {
    const fetchStaff = () => {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem('pulse_demo_staff') || '[]');
      // Seed initial staff if empty
      if (stored.length === 0) {
        const seed = [
          { id: '1', name: 'John Doe', roles: ['teacher', 'class_teacher'], email: 'john@school.com', phone: '08012345678', joinedDate: '2023-01-15' },
          { id: '2', name: 'Sarah Smith', roles: ['bursar'], email: 'sarah@school.com', phone: '08088776655', joinedDate: '2023-03-20' },
        ];
        localStorage.setItem('pulse_demo_staff', JSON.stringify(seed));
        setStaff(seed as StaffMember[]);
      } else {
        setStaff(stored);
      }
      setLoading(false);
    };
    fetchStaff();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStaff.roles.length === 0) {
      alert("Please select at least one role");
      return;
    }
    const member: StaffMember = {
      ...newStaff,
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    const updated = [member, ...staff];
    localStorage.setItem('pulse_demo_staff', JSON.stringify(updated));
    setStaff(updated);
    setNewStaff({ name: '', roles: [], email: '', phone: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = staff.filter(s => s.id !== id);
    localStorage.setItem('pulse_demo_staff', JSON.stringify(updated));
    setStaff(updated);
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase())) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Staff Management</h2>
          <p className="text-gray-500 font-medium">Manage your institution's workforce and access levels.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20"
        >
          <UserPlus size={18} /> Register Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Staff', value: staff.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Teachers', value: staff.filter(s => s.roles.some(r => r.includes('teacher'))).length, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Administrative', value: staff.filter(s => s.roles.some(r => r === 'admin' || r === 'bursar')).length, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Recently Joined', value: staff.filter(s => new Date(s.joinedDate).getMonth() === new Date().getMonth()).length, icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden">
        <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search staff by name, role, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-400 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Fetching workforce data...</p>
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-sm font-bold text-gray-900 uppercase">No staff members found</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Try adjusting your search criteria</p>
                  </td>
                </tr>
              ) : (
                filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs">
                          {member.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 leading-none mb-1">{member.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {member.id.substring(0, 5)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-wrap gap-1">
                        {member.roles.map(role => (
                          <span key={role} className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            role.includes('teacher') ? "bg-emerald-50 text-emerald-600" : 
                            role === 'bursar' ? "bg-blue-50 text-blue-600" :
                            "bg-gray-100 text-gray-600"
                          )}>
                            {role.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                          <Mail size={14} className="text-gray-300" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                          <Phone size={14} className="text-gray-300" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-900">
                      {new Date(member.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Register New Staff</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400">
                <Trash2 size={24} className="rotate-45" />
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newStaff.name}
                  onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                  placeholder="e.g. Adebayo Kunle"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Assign Roles (Multi-select)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'teacher', label: 'Teacher' },
                    { id: 'class_teacher', label: 'Class Teacher' },
                    { id: 'subject_teacher', label: 'Subject Teacher' },
                    { id: 'bursar', label: 'School Bursar' },
                    { id: 'gate', label: 'Security' },
                    { id: 'admin', label: 'Admin' },
                  ].map(role => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        const roles = newStaff.roles.includes(role.id as StaffRole)
                          ? newStaff.roles.filter(r => r !== role.id)
                          : [...newStaff.roles, role.id as StaffRole];
                        setNewStaff({ ...newStaff, roles });
                      }}
                      className={cn(
                        "px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                        newStaff.roles.includes(role.id as StaffRole)
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200"
                      )}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={newStaff.phone}
                    onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                    placeholder="080..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newStaff.email}
                  onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                  placeholder="staff@schoolpulse.ng"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 rounded-2xl border-2 border-gray-100 font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
