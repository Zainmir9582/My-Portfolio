import { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

// Helper component to render Lucide Icons dynamically from string names safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Map strings to Lucide components
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    description: string;
    iconName: string;
  }>(SKILL_CATEGORIES[1].skills[0]); // Default to Nest.js for visual appeal

  return (
    <section id="skills" className="py-24 bg-[#070b14] relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Technical Arsenal & Tooling
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Full-stack expertise spanning lightweight declarative interfaces, enterprise backend platforms, and transactional query engines.
          </p>
        </div>

        {/* Layout Grid: Left 7 Cols (Skills Grid), Right 5 Cols (Interactive Inspector Details Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Skills Accordions/Categories */}
          <div className="lg:col-span-7 space-y-8">
            {SKILL_CATEGORIES.map((category, catIdx) => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {category.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill.name === skill.name;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (catIdx * 2 + sIdx) * 0.04 }}
                        onClick={() => setSelectedSkill(skill)}
                        className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-600/10 border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-white'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg border ${
                          isSelected 
                            ? 'bg-blue-500/20 border-blue-400/50 text-blue-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}>
                          <DynamicIcon name={skill.iconName} className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-sm truncate">{skill.name}</span>
                            <span className="font-mono text-[11px] text-slate-500 font-semibold">{skill.level}%</span>
                          </div>
                          {/* Slim Progress Meter */}
                          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isSelected ? 'bg-blue-500' : 'bg-slate-700'
                              }`} 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Inspector: Shows details, code snippets, and contextual applications for the selected skill */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
              {/* Abs decorative light flare */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>

              {/* Header Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-inner">
                  <DynamicIcon name={selectedSkill.iconName} className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">Skill Inspector</span>
                  <h4 className="font-display text-2xl font-bold text-white">{selectedSkill.name}</h4>
                </div>
              </div>

              {/* Progress visual */}
              <div className="mb-6 bg-[#0c1221] border border-slate-800/60 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Expertise Rating</span>
                  <span className="text-sm font-mono text-blue-400 font-bold">{selectedSkill.level} / 100</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <motion.div 
                    key={selectedSkill.name}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-[11px] text-slate-500 font-light mt-2 leading-relaxed">
                  Rating indicates theoretical depth, architectural experience, and frequency of deployment in production pipelines.
                </p>
              </div>

              {/* Contextual Description */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 font-mono">How I Apply This Tool</h5>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <div className="flex gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5"></span>
                    <p className="text-xs text-slate-400 leading-normal font-light">
                      Fully integrated into Zain's custom solutions such as his <strong className="text-slate-200">LMS Engine</strong> and the <strong className="text-slate-200">Convocation Dispatcher</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need this stack integrated?</span>
                <button
                  onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Test API Sandbox</span>
                  <Icons.ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
