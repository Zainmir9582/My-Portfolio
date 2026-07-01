import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import InteractiveTerminal from './components/InteractiveTerminal';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Dynamic Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Landing */}
        <Hero />

        {/* Featured Production Projects */}
        <Projects />

        {/* Technical Arsenal & Detail Inspector */}
        <Skills />

        {/* Interactive REST Sandbox & Schema Map */}
        <InteractiveTerminal />

        {/* Academic & Internship Milestones */}
        <Timeline />

        {/* Collaboration Proposals & Lead Persister */}
        <Contact />
      </main>

      {/* Footer Branding & Social handles */}
      <Footer />
    </div>
  );
}
