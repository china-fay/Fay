import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface Song {
  singer: string;
  name: string;
  id: string;
  src: string;
}

const playlist: Song[] = [
  {
    singer: "周杰伦",
    name: "那天下雨了",
    id: "zjl",
    src: new URL("../singer/zjl/NaTianXiaYuLe.mp3", import.meta.url).href,
  },
  {
    singer: "郑润泽",
    name: "如果呢",
    id: "zrz",
    src: new URL("../singer/zrz/RuGuoNe.mp3", import.meta.url).href,
  },
  {
    singer: "李荣浩",
    name: "恋人",
    id: "lrh",
    src: new URL("../singer/lrh/lianren.mp3", import.meta.url).href,
  },
];

interface AudioContextValue {
  currentSongIndex: number;
  isPlaying: boolean;
  currentSong: Song;
  playlist: Song[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  playSong: (index: number) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audioRef.current = audio;
    audio.src = playlist[0].src;
    audio.load();

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };
    audio.addEventListener("ended", handleEnded);

    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      }).catch(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      });
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const shouldPlay = isPlayingRef.current;
    audio.src = playlist[currentSongIndex].src;
    audio.load();
    if (shouldPlay) {
      audio.play().then(() => { setIsPlaying(true); }).catch(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      });
    }
  }, [currentSongIndex]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    }).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) pause();
    else play();
  }, [play, pause]);

  const playNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    isPlayingRef.current = true;
  }, []);

  const playPrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    isPlayingRef.current = true;
  }, []);

  const playSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    isPlayingRef.current = true;
  }, []);

  return (
    <AudioCtx.Provider value={{ currentSongIndex, isPlaying, currentSong, playlist, play, pause, togglePlay, playNext, playPrev, playSong }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
}
