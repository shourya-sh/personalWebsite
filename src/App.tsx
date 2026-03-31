import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import BootSequence from '@/components/BootSequence';
import Home from '@/pages/Home';
import Experience from '@/pages/Experience';
import Education from '@/pages/Education';
import Projects from '@/pages/Projects';
import Games from '@/pages/Games';
import Contact from '@/pages/Contact';
import Resume from '@/pages/Resume';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      
      {booted && (
        <div className="flex h-[100dvh] w-screen bg-[#0e0e0e] overflow-hidden">
          <main className="flex-1 animate-[fadeIn_0.5s_ease-out] relative h-full w-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/games" element={<Games />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
