import { useState } from "react";

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "7rem 2rem 3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
            marginBottom: "5rem",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
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
              04 鈥?Get in Touch
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#ffffff",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "2rem",
              }}
            >
              Let's talk<br />
              about<br />
              <em style={{ fontStyle: "italic", color: "var(--color-accent-light)" }}>任何话题。</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: "380px",
                marginBottom: "3rem",
              }}
            >
              我对好对话真心感兴趣——关于唱片、风险、阅读，或者你脑海中的任何话题。不需要推销演示。
            </p>

            {/* Links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                { label: "电话", value: "13370123063" },
                { label: "微信", value: "Fay13370123063" },
                { label: "邮箱", value: "fay@example.com" },
              ].map((link) => (
                <div
                  key={link.label}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    paddingBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      minWidth: "70px",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 300,
                    }}
                  >
                    {link.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 鈥?contact form */}
          <div>
            {sent ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  minHeight: "400px",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  已发送。我会在<br />准备好后回复。
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                  }}
                >
                  通常在 48 小时内。
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    你的邮箱
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ni@example.com"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      padding: "0.875rem 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "#ffffff",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    留言
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    placeholder="What's on your mind?"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      padding: "0.875rem 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "#ffffff",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff", background: "var(--color-accent-deep)",
                    border: "none",
                    cursor: "pointer",
                    padding: "1rem 2.5rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-dark)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent-deep)" }}
                >
                  发送留言
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              color: "var(--color-accent-deep)",
              letterSpacing: "0.02em",
            }}
          >
            A.K.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}
          >
            © 2025 Fay · 所有观点仅代表个人
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}
          >
            音乐 · 金融 · 书籍
          </p>
        </div>
      </div>
    </section>
  );
}






