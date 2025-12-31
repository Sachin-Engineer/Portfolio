import React, { useEffect, useId, useMemo, useRef, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    // set initial (covers cases where hydration/initial state differs)
    setMatches(mql.matches);

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

function Skill({ name, percent, size: sizeProp, stroke = 5, duration = 1400 }) {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isSmUp = useMediaQuery("(min-width: 640px)");

  // If caller passes `size`, use it; otherwise use responsive sizes.
  const size = sizeProp ?? (isMdUp ? 140 : isSmUp ? 80 : 50);

  const id = useId();
  const rootRef = useRef(null);

  const [inView, setInView] = useState(false);

  const clamped = Math.max(0, Math.min(100, percent));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const newOffset = useMemo(() => c * (1 - clamped / 100), [c, clamped]);
  const styleAnimationTime = duration;

  const bgStyle = {
    backgroundImage: `url(/images/${name}.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const tooltipText = String(name ?? "").toUpperCase();

  // ✅ unique keyframes name per component instance
  const animName = `animateCircle-${id}`;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // animate only once
    if (inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // run after first paint so CSS animation reliably starts
          requestAnimationFrame(() => setInView(true));
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div
      ref={rootRef}
      className="result-chart-box"
      data-skill-id={id}
      aria-label={tooltipText}
    >
      {/* Tooltip (starts behind, slides out on hover) */}
      <div className="skill-tooltip" role="tooltip">
        {tooltipText}
      </div>

      <div className="outer-circle" style={{ width: size, height: size }}>
        <div className="inner-circle" style={bgStyle}></div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="skill-svg"
      >
        <defs>
          <linearGradient id={`GradientColor-${id}`}>
            <stop offset="0%" stopColor="#6a7282" />
            <stop offset="50%" stopColor="#99a1af" />
            <stop offset="100%" stopColor="#d1d5dc" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="transparent"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#GradientColor-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className="progress-circle"
        />
      </svg>

      <style>{`
        /* ✅ scope styles to this component instance */
        .result-chart-box[data-skill-id='${id}']{
          position: relative;
          width: ${size}px;
          height: ${size}px;
          display: grid;
          place-items: center;
          overflow: visible; /* ✅ allow tooltip outside */
        }

        .result-chart-box[data-skill-id='${id}'] .outer-circle{
          position:absolute;
          inset:0;
          display:grid;
          place-items:center;
          z-index: 2;
        }

        .result-chart-box[data-skill-id='${id}'] .inner-circle{
          width: calc(${size}px - ${stroke * 2}px);
          height: calc(${size}px - ${stroke * 2}px);
          border-radius: 50%;
          display:grid;
          place-items:center;
          box-shadow: inset 0 10px 30px rgba(0,0,0,.06);
        }

        .result-chart-box[data-skill-id='${id}'] .skill-svg{
          transform: rotate(-90deg);
          z-index: 3;
        }

        .result-chart-box[data-skill-id='${id}'] .progress-circle{
          stroke-dasharray: ${c};
          stroke-dashoffset: ${c};
          ${inView ? `animation: ${animName} ${styleAnimationTime}ms ease-in-out forwards;` : ""}
        }

        /* ✅ unique keyframes per instance (prevents override) */
        @keyframes ${animName}{
          to { stroke-dashoffset: ${newOffset}; }
        }

        @media (prefers-reduced-motion: reduce){
          .result-chart-box[data-skill-id='${id}'] .progress-circle{
            animation:none;
            stroke-dashoffset: ${newOffset};
          }
        }

        /* --- Tooltip --- */
        .result-chart-box[data-skill-id='${id}'] .skill-tooltip{
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, calc(-100% - 12px));
          opacity: 0;

          z-index: 9999;

          padding: 8px 12px;
          border-radius: 10px;
          font-size: 12px;
          letter-spacing: 1px;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;

          color: #f3f4f6;
          background: rgba(17, 24, 39, 0.92);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);

          transition: transform 220ms ease, opacity 220ms ease;
          pointer-events: none;
          user-select: none;
          backdrop-filter: blur(6px);
        }

        .result-chart-box[data-skill-id='${id}']:hover .skill-tooltip{
          opacity: 1;
          transform: translate(-50%, calc(-100% - 18px));
        }

        @media (prefers-reduced-motion: reduce){
          .result-chart-box[data-skill-id='${id}']:hover .skill-tooltip{
            transform: translate(-50%, calc(-100% - 18px));
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Skill;