import type { DiagnosisResult, PersonalityType, ScoreDelta } from "./types";

const PERSONALITY_NAMES: Record<PersonalityType, string> = {
  "dominant-creator": "完全支配型の短期決戦クリエイター",
  "procrastination-dictator": "冷徹なる極限の先延ばし独裁者",
  "energy-saver": "不可侵領域を守る省エネ・マイペース",
  "burnout-follower": "周囲に過適応する燃え尽き型フォロワー",
};

export function accumulateScores(answers: ScoreDelta[]): { ego: number; pace: number } {
  return answers.reduce<{ ego: number; pace: number }>(
    (totals, answer) => ({
      ego: totals.ego + answer.ego,
      pace: totals.pace + answer.pace,
    }),
    { ego: 0, pace: 0 },
  );
}

export function resolvePersonalityType(ego: number, pace: number): PersonalityType {
  const egoPositive = ego >= 0;
  const pacePositive = pace >= 0;

  if (egoPositive && pacePositive) return "dominant-creator";
  if (egoPositive && !pacePositive) return "procrastination-dictator";
  if (!egoPositive && !pacePositive) return "energy-saver";
  return "burnout-follower";
}

export function calculateDiagnosisResult(answers: ScoreDelta[]): DiagnosisResult {
  const { ego, pace } = accumulateScores(answers);
  const personalityType = resolvePersonalityType(ego, pace);

  return {
    ego,
    pace,
    egoLabel: ego >= 0 ? "Ego+" : "Ego-",
    paceLabel: pace >= 0 ? "Pace+" : "Pace-",
    personalityType,
    personalityName: PERSONALITY_NAMES[personalityType],
  };
}
