import React, { useState, useEffect } from 'react'
import HeroExperience from './HeroExperience'

function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  // NEW: download UI state
  const [isDownloading, setIsDownloading] = useState(false)

  const phrases = ['Frontend Developer', 'React Developer', 'UI/UX Enthusiast', 'Problem Solver']

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % phrases.length
      const fullText = phrases[current]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))
      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  // NEW: download handler
  const handleDownloadResume = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    // Start the download immediately
    const a = document.createElement('a')
    a.href = '/Sachin-Kumar-Resume.pdf' // file must exist in /public
    a.download = 'Sachin-Kumar-Resume.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()

    // Fake "downloading" animation time (browser download progress can't be read reliably)
    window.setTimeout(() => setIsDownloading(false), 1200)
  }

  const downloadBtnClass =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 min-w-[170px] " + // ✅ fixed width
    "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-[#111] font-semibold rounded-full cursor-pointer " +
    "transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none " +
    "disabled:opacity-70 disabled:cursor-not-allowed"

  return (
    <section className="min-h-[calc(100vh-56px)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 min-h-[calc(100vh-56px)] md:grid md:grid-cols-2 md:items-center">
        {/* LEFT (md+) / BACK LAYER (mobile) */}
        <div
          className="
            relative
            md:static
            md:order-1
            md:flex md:flex-col md:justify-center
          "
        >
          {/* On mobile this becomes the BACK text layer */}
          <div
            className="
              pointer-events-none
              md:pointer-events-auto
              md:static
              absolute inset-x-0
              top-10 sm:top-14
              z-0
              text-center md:text-left
            "
          >
            <h2 className="text-2xl sm:text-3xl uppercase tracking-[0.2em] font-extrabold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
              Hello, I'm
            </h2>

            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-[#f1eaef]">
              Sachin Kumar
            </h2>

            <h3 className="mt-3 text-xl sm:text-2xl">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent font-bold">
                {text}
                <span className="animate-pulse text-yellow-500">|</span>
              </span>
            </h3>

            <p className="mt-5 text-[#CECFCA] text-base md:text-lg leading-tight opacity-60 max-w-xl mx-auto md:mx-0">
              Passionate about creating beautiful, responsive web applications with modern technologies and best practices.
            </p>
          </div>

          {/* On md+ show CTAs normally under content */}
          <div className="hidden md:flex gap-6 mt-8">
            <button
              type="button"
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className={downloadBtnClass}
            >
              <span className="inline-flex items-center justify-center gap-2 w-full"> {/* ✅ keep centered */}
                {isDownloading ? (
                  <>
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-[#111]/40 border-t-[#111] animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <span>Resume</span>
                    <span className="fa-solid fa-download text-sm" aria-hidden="true" />
                  </>
                )}
              </span>
            </button>

            <a
              href="#projects"
              className="px-6 py-2.5 border-2 border-gray-400 text-gray-300 font-semibold rounded-full relative overflow-hidden group transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-[#111] transition-colors duration-300">
                View My Work
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT (md+) / FRONT LAYER (mobile avatar + CTAs positioned near legs) */}
        <div
          className="
            relative
            md:order-2
            min-h-[calc(100vh-56px)]
            md:min-h-[520px]
            flex items-end md:items-center justify-center
          "
        >
          {/* Avatar container:
              - mobile: centered, slightly lower (items-end + padding bottom)
              - md+: centered vertically
          */}
          <div className="relative z-10 w-full flex justify-center pb-8 sm:pb-10 md:pb-0">
            <div className="w-full h-[360px] sm:w-full sm:h-[420px] md:w-full md:h-[520px]">
              <HeroExperience />
            </div>
          </div>

          {/* MOBILE CTAs overlay near "legs" */}
          <div
            className="
              md:hidden
              absolute
              left-1/2 -translate-x-1/2
              bottom-24 sm:bottom-28
              z-20
              flex gap-4
              items-center
              justify-center
              w-full
              px-4
            "
          >
            <button
              type="button"
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className={
                "inline-flex items-center justify-center gap-2 px-4 py-2 min-w-[150px] " + // ✅ fixed width (mobile)
                "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-[#111] font-semibold rounded-full cursor-pointer " +
                "transition-transform duration-200 ease-out hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              }
            >
              <span className="inline-flex items-center justify-center gap-2 w-full"> {/* ✅ keep centered */}
                {isDownloading ? (
                  <>
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-[#111]/40 border-t-[#111] animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <span>Resume</span>
                    <span className="fa-solid fa-download text-sm" aria-hidden="true" />
                  </>
                )}
              </span>
            </button>

            <a
              href="#projects"
              className="px-5 py-2 border-2 border-gray-400 text-gray-300 font-semibold rounded-full relative overflow-hidden group transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center active:scale-95 vw-work-xs"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-[#111] transition-colors duration-300">
                <span className="vw-work-long">View My Work</span>
                <span className="vw-work-short">My Work</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero