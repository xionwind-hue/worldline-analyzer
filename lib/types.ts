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

export type ResultContent = {
  id: string;
  worldlineId: string;
  worldlineName: "サッカー選手の世界線";
  baseTypeId:
    | "dominant-creator"
    | "procrastination-dictator"
    | "energy-saver"
    | "burnout-follower";
  variant: "A" | "B" | "C";
  registeredName: string;
  rank: string;
  positions: string[];
  valuationAmount: string;
  assessments: Array<{
    realTrait: string;
    translatedAbility: string;
    amount: string;
  }>;
  deduction: {
    reason: string;
    amount: string;
  };
  story: string;
  episodes: [string, string, string];
  handlingGuide: string[];
  stats: Array<{ label: string; value: number }>;
  skills: Array<{ name: string; description: string }>;
  finalSystemVerdict: string;
  scoutReportCopy: string;
  worldlineStoryCopy: string;
  visualKey: string;
};
