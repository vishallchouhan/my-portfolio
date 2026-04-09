import { useEffect, useMemo, useRef, useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";


// ✅ MOBILE DETECTION HOOK (FIXED)
const useIsMobile = () => {
  const query = "(max-width: 768px)";

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);

    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
};


export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  // ✅ PROJECT DATA
  const projects = useMemo(
    () => [
      {
        title: "nk studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  // ✅ SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  // ✅ OPTIMIZED THRESHOLDS
  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? projects.length - 1 : idx);
  });

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        background: activeProject?.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">

        {/* TITLE */}
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          My Work
        </h2>

        {/* PROJECT CONTAINER */}
        <div className="relative w-full flex-1 flex items-center justify-center">

          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20 scale-100"
                  : "opacity-0 z-0 sm:z-10 scale-75"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >

              {/* TITLE ANIMATION */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-3xl font-semibold mb-4"
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              {/* IMAGE */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative w-full overflow-hidden rounded-xl shadow-2xl h-[62vh] hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}