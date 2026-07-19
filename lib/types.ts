export type ScoreAxis = "ego" | "pace";

export type ScoreDelta = {
  ego: -1 | 0 | 1;
  pace: -1 | 0 | 1;
};

export type QuestionOption = {
  id: "A" | "B" | "C" | "D";
  label: string;
  scores: ScoreDelta;
};

export type Question = {
  id: number;
  scanLabel: string;
  category: string;
  text: string;
  options: QuestionOption[];
};

export type PersonalityType =
  | "dominant-creator"
  | "procrastination-dictator"
  | "energy-saver"
  | "burnout-follower";

export type DiagnosisResult = {
  ego: number;
  pace: number;
  egoLabel: "Ego+" | "Ego-";
  paceLabel: "Pace+" | "Pace-";
  personalityType: PersonalityType;
  personalityName: string;
};

export type DiagnosisPhase = "top" | "questions" | "transfer" | "result";
