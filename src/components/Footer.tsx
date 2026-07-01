import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left">
            <span 
              onClick={() => scrollToSection('hero')}
              className="font-display font-bold text-lg tracking-tight text-white flex items-center justify-center md:justify-start gap-1.5 cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Zain<span className="text-blue-500 font-extrabold">.</span>Dev
            </span>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Designing scalable solutions with architectural integrity.
            </p>
          </div>

          {/* Quick Scroll Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            {['projects', 'skills', 'playground', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-white transition-colors cursor-pointer capitalize"
              >
                {section === 'playground' ? 'API Sandbox' : section}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.fiverr}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full"
            >
              <span>Fiverr</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-slate-600 font-light">
            © {currentYear} Zain Ul Abideen. All rights reserved. Built with React, Tailwind, and Motion.
          </span>
          <span className="text-[11px] text-slate-600 font-mono flex items-center gap-1">
            <span>Status Code:</span>
            <span className="text-green-500 font-semibold">200 OK</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
