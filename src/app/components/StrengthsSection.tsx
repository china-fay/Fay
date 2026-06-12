const strengths = [
  {
    index: "01",
    title: "深度聆听",
    description: "经过训练的耳朵，能捕捉质感、张力与释放。在一张唱片传递情感之前，我首先听到的是它的结构。",
    domain: "音乐",
  },
  {
    index: "02",
    title: "第一性原理金融",
    description: "不看财经新闻，不关注社交媒体情绪。我从原始资料——资产负债表、财报会议记录和行业结构——构建金融模型。",
    domain: "金融",
  },
  {
    index: "03",
    title: "慢阅读",
    description: "批注重于速度。一次只读一本书，手边总有一支铅笔，不写下真实的感受绝不翻到下一本。",
    domain: "书籍",
  },
  {
    index: "04",
    title: "系统思维",
    description: "无论是一个音乐流派、一个投资组合还是一份书目——我构建框架，揭示隐藏的结构和二阶效应。",
    domain: "跨领域",
  },
  {
    index: "05",
    title: "逆向耐心",
    description: "我在市场、品味和观点上都持有头寸——比舒适区更久。大多数美好的事物都回报等待。",
    domain: "哲学",
  },
  {
    index: "06",
    title: "技术工艺",
    description: "训练有素的软件工程师。当需要时我会亲手打造工具。代码中的精准渗透到文字中。",
    domain: "工程",
  },
];

export function StrengthsSection() {
  return (
    <section
      id="strengths"
      style={{
        background: "#f5f5f5",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-accent-deep)",
              marginBottom: "0.75rem",
            }}
          >
            02 – 擅长领域
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            我带来的价值。
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: "1px solid #e0e0e0",
          }}
          className="strengths-grid"
        >
          {strengths.map((s, i) => (
            <div
              key={s.index}
              style={{
                padding: "2.5rem",
                borderRight: i % 3 !== 2 ? "1px solid #e0e0e0" : "none",
                borderBottom: i < 3 ? "1px solid #e0e0e0" : "none",
                transition: "background 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "var(--color-accent-light)",
                  }}
                >
                  {s.index}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff", background: "var(--color-accent-deep)", border: "none", padding: "0.2rem 0.5rem",
                  }}
                >
                  {s.domain}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.375rem",
                  color: "#0a0a0a",
                  lineHeight: 1.2,
                  marginBottom: "0.875rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "#5a5a5a",
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



