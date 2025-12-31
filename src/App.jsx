import React, { useState } from 'react'
import './App.css'
import logo from './assets/icons/logo.svg'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Skills from './components/Skills'

function App() {
  const [menu, setMenu] = useState('home')

  return (
    <div className='w-full min-h-screen'>
      <header className='max-w-7xl mx-auto sticky top-0 z-50 px-3 py-2 sm:px-5 backdrop-blur bg-[#0b0f14]/70 border-b border-white/5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]'>
        <div className="header flex justify-between items-center h-10">
          <a href='' className="logo-container h-full overflow-hidden">
            <img src={logo} alt="logo image" className='h-10 w-20 sm:w-40 absolute top-2 left-3 sm:left-0' />
          </a>

          <nav>
            <ul className='flex gap-3 sm:gap-5'>
              <li>
                <a
                  href="#"
                  className='text-[#D0D5DB] font-semibold relative'
                  onClick={() => setMenu('home')}
                >
                  <span className={`text-[14px] sm:text-[16px] ${menu === 'home' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent' : ''}`}>Home</span>
                  <span className={`w-full h-0.5 absolute left-0 -bottom-1 ${menu === 'home' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500' : ''}`}></span>
                </a>
              </li>

              <li>
                <a
                  href="#skills"
                  className='text-[#D0D5DB] font-semibold relative'
                  onClick={() => setMenu('skills')}
                >
                  <span className={`text-[14px] sm:text-[16px] ${menu === 'skills' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent' : ''}`}>Skills</span>
                  <span className={`w-full h-0.5 absolute left-0 -bottom-1 ${menu === 'skills' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500' : ''}`}></span>
                </a>
              </li>

              <li>
                <a
                  href="#projects"
                  className='text-[#D0D5DB] font-semibold relative'
                  onClick={() => setMenu('projects')}
                >
                  <span className={`text-[14px] sm:text-[16px] ${menu === 'projects' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent' : ''}`}>Projects</span>
                  <span className={`w-full h-0.5 absolute left-0 -bottom-1 ${menu === 'projects' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500' : ''}`}></span>
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className='text-[#D0D5DB] font-semibold relative'
                  onClick={() => setMenu('contact')}
                >
                  <span className={`text-[14px] sm:text-[16px] ${menu === 'contact' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent' : ''}`}>Contact</span>
                  <span className={`w-full h-0.5 absolute left-0 -bottom-1 ${menu === 'contact' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500' : ''}`}></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className='py-8 px-4 md:px-8 lg:px-16'>
        <div className='flex flex-col justify-center items-center gap-2 max-w-7xl mx-auto'>
          <a href='#'>
            <img className='h-10' src={logo} alt="" />
          </a>

          <div className="h-0.5 w-40 rounded-full blur-[0.5px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90"></div>

          <ul className='flex items-center gap-3'>
            <li>
              <a
                href="https://wa.me/919910264486?text=Hi%2C%20I%20just%20visited%20your%20portfolio%20website%20and%20wanted%20to%20connect"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-[#D0D5DB] inline-flex items-center justify-center transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:scale-110
                           hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_10px_18px_rgba(245,158,11,0.35)]"
              >
                <i className="fa-brands fa-whatsapp text-3xl"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[#D0D5DB] inline-flex items-center justify-center transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:scale-110
                           hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_10px_18px_rgba(245,158,11,0.35)]"
              >
                <i className="fa-brands fa-linkedin-in text-3xl"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="text-[#D0D5DB] inline-flex items-center justify-center transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:scale-110
                           hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_10px_18px_rgba(245,158,11,0.35)]"
              >
                <i className="fa-brands fa-x-twitter text-3xl"></i>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/Sachin-Engineer"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[#D0D5DB] inline-flex items-center justify-center transition-all duration-300 ease-out
                           hover:-translate-y-1 hover:scale-110
                           hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_10px_18px_rgba(245,158,11,0.35)]"
              >
                <i className="fa-brands fa-github text-3xl"></i>
              </a>
            </li>
          </ul>

          <p className="text-sm text-[#D0D5DB]/80 mt-5 opacity-70">
            © {new Date().getFullYear()} Sachin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App