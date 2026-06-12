const projects = [
  {
    id: 1,
    title: "黑胶收藏",
    subtitle: "收藏 · 2019 至今",
    description: "247 张唱片的完整目录，包含唱片内页注释、压片细节以及每张唱片的收藏故事。",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&h=600&fit=crop&auto=format",
    tag: "音乐",
    year: "2019",
  },
  {
    id: 2,
    title: "2025 投资报告",
    subtitle: "金融 · 年度",
    description: "我的年度投资信——写给未来的自己。行业配置、逆向押注以及去年失误的教训。",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=600&fit=crop&auto=format",
    tag: "金融",
    year: "2025",
  },
  {
    id: 3,
    title: "批注图书馆",
    subtitle: "书籍 · 89 卷",
    description: "89 本书的批注扫描与转录。一个可视化的第二大脑。",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=600&fit=crop&auto=format",
    tag: "书籍",
    year: "2021",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        background: "#0a0a0a",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent-light)",
                marginBottom: "0.75rem",
              }}
            >
              01 – 精选项目
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              长期深耕。
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "320px",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            那些耗时一年以上的项目——有些仍在进行中。
          </p>
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              className="project-card"
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Image 鈥?alternating sides */}
              {i % 2 !== 0 && (
                <div
                  style={{
                    aspectRatio: "16/10",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(70%) sepia(12%) contrast(1.05)",
                      transition: "transform 0.6s ease, filter 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.filter = "grayscale(80%) contrast(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "grayscale(100%) contrast(1.05)";
                    }}
                  />
                </div>
              )}

              {/* Text */}
              <div
                style={{
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#ffffff", background: "var(--color-accent-deep)", border: "none", padding: "0.25rem 0.6rem",
                      }}
                    >
                      {project.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(255,255,255,0.25)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      maxWidth: "400px",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                      transition: "color 0.2s",
                    }}
                  >
                    查看项目 →                  </span>
                </div>
              </div>

              {/* Image 鈥?even index, right side */}
              {i % 2 === 0 && (
                <div
                  style={{
                    aspectRatio: "16/10",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(70%) sepia(12%) contrast(1.05)",
                      transition: "transform 0.6s ease, filter 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.filter = "grayscale(80%) contrast(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "grayscale(100%) contrast(1.05)";
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





