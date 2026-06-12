import { useState } from "react";
import { useAudio } from "../AudioContext";
import { Play, Pause } from "lucide-react";

/* ── Singer metadata ── */
interface SingerInfo {
  id: string;
  name: string;
  bio: string;
}

const singers: SingerInfo[] = [
  {
    id: "zjl",
    name: "周杰伦",
    bio: '华语乐坛传奇音乐人，被誉为"亚洲流行天王"。以独特的R&B、嘻哈和中国风融合风格影响了一代人。',
  },
  {
    id: "zrz",
    name: "郑润泽",
    bio: "中国内地新生代创作型歌手，以深情细腻的嗓音和贴近生活的创作风格受到年轻听众喜爱。",
  },
  {
    id: "lrh",
    name: "李荣浩",
    bio: "中国内地全能型唱作人，以其独特的慵懒唱腔和精良的制作水准在华语乐坛独树一帜。",
  },
];

/* ── Original content data ── */
const musicPosts = [
  { id: 1, title: "ECM 唱片如何改变了我的沉默观", date: "May 2025", tag: "深度解析", excerpt: "这家挪威厂牌对声学的执着，揭示了我从未理解过的负空间——在音乐中，也在市场中。" },
  { id: 2, title: "聆听系统：消失在音乐中的设备", date: "Mar 2025", tag: "设备", excerpt: "三年、六台唱盘机，以及关于摩擦与存在感之间关系的一次顿悟。" },
  { id: 3, title: "迈尔斯·戴维斯 1958 年新港音乐节：表演分析", date: "Jan 2025", tag: "分析", excerpt: "四十分钟重新定义了何谓不支配的引领。每位伴奏乐手都有呼吸的空间。" },
];
const financePosts = [
  { id: 1, title: "无人提及的安静资本配置者", date: "Jun 2025", tag: "长文", excerpt: "Five operators running businesses in the $200M-$2B range with returns that would embarrass most PE firms." },
  { id: 2, title: "将脚注作为主要研究方法", date: "Apr 2025", tag: "方法", excerpt: "管理层讨论与分析是表演，脚注才是忏悔。" },
  { id: 3, title: "2025 年度信：我停止对冲的那一年", date: "Jan 2025", tag: "年度", excerpt: "我持有 60% 的现金长达三年，等待从未到来的确定性。" },
];
const booksPosts = [
  { id: 1, title: "重读：为什么有些书需要第二次生命", date: "May 2025", tag: "随笔", excerpt: "你在 22 岁和 35 岁读到的同一本书，并不是同一本书。" },
  { id: 2, title: "亚伯拉罕·约书亚·赫舍尔《安息日》批注笔记", date: "Mar 2025", tag: "笔记", excerpt: "一本 100 页的书，我花了三个月才读完，因为我总是不停地停下来思考。" },
  { id: 3, title: "2025 Reading List: What Survived and What Didn't", date: "Dec 2024", tag: "清单", excerpt: "我开始了 41 本书，读完了 28 本，毫无愧疚地放弃了 13 本。" },
];

type Tab = "music" | "finance" | "books";
const tabConfig: { id: Tab; label: string; posts: typeof musicPosts; image: string }[] = [
  { id: "music", label: "音乐", posts: musicPosts, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop&auto=format" },
  { id: "finance", label: "金融", posts: financePosts, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&auto=format" },
  { id: "books", label: "书籍", posts: booksPosts, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop&auto=format" },
];

function PostRow({ post }: { post: (typeof musicPosts)[0] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: "2rem", alignItems: "start", padding: "1.75rem 0", borderBottom: "1px solid #e8e8e8", cursor: "pointer", transition: "padding-left 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "0.5rem")}
      onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-light)", marginBottom: "0.25rem" }}>{post.tag}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#6b6b6b" }}>{post.date}</p>
      </div>
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", color: "#0a0a0a", lineHeight: 1.25, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{post.title}</h4>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#6b6b6b", lineHeight: 1.55, fontWeight: 300 }}>{post.excerpt}</p>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-accent-deep)", paddingTop: "0.125rem", flexShrink: 0 }}>→</span>
    </div>
  );
}

function SingerCard({ singer, onClick }: { singer: SingerInfo; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fafafa",
        border: "1px solid #e8e8e8",
        borderRadius: "8px",
        padding: "2rem 1.5rem",
        cursor: "pointer",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#d0d0d0";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e8e8e8";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          color: "#ffffff",
        }}
      >
        {singer.name.charAt(0)}
      </div>
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          color: "#0a0a0a",
          marginBottom: "0.5rem",
          lineHeight: 1.2,
        }}
      >
        {singer.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "#6b6b6b",
          lineHeight: 1.55,
          fontWeight: 300,
        }}
      >
        {singer.bio}
      </p>
    </div>
  );
}

interface Song {
  name: string;
  singer: string;
  src: string;
  lrc?: string;
}

