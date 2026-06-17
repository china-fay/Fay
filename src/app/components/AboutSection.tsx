import { useState, useEffect, useCallback } from "react";

/* ── Types ── */
interface Handicap {
  spread: string;
  home: number;
  draw: number;
  away: number;
}

interface MatchOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  handicap?: Handicap;
  scores?: string[];
  goals?: string[];
  halfFull?: string[];
}

interface Match {
  code: string;
  time: string;
  home: string;
  away: string;
  odds: MatchOdds;
}

interface Plan {
  title: string;
  type: "conservative" | "excited";
  header: string;
  picks: string[];
  typeLabel: string;
  stake: number;
  expectedReturn: string;
  netProfit: string;
  reasons: string[];
  conclusion: string;
}

interface PageData {
  matches: Match[];
  plans: Plan[];
  date: string;
  dateLabel: string;
}

/* ── Fallback data (embedded) ── */
const fallbackData: PageData = {
  matches: [
    {
      code: "周一013",
      time: "00:00",
      home: "西班牙",
      away: "佛得角",
      odds: {
        homeWin: 1.07,
        draw: 9.92,
        awayWin: 21.0,
        handicap: { spread: "-2", home: 1.71, draw: 4.25, away: 3.25 },
        scores: ["2-0(5.60)", "3-0(5.70)", "4-0(6.90)"],
        goals: ["3球(3.60)", "4球(4.30)"],
        halfFull: ["1.29"],
      },
    },
    {
      code: "周一014",
      time: "03:00",
      home: "比利时",
      away: "埃及",
      odds: {
        homeWin: 1.43,
        draw: 3.84,
        awayWin: 5.9,
        handicap: { spread: "-1", home: 2.56, draw: 3.2, away: 2.35 },
        scores: ["2-0", "2-1", "1-0"],
      },
    },
    {
      code: "周一015",
      time: "06:00",
      home: "沙特阿拉伯",
      away: "乌拉圭",
      odds: {
        homeWin: 7.65,
        draw: 4.25,
        awayWin: 1.31,
        handicap: { spread: "+1", home: 2.84, draw: 3.3, away: 2.11 },
      },
    },
    {
      code: "周一016",
      time: "09:00",
      home: "伊朗",
      away: "新西兰",
      odds: {
        homeWin: 1.85,
        draw: 1.9,
        awayWin: 3.5,
      },
    },
  ],
  plans: [
    {
      title: "稳妥型方案",
      type: "conservative",
      header: "🛡️",
      picks: [
        "周一013 西班牙 vs 佛得角：让球胜（-2），赔率 1.71",
        "周一014 比利时 vs 埃及：胜，赔率 1.43",
      ],
      typeLabel: "2串1",
      stake: 50,
      expectedReturn: "122.27",
      netProfit: "72.27",
      reasons: [
        "西班牙现世界第2，跨年度29场常规时间不败，近10场7胜3平。作为2024年欧洲杯冠军，本届头号夺冠热门。",
        "佛得角FIFA排名第67，首次参赛，全队总身价仅5200万欧元，与西班牙相差近24倍。",
        "竞彩开出西班牙让2球，让胜赔率1.71，机构认为至少赢3球。西班牙需争H组头名，有刷净胜球战意。",
        "比利时主教练加西亚上任后13场9胜4平不败，热身赛5:0大胜突尼斯、2:0力克克罗地亚。",
        "埃及虽有萨拉赫但状态下滑，球给萨拉赫战术难维持全场威胁。",
      ],
      conclusion: "两场比赛实力差距明显，西班牙和比利时取胜的核心逻辑链条清晰，追求最低风险下的稳定回报。",
    },
    {
      title: "刺激型方案",
      type: "excited",
      header: "⚡",
      picks: [
        "周一013 西班牙 vs 佛得角：让球胜（-2），赔率 1.71",
        "周一014 比利时 vs 埃及：让球胜（-1），赔率 2.56",
      ],
      typeLabel: "2串1",
      stake: 50,
      expectedReturn: "218.88",
      netProfit: "168.88",
      reasons: [
        "西班牙让球胜(-2)理由同稳妥方案，媒体预测比分集中在3-0、4-0、5-0，均超过让2球盘口，让胜概率高。",
        "比利时近14场各项赛事场均轰入3球以上，进攻火力有真实保障。历史上2018年曾3-0大胜埃及。",
        "比利时要争夺小组头名，首战需争取尽可能多的净胜球。埃及非洲杯后进入重建期，阵容稳定性存疑。",
        "足球媒体预测中已出现2-0、2-1等比分倾向。埃及近期的抵抗力有限。",
      ],
      conclusion: "在稳妥方案基础上升级用比利时让球胜搏更高回报，适合追求高赔率的玩家。",
    },
  ],
  date: "6月16日",
  dateLabel: "6月16日赛事 · 仅供参考 · 理性购彩",
};

/* ── Flag emoji map ── */
const flagMap: Record<string, string> = {
  西班牙: "🇪🇸",
  佛得角: "🇨🇻",
  比利时: "🇧🇪",
  埃及: "🇪🇬",
  沙特阿拉伯: "🇸🇦",
  乌拉圭: "🇺🇾",
  伊朗: "🇮🇷",
  新西兰: "🇳🇿",
};

function getFlag(name: string): string {
  return flagMap[name] || "🏳";
}

/* ── Odds Badge ── */
function OddsBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.55rem",
        padding: "2px 6px",
        background: color + "15",
        borderRadius: "4px",
        border: "1px solid " + color + "25",
        color: "#555",
      }}
    >
      <span style={{ color, fontWeight: 600 }}>{label}</span>
      {value}
    </span>
  );
}

/* ── Match Row ── */
function MatchRow({ m }: { m: Match }) {
  const o = m.odds;
  return (
    <div
      style={{
        padding: "10px 14px",
        borderBottom: "1px solid #eef2f7",
        transition: "background 200ms ease",
      }}
      className="match-row"
    >
      {/* Time + team names centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "calc(0.55rem + 0.15vw)",
            fontWeight: 600,
            color: "#1a5276",
            minWidth: "38px",
          }}
        >
          {m.time}
        </span>
        <span style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>{getFlag(m.home)}</span>
        <span className="team-chip">{m.home}</span>
        <span style={{ margin: "0 3px", color: "#ccc", fontSize: "calc(0.45rem + 0.1vw)" }}>vs</span>
        <span className="team-chip">{m.away}</span>
        <span style={{ fontSize: "calc(0.7rem + 0.2vw)" }}>{getFlag(m.away)}</span>
      </div>

      {/* Odds row */}
      <div
        className="odds-row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "3px 5px",
        }}
      >
        <OddsBadge label="主" value={o.homeWin.toFixed(2)} color="#1a5276" />
        <OddsBadge label="平" value={o.draw.toFixed(2)} color="#e67e22" />
        <OddsBadge label="客" value={o.awayWin.toFixed(2)} color="#c0392b" />
        {o.handicap && (
          <OddsBadge
            label={"让" + o.handicap.spread}
            value={
              o.handicap.home.toFixed(2) +
              "/" +
              o.handicap.draw.toFixed(2) +
              "/" +
              o.handicap.away.toFixed(2)
            }
            color="#8e44ad"
          />
        )}
        {o.scores?.map((s, i) => (
          <OddsBadge key={"s" + i} label="比分" value={s} color="#27ae60" />
        ))}
        {o.goals && (
          <OddsBadge label="进球" value={o.goals.join(" ")} color="#2c3e50" />
        )}
        {o.halfFull?.map((h, i) => (
          <OddsBadge key={"h" + i} label="半全场" value={h} color="#d35400" />
        ))}
      </div>
    </div>
  );
}

/* ── Meta Badge ── */
function MetaBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "2px 8px",
        background: "#e8eef5",
        borderRadius: "5px",
        fontSize: "0.6rem",
        color: "#555",
      }}
    >
      {text}
    </span>
  );
}

/* ── Bet Plan Card ── */
function BetPlanCard({ p }: { p: Plan }) {
  const isConservative = p.type === "conservative";
  const accent = isConservative ? "#2e7d32" : "#c62828";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "12px",
        border: "1px solid rgba(0,0,0,0.05)",
        padding: "12px 14px",
        marginBottom: "10px",
        transition: "all 200ms ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "8px",
        }}
      >
        <span>{p.header}</span>
        <span style={{ fontWeight: 600, fontSize: "0.8rem", color: accent }}>
          {p.title}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 6px",
          marginBottom: "6px",
        }}
      >
        {p.picks.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "3px 8px",
              background: "#f0f4f8",
              borderRadius: "6px",
              border: "1px solid #e0e4ea",
              fontSize: "0.62rem",
              color: "#444",
              fontFamily: "var(--font-mono)",
            }}
          >
            {r}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 8px",
          marginBottom: "6px",
        }}
      >
        <MetaBadge text={"类型 " + p.typeLabel} />
        <MetaBadge text={"本金 " + p.stake + "元"} />
        <span
          style={{
            padding: "2px 8px",
            background: "#e8eef5",
            borderRadius: "5px",
            fontSize: "0.6rem",
            color: "#E85050",
            fontWeight: 600,
          }}
        >
          回报 ≈{p.expectedReturn}元
        </span>
        <span
          style={{
            padding: "2px 8px",
            background: "#e8eef5",
            borderRadius: "5px",
            fontSize: "0.6rem",
            color: "#2e7d32",
            fontWeight: 600,
          }}
        >
          净收益 {p.netProfit}元
        </span>
      </div>

      <p
        style={{
          fontSize: "0.58rem",
          color: "#999",
          fontFamily: "var(--font-mono)",
          margin: "0 0 4px",
        }}
      >
        购买原因
      </p>
      {p.reasons.map((r, i) => (
        <p
          key={i}
          style={{
            fontSize: "0.64rem",
            color: "#555",
            lineHeight: 1.6,
            margin: "0 0 2px",
            paddingLeft: "8px",
          }}
        >
          · {r}
        </p>
      ))}

      <div
        style={{
          padding: "8px 10px",
          marginTop: "6px",
          background: isConservative
            ? "rgba(232,245,233,0.5)"
            : "rgba(255,235,238,0.5)",
          borderRadius: "8px",
          border:
            "1px solid " +
            (isConservative
              ? "rgba(76,175,80,0.15)"
              : "rgba(232,80,80,0.15)"),
        }}
      >
        <p
          style={{
            fontSize: "0.62rem",
            color: accent,
            fontFamily: "var(--font-mono)",
            margin: "0 0 3px",
          }}
        >
          分析结论
        </p>
        <p
          style={{
            fontSize: "0.64rem",
            color: "#555",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {p.conclusion}
        </p>
      </div>
    </div>
  );
}

/* ── Refresh Button ── */
function RefreshBtn({ onRefresh }: { onRefresh: () => void }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: "8px" }}>
      <button
        onClick={() => {
          onRefresh();
          setClicked(true);
          setTimeout(() => setClicked(false), 2000);
        }}
        style={{
          background: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(0,0,0,0.1)",
          color: "#666",
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          padding: "4px 14px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        {clicked ? "✓ 已刷新" : "↻ 刷新数据"}
      </button>
    </div>
  );
}

