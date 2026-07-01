import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, Award, Building } from 'lucide-react';
import { TIMELINE } from '../data';

export default function Timeline() {
  return (
    <section id="experience" className="py-24 bg-[#070b14] relative border-t border-slate-900">
      {/* Visual top grid accent */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Milestones & History</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-4">
            Professional & Academic Journey
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Formally trained in information systems with concrete, real-world development experience in high-impact environments.
          </p>
        </div>

        {/* Chronological Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 md:ml-32 space-y-12">
          {TIMELINE.map((item, idx) => {
            const isWork = item.type === 'experience';
            return (
              <div key={item.id} className="relative pl-8 sm:pl-10">
                
                {/* Year Marker on the left (only visible on medium screens and larger) */}
                <div className="hidden md:block absolute -left-44 top-1.5 w-36 text-right">
                  <span className="text-sm font-bold text-white font-mono bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                    {item.period.split(' ')[2] || item.period}
                  </span>
                </div>

                {/* Timeline node icon */}
                <div className={`absolute -left-5 top-1.5 h-10 w-10 rounded-full flex items-center justify-center border-4 border-[#070b14] ${
                  isWork 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-indigo-600 text-white'
                }`}>
                  {isWork ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <GraduationCap className="h-5 w-5" />
                  )}
                </div>

                {/* Milestone Detail Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 md:p-8 hover:border-slate-700/60 transition-all duration-300 relative"
                >
                  {/* Category Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                    <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${
                      isWork 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="font-mono">{item.period}</span>
                    </div>
                  </div>

                  {/* Header Roles / Inst */}
                  <div className="mb-4">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
                      <Building className="h-4 w-4 text-slate-500" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-3 pt-4 border-t border-slate-900">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Key Accomplishments</h4>
                    <div className="space-y-2.5">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                          <Award className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="font-light leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
