import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  MoreVertical, 
  CheckCircle2, 
  Clock,
  UserPlus,
  Shield,
  Bell,
  FileText,
  AlertCircle,
  MessageSquare,
  Trash2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  type: 'complaint' | 'suggestion';
  content: string;
  parentName: string;
  createdAt: string;
  schoolId: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = React.useState(true);

  React.useEffect(() => {
    const fetchMessages = () => {
      setLoadingMessages(true);
      // Simulate fetching from Django
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('pulse_demo_messages') || '[]');
        const filtered = stored.filter((m: Message) => m.schoolId === (user?.schoolId || 'SCH-8241-PLS'));
        setMessages(filtered);
        setLoadingMessages(false);
      }, 500);
    };

    fetchMessages();
    
    // Listen for storage changes in same tab (for simulation)
    const handleStorage = () => fetchMessages();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [user?.schoolId]);

  const handleDeleteMessage = async (id: string) => {
    const stored = JSON.parse(localStorage.getItem('pulse_demo_messages') || '[]');
    const updated = stored.filter((m: Message) => m.id !== id);
    localStorage.setItem('pulse_demo_messages', JSON.stringify(updated));
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const stats = [
    { label: 'Total Students', value: '450', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Teachers', value: '32', change: '+2', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Attendance', value: '94%', change: 'Stable', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Revenue (Term 2)', value: '₦4.2M', change: '+15%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-blue-600 font-medium text-sm">Main Campus Administration</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-center">School Overview</h2>
            <div className="bg-gray-900 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest mt-1">
              ID: SCH-8241-PLS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-xl border-dashed border-2 shadow-sm">
          <Calendar size={18} />
          <span className="text-sm font-medium">Term 2, Week 6 • June 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <span className={cn("text-xs font-bold px-2 py-1 rounded-full", 
                stat.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
              )}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Quick Start */}
        <div className="bg-gray-900 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden lg:col-span-1">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2 tracking-tight">Staff Management</h3>
            <p className="text-gray-400 text-sm mb-8 font-medium leading-relaxed">Register new teachers and assign their institutional roles.</p>
            <div className="space-y-4">
              <Link to="/dashboard/staff" className="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-600/20 text-center">
                <UserPlus size={18} /> Register Teacher
              </Link>
              <Link to="/dashboard/staff" className="w-full bg-white/10 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95 text-center">
                <Users size={18} /> View All Staff
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center justify-between space-x-12">
            Staff Vetting
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded ml-2">Action Required</span>
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Exam Questions', target: 'JSS3 Math Exam', user: 'Mr. Okoro', status: 'Pending', icon: FileText, color: 'text-blue-600' },
              { type: 'Quiz Set', target: 'SS2 Further Maths', user: 'Mr. Jude', status: 'Rejected', icon: AlertCircle, color: 'text-red-500' },
              { type: 'CA Test', target: 'Pry 4 English', user: 'Mrs. Ade', status: 'Pending', icon: Clock, color: 'text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                <div className={cn("p-2 rounded-lg shrink-0", item.color, "bg-opacity-10")}>
                  <item.icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-gray-900 truncate">{item.type}</p>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
                      item.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      item.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    )}>{item.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.target} • {item.user}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors mt-2">
              Open Vetting Portal
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Financial Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Wk 1', val: 1.2 },
                { name: 'Wk 2', val: 0.8 },
                { name: 'Wk 3', val: 1.5 },
                { name: 'Wk 4', val: 0.7 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f9f9fb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="val" fill="#2563eb" radius={[4, 4, 4, 4]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">₦4,241,500</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">Full Report</button>
          </div>
        </div>
      </div>

      {/* Parent Feedback Section */}
      <div className="bg-white p-8 rounded-[40px] border shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Parental Feedback</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inbox for complaints and suggestions</p>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-full font-black text-[10px] text-gray-500 uppercase tracking-widest">
            {messages.length} Messages
          </div>
        </div>

        {loadingMessages ? (
          <div className="py-20 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Inbox...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-[32px] border border-dashed">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Shield size={24} className="text-gray-200" />
            </div>
            <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">No messages yet</p>
            <p className="text-xs text-gray-400 px-8 mt-1 italic">When parents send complaints or suggestions, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className="group bg-gray-50 p-6 rounded-[32px] border relative hover:border-blue-200 transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                    msg.type === 'complaint' ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {msg.type === 'complaint' ? <AlertTriangle size={12} /> : <Lightbulb size={12} />}
                    {msg.type}
                  </div>
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900 leading-relaxed mb-6">{msg.content}</p>
                <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                      {msg.parentName.substring(0, 2).toUpperCase()}
                    </div>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{msg.parentName}</p>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
