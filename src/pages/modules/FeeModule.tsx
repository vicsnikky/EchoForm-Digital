import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, Download, Plus, Filter, CheckCircle2, AlertCircle, FileText, Printer } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: string;
  term: string;
}

interface StudentFee {
  id: string;
  name: string;
  class: string;
  totalFee: number;
  paid: number;
  status: 'fully_paid' | 'partial' | 'unpaid';
}

export default function FeeModule() {
  const { user } = useAuth();
  const [students, setStudents] = React.useState<StudentFee[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showPayModal, setShowPayModal] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<StudentFee | null>(null);
  const [schoolIdentity, setSchoolIdentity] = React.useState({ name: 'SchoolPulse Demo School', address: '123 Education Way, Lagos Nigeria' });
  
  // Payment form state
  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('Cash');

  // Receipt Preview state
  const [showReceipt, setShowReceipt] = React.useState<Payment | null>(null);

  React.useEffect(() => {
    const fetchFees = () => {
      const storedStudents = JSON.parse(localStorage.getItem('pulse_demo_fee_students') || '[]');
      if (storedStudents.length === 0) {
        const seed = [
          { id: 'STU001', name: 'Chinedu Okoro', class: 'JS1', totalFee: 45000, paid: 25000, status: 'partial' },
          { id: 'STU002', name: 'Amina Bello', class: 'SS2', totalFee: 55000, paid: 55000, status: 'fully_paid' },
          { id: 'STU003', name: 'Tunde Afolayan', class: 'JS3', totalFee: 45000, paid: 0, status: 'unpaid' },
          { id: 'STU004', name: 'Grace Emmanuel', class: 'PRY5', totalFee: 35000, paid: 35000, status: 'fully_paid' },
        ];
        localStorage.setItem('pulse_demo_fee_students', JSON.stringify(seed));
        setStudents(seed as StudentFee[]);
      } else {
        setStudents(storedStudents);
      }
    };
    fetchFees();

    const savedIdentity = localStorage.getItem('pulse_school_identity');
    if (savedIdentity) {
      setSchoolIdentity(JSON.parse(savedIdentity));
    }
  }, []);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        const newPaid = s.paid + amount;
        let status: StudentFee['status'] = 'partial';
        if (newPaid >= s.totalFee) status = 'fully_paid';
        if (newPaid === 0) status = 'unpaid';
        return { ...s, paid: newPaid, status };
      }
      return s;
    });

    const paymentRecord: Payment = {
      id: 'REC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      amount,
      date: new Date().toISOString(),
      method: paymentMethod,
      term: 'First Term 2025/2026'
    };

    const existingPayments = JSON.parse(localStorage.getItem('pulse_demo_payments') || '[]');
    localStorage.setItem('pulse_demo_payments', JSON.stringify([paymentRecord, ...existingPayments]));
    localStorage.setItem('pulse_demo_fee_students', JSON.stringify(updatedStudents));
    
    setStudents(updatedStudents);
    setShowPayModal(false);
    setPaymentAmount('');
    setSelectedStudent(null);
    
    // Auto-show receipt
    setShowReceipt(paymentRecord);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOutstanding = students.reduce((acc, s) => acc + (s.totalFee - s.paid), 0);
  const totalCollected = students.reduce((acc, s) => acc + s.paid, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Bursary & Fees</h2>
          <p className="text-gray-500 font-medium tracking-tight">Track payments, manage balances, and generate digital receipts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl">
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
          <CreditCard className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-500/30 w-32 h-32" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Total Collections</p>
            <p className="text-4xl font-black">{formatCurrency(totalCollected)}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Updated Just Now
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Outstanding Debt</p>
            <p className="text-3xl font-black text-red-600">{formatCurrency(totalOutstanding)}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 p-2 rounded-xl border-dashed">
            <AlertCircle size={14} className="text-red-500" />
            {students.filter(s => s.status !== 'fully_paid').length} students with balances
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Collection Rate</p>
            <p className="text-3xl font-black text-gray-900">
              {Math.round((totalCollected / (totalCollected + totalOutstanding)) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${(totalCollected / (totalCollected + totalOutstanding)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by Student Name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-4 pl-14 pr-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 p-4 rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all group">
              <Filter size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Filter By Class</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fee Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Fee</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Paid</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Balance</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                const balance = student.totalFee - student.paid;
                return (
                  <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {student.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 leading-tight mb-1">{student.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{student.class} • ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
                        student.status === 'fully_paid' ? "bg-emerald-50 text-emerald-600" :
                        student.status === 'partial' ? "bg-amber-50 text-amber-600" :
                        "bg-red-50 text-red-600"
                      )}>
                        {student.status === 'fully_paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {student.status.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-gray-400 text-sm">
                      {formatCurrency(student.totalFee)}
                    </td>
                    <td className="px-8 py-6 text-right font-black text-emerald-600 text-sm">
                      {formatCurrency(student.paid)}
                    </td>
                    <td className="px-8 py-6 text-right font-black text-gray-900 text-sm">
                      {formatCurrency(balance)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowPayModal(true);
                        }}
                        disabled={student.status === 'fully_paid'}
                        className={cn(
                          "px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                          student.status === 'fully_paid' 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95"
                        )}
                      >
                        Record Payment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Modal */}
      {showPayModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-blue-600">
                <CreditCard size={32} />
                <h3 className="text-2xl font-black tracking-tight uppercase">Receive Payment</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <Plus size={32} className="rotate-45" />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl border border-dashed mb-8">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Student Details</p>
              <p className="text-lg font-black text-gray-900 leading-tight">{selectedStudent.name}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="text-center bg-white px-4 py-2 rounded-xl border shadow-sm">
                  <p className="text-[8px] font-bold text-gray-400 uppercase">Outstanding</p>
                  <p className="text-xs font-black text-red-600">{formatCurrency(selectedStudent.totalFee - selectedStudent.paid)}</p>
                </div>
                <div className="text-center bg-white px-4 py-2 rounded-xl border shadow-sm">
                  <p className="text-[8px] font-bold text-gray-400 uppercase">Total Required</p>
                  <p className="text-xs font-black text-gray-900">{formatCurrency(selectedStudent.totalFee)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Amount to Pay (₦)</label>
                <input 
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 px-8 font-black text-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Cash', 'Bank Transfer'].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={cn(
                        "py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all active:scale-95",
                        paymentMethod === m ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95"
              >
                Complete & Print Receipt
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Receipt Preview */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 relative"
          >
            {/* School Branding */}
            <div className="text-center border-b-2 border-dashed pb-8 mb-8">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
              </div>
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{schoolIdentity.name}</h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{schoolIdentity.address}</p>
              <div className="mt-4 inline-block bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Official Payment Receipt
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Receipt ID</span>
                <span className="font-black text-gray-900 uppercase">{showReceipt.id}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Student Name</span>
                <span className="font-black text-gray-900 uppercase">{showReceipt.studentName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Payment Date</span>
                <span className="font-black text-gray-900 uppercase">{new Date(showReceipt.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Method</span>
                <span className="font-black text-gray-900 uppercase">{showReceipt.method}</span>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-3xl border border-dashed flex items-center justify-between mt-8">
                <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Amount Paid</span>
                <span className="text-2xl font-black text-blue-600">{formatCurrency(showReceipt.amount)}</span>
              </div>

              {/* Simulated Signature & Stamp */}
              <div className="flex items-center justify-between pt-12 mt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="w-24 h-12 border-b-2 border-gray-200 mb-2 font-mono italic text-gray-400 flex items-end justify-center">
                    [Signature]
                  </div>
                  <p className="text-[8px] font-black text-gray-400 uppercase">School Bursar</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-emerald-600/20 text-emerald-600/30 font-black text-[10px] flex items-center justify-center rotate-[-15deg] uppercase">
                    E-STAMP
                  </div>
                  <p className="text-[8px] font-black text-gray-400 uppercase">Verified</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button 
                onClick={() => setShowReceipt(null)}
                className="flex-1 py-4 rounded-2xl border-2 border-gray-100 font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
              >
                Close
              </button>
              <button 
                onClick={() => window.print()}
                className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-900/10"
              >
                <Printer size={18} /> Print PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
