// ─── 从本地txt文件读取赛事数据和竞猜方案 ───
// 这些数据会通过文件监听服务在开发时自动热更新

export interface MatchOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  handicap?: { spread: string; home: number; draw: number; away: number };
}

export interface Match {
  id: number;
  code: string;
  time: string;
  home: string;
  away: string;
  odds: MatchOdds;
}

export interface BetPlan {
  title: string;
  type: "conservative" | "excited";
  items: { label: string; value: string }[];
  reason: string;
  suggestion: string;
  stake: number;
  expectedReturn: string;
}

export interface WorldCupData {
  matches: Match[];
  plans: BetPlan[];
  date: string;
}

// 默认空数据，实际会被 vite.config 或监听服务注入
let worldCupData: WorldCupData = {
  matches: [],
  plans: [],
  date: "6月16日",
};

export function getWorldCupData(): WorldCupData {
  return worldCupData;
}

export function updateWorldCupData(data: WorldCupData) {
  worldCupData = data;
}
