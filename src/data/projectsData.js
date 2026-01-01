export const projectsData = [
  {
    id: 1,
    title: "Portfolio",
    titleColor: "",
    subtitle: "(Interactive 3D Portfolio)",
    subtitleColor: "",
    description: "A modern, responsive developer portfolio showcasing my projects, skills, and contact details. Built with React + Vite and styled with Tailwind CSS, featuring smooth GSAP animations and immersive 3D elements powered by Three.js and React Three Fiber.",
    technologies: ["#HTML", "#CSS", "#Javascript", "#React.js", "#TailwindCss", "#Three.js", "#R3F", "#Gsap", "#figma"],
    image: new URL('../assets/images/Portfolio.png', import.meta.url).href,
    link: 'https://sachinkumar.me/',
    alignment: "right"
  },
  {
    id: 2,
    title: "GlobSpot",
    titleColor: "",
    subtitle: "(Country Explorer)",
    subtitleColor: "",
    description: "GlobSpot is a React-based countries explorer where users can browse and search countries, open a dedicated detail page, and navigate smoothly with client-side routing. It supports light/dark mode via Context + a custom hook, and uses shimmer loaders to keep the UI responsive during loading.",
    technologies: ["#HTML", "#CSS", "#React.js", "#React Router", "#Context API", "#Custom Hook", "#figma"],
    image: new URL('../assets/images/GlobSpot.png', import.meta.url).href,
    link: 'https://globspot.netlify.app/',
    alignment: "left"
  },
  {
    id: 3,
    title: "Quiz App",
    titleColor: "",
    subtitle: "(Timed Quiz)",
    subtitleColor: "",
    description: "Responsive, timed quiz with instant feedback, sound toggle, animated results, and high-score saved in localStorage.",
    technologies: ["#HTML", "#CSS", "#Javascript", "#LocalStorage", "#figma"],
    image: new URL('../assets/images/Quiz App.png', import.meta.url).href,
    link: 'https://quiz-app-22-flame.vercel.app/',
    alignment: "right"
  },
  {
    id: 4,
    title: "Expense Tracker",
    titleColor: "",
    subtitle: "(Smart Expense Tracker)",
    subtitleColor: "",
    description: "Track expenses by category, sort by title/amount, edit/delete via context menu, totals, and auto-save with localStorage.",
    technologies: ["#CSS", "#Javascript", "#Vite", "#LocalStorage"],
    image: new URL('../assets/images/Expense Tracker.png', import.meta.url).href,
    link: 'https://expense-tracker-webapp-22.netlify.app/',
    alignment: "left"
  },
  {
    id: 5,
    title: "Focus on Today",
    titleColor: "",
    subtitle: "(Today’s Progress)",
    subtitleColor: "",
    description: "A clean daily focus app to list tasks, mark them complete, and stay consistent with simple progress feedback.",
    technologies: ["#HTML", "#CSS", "#Javascript", "#LocalStorage"],
    image: new URL('../assets/images/Focus on Today.png', import.meta.url).href,
    link: 'https://focus-on-today-22.netlify.app/',
    alignment: "right"
  }
];