import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    scanLabel: "BEHAVIOR SCAN",
    category: "時間・タスク処理特性",
    text: "締め切りが設定されたタスク（任務）において、あなたの「脳内バッテリー」はどう消費されますか？",
    options: [
      {
        id: "A",
        label:
          "開始直後に120%出力でダッシュし、中盤でガス欠を起こして急速に失速する。",
        scores: { ego: 1, pace: 1 },
      },
      {
        id: "B",
        label:
          "ギリギリの極限状態（レッドゾーン）に突入するまで、一切のエネルギー消費を拒否する。",
        scores: { ego: 1, pace: -1 },
      },
      {
        id: "C",
        label:
          "計画通りに進めようとするが、想定外のノイズ（横槍）が入ると簡単にフリーズする。",
        scores: { ego: -1, pace: 1 },
      },
      {
        id: "D",
        label:
          "そもそも自分の興味がない領域なら、完全な「省エネモード（放置）」を貫く。",
        scores: { ego: -1, pace: -1 },
      },
    ],
  },
  {
    id: 2,
    scanLabel: "ENVIRONMENT SCAN",
    category: "他者・環境へのスタンス",
    text: "集団行動中、明らかに非効率なやり方で動いている人を目撃した際、あなたのシステムはどう反応しますか？",
    options: [
      {
        id: "A",
        label:
          "強いストレスを検知し、自分のやり方（最適解）を即座に上書きインストールしたくなる。",
        scores: { ego: 1, pace: 1 },
      },
      {
        id: "B",
        label:
          "自分の領域（テリトリー）に被害が及ばない限り、完全な無関心を貫く。",
        scores: { ego: -1, pace: -1 },
      },
      {
        id: "C",
        label:
          "直接は言わないが、脳内の「評価データベース」で相手を静かに減点し続ける。",
        scores: { ego: 1, pace: -1 },
      },
      {
        id: "D",
        label:
          "表面上は合わせつつ、自分が巻き込まれないための「退路」を光の速さで確保する。",
        scores: { ego: -1, pace: 1 },
      },
    ],
  },
  {
    id: 3,
    scanLabel: "MOTIVATION SCAN",
    category: "モチベーションのトリガー",
    text: "あなたの「やる気スイッチ」が、最も急激にオーバークロック（強制起動）する条件はどれですか？",
    options: [
      {
        id: "A",
        label:
          "自分の知的好奇心や「謎のこだわり」が100%満たされるマニアックな領域。",
        scores: { ego: 1, pace: 1 },
      },
      {
        id: "B",
        label:
          "他者からの称賛や、「人からどう見られるか（見栄）」というステータスが絡む領域。",
        scores: { ego: 1, pace: -1 },
      },
      {
        id: "C",
        label:
          "「これをやらないと社会的に終わる」という、逃げ場のない背水の陣（強制イベント）。",
        scores: { ego: -1, pace: 1 },
      },
      {
        id: "D",
        label:
          "一番労力がかからず、かつ最大のリターン（コスパ）を叩き出せる最短ルート。",
        scores: { ego: -1, pace: -1 },
      },
    ],
  },
  {
    id: 4,
    scanLabel: "DEFENSE SCAN",
    category: "エラー発生時の自己防衛特性",
    text: "重大なミスや遅刻など、予期せぬエラーが発生して怒られそうな時、あなたの「自己防衛システム」はどう作動しますか？",
    options: [
      {
        id: "A",
        label:
          "自分の非を100%は認めず、「環境が悪い」「あいつのせいだ」と論理的に責任を分散させる。",
        scores: { ego: 1, pace: 1 },
      },
      {
        id: "B",
        label:
          "思考を停止して即座に「すいません！」と土下座モードに入り、嵐が過ぎ去るのを待つ。",
        scores: { ego: -1, pace: 1 },
      },
      {
        id: "C",
        label:
          "「これも長期的に見れば必要な学びだった」と、独自の理論で都合よく意味をすり替える。",
        scores: { ego: 1, pace: -1 },
      },
      {
        id: "D",
        label:
          "追及から逃れるため、その瞬間に気配を極限まで消し去り、物理的・心理的にフェードアウトする。",
        scores: { ego: -1, pace: -1 },
      },
    ],
  },
];