/* ── Main Component ── */
export function AboutSection() {
  const [data, setData] = useState<PageData | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/worldcup/data.json");
      if (res.ok) {
        const json = await res.json();
        if (json && json.matches && json.matches.length) {
          setData(json as PageData);
          return;
        }
      }
    } catch {
      // network error, use fallback
    }
    setData(fallbackData);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const d = data || fallbackData;

  return (
    <section
      id="about"
      style={{
        position: "relative",
        padding: "6rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Full background image - no overlay, direct */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/secondBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      <div
        className="about-grid"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: "2.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── Left: Match Schedule ── */}
        <div className="left-col" style={{ display: "flex" }}>
          <div
            className="glass-card"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.3)",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header bar */}
            <div
              style={{
                background: "linear-gradient(90deg, #1a5276, #2980b9)",
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                赛程 {d.date}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                2026 FIFA
              </span>
            </div>

            {/* Matches - flex evenly */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {d.matches.slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className="match-row"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "8px 14px",
                    borderBottom: i < 3 ? "1px solid #eef2f7" : "none",
                    transition: "background 200ms ease",
                  }}
                >
                  {/* Time + team names centered */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginBottom: "5px",
                    }}
                  >
                    <span className="match-time">{m.time}</span>
                    <span className="flag-icon">{getFlag(m.home)}</span>
                    <span className="team-chip">{m.home}</span>
                    <span className="vs-text">vs</span>
                    <span className="team-chip">{m.away}</span>
                    <span className="flag-icon">{getFlag(m.away)}</span>
                  </div>

                  {/* Odds row */}
                  <div
                    className="odds-row"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "3px 5px",
                    }}
                  >
                    <OddsBadge label="主" value={m.odds.homeWin.toFixed(2)} color="#1a5276" />
                    <OddsBadge label="平" value={m.odds.draw.toFixed(2)} color="#e67e22" />
                    <OddsBadge label="客" value={m.odds.awayWin.toFixed(2)} color="#c0392b" />
                    {m.odds.handicap && (
                      <OddsBadge
                        label={"让" + m.odds.handicap.spread}
                        value={
                          m.odds.handicap.home.toFixed(2) +
                          "/" +
                          m.odds.handicap.draw.toFixed(2) +
                          "/" +
                          m.odds.handicap.away.toFixed(2)
                        }
                        color="#8e44ad"
                      />
                    )}
                    {m.odds.scores?.map((s, j) => (
                      <OddsBadge key={"s" + j} label="比分" value={s} color="#27ae60" />
                    ))}
                    {m.odds.goals && (
                      <OddsBadge label="进球" value={m.odds.goals.join(" ")} color="#2c3e50" />
                    )}
                    {m.odds.halfFull?.map((h, j) => (
                      <OddsBadge key={"h" + j} label="半全场" value={h} color="#d35400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Betting Guide ── */}
        <div
          className="right-col"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "24px 20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tag */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1a5276",
                marginBottom: "0.3rem",
              }}
            >
              00 — 竞彩参考
            </p>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                color: "#1a1a2e",
                lineHeight: 1.15,
                marginBottom: "0.2rem",
              }}
            >
              明日竞猜参考模版
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "#888",
                marginBottom: "0.8rem",
              }}
            >
              6月16日赛事 · 仅供参考 · 理性购彩
            </p>

            {/* Plan cards */}
            <div style={{ flex: 1 }}>
              {d.plans &&
                d.plans.length > 0 &&
                d.plans.map((p, i) => <BetPlanCard key={i} p={p} />)}
            </div>

            {/* Refresh */}
            <RefreshBtn onRefresh={loadData} />

            {/* Risk disclaimer */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                color: "#aaa",
                textAlign: "center",
                marginTop: "10px",
                lineHeight: 1.6,
              }}
            >
              内容仅为个人分析，不构成投注建议，请理性购彩，量力而行
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .match-row:hover { background: #f0f8ff; }
        .match-row:last-child { border-bottom: none !important; }

        .team-chip {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(26,82,118,0.08);
          border: 1px solid rgba(26,82,118,0.15);
          font-weight: 600;
          color: #1a1a2e;
          font-size: calc(0.6rem + 0.2vw);
        }
        .match-time {
          font-family: var(--font-mono);
          font-size: calc(0.5rem + 0.2vw);
          font-weight: 600;
          color: #1a5276;
          min-width: 38px;
        }
        .flag-icon {
          font-size: calc(0.65rem + 0.25vw);
        }
        .vs-text {
          margin: 0 3px;
          color: #ccc;
          font-size: calc(0.4rem + 0.15vw);
        }
        .odds-row > * {
          font-size: calc(0.45rem + 0.12vw) !important;
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 640px) {
          .team-chip { font-size: calc(0.5rem + 0.3vw) !important; padding: 1px 5px; }
          .match-time { font-size: calc(0.45rem + 0.3vw) !important; }
        }
      `}</style>
    </section>
  );
}
