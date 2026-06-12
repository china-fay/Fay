import { useState, useEffect, useRef } from "react";
import { Disc3, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { useAudio } from "../AudioContext";

const navLinks = [
  { label: "音乐", href: "#music" },
  { label: "金融", href: "#finance" },
  { label: "书籍", href: "#books" },
  { label: "项目", href: "#projects" },
  { label: "关于", href: "#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelState, setPanelState] = useState<"hidden" | "visible" | "fading">("hidden");
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isPlaying, togglePlay, playNext, playPrev } = useAudio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const clearHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handlePlayerEnter = () => {
    clearHideTimer();
    setPanelState("visible");
  };

  const handlePlayerLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      // Start 1s fade-out
      setPanelState("fading");
      // After fade-out completes, fully unmount
      hideTimeoutRef.current = setTimeout(() => {
        setPanelState("hidden");
        hideTimeoutRef.current = null;
      }, 1000);
    }, 300);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        fontFamily: "var(--font-body)",
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark + vinyl icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => scrollTo("#hero")}
            style={{
              fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#FFB347",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.02em",
              padding: 0,
            }}
          >
            Fay
          </button>

          {/* Music player with hover controls */}
          <div
            style={{ position: "relative", display: "flex" }}
            onMouseEnter={handlePlayerEnter}
            onMouseLeave={handlePlayerLeave}
          >
            <button
              onClick={togglePlay}
              onDoubleClick={playNext}
              title={isPlaying ? "暂停" : "播放"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                color: scrolled ? "#0a0a0a" : "#ffffff",
                opacity: 0.85,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              <Disc3
                size={24}
                style={{
                  animation: isPlaying ? "spin 4s linear infinite" : "none",
                }}
              />
            </button>

            {panelState !== "hidden" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "10px",
                  background: "rgba(10,10,10,0.88)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "12px",
                  padding: "6px 4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                  zIndex: 200,
                  border: "1px solid rgba(255,255,255,0.12)",
                  opacity: panelState === "fading" ? 0 : 1,
                  transition: "opacity 1s ease",
                  pointerEvents: panelState === "fading" ? "none" : "auto",
                }}
              >
                <button
                  onClick={playPrev}
                  title="上一首"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={togglePlay}
                  title={isPlaying ? "暂停" : "播放"}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.22)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={playNext}
                  title="下一首"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <SkipForward size={18} />
                </button>
              </div>
            )}
          </div>

          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: scrolled ? "#6b6b6b" : "rgba(255,248,240,0.55)", transition: "color 0.3s", marginLeft: "12px" }}>个人日志 · 始于 2026</span>
        </div>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: scrolled ? "#0a0a0a" : "rgba(255,255,255,0.85)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s, opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </button>
          ))}

          {/* 联系 CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: scrolled ? "#ffffff" : "#0a0a0a", background: scrolled ? "#FFB347" : "#ffffff",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1.25rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.75";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            联系
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: scrolled ? "#0a0a0a" : "#ffffff",
                transition: "transform 0.2s",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#0a0a0a",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {[...navLinks, { label: "联系", href: "#contact" }].map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#ffffff",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
