const stats = [
  { value: "247", label: "专辑收藏" },
  { value: "89", label: "书籍批注" },
  { value: "12", label: "投资研究" },
  { value: "5yr", label: "持续写作" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#ffffff",
        padding: "7rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left 鈥?illustration + contact */}
        <div>
          {/* Profile illustration */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              background: "#0a0a0a",
              position: "relative",
              overflow: "hidden",
              marginBottom: "2rem",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&auto=format"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(70%) sepia(12%) contrast(1.05)",
                opacity: 0.85,
              }}
            />
            {/* Overlay label */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.5rem",
                background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                常驻北京
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              borderTop: "1px solid var(--color-accent-light)",
              paddingTop: "1.5rem",
            }}
          >
            {[
              { label: "电话", value: "13370123063" },
              { label: "微信", value: "Fay13370123063" },
              { label: "邮箱", value: "fay@example.com" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6b6b6b",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "#0a0a0a",
                    fontWeight: 400,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 鈥?intro + stats */}
        <div style={{ paddingTop: "1rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-accent-deep)",
              marginBottom: "1.5rem",
            }}
          >
            00 鈥?关于
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            手艺、资本与文化的交汇处。
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "#3a3a3a",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              我是 Fay——白天是软件工程师，夜晚是狂热的聆听者、阅读者和思考者。这本日志就是这些世界的交汇点：那张改变我对风险认知的专辑，那本重塑我与金钱关系的书，那个在一次深夜聆听中诞生的市场观点。
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "#3a3a3a",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              这里的一切都来自用心的积累。没有自动生成的内容。所有观点仅代表个人，且时常更新。
            </p>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              borderTop: "1px solid var(--color-accent-light)",
              borderLeft: "1px solid var(--color-accent-light)",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "1.75rem",
                  borderBottom: "1px solid var(--color-accent-light)",
                  borderRight: "1px solid var(--color-accent-light)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-accent-deep)",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b6b6b",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}







