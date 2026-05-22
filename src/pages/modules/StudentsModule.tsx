import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Activity, 
  ShieldAlert, 
  Heart, 
  ArrowRight, 
  Info, 
  X, 
  Calendar, 
  User, 
  Sparkles,
  Lock,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

export interface GuardianDetails {
  name: string;
  relationship: 'Father' | 'Mother' | 'Uncle' | 'Aunt' | 'Guardian' | 'Other';
  phone: string;
  email: string;
  address: string;
}

export interface StudentProfile {
  id: string;
  admissionNo: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  currentClass: string;
  physicalDisability: {
    hasDisability: boolean;
    details: string;
  };
  guardian: GuardianDetails;
  status: 'Active' | 'Suspended' | 'Alumnus';
  registeredDate: string;
  avatar?: string;
}

const INITIAL_STUDENT_DATA: StudentProfile[] = [
  {
    id: '1',
    admissionNo: 'ADM-2026-001',
    name: 'Ifeoluwa Okoro',
    age: 12,
    gender: 'Male',
    currentClass: 'JSS 2',
    physicalDisability: {
      hasDisability: false,
      details: ''
    },
    guardian: {
      name: 'Mr. Emmanuel Okoro',
      relationship: 'Father',
      phone: '08023456789',
      email: 'emmanuel.okoro@example.com',
      address: 'Plot 45, Gbagada Phase 2, Gbagada, Lagos'
    },
    status: 'Active',
    registeredDate: '2025-09-10'
  },
  {
    id: '2',
    admissionNo: 'ADM-2026-002',
    name: 'Musa Garba',
    age: 13,
    gender: 'Male',
    currentClass: 'JSS 3',
    physicalDisability: {
      hasDisability: false,
      details: ''
    },
    guardian: {
      name: 'Alhaji Ibrahim Garba',
      relationship: 'Father',
      phone: '08034567890',
      email: 'ibrahim.garba@example.com',
      address: '12 Aminu Kano Way, Wuse, Abuja'
    },
    status: 'Active',
    registeredDate: '2025-09-11'
  },
  {
    id: '3',
    admissionNo: 'ADM-2026-003',
    name: 'Zainab Ahmed',
    age: 11,
    gender: 'Female',
    currentClass: 'JSS 1',
    physicalDisability: {
      hasDisability: false,
      details: ''
    },
    guardian: {
      name: 'Mrs. Halima Ahmed',
      relationship: 'Mother',
      phone: '08055667788',
      email: 'halima.ahmed@example.com',
      address: 'Block B4, State Housing Estate, Kaduna'
    },
    status: 'Active',
    registeredDate: '2025-09-12'
  },
  {
    id: '4',
    admissionNo: 'ADM-2026-004',
    name: 'Ezekiel James',
    age: 14,
    gender: 'Male',
    currentClass: 'SSS 1',
    physicalDisability: {
      hasDisability: true,
      details: 'Mild vision impairment (requires front row seating)'
    },
    guardian: {
      name: 'Mr. Stephen James',
      relationship: 'Father',
      phone: '08122334455',
      email: 'stephen.james@example.com',
      address: 'No 7, Isaac John Street, Ikeja, Lagos'
    },
    status: 'Active',
    registeredDate: '2025-09-14'
  },
  {
    id: '5',
    admissionNo: 'ADM-2026-005',
    name: 'Chinonso Uche',
    age: 15,
    gender: 'Female',
    currentClass: 'SSS 2',
    physicalDisability: {
      hasDisability: false,
      details: ''
    },
    guardian: {
      name: 'Dr. (Mrs) Ngozi Uche',
      relationship: 'Mother',
      phone: '08133445566',
      email: 'ngozi.uche@example.com',
      address: '18 Presidential Road, Independence Layout, Enugu'
    },
    status: 'Active',
    registeredDate: '2025-09-15'
  }
];

