import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ShieldCheck, CheckSquare, Layers, Database, ChevronRight, Activity } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'frontend' | 'backend'>('overview');

  return (
    <section id="projects" className="py-24 bg-[#0a0e17] relative border-t border-slate-900">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Production-Ready Projects
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Delivering clean structures, type safety, and database relational integrity. Explore my core engineering works below.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col h-full rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6 md:p-8 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>

              {/* Header tags & category */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {project.id === 'lms-fullstack' ? 'Repository split' : 'Enterprise grade'}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-300 mb-6 font-light leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Preview Core Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800/60 rounded">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="px-2 py-0.5 text-xs font-mono text-slate-500">
                    +{project.tags.length - 5} more
                  </span>
                )}
              </div>

              {/* Action Triggers */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900 mt-auto">
                {/* GitHub link buttons */}
                <div className="flex gap-2">
                  {project.githubFrontend && (
                    <a
                      href={project.githubFrontend}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1.5"
                    >
                      <Github className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      <span>Frontend API</span>
                    </a>
                  )}
                  {project.githubBackend && (
                    <a
                      href={project.githubBackend}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1.5 border-l border-slate-800 pl-3"
                    >
                      <Github className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      <span>Backend API</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveTab('overview');
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1 cursor-pointer"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-over Modal for deep architecture lookup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="project-detail-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-[#090d16] border-l border-slate-800 h-full overflow-y-auto shadow-2xl p-6 md:p-10 flex flex-col"
            >
              {/* Close, Category badge */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/60">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  {selectedProject.category} Project
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Close modal</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {selectedProject.title}
              </h3>

              {/* Interactive Navigation Tabs for Architecture Split */}
              <div className="flex border-b border-slate-800 mb-6">
                {(['overview', 'frontend', 'backend'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'border-blue-500 text-white'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'overview' ? 'Overview' : tab === 'frontend' ? 'Frontend Client' : 'Backend & DB'}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content Panel */}
              <div className="flex-grow space-y-6">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Project Scope</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Highlights bullet list */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5 font-mono">Key Accomplishments</h4>
                      <div className="space-y-3">
                        {selectedProject.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm text-slate-300">
                            <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="font-light leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'frontend' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="h-5 w-5 text-blue-400" />
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Frontend Architecture Stack</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Engineered for optimal Core Web Vitals, instantaneous hydration, and client interactivity.
                      </p>
                      
                      <div className="bg-[#0c1221] border border-slate-800 rounded-xl p-4 space-y-3">
                        {selectedProject.architecture?.frontend.map((item, index) => (
                          <div key={index} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckSquare className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.githubFrontend && (
                      <div className="pt-4">
                        <a
                          href={selectedProject.githubFrontend}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/40 text-sm font-medium text-white rounded-xl transition-all"
                        >
                          <Github className="h-4 w-4" />
                          <span>View Frontend Repository on GitHub</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'backend' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Backend Architecture */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="h-5 w-5 text-indigo-400" />
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Backend Engine Structure</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Following NestJS clean patterns (SOLID) with robust controllers, validation pipes, and route guards.
                      </p>
                      <div className="bg-[#0c1221] border border-slate-800 rounded-xl p-4 space-y-3 mb-6">
                        {selectedProject.architecture?.backend.map((item, index) => (
                          <div key={index} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckSquare className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                            <span className="font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Database Architecture */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Database className="h-5 w-5 text-purple-400" />
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Relational MySQL Schema Design</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Optimized database design created using DBdiagram.io and structured seamlessly via TypeORM.
                      </p>
                      <div className="bg-[#0c1221] border border-slate-800 rounded-xl p-4 space-y-3">
                        {selectedProject.architecture?.database.map((item, index) => (
                          <div key={index} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckSquare className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.githubBackend && (
                      <div className="pt-4">
                        <a
                          href={selectedProject.githubBackend}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/40 text-sm font-medium text-white rounded-xl transition-all"
                        >
                          <Github className="h-4 w-4" />
                          <span>View Backend Repository on GitHub</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* General footer actions inside slide-over */}
              <div className="pt-8 border-t border-slate-800/80 mt-auto flex gap-4">
                <a
                  href={PERSONAL_INFO.fiverr}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 text-sm font-semibold text-white rounded-xl transition-colors shadow-lg shadow-green-600/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Order Custom App on Fiverr</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