const songList: Song[] = [
  { name: "那天下雨", singer: "周杰伦", src: "/src/singer/zjl/NaTianXiaYuLe.mp3" },
  { name: "如果呢", singer: "郑润泽", src: "/src/singer/zrz/RuGuoNe.mp3", lrc: "/src/singer/zrz/RuGuoNe.lrc" },
  { name: "恋人", singer: "李荣浩", src: "/src/singer/lrh/lianren.mp3" },
];

function SingerDetailView({ singer, onBack }: { singer: SingerInfo; onBack: () => void }) {
  const { currentSong, isPlaying, togglePlay, playSong } = useAudio();
  const filteredSongs = songList.filter((s) => s.singer === singer.name);

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b6b6b",
          background: "none",
          border: "1px solid #e8e8e8",
          cursor: "pointer",
          padding: "0.5rem 1rem",
          marginBottom: "1.5rem",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#b0b0b0";
          e.currentTarget.style.color = "#0a0a0a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e8e8e8";
          e.currentTarget.style.color = "#6b6b6b";
        }}
      >
        ← 返回
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          {singer.name.charAt(0)}
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              color: "#0a0a0a",
              lineHeight: 1.2,
              marginBottom: "0.25rem",
            }}
          >
            {singer.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "#6b6b6b",
              fontWeight: 300,
            }}
          >
            {singer.bio}
          </p>
        </div>
      </div>

      <div>
        {filteredSongs.map((song, index) => {
          const isCurrent = currentSong.name === song.name && currentSong.singer === song.singer;
          return (
            <div
              key={song.name}
              onClick={() => playSong(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 0.75rem",
                borderBottom: "1px solid #e8e8e8",
                cursor: "pointer",
                transition: "background 0.2s",
                background: isCurrent ? "rgba(58,125,126,0.08)" : "transparent",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                if (!isCurrent) e.currentTarget.style.background = "#fafafa";
              }}
              onMouseLeave={(e) => {
                if (!isCurrent) e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: isCurrent ? "#0a0a0a" : "#e8e8e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                {isCurrent && isPlaying ? (
                  <Pause size={16} color="#ffffff" />
                ) : (
                  <Play size={16} color={isCurrent ? "#ffffff" : "#6b6b6b"} style={{ marginLeft: "2px" }} />
                )}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    color: isCurrent ? "#0a0a0a" : "#333",
                    margin: 0,
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {song.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "#b0b0b0",
                    margin: "2px 0 0 0",
                  }}
                >
                  {song.singer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ContentSections() {
  const [active, setActive] = useState<Tab>("music");
  const [musicView, setMusicView] = useState<"list" | "zjl" | "zrz" | "lrh">("list");
  const current = tabConfig.find((t) => t.id === active)!;

  const musicPanel = () => {
    if (active !== "music") {
      return (
        <div>
          {current.posts.map((post) => (<PostRow key={post.id} post={post} />))}
        </div>
      );
    }
    if (musicView === "list") {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
          {singers.map((s) => (
            <SingerCard key={s.id} singer={s} onClick={() => setMusicView(s.id as "zjl" | "zrz" | "lrh")} />
          ))}
        </div>
      );
    }
    const singer = singers.find((s) => s.id === musicView)!;
    return <SingerDetailView singer={singer} onBack={() => setMusicView("list")} />;
  };

  const sidebarDescription = () => {
    if (active === "music" && musicView !== "list") {
      const singer = singers.find((s) => s.id === musicView)!;
      return `${singer.name} 的歌曲列表`;
    }
    if (active === "music") return "点击歌手卡片进入歌曲列表，控制全局播放。";
    if (active === "finance") return "原始资料驱动的投资。写给未来自己的长文分析。";
    return "我读过、批注过、思考过的一切。真实的书籍，真实的观点。";
  };

  return (
    <section id="music" style={{ background: "#ffffff", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-deep)", marginBottom: "3rem" }}>03 — Writing</p>

        <div style={{ display: "flex", gap: "0", marginBottom: "4rem", borderBottom: "1px solid #e8e8e8" }}>
          {tabConfig.map((tab) => (
            <button key={tab.id} id={tab.id} onClick={() => { setActive(tab.id); if (tab.id !== "music") setMusicView("list"); }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: active === tab.id ? "var(--color-accent-deep)" : "#b0b0b0", background: "none", border: "none", borderBottom: active === tab.id ? "2px solid var(--color-accent-deep)" : "2px solid transparent", cursor: "pointer", padding: "1rem 2rem", transition: "all 0.2s", marginBottom: "-1px" }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "5rem", alignItems: "start" }} className="content-grid">
          {musicPanel()}

          <div style={{ position: "sticky", top: "80px" }}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden", marginBottom: "1.5rem" }}>
              <img src={current.image} alt={current.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(70%) sepia(12%) contrast(1.05)" }} />
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-light)", marginBottom: "0.5rem" }}>
              {active === "music" && musicView !== "list" ? "当前播放" : `${current.posts.length} 篇 · ${current.label}`}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#5a5a5a", lineHeight: 1.6, fontWeight: 300 }}>
              {sidebarDescription()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