export default function StudentsModule() {
  const { user } = useAuth();
  const [students, setStudents] = React.useState<StudentProfile[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [classFilter, setClassFilter] = React.useState('All');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<StudentProfile | null>(null);
  const [statusSuccess, setStatusSuccess] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    gender: 'Male' as StudentProfile['gender'],
    currentClass: 'JSS 1',
    hasDisability: false,
    disabilityDetails: '',
    guardianName: '',
    guardianRelationship: 'Father' as GuardianDetails['relationship'],
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    avatar: ''
  });

  // Check Permissions: School admins & Class teachers can register/add students
  const canRegisterStudents = user?.roles.includes('admin') || user?.roles.includes('class_teacher');

  React.useEffect(() => {
    const saved = localStorage.getItem('pulse_demo_students');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        setStudents(INITIAL_STUDENT_DATA);
      }
    } else {
      localStorage.setItem('pulse_demo_students', JSON.stringify(INITIAL_STUDENT_DATA));
      setStudents(INITIAL_STUDENT_DATA);
    }
  }, []);

  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRegisterStudents) {
      alert("Unauthorized operational bypass blocked.");
      return;
    }

    if (!formData.name.trim() || !formData.age || !formData.guardianName.trim() || !formData.guardianPhone.trim()) {
      alert("Please complete all mandatory student and parent/guardian profile details.");
      return;
    }

    const nextAdmNoNum = students.length + 1;
    const admissionNo = `ADM-2026-${String(nextAdmNoNum).padStart(3, '0')}`;

    const newStudent: StudentProfile = {
      id: Math.random().toString(36).substr(2, 9),
      admissionNo,
      name: formData.name,
      age: parseInt(formData.age) || 12,
      gender: formData.gender,
      currentClass: formData.currentClass,
      physicalDisability: {
        hasDisability: formData.hasDisability,
        details: formData.hasDisability ? formData.disabilityDetails : 'None'
      },
      guardian: {
        name: formData.guardianName,
        relationship: formData.guardianRelationship,
        phone: formData.guardianPhone,
        email: formData.guardianEmail || 'N/A',
        address: formData.guardianAddress || 'N/A'
      },
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      avatar: formData.avatar || undefined
    };

    const updated = [newStudent, ...students];
    localStorage.setItem('pulse_demo_students', JSON.stringify(updated));
    setStudents(updated);

    // Reset Form Data
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      currentClass: 'JSS 1',
      hasDisability: false,
      disabilityDetails: '',
      guardianName: '',
      guardianRelationship: 'Father',
      guardianPhone: '',
      guardianEmail: '',
      guardianAddress: '',
      avatar: ''
    });

    setShowAddModal(false);
    setStatusSuccess(true);
    setTimeout(() => setStatusSuccess(false), 3000);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canRegisterStudents) {
      alert("Unauthorized authorization token level.");
      return;
    }
    if (confirm("Are you sure you want to de-register this student from SchoolPulse? All diagnostic registry tracking indexes will be uncoupled.")) {
      const updated = students.filter(s => s.id !== id);
      localStorage.setItem('pulse_demo_students', JSON.stringify(updated));
      setStudents(updated);
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.guardian.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'All' || s.currentClass === classFilter;
    return matchesSearch && matchesClass;
  });

  const classesList = ['All', 'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];

  // Count metrics
  const totalCount = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const disabilityCount = students.filter(s => s.physicalDisability.hasDisability).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight text-center sm:text-left">Student Registry</h2>
          <p className="text-gray-500 text-sm text-center sm:text-left">Comprehensive records, multi-role validation, and demographic profiling.</p>
        </div>
        
        <div>
          {canRegisterStudents ? (
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 duration-150"
            >
              <UserPlus size={16} /> Register New Student
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 text-gray-400 border border-gray-200 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest cursor-not-allowed">
              <Lock size={16} className="text-gray-400" /> Administrative Access Only
            </div>
          )}
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Registered Students', value: totalCount, subtitle: 'Across all cohorts & classes', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Enrollment Status', value: activeCount, subtitle: 'Good administrative standing', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Physical Support Tracking', value: disabilityCount, subtitle: 'Disability support protocols', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-bold shrink-0", stat.bg)}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-950 mt-1">{stat.value}</h3>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Success Notification Alert */}
      {statusSuccess && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
          <div>
            <p className="text-xs font-black uppercase tracking-wider">Success Protocol Initiated</p>
            <p className="text-xs font-medium text-emerald-600">The student record was registered successfully and synced with the local terminal database.</p>
          </div>
        </motion.div>
      )}

      {/* Controls: Search and Filter */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-semibold outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
            placeholder="Search matching by Name, Admission #, or Parent details..."
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {classesList.map(cls => (
            <button
              key={cls}
              onClick={() => setClassFilter(cls)}
              className={cn(
                "px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shrink-0",
                classFilter === cls 
                  ? "bg-slate-950 border-slate-950 text-white shadow-sm"
                  : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Student List & Profile Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Table/Cards List */}
        <div className={cn("bg-white border border-gray-100 shadow-sm rounded-[32px] overflow-hidden transition-all duration-300", selectedStudent ? "lg:col-span-2" : "lg:col-span-3")}>
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={14} className="text-blue-600" /> Student Enrollment Records ({filteredStudents.length})
            </h3>
            {!canRegisterStudents && (
              <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Read-Only Terminal
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Admission No</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name & Age</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Gender</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Class</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Physical Disability</th>
                  {canRegisterStudents && <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Direct Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-400">
                      <Users size={40} className="mx-auto text-gray-200 mb-3" />
                      <p className="text-sm font-semibold">No students matched the current query.</p>
                      <p className="text-xs text-gray-400 mt-1">Refine your search parameters or register a new record.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stud) => (
                    <tr 
                      key={stud.id}
                      onClick={() => setSelectedStudent(selectedStudent?.id === stud.id ? null : stud)}
                      className={cn(
                        "hover:bg-blue-50/20 cursor-pointer transition-colors active:bg-blue-50/40 relative group",
                        selectedStudent?.id === stud.id ? "bg-blue-50/30" : ""
                      )}
                    >
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {stud.admissionNo}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative">
                            {stud.avatar ? (
                              <img src={stud.avatar} alt={stud.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <User size={18} />
                              </div>
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{stud.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{stud.age} years old</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-semibold text-gray-700">{stud.gender}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-black uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {stud.currentClass}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        {stud.physicalDisability.hasDisability ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-100">
                            <Activity size={10} /> Special Care
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                            None
                          </span>
                        )}
                      </td>
                      {canRegisterStudents && (
                        <td className="px-8 py-5 text-right" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleDelete(stud.id, e)}
                            className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="De-register Student Record"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Student Detail Sidebar Panel */}
        <AnimatePresence>
          {selectedStudent && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white border border-gray-100 shadow-md rounded-[32px] overflow-hidden lg:col-span-1 flex flex-col h-full self-start"
            >
              {/* Header block with card color scheme */}
              <div className="bg-slate-900 p-6 text-white relative flex gap-4 items-center">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="absolute right-4 top-4 p-1 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>

                <div className="w-16 h-20 bg-slate-850 rounded-xl border border-slate-700/80 overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner bg-slate-800">
                  {selectedStudent.avatar ? (
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 p-1 text-[9px] font-bold text-center select-none">
                      <User size={22} className="text-slate-500 mb-0.5" />
                      <span>NO PHOTO</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-blue-600 rounded">
                    {selectedStudent.admissionNo}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight leading-snug truncate">{selectedStudent.name}</h3>
                  <p className="text-slate-400 text-xs truncate">Class Cohort: <span className="text-white font-semibold">{selectedStudent.currentClass}</span></p>
                </div>
              </div>

              {/* Body parameters */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                
                {/* Personal particulars */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div>
                      <span className="block text-[9px] text-gray-400 uppercase">Age</span>
                      <span className="font-bold text-gray-900 text-sm">{selectedStudent.age} Years</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-400 uppercase">Gender</span>
                      <span className="font-bold text-gray-900 text-sm">{selectedStudent.gender}</span>
                    </div>
                  </div>

                  {/* Disability Section */}
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider mb-1">Physical Disability Registry</span>
                    {selectedStudent.physicalDisability.hasDisability ? (
                      <div className="flex gap-2.5 items-start mt-1 text-sm text-red-600 bg-rose-50/50 p-2.5 rounded-lg border border-red-50">
                        <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                        <p className="text-xs font-bold leading-relaxed">{selectedStudent.physicalDisability.details}</p>
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-gray-500">No medical adjustments or functional disabilities registered.</p>
                    )}
                  </div>
                </div>

                {/* Parent / Guardian credentials block */}
                <div className="space-y-4 border-t pt-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Parent / Guardian Details</h4>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                      {selectedStudent.guardian.relationship}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="block text-[9px] text-gray-400 uppercase">Guardian Full Name</span>
                      <p className="font-bold text-gray-900 text-sm">{selectedStudent.guardian.name}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3.5 text-xs text-gray-600 hover:text-gray-900 transition-colors">
                        <Phone size={14} className="text-gray-400 shrink-0" />
                        <span className="font-mono font-semibold">{selectedStudent.guardian.phone}</span>
                      </div>
                      <div className="flex items-center gap-3.5 text-xs text-gray-600 hover:text-gray-900 transition-colors">
                        <Mail size={14} className="text-gray-400 shrink-0" />
                        <span className="font-semibold break-all">{selectedStudent.guardian.email}</span>
                      </div>
                      <div className="flex items-center gap-3.5 text-xs text-gray-600 leading-relaxed">
                        <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-gray-500">{selectedStudent.guardian.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date of Audit */}
                <div className="border-t pt-4 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>Registered Date</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar size={12} /> {selectedStudent.registeredDate}
                  </span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Comprehensive Register / Registration Modal Form */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop element */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[40px] border shadow-2xl relative w-full max-w-2xl overflow-hidden z-10"
            >
              {/* Form title */}
              <div className="bg-slate-950 p-8 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Sparkles size={20} className="text-blue-500" /> New Student Registration
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">Please configure both student profile and guardian verification details below.</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* SECTION: Student particulars */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 border-b pb-1.5">
                    <User size={13} /> 1. Student Personal Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {/* Passport Photo Upload Frame */}
                    <div className="md:col-span-1 flex flex-col items-center">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 self-start mb-1.5">Passport Photo</label>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={cn(
                          "w-28 h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative cursor-pointer overflow-hidden transition-all bg-gray-50",
                          isDragging ? "border-blue-600 bg-blue-50/20" : "border-gray-200 hover:border-blue-400 hover:bg-gray-100/50"
                        )}
                        onClick={() => document.getElementById('student-photo-input')?.click()}
                      >
                        {formData.avatar ? (
                          <>
                            <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-[10px] text-white font-bold uppercase transition-opacity backdrop-blur-xs select-none">
                              Change Photo
                            </div>
                          </>
                        ) : (
                          <div className="p-2 text-center select-none flex flex-col items-center">
                            <Plus size={20} className="text-gray-400 mb-1" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider leading-tight">Add Photo</span>
                            <span className="text-[8px] text-gray-300 mt-0.5">Click / Drop</span>
                          </div>
                        )}
                        <input 
                          type="file"
                          id="student-photo-input"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    {/* Personal Text Fields */}
                    <div className="md:col-span-3 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Student Full Name *</label>
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Samuel Adebayo"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Student Age *</label>
                          <input 
                            type="number"
                            required
                            min="3"
                            max="25"
                            placeholder="e.g. 12"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Gender *</label>
                          <select 
                            value={formData.gender}
                            onChange={e => setFormData({ ...formData, gender: e.target.value as StudentProfile['gender'] })}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm appearance-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Class Assignment</label>
                      <select 
                        value={formData.currentClass}
                        onChange={e => setFormData({ ...formData, currentClass: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                      >
                        <option value="JSS 1">JSS 1</option>
                        <option value="JSS 2">JSS 2</option>
                        <option value="JSS 3">JSS 3</option>
                        <option value="SSS 1">SSS 1</option>
                        <option value="SSS 2">SSS 2</option>
                        <option value="SSS 3">SSS 3</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Physical Disability Protocol</label>
                      <div className="flex items-center gap-4 py-3 bg-gray-50 border border-gray-100 px-5 rounded-2xl h-[48px]">
                        <input 
                          type="checkbox"
                          id="hasDisability"
                          checked={formData.hasDisability}
                          onChange={e => setFormData({ ...formData, hasDisability: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="hasDisability" className="text-xs font-bold text-gray-600 select-none cursor-pointer">
                          Yes, this student has a physical disability
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.hasDisability && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1.5 animate-in fade-in duration-200"
                    >
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest pl-1">Specify Medical / Support Requirements *</label>
                      <textarea 
                        required
                        placeholder="Describe visual, hearing, mobility accommodations or support requirements..."
                        value={formData.disabilityDetails}
                        onChange={e => setFormData({ ...formData, disabilityDetails: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-red-100 rounded-2xl py-3 px-5 font-bold outline-none focus:border-red-500 focus:bg-white transition-all text-sm h-20"
                      />
                    </motion.div>
                  )}
                </div>

                {/* SECTION: Guardian/Parent particulars */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 border-b pb-1.5">
                    <Heart size={13} /> 2. Parent or Guardian Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Guardian Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Alhaji Bashir Adebayo"
                        value={formData.guardianName}
                        onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Relationship to Student *</label>
                      <select 
                        value={formData.guardianRelationship}
                        onChange={e => setFormData({ ...formData, guardianRelationship: e.target.value as GuardianDetails['relationship'] })}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Guardian Phone Number *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={formData.guardianPhone}
                        onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-mono font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Guardian Email Address (Optional)</label>
                      <input 
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.guardianEmail}
                        onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Guardian Residential Address</label>
                    <textarea 
                      placeholder="e.g. Flat 15, Federal Low Cost Housing, Ikeja, Lagos"
                      value={formData.guardianAddress}
                      onChange={e => setFormData({ ...formData, guardianAddress: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 px-5 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all text-sm h-20"
                    />
                  </div>
                </div>

                {/* Verification disclaimer */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compliance Verification Protocol</p>
                  <p className="text-[9px] text-gray-500 font-bold mt-1 uppercase leading-relaxed">
                    By submitting this file, you authorize synchronization of the student biometric metadata with SchoolPulse multi-tenant secure storage in accordance with secondary education tracking standards.
                  </p>
                </div>

                {/* Operations */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-4 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/10 active:scale-95 duration-100 flex items-center gap-2"
                  >
                    Finalize Registration <ArrowRight size={14} />
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
