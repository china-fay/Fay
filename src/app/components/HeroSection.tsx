import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // 检测用户是否偏好减少动画
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        padding: "0 2rem",
      }}
    >
      {/* 背景图片 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/src/img/HeroSectionBackGround.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          opacity: 0.8,
        }}
      />
      
      {/* 暗色叠加层 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.9))",
          zIndex: 1,
        }}
      />

      {/* 内容容器 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* 主标题区域 */}
        <div
          style={{
            marginTop: "0",
            paddingBottom: "8rem",
          }}
        >


          {/* 蜜桃色分割线 - 从中间向两端拉伸 */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, #FFB347 20%, #FFB347 80%, transparent)",
              marginBottom: "2.5rem",
              opacity: 0,
              transform: "scaleX(0)",
              transformOrigin: "center",
              animation: !isReducedMotion ? "stretchLine 0.8s ease 0.6s forwards" : "none",
            }}
          />

          {/* 超大优雅粗衬线标题 */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: "0 0 3rem",
              transform: `translateY(${scrolled ? Math.min(window.scrollY * 0.05, 10) : 0}px)`,
              transition: !isReducedMotion ? "transform 0.1s ease-out" : "none",
            }}
          >
            {/* 第一行 - 奶白色逐字淡入 */}
            <span
              style={{
                display: "block",
                color: "#FFF8F0", // 奶白色
                opacity: 0,
                animation: !isReducedMotion ? "fadeInUp 0.8s ease 0.8s forwards" : "none",
              }}
            >
              关于音乐、金钱
            </span>
            
            {/* 第二行 - 横向柔杏粉到奶白流动渐变 */}
            <span
              style={{
                display: "block",
                background: !isReducedMotion 
                  ? "linear-gradient(90deg, #FFB6C1, #FFF8F0, #FFB6C1)" // 杏粉 → 奶白 → 杏粉
                  : "#FFF8F0",
                backgroundSize: !isReducedMotion ? "200% 100%" : "100% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                opacity: 0,
                animation: !isReducedMotion 
                  ? "fadeInUp 0.8s ease 1s forwards, gradientFlow 12s linear infinite 1.8s" 
                  : "fadeInUp 0.8s ease 1s forwards",
              }}
            >
              与书籍的随想。
            </span>
          </h1>

          {/* 副标题 */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "rgba(255, 248, 240, 0.7)", // 半透明奶白色
              lineHeight: 1.7,
              maxWidth: "480px",
              fontWeight: 300,
              opacity: 0,
              animation: !isReducedMotion ? "fadeInUp 0.8s ease 1.2s forwards" : "none",
              marginBottom: "4rem",
            }}
          >
            一份精心记录的思考集——在黑胶唱片、电子表格和折角的书页之间游走的心灵絮语。
          </p>

          {/* 右下角按钮组 */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              opacity: 0,
              animation: !isReducedMotion ? "fadeInUp 0.8s ease 1.4s forwards" : "none",
            }}
          >
            {/* 蜜桃橙实底探索按钮 */}
            <button
              onClick={() => {
                const el = document.querySelector("#about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#1A1A1A", // 深色文字
                background: "#FFB347", // 蜜桃橙实底
                border: "none",
                cursor: "pointer",
                padding: "0.9rem 2.5rem",
                borderRadius: "25px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 179, 71, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              探索
              {/* 悬浮光影效果 */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
            </button>

            {/* 蜜桃橙细描边联系按钮 */}
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#FFB347",
                background: "none",
                border: "1px solid #FFB347",
                cursor: "pointer",
                padding: "0.9rem 2.5rem",
                borderRadius: "25px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 179, 71, 0.15)";
                e.currentTarget.style.background = "rgba(255, 179, 71, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "none";
              }}
            >
              联系
            </button>
          </div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0,
          animation: !isReducedMotion ? "fadeIn 1s ease 2s forwards" : "none",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, #FFB347, transparent)",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255, 179, 71, 0.5)",
          }}
        >
          滚动
        </p>
      </div>

      {/* 动画定义 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes stretchLine {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes gradientFlow {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        /* 如果用户偏好减少动画，关闭循环动画 */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}


