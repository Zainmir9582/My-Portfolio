import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Terminal, Cpu, Database, Play, CheckCircle2, MessageSquare, Briefcase } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const [visualStep, setVisualStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const runVisualization = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setVisualStep(1); // Sent from Frontend

    setTimeout(() => {
      setVisualStep(2); // Processed by Nest.js
    }, 1200);

    setTimeout(() => {
      setVisualStep(3); // Queried in MySQL via TypeORM
    }, 2400);

    setTimeout(() => {
      setVisualStep(4); // Returned JSON back
    }, 3600);

    setTimeout(() => {
      setVisualStep(0); // Reset
      setIsPlaying(false);
    }, 5500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#070b14]">
      {/* Background radial gradients for Cosmic feel */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Copywriting */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold w-fit mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Available for Freelance & Custom Work</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Full-Stack Developer Specializing in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                Robust Architectures
              </span>
            </motion.h1>

            {/* Introduction paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed font-light">
              Hi, I'm <strong className="font-semibold text-white">{PERSONAL_INFO.name}</strong>. I bridge the gap between heavy-lifting server logic and beautiful, accessible client interfaces. Using technologies like <span className="text-blue-400 font-medium">Nest.js</span>, <span className="text-indigo-400 font-medium">Next.js</span>, and relational <span className="text-purple-400 font-medium">MySQL</span> with <span className="text-purple-400 font-medium">TypeORM</span>, I build highly-scalable systems that deliver flawless user experiences.
            </motion.p>

            {/* Primary Calls to Action */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-all duration-200 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <span>Let's Discuss Your Project</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href={PERSONAL_INFO.fiverr}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700/80 text-white font-medium rounded-full border border-slate-700/80 transition-all duration-200"
              >
                <Briefcase className="h-4 w-4 text-green-400" />
                <span>Hire Zain on Fiverr</span>
              </a>
            </motion.div>

            {/* Key Stack Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 pt-4 border-t border-slate-800/60 max-w-lg">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] mr-2">Core Arsenal:</span>
              {['Typescript', 'Nest.js', 'Next.js', 'React', 'MySQL', 'TypeORM', 'MUI', 'Tailwind'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: High-fidelity Full-Stack interactive playground */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 backdrop-blur-md shadow-2xl">
              {/* Card Title Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-medium ml-2">architecture-visualizer.js</span>
                </div>
                <button
                  onClick={runVisualization}
                  disabled={isPlaying}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                    isPlaying 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30'
                  }`}
                >
                  <Play className="h-3 w-3" />
                  <span>{isPlaying ? 'Running...' : 'Run Stack flow'}</span>
                </button>
              </div>

              {/* The Live Interactive Flow Nodes */}
              <div className="space-y-6 relative">
                {/* Arrow connectors representing lifecycle flows */}
                <div className="absolute left-[34px] top-6 bottom-6 w-0.5 border-r border-dashed border-slate-800 z-0"></div>

                {/* Node 1: Next.js Frontend Client */}
                <div className={`flex items-start gap-4 transition-all duration-300 relative z-10 ${
                  visualStep === 1 ? 'scale-102 bg-blue-950/20 p-3 rounded-xl border border-blue-500/20' : 'p-3'
                }`}>
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    visualStep === 1 
                      ? 'bg-blue-500/20 border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Next.js Frontend</span>
                      <span className="text-[10px] font-mono text-slate-500">React Client</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Sends secure REST request containing JWT token authorization header.</p>
                    {visualStep === 1 && (
                      <div className="mt-2 bg-[#090d16] border border-blue-500/30 p-2 rounded-lg font-mono text-[10px] text-blue-300">
                        POST /api/courses/enroll <br />
                        <span className="text-slate-500">{"{ userId: 'usr-43', courseId: 'crs-101' }"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Node 2: Nest.js Backend Gateway */}
                <div className={`flex items-start gap-4 transition-all duration-300 relative z-10 ${
                  visualStep === 2 ? 'scale-102 bg-indigo-950/20 p-3 rounded-xl border border-indigo-500/20' : 'p-3'
                }`}>
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    visualStep === 2 
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Nest.js REST API</span>
                      <span className="text-[10px] font-mono text-slate-500">Node Gateway</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Validates authentication guards, checks payloads via DTO pipes, routes request.</p>
                    {visualStep === 2 && (
                      <div className="mt-2 bg-[#090d16] border border-indigo-500/30 p-2 rounded-lg font-mono text-[10px] text-indigo-300">
                        [EnrollmentController] Validating Token... <br />
                        <span className="text-green-400">✔ Passport JWT Authorized</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Node 3: MySQL Database & TypeORM */}
                <div className={`flex items-start gap-4 transition-all duration-300 relative z-10 ${
                  visualStep === 3 ? 'scale-102 bg-purple-950/20 p-3 rounded-xl border border-purple-500/20' : 'p-3'
                }`}>
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    visualStep === 3 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <Database className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">MySQL (TypeORM Entity)</span>
                      <span className="text-[10px] font-mono text-slate-500">Relational DB</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Queries data tables using optimized relations, enforcing transaction safety.</p>
                    {visualStep === 3 && (
                      <div className="mt-2 bg-[#090d16] border border-purple-500/30 p-2 rounded-lg font-mono text-[10px] text-purple-300 whitespace-pre">
                        INSERT INTO enrollments ... <br />
                        <span className="text-green-400">Transaction committed safely.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Node 4: JSON Response return */}
                <div className={`flex items-start gap-4 transition-all duration-300 relative z-10 ${
                  visualStep === 4 ? 'scale-102 bg-green-950/20 p-3 rounded-xl border border-green-500/20' : 'p-3'
                }`}>
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    visualStep === 4 
                      ? 'bg-green-500/20 border-green-400 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">JSON Handshake Complete</span>
                      <span className="text-[10px] font-mono text-green-400">HTTP 201 Created</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Success response hydrated into Next.js UI, updating application state instantly.</p>
                    {visualStep === 4 && (
                      <div className="mt-2 bg-[#090d16] border border-green-500/30 p-2 rounded-lg font-mono text-[10px] text-green-300">
                        {"{\n  \"success\": true,\n  \"enrollmentId\": \"enr-789\"\n}"}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Informational Hint */}
              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800/40">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span>Click the button above to trace a real full-stack query live!</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
