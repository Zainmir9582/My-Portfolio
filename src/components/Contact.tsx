import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Trash2, Briefcase, ExternalLink, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Application',
    message: '',
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing inquiries from localStorage for interactive display
  useEffect(() => {
    const saved = localStorage.getItem('zain_portfolio_leads');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    } else {
      // Seed an initial demo inquiry to show clients how it looks
      const demo: Inquiry[] = [
        {
          id: 'lead-1',
          name: 'Sarah Jenkins',
          email: 'sarah.j@enterprise.com',
          projectType: 'Nest.js Backend APIs',
          message: 'Looking for a skilled backend dev to overhaul our database relations and migration strategy using TypeORM and MySQL. Zain came highly recommended!',
          date: 'Just recently'
        }
      ];
      setInquiries(demo);
      localStorage.setItem('zain_portfolio_leads', JSON.stringify(demo));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // Use FormSubmit AJAX endpoint to deliver directly in the background
      const response = await fetch("https://formsubmit.co/ajax/zainmir9582@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          "Service Requested": formData.projectType,
          message: formData.message,
          _subject: `Portfolio Inquiry: ${formData.projectType} from ${formData.name}`,
        })
      });

      if (response.ok) {
        const newInquiry: Inquiry = {
          id: `lead-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        };

        const updated = [newInquiry, ...inquiries];
        setInquiries(updated);
        localStorage.setItem('zain_portfolio_leads', JSON.stringify(updated));

        // Reset Form and show success modal
        setFormData({
          name: '',
          email: '',
          projectType: 'Full-Stack Application',
          message: '',
        });
        setShowSuccess(true);
      } else {
        console.error("FormSubmit response error");
      }
    } catch (error) {
      console.error("Error sending form via FormSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('zain_portfolio_leads', JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0e17] relative border-t border-slate-900">
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Get in Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-4">
            Start a Collaboration
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Need a high-performance web app, robust backend server, or MySQL database setup? Fill out the brief or reach out directly.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct channels & Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 md:p-8 shadow-xl">
              
              <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="text-blue-500 h-5 w-5" />
                <span>Project Proposal Intake</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#070b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full bg-[#070b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Requested Service</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-[#070b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option>Full-Stack Application</option>
                    <option>Next.js Frontend Engineering</option>
                    <option>Nest.js Scalable Backend APIs</option>
                    <option>MySQL Database Schema Design</option>
                    <option>Fiverr Custom Project</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Project Requirements / Description</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your goals, core features, and expected timeline..."
                    className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 disabled:text-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Submitting Proposal...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Contact & Live local DB Inquiry Terminal */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">Direct Coordination Channels</h3>
              
              {/* Email */}
              <div className="flex items-center gap-4 p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 hover:border-blue-500/20 transition-all">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-mono">ELECTRONIC MAIL</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Fiverr Direct Banner */}
              <a
                href={PERSONAL_INFO.fiverr}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 hover:border-green-500/40 rounded-xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/15 text-green-400 rounded-lg">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">Direct Freelance Orders</h4>
                    <p className="text-[11px] text-slate-400">Order customized apps on Fiverr</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-green-500 group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

            {/* Interactive "Inquiry Terminal Dashboard" (Locally saved inquiries display) */}
            <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Interactive DB Console</h4>
                  <p className="text-[10px] text-slate-500">Live serialized inquiries list (Local State)</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-mono border border-blue-500/20">
                  {inquiries.length} leads
                </span>
              </div>

              <div className="space-y-3 max-h-52 overflow-y-auto scrollbar-thin">
                {inquiries.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-600 italic">
                    No active inquiries. Submit the form to watch it persist live!
                  </div>
                ) : (
                  inquiries.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/50 text-xs relative group/item">
                      <button
                        onClick={() => deleteInquiry(item.id)}
                        className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-400 rounded opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center justify-between gap-4 mb-1 text-slate-400 font-semibold">
                        <span className="text-slate-200">{item.name}</span>
                        <span className="font-mono text-[9px] text-slate-500">{item.date}</span>
                      </div>
                      <div className="text-[10px] text-blue-400 font-mono mb-1">{item.projectType}</div>
                      <p className="text-slate-400 font-light leading-normal line-clamp-2">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#090d16] border border-slate-800 rounded-2xl p-6 text-center shadow-2xl z-10"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 flex items-center justify-center mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Inquiry Submitted Successfully!</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                Thank you! Your message has been sent directly to Zain's email in the background. He will review it and get back to you shortly!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Notification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
