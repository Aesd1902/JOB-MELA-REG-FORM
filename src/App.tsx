import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { User, GraduationCap, Briefcase, CheckCircle, AlertCircle, Phone, Mail, Globe, MapPin, ChevronDown, Trash2, X, Upload, Database, Search, Calendar } from 'lucide-react';

interface RegistrationRecord extends FormData {
  id: number;
  createdAt: string;
}

interface FormData {
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  email: string;
  aadhaar: string;
  qualification: string;
  specialization: string;
  yearOfPassing: string;
  percentage: string;
  applyingFor: string;
  experienceLevel: string;
  skills: string;
  preferredLocation: string;
  jobMelaCity: string;
  resume: string;
}

interface FormErrors {
  [key: string]: string;
}

const HIRING_ROLES = [
  "Junior Web Developer",
  "Ai and API integrator",
  "Backend Developer",
  "Digital Marketing",
  "Business Development Executives",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist"
];

const ANDHRA_PRADESH_CITIES = [
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Nellore",
  "Kurnool",
  "Kakinada",
  "Rajamahendravaram",
  "Tirupati",
  "Kadapa",
  "Anantapur",
  "Eluru",
  "Vizianagaram",
  "Ongole",
  "Chittoor"
];

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Head Silhouette */}
        <path 
          d="M30,85 C30,85 25,80 22,70 C18,60 15,50 15,40 C15,20 30,10 50,10 C70,10 85,25 85,45 C85,65 75,80 60,85 L60,90 L30,90 Z" 
          fill="#1e3a8a" 
        />
        {/* Gears (Simplified) */}
        <circle cx="50" cy="40" r="15" fill="#94a3b8" opacity="0.5" />
        <path d="M50,25 L50,30 M50,50 L50,55 M35,40 L40,40 M60,40 L65,40" stroke="white" strokeWidth="2" />
        {/* Magnifying Glass */}
        <circle cx="55" cy="55" r="12" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <line x1="64" y1="64" x2="75" y2="75" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-lg sm:text-xl font-black text-blue-900 leading-none tracking-tighter">COGNITO</span>
      <span className="text-lg sm:text-xl font-black text-gray-600 leading-none tracking-tighter">INSIGHTS</span>
      <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Solutions Pvt Ltd</span>
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', fatherName: '', dateOfBirth: '', gender: '', mobile: '', email: '', aadhaar: '',
    qualification: '', specialization: '', yearOfPassing: '', percentage: '',
    applyingFor: '', experienceLevel: '', skills: '', preferredLocation: '',
    jobMelaCity: '', resume: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [dbRecords, setDbRecords] = useState<RegistrationRecord[]>([]);

  // Load database from localStorage
  useEffect(() => {
    const savedDb = localStorage.getItem('cognito_db_registrations');
    if (savedDb) {
      setDbRecords(JSON.parse(savedDb));
    }
  }, []);

  const saveToDatabase = (data: FormData) => {
    const newRecord: RegistrationRecord = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updatedDb = [newRecord, ...dbRecords];
    setDbRecords(updatedDb);
    localStorage.setItem('cognito_db_registrations', JSON.stringify(updatedDb));
  };

  const resetForm = () => {
    const emptyForm = {
      fullName: '', fatherName: '', dateOfBirth: '', gender: '', mobile: '', email: '', aadhaar: '',
      qualification: '', specialization: '', yearOfPassing: '', percentage: '',
      applyingFor: '', experienceLevel: '', skills: '', preferredLocation: '',
      jobMelaCity: '', resume: '',
    };
    setFormData(emptyForm);
    setErrors({});
    setTouched({});
    localStorage.removeItem('cognitoRegistration');
    setShowClearConfirm(false);
  };

  // Calculate progress
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(val => (val as string).trim() !== '').length;
    setProgress((filledFields / totalFields) * 100);
  }, [formData]);

  // 3D Tilt Effect - Disable on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const savedData = localStorage.getItem('cognitoRegistration');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'fullName':
      case 'fatherName':
      case 'specialization':
      case 'skills':
      case 'preferredLocation':
        if (!value.trim()) error = 'This field is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
        break;
      case 'mobile':
        if (!value) error = 'Mobile number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Must be exactly 10 digits';
        break;
      case 'aadhaar':
        if (!value) error = 'Aadhaar is required';
        else if (!/^\d{12}$/.test(value)) error = 'Must be exactly 12 digits';
        break;
      case 'yearOfPassing':
        const year = parseInt(value);
        if (!value) error = 'Year is required';
        else if (isNaN(year) || year < 1990 || year > 2026) error = 'Invalid year (1990-2026)';
        break;
      case 'dateOfBirth':
      case 'gender':
      case 'qualification':
      case 'applyingFor':
      case 'experienceLevel':
      case 'percentage':
      case 'resume':
        if (!value) error = 'This field is required';
        break;
      case 'jobMelaCity':
        // Optional, so no error if empty
        break;
    }
    return error;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name;
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file.name }));
      setErrors(prev => ({ ...prev, [name]: '' }));
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    const allTouched: { [key: string]: boolean } = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, (formData as any)[key]);
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      saveToDatabase(formData);
      localStorage.setItem('cognitoRegistration', JSON.stringify(formData));
      setIsSubmitted(true);
    } else {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background for Success */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 rounded-full blur-[100px]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] text-center max-w-lg w-full relative z-10 border border-gray-100"
        >
          <div className="relative inline-block mb-6 sm:mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-16 h-16 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-400 rounded-full -z-10"
            />
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">Registration Successful!</h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            Thank you, <span className="font-bold text-blue-900">{formData.fullName}</span>! Your application for the <span className="font-bold text-blue-900">Cognito Mega Job Mela 2026</span> has been received.
          </p>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left border border-blue-100">
            <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3">Next Steps:</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Our HR team will review your profile.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Shortlisted candidates will receive an interview invite.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Keep your mobile and email active for updates.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95"
            >
              Print Receipt
            </button>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="flex-1 border-2 border-gray-200 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              Edit Details
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium text-gray-600">
            <button 
              onClick={() => setShowDatabase(true)}
              className="hidden md:flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors font-bold px-4 py-2 rounded-xl hover:bg-blue-50"
            >
              <Database className="w-4 h-4" />
              View Database
            </button>
            <a 
              href="tel:+918978246111"
              className="bg-blue-900 text-white p-3 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact for any queries and issues faced</span>
            </a>
          </div>
        </div>
        
        {/* Marquee Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-3 overflow-hidden whitespace-nowrap border-t border-blue-800/50">
          <div className="animate-marquee flex items-center gap-12">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  Hiring Now:
                </span>
                {HIRING_ROLES.map((role, idx) => (
                  <span key={idx} className="text-sm font-medium text-blue-100 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {role}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 sm:py-16 px-4 sm:px-6 lg:px-8 perspective-1000 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%)] from-blue-100/50">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={isTouchDevice ? {} : { rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden preserve-3d"
          >
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 sm:p-12 text-white relative overflow-hidden">
              {/* Progress Bar Overlay */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                />
              </div>
              <div className="absolute top-4 right-6 sm:right-8 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Form Completion: {Math.round(progress)}%
              </div>

              <div className="relative z-10">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 leading-tight">Cognito Mega Job Mela 2026</h1>
                  <p className="text-blue-100 text-base sm:text-xl font-light max-w-xl leading-relaxed">
                    Unlock your potential with Cognito Insights. We're looking for passionate individuals to join our growing team.
                  </p>
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px] animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-20 -mb-20 blur-[60px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-12 space-y-8 sm:space-y-12" noValidate>
              <Section title="Personal Details" icon={<User className="w-5 h-5 sm:w-6 sm:h-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} error={errors.fullName} touched={touched.fullName} />
                  <Input label="Father's Name *" name="fatherName" value={formData.fatherName} onChange={handleChange} onBlur={handleBlur} error={errors.fatherName} touched={touched.fatherName} />
                  <Input label="Date of Birth *" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} onBlur={handleBlur} error={errors.dateOfBirth} touched={touched.dateOfBirth} />
                  <Select label="Gender *" name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} options={['Male', 'Female', 'Other']} error={errors.gender} touched={touched.gender} />
                  <Input label="Mobile Number *" name="mobile" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} error={errors.mobile} touched={touched.mobile} placeholder="10-digit number" />
                  <Input label="Email ID *" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} placeholder="example@mail.com" />
                  <Input label="Aadhaar Number *" name="aadhaar" value={formData.aadhaar} onChange={handleChange} onBlur={handleBlur} error={errors.aadhaar} touched={touched.aadhaar} placeholder="12-digit number" />
                </div>
              </Section>
              
              <Section title="Education Details" icon={<GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <Select label="Highest Qualification *" name="qualification" value={formData.qualification} onChange={handleChange} onBlur={handleBlur} options={['10th', '12th', 'Diploma', 'Under Graduation (UG)', 'Post Graduation (PG)', 'PhD']} error={errors.qualification} touched={touched.qualification} />
                  <Input label="Specialization *" name="specialization" value={formData.specialization} onChange={handleChange} onBlur={handleBlur} error={errors.specialization} touched={touched.specialization} placeholder="e.g. Computer Science" />
                  <Input label="Year of Passing *" name="yearOfPassing" type="number" value={formData.yearOfPassing} onChange={handleChange} onBlur={handleBlur} error={errors.yearOfPassing} touched={touched.yearOfPassing} />
                  <Input label="Percentage / CGPA *" name="percentage" value={formData.percentage} onChange={handleChange} onBlur={handleBlur} error={errors.percentage} touched={touched.percentage} placeholder="e.g. 85% or 8.5" />
                </div>
              </Section>
              
              <Section title="Job Preferences" icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <Select label="Applying For *" name="applyingFor" value={formData.applyingFor} onChange={handleChange} onBlur={handleBlur} options={['IT', 'Non-IT', 'Technical', 'Semi-Technical', 'Others']} error={errors.applyingFor} touched={touched.applyingFor} />
                  <Select label="Experience Level *" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} onBlur={handleBlur} options={['Fresher', 'Experienced']} error={errors.experienceLevel} touched={touched.experienceLevel} />
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Skills *</label>
                    <textarea 
                      name="skills" 
                      value={formData.skills} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      className={`w-full rounded-2xl border p-4 sm:p-5 transition-all focus:ring-4 focus:ring-blue-500/20 outline-none resize-none ${errors.skills && touched.skills ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300 shadow-inner'}`} 
                      rows={4} 
                      placeholder="List your key skills (e.g. React, Python, AWS, Digital Marketing)..."
                    />
                    <AnimatePresence>
                      {errors.skills && touched.skills && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-xs mt-2 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" /> {errors.skills}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <Input label="Preferred Location *" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} onBlur={handleBlur} error={errors.preferredLocation} touched={touched.preferredLocation} />
                  <Select label="Job Mela City (Andhra Pradesh) [Optional]" name="jobMelaCity" value={formData.jobMelaCity} onChange={handleChange} onBlur={handleBlur} options={ANDHRA_PRADESH_CITIES} error={errors.jobMelaCity} touched={touched.jobMelaCity} />
                  
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Upload Resume (PDF/DOC) *</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`w-full rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all flex flex-col items-center justify-center gap-4 ${formData.resume ? 'border-green-500 bg-green-50' : 'border-gray-200 group-hover:border-blue-400 bg-gray-50'}`}>
                        <div className={`p-4 rounded-full ${formData.resume ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                          <p className={`text-lg font-bold ${formData.resume ? 'text-green-700' : 'text-gray-700'}`}>
                            {formData.resume || 'Click or drag to upload resume'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.resume && touched.resume && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-xs mt-2 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" /> {errors.resume}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Section>
              
              <div className="flex items-start gap-3 p-4 sm:p-6 bg-blue-50 rounded-2xl sm:rounded-3xl border border-blue-100">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-gray-300 text-blue-900 focus:ring-blue-900 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 font-medium cursor-pointer leading-relaxed">
                  I hereby declare that all the information provided above is true to the best of my knowledge. I agree to the <span className="text-blue-900 font-bold underline">Terms & Conditions</span> of Cognito Insights.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="flex-[2] bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-xl sm:text-2xl hover:shadow-[0_20px_40px_rgba(30,58,138,0.3)] transition-all transform-gpu"
                >
                  Register for Job Mela
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="flex-1 bg-white border-2 border-red-100 text-red-600 py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] font-bold text-lg sm:text-xl hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  Clear Form
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-tight">Clear all data?</h3>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8">
                  Are you sure you want to clear all the form data? This action cannot be undone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={resetForm}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95"
                  >
                    Yes, Clear
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowClearConfirm(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Database Modal */}
      <AnimatePresence>
        {showDatabase && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDatabase(false)}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-6xl h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 sm:p-10 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Registration Database</h3>
                    <p className="text-gray-500 text-sm font-medium">Stored in Local SQL-like Storage</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDatabase(false)}
                  className="p-3 bg-gray-100 rounded-2xl text-gray-500 hover:bg-gray-200 transition-all active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-auto p-6 sm:p-10">
                {dbRecords.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                      <Search className="w-12 h-12" />
                    </div>
                    <p className="text-gray-400 font-medium text-lg">No records found in the database yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">ID</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Mobile</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Qualification</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Applied For</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {dbRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-5 text-sm font-mono text-gray-400">#{record.id.toString().slice(-6)}</td>
                            <td className="px-6 py-5">
                              <p className="font-bold text-gray-900">{record.fullName}</p>
                              <p className="text-xs text-gray-500">S/o {record.fatherName}</p>
                            </td>
                            <td className="px-6 py-5 text-sm text-gray-600">{record.email}</td>
                            <td className="px-6 py-5 text-sm font-medium text-gray-900">{record.mobile}</td>
                            <td className="px-6 py-5 text-sm text-gray-600">{record.qualification}</td>
                            <td className="px-6 py-5">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                                {record.applyingFor}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-sm text-gray-400">
                              {new Date(record.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-10 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Total Records: {dbRecords.length}
                </div>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear the entire database?')) {
                      setDbRecords([]);
                      localStorage.removeItem('cognito_db_registrations');
                    }
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-bold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Database
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-16 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <Logo className="brightness-0 invert" />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
              We are a leading technology solutions provider dedicated to empowering businesses through innovation and exceptional talent acquisition.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[Globe, Phone, Mail].map((Icon, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer border border-gray-800"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-lg sm:text-xl font-black tracking-tight border-b-2 border-blue-600 w-fit pb-2">Contact Details</h3>
            <ul className="space-y-4 sm:space-y-6 text-gray-400 text-sm sm:text-base">
              <li className="flex items-start gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-gray-900 rounded-lg sm:rounded-xl group-hover:bg-blue-600/20 transition-colors">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">Call Us</p>
                  <p className="font-medium">+91 8978246111</p>
                  <p className="font-medium">+91 8978247111</p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-gray-900 rounded-lg sm:rounded-xl group-hover:bg-blue-600/20 transition-colors">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">Email Us</p>
                  <p className="font-medium text-sm sm:text-base">info@cognitoinsights.ai</p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 group">
                <div className="p-2 sm:p-3 bg-gray-900 rounded-lg sm:rounded-xl group-hover:bg-blue-600/20 transition-colors">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="font-medium text-sm sm:text-base">www.cognitoinsights.ai</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-lg sm:text-xl font-black tracking-tight border-b-2 border-blue-600 w-fit pb-2">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-3 sm:gap-4 text-gray-400 text-sm sm:text-base font-medium">
              {['About Cognito', 'Our Services', 'Career Portal', 'Privacy Policy', 'Terms of Use', 'Contact Support'].map((link, i) => (
                <li key={i} className="hover:text-blue-500 cursor-pointer transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-600 text-sm font-medium">
            © 2026 Cognito Insights Solutions Pvt Ltd. Crafted with excellence.
          </p>
        </div>
      </footer>

      {/* Floating Support Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] group"
      >
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-[10px] sm:text-xs font-bold py-2 px-4 rounded-xl whitespace-nowrap shadow-xl">
            Need help? Contact Support
          </div>
          <div className="w-3 h-3 bg-gray-900 rotate-45 absolute -bottom-1.5 right-6" />
        </div>
        <a 
          href="tel:+918978246111"
          className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-800 transition-all border-4 border-white"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
      </motion.div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4 bg-gray-50/50 rounded-2xl sm:rounded-[2rem] border border-gray-100/50 overflow-hidden transition-all hover:bg-white hover:shadow-xl group">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-500 ${isOpen ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'bg-white text-blue-900 shadow-sm'}`}>
            {icon}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`p-2 rounded-full ${isOpen ? 'bg-blue-50 text-blue-900' : 'text-gray-400'}`}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6 sm:mb-8" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ label, error, touched, ...props }: any) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">{label}</label>
      <input 
        {...props} 
        className={`w-full rounded-xl sm:rounded-2xl border p-3 sm:p-4 text-sm sm:text-base transition-all focus:ring-4 focus:ring-blue-500/20 outline-none ${error && touched ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`} 
      />
      <AnimatePresence>
        {error && touched && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 font-bold ml-1">
            <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Select({ label, options, error, touched, ...props }: any) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">{label}</label>
      <div className="relative">
        <select 
          {...props} 
          className={`w-full rounded-xl sm:rounded-2xl border p-3 sm:p-4 text-sm sm:text-base transition-all focus:ring-4 focus:ring-blue-500/20 outline-none appearance-none bg-white ${error && touched ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}
        >
          <option value="">Select...</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      <AnimatePresence>
        {error && touched && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 font-bold ml-1">
            <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
