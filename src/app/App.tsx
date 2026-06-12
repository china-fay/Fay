import "../styles/fonts.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { AudioProvider } from "./AudioContext";
import { Nav } from "./components/Nav";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { StrengthsSection } from "./components/StrengthsSection";
import { ContentSections } from "./components/ContentSections";
import { FooterSection } from "./components/FooterSection";

export default function App() {
  return (
    <AudioProvider>
      <TooltipProvider delayDuration={300}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            background: "#ffffff",
            color: "#0a0a0a",
            overflowX: "hidden",
          }}
        >
          <style>{`
            :root {
              --color-accent-deep: #FFB347;
              --color-accent-light: #FFD1A0;
              --color-accent-dark: #FF8C00;
            }
            * { scrollbar-width: none; }
            *::-webkit-scrollbar { display: none; }

            @media (max-width: 1024px) {
              .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
              .strengths-grid { grid-template-columns: 1fr 1fr !important; }
              .content-grid { grid-template-columns: 1fr !important; }
              .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
              .project-card { grid-template-columns: 1fr !important; }
            }

            @media (max-width: 640px) {
              .strengths-grid { grid-template-columns: 1fr !important; }
              .hidden-mobile { display: none !important; }
              .show-mobile { display: flex !important; }
            }

            input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          <Nav />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <StrengthsSection />
          <ContentSections />
          <FooterSection />
        </div>
      </TooltipProvider>
    </AudioProvider>
  );
}

