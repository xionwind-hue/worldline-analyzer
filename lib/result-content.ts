import type { ResultContent } from "@/lib/types";

type BaseTypeId = ResultContent["baseTypeId"];
type VariantId = ResultContent["variant"];

type EpisodeEntry = {
  heading: string;
  body: string;
};

type BaseTypeContent = {
  baseTypeId: BaseTypeId;
  positions: string[];
  assessments: ResultContent["assessments"];
  storyRest: string;
  episodeOne: EpisodeEntry;
  episodeTwo: EpisodeEntry;
  handlingGuideCommon: [string, string, string];
  stats: ResultContent["stats"];
  skills: ResultContent["skills"];
  finalSystemVerdict: string;
  scoutReportCopy: string;
  worldlineStoryCopy: string;
  visualKey: string;
};

type VariantContent = {
  variant: VariantId;
  worldlineId: string;
  registeredName: string;
  rank: string;
  valuationAmount: string;
  deductionReason: string;
  deductionAmount: string;
  storyOpening: string;
  replacementEpisodeBody: string;
  replacementHandlingGuide: string;
};

const WORLDLINE_NAME = "サッカー選手の世界線" as const;

function formatEpisode(entry: EpisodeEntry): string {
  return `${entry.heading}\n${entry.body}`;
}

const BASE_TYPE_CONTENTS: Record<BaseTypeId, BaseTypeContent> = {
  "dominant-creator": {
    baseTypeId: "dominant-creator",
    positions: ["AMF", "False 9"],
    assessments: [
      {
        realTrait: "考えるより先に始め、いつの間にか主導権を握っている",
        translatedAbility:
          "キックオフ7秒で相手の配置を自分の試合へ変える「開幕主導権」",
        amount: "＋1億1,500万ユーロ",
      },
      {
        realTrait: "細かい指示を待てず、その場で完成形を作ってしまう",
        translatedAbility:
          "監督の戦術説明を3タッチで実戦仕様へ上書きする「即興戦術編集」",
        amount: "＋7,900万ユーロ",
      },
      {
        realTrait: "会議や相談が長引くほど、自分で結論を出したくなる",
        translatedAbility:
          "迷っている味方11人分の決断を一人で済ませる「全権決裁」",
        amount: "＋2,400万ユーロ",
      },
    ],
    storyRest:
      "監督が戦術ボードの二本目の矢印を描いている頃には、あなたはすでにピッチ上で完成版を運用しています。現実で時々「ちょっと待って」と言われるその速さは、ここでは全員が迷っている数秒間を強制的にチャンスへ変える才能です。なお本人は独断の自覚がなく、「空いていたので使いました」とだけ報告します。",
    episodeOne: {
      heading: "戦術会議の先行終了",
      body: "監督が「ここからが重要だ」と振り返った時、あなたの席だけが空でした。三分後、練習場では新戦術がすでに成功しており、説明を受けていない選手たちまでなぜか配置済みでした。",
    },
    episodeTwo: {
      heading: "VARより早い自己判定",
      body: "微妙なゴールが決まった瞬間、審判より先にセンターサークルへ戻り、再開用のボールまで用意。VAR室は映像確認より先に、あなたをいったん落ち着かせる作業へ入りました。",
    },
    handlingGuideCommon: [
      "試合開始時刻より約3分早く電源が入ります。故障ではありません。",
      "「一度持ち帰って検討します」は、本人には「今すぐ自分で決めてよい」と聞こえます。",
      "裁量を渡すと得点へ向かいます。細かく管理すると、管理方法そのものを改善し始めます。",
    ],
    stats: [
      { label: "初動", value: 99 },
      { label: "決断力", value: 97 },
      { label: "局面創造", value: 96 },
      { label: "主導権", value: 100 },
      { label: "指示待機耐性", value: 8 },
      { label: "反省会の短さ", value: 94 },
    ],
    skills: [
      {
        name: "KICKOFF HIJACK",
        description:
          "試合開始直後、まだ誰のものでもない空気を自分の攻撃へ変更する。",
      },
      {
        name: "TACTICS OVERWRITE",
        description:
          "既存戦術の読み込みを待たず、その場で動く最新版へ上書きする。",
      },
    ],
    finalSystemVerdict:
      "現実で少し早すぎたその一歩は、この世界では、試合そのものを始める才能として登録されています。",
    scoutReportCopy:
      "判断を待たない。笛すら、たまに待たない。\n開幕から試合の所有権を回収する全権型プレーメーカー。",
    worldlineStoryCopy:
      "監督が二本目の矢印を描く頃、あなたは完成版の戦術ですでに先制している。誰も頼んでいないのに、全員が迷っていた数秒だけは、たしかにあなたが救っている。",
    visualKey: "football-commanding-kickoff",
  },
  "procrastination-dictator": {
    baseTypeId: "procrastination-dictator",
    positions: ["CMF", "Deep-Lying Playmaker"],
    assessments: [
      {
        realTrait: "データを分析し、頭の中で何度もシミュレーションする",
        translatedAbility:
          "89分間、全選手の動きを計算し続ける「動かざる演算能力」",
        amount: "＋1億ユーロ",
      },
      {
        realTrait: "他人の非効率な動きへ静かに絶望する",
        translatedAbility:
          "味方の凡ミスで天を仰ぎ、観客まで黙らせる「絶望の芸術点」",
        amount: "＋4,800万ユーロ",
      },
      {
        realTrait: "納得できる答えが出るまで、一歩目を保留する",
        translatedAbility: "相手に意図を最後まで読ませない「未決定フェイント」",
        amount: "＋8,000万ユーロ",
      },
    ],
    storyRest:
      "ピッチ中央でほとんど走らず、冷徹な目で試合の分岐を計算し続けています。あなたがパスを出さないのは迷っているからではなく、脳内市場において「まだ相場が悪い」と判断しているためです。現実で一歩目を遅らせるその思考量は、ここでは敵が勝手に動いて正解を教えてくれるまで待つ、高度な支配として機能しています。",
    episodeOne: {
      heading: "89分間の前処理",
      body: "試合開始から一度も決定的なパスを出さず、実況席が心配し始めた89分、突然一本だけ通して決勝点。試合後は「前半から見えていました」と語り、監督だけが少し怒りました。",
    },
    episodeTwo: {
      heading: "絶望に付いた採点",
      body: "味方の雑なトラップを見て天を仰いだ姿があまりに完成されており、翌週から観客が「本日の絶望角度」を採点。プレーしていない時間にも公式グッズが売れ始めました。",
    },
    handlingGuideCommon: [
      "静止中も内部では大量の演算が走っています。再起動しないでください。",
      "「早く決めて」は処理速度を上げず、検討項目を一つ増やします。",
      "締切は一つではなく、仮締切・本締切・本当の本締切の三段階で設定してください。",
    ],
    stats: [
      { label: "戦術演算", value: 100 },
      { label: "俯瞰視野", value: 98 },
      { label: "パス精度", value: 97 },
      { label: "初動", value: 19 },
      { label: "絶望の角度", value: 96 },
      { label: "締切直前補正", value: 99 },
    ],
    skills: [
      {
        name: "STILLNESS CALCULATOR",
        description: "動かない時間を、全員分の未来予測へ変換する。",
      },
      {
        name: "LAST MINUTE ORACLE",
        description:
          "締切または試合終了が近づくほど、唯一の正解だけが鮮明になる。",
      },
    ],
    finalSystemVerdict:
      "現実で迷いと呼ばれた時間は、この世界では、誰にも見えない分岐を最後まで見届ける能力として確認されました。",
    scoutReportCopy:
      "89分間、動かない。最後の1分だけ、全員より正しい。\nピッチ中央に思考聖域を展開する、動かざる司令塔。",
    worldlineStoryCopy:
      "あなたがパスを出さないのは、迷っているからではない。脳内市場で、まだ相場が悪いだけだ。敵が答えを見せるまで待ち、最後の一手だけで試合を回収する。",
    visualKey: "football-still-midfield-oracle",
  },
  "energy-saver": {
    baseTypeId: "energy-saver",
    positions: ["CF", "Poacher"],
    assessments: [
      {
        realTrait: "必要性を感じないことには、驚くほど動かない",
        translatedAbility:
          "得点確率が最大になる瞬間だけ起動する「選択的スプリント」",
        amount: "＋7,200万ユーロ",
      },
      {
        realTrait: "自分のペースと空間を崩されると、静かに距離を取る",
        translatedAbility: "相手守備の視界外へ自然消滅する「不可侵ポジショニング」",
        amount: "＋4,600万ユーロ",
      },
      {
        realTrait: "周囲が慌てても、自分の速度を変えない",
        translatedAbility: "混戦の心拍数を平常時に保つ「静音フィニッシュ」",
        amount: "＋1,800万ユーロ",
      },
    ],
    storyRest:
      "走行距離だけを見た分析官は毎回あなたを低評価しますが、ボールが最もおいしい場所へ来る瞬間だけ、誰より短い移動で得点します。現実でマイペースと呼ばれるその省エネ性は、ここでは九十分を無駄に消耗せず、必要な一秒へ全電力を残す才能です。",
    episodeOne: {
      heading: "2.8kmで二得点",
      body: "GPSベストの故障を疑われるほど走らず、それでも二得点。データ班が映像を確認した結果、「歩いていた場所が毎回正しかった」という最も指導しにくい結論へ到達しました。",
    },
    episodeTwo: {
      heading: "プレス会議からの離脱",
      body: "全員で激しく追う戦術の説明中、「それ、最後に自分が取ればよくないですか」と発言。実戦で本当に最後だけ奪ったため、監督は反論資料を静かに閉じました。",
    },
    handlingGuideCommon: [
      "バッテリー表示が8%でも正常です。得点機会には必要分だけ起動します。",
      "「とにかく走れ」は非対応コマンドです。目的地と理由を同時に伝えてください。",
      "一平方メートル以上の静かな待機領域を確保すると、決定力が安定します。",
    ],
    stats: [
      { label: "位置取り", value: 98 },
      { label: "決定力", value: 95 },
      { label: "電力管理", value: 100 },
      { label: "不要スプリント", value: 3 },
      { label: "平常心", value: 97 },
      { label: "自分の時間", value: 99 },
    ],
    skills: [
      {
        name: "SELECTIVE BOOT",
        description:
          "得点確率が閾値を越えた時だけ、保存していた全電力を解放する。",
      },
      {
        name: "OFF-BALL HIBERNATION",
        description: "相手の意識から一時的に消え、最も困る場所で再起動する。",
      },
    ],
    finalSystemVerdict:
      "現実で動かなかった時間も、この世界では、本当に必要な瞬間を見失わないための余白として記録されています。",
    scoutReportCopy:
      "走行距離2.8km、二得点。\n動かないのではない。必要な一歩以外を、正式に不採用としている。",
    worldlineStoryCopy:
      "試合の大半を静かに節電し、ボールが最もおいしい場所へ来る一秒だけ起動する。分析官は困り、相手DFは見失い、本人だけが予定どおり帰宅する。",
    visualKey: "football-silent-poacher",
  },
  "burnout-follower": {
    baseTypeId: "burnout-follower",
    positions: ["CMF", "Box-to-Box Midfielder"],
    assessments: [
      {
        realTrait: "他人の顔色を読み、問題が起こる前に先回りする",
        translatedAbility:
          "味方が空けた穴を本能ですべて埋める「驚異のカバー範囲と危機察知」",
        amount: "＋1億2,000万ユーロ",
      },
      {
        realTrait: "責任や注目が集まる前に、誰かへ判断を渡したくなる",
        translatedAbility: "ボールを持った瞬間に放たれる「光速のキラーパス」",
        amount: "＋3,000万ユーロ",
      },
    ],
    storyRest:
      "味方が空けたスペースを死に物狂いでカバーし、ボールを持てば「私に注目しないで」という一心で神がかったパスを供給します。現実であなたを疲れさせる過剰な気遣いは、ここではチームを裏側から成立させる無双の献身性として高く評価されています。ただし全員を助けたあと、自分の給水だけを忘れます。",
    episodeOne: {
      heading: "十一人目ではなく十二人分",
      body: "左SBの穴を埋め、右WGの戻りを助け、主審が落としたカードまで拾って手渡しました。走行距離は20kmを突破し、試合後の本人だけが「何か足りなかった気がする」と反省しています。",
    },
    episodeTwo: {
      heading: "注目回避の決定的パス",
      body: "ゴール前で完全にフリーになった瞬間、観客全員の視線を感知。シュートではなく隣の味方へ秒速で渡し、結果的に年間最優秀アシストへ選ばれました。",
    },
    handlingGuideCommon: [
      "「大丈夫？」と聞くと反射的に「大丈夫です」と答えます。数値を確認してください。",
      "空いている仕事を視界へ入れないでください。担当者がいても回収します。",
      "休養日は予定として明記してください。「暇なら休んで」は追加業務を探す合図になります。",
    ],
    stats: [
      { label: "危機察知", value: 99 },
      { label: "カバー範囲", value: 100 },
      { label: "パス速度", value: 98 },
      { label: "献身性", value: 100 },
      { label: "自己保存", value: 12 },
      { label: "視線回避", value: 96 },
    ],
    skills: [
      {
        name: "PANIC BALANCE",
        description: "味方の配置が崩れるほど、本人だけが全ポジションへ同時に近づく。",
      },
      {
        name: "ATTENTION ESCAPE PASS",
        description: "注目が集まった瞬間、最も正しい相手へボールと責任を届ける。",
      },
    ],
    finalSystemVerdict:
      "現実で背負いすぎたその気遣いは、この世界では、誰も気づかなかった崩れを先に支える能力として登録されています。",
    scoutReportCopy:
      "味方の穴をすべて埋め、注目だけは光速で手放す。\n20km走って「何か足りなかった」と反省する、究極のバランサー。",
    worldlineStoryCopy:
      "全員の悲劇を先回りし、空いた場所を一人で埋め続ける。ボールと責任は光速で味方へ届けるのに、自分の給水だけは毎回きれいに忘れている。",
    visualKey: "football-covering-midfielder",
  },
};

const VARIANTS_BY_BASE_TYPE: Record<BaseTypeId, VariantContent[]> = {
  "dominant-creator": [
    {
      variant: "A",
      worldlineId: "AS-FB-DC-A",
      registeredName: "開幕強奪型・ワンタッチ皇帝",
      rank: "SSS",
      valuationAmount: "1億9,600万ユーロ",
      deductionReason:
        "選手紹介が終わる前に先制してしまい、スポンサー露出時間を削る傾向",
      deductionAmount: "－2,200万ユーロ",
      storyOpening:
        "この世界線において、あなたは試合開始の笛を「許可」ではなく「事後報告」として扱う人物です。",
      replacementEpisodeBody:
        "コイントス中に相手陣の空きスペースを予約し、主審から「まだです」と二度注意されました。",
      replacementHandlingGuide:
        "キックオフ前にボールを見せないでください。始まったと判断します。",
    },
    {
      variant: "B",
      worldlineId: "AS-FB-DC-B",
      registeredName: "戦術上書き型・ピッチハイジャッカー",
      rank: "SS",
      valuationAmount: "2億ユーロ",
      deductionReason:
        "敵味方を問わず戦術ボードへ追記するため、油性ペンの年間費用が高騰",
      deductionAmount: "－1,800万ユーロ",
      storyOpening:
        "この世界線において、あなたは戦術を守る選手ではなく、試合中に戦術の最新版を配布する選手です。",
      replacementEpisodeBody:
        "相手監督の指示まで改善し、敵チームから一度だけ丁寧なお礼状が届きました。",
      replacementHandlingGuide:
        "ホワイトボードを与える場合、消せるペンだけを同梱してください。",
    },
    {
      variant: "C",
      worldlineId: "AS-FB-DC-C",
      registeredName: "秒速決裁型・ノータイムキング",
      rank: "SSR",
      valuationAmount: "1億8,700万ユーロ",
      deductionReason:
        "試合後インタビューを「結論から言うと」で4秒終了させる放映上の問題",
      deductionAmount: "－3,100万ユーロ",
      storyOpening: "この世界線において、あなたの判断には読み込み画面が存在しません。",
      replacementEpisodeBody:
        "PK戦の順番を全員分決めたあと、自分で一本目を蹴り、戻ってから監督へ報告しました。",
      replacementHandlingGuide:
        "「どう思う？」と尋ねる前に、回答を受け取る準備を完了してください。",
    },
  ],
  "procrastination-dictator": [
    {
      variant: "A",
      worldlineId: "AS-FB-PD-A",
      registeredName: "聖域の静止型・ディクテーター",
      rank: "SSR",
      valuationAmount: "1億4,800万ユーロ",
      deductionReason: "試合前のポカリ過剰摂取による腹痛リスク",
      deductionAmount: "－8,000万ユーロ",
      storyOpening:
        "この世界線において、あなたはピッチ中央を自分専用の思考聖域として登録しています。",
      replacementEpisodeBody:
        "給水の銘柄比較に時間を使い、キックオフ直前にポカリを一気飲み。演算能力より先に腹部が起動しました。",
      replacementHandlingGuide:
        "試合前の飲料は一本だけ渡してください。比較対象を置くと選定会議が始まります。",
    },
    {
      variant: "B",
      worldlineId: "AS-FB-PD-B",
      registeredName: "未決定の完成形・シミュレーション公爵",
      rank: "SS",
      valuationAmount: "1億7,400万ユーロ",
      deductionReason:
        "スパイク候補を左右6足ずつ持参し、選定中にアップ時間を失う傾向",
      deductionAmount: "－5,400万ユーロ",
      storyOpening:
        "この世界線において、あなたは「まだ決めていない」という状態を最も完成された戦術として扱います。",
      replacementEpisodeBody:
        "左右で別モデルのスパイクを履いて出場し、「比較検証です」と説明。その試合だけ両足から同数のアシストを記録しました。",
      replacementHandlingGuide:
        "選択肢は最大三つまで。四つ目から競合比較表を作り始めます。",
    },
    {
      variant: "C",
      worldlineId: "AS-FB-PD-C",
      registeredName: "永久保留型・ラストミニット予言者",
      rank: "SSR",
      valuationAmount: "1億5,500万ユーロ",
      deductionReason:
        "提出書類を完璧に推敲し、移籍市場終了3秒後に送信する事務リスク",
      deductionAmount: "－7,300万ユーロ",
      storyOpening:
        "この世界線において、あなたの才能は締切の最後の一秒だけ完全体になります。",
      replacementEpisodeBody:
        "後半ロスタイムまで一度もシュートせず、終了間際に決勝点。本人は喜ぶ前に「もっと良いコースがあった」と映像を見返しました。",
      replacementHandlingGuide:
        "締切の表示には秒まで含めてください。日付だけでは当日の23時59分59秒を正式時刻と判断します。",
    },
  ],
  "energy-saver": [
    {
      variant: "A",
      worldlineId: "AS-FB-ES-A",
      registeredName: "不可侵の省電力型・サイレントポーチャー",
      rank: "S+",
      valuationAmount: "9,600万ユーロ",
      deductionReason: "ハーフタイムに使用したベンチ用電気毛布から離れない傾向",
      deductionAmount: "－4,000万ユーロ",
      storyOpening:
        "この世界線において、あなたは走行距離ではなく「動かなかった距離」で評価される稀少な選手です。",
      replacementEpisodeBody:
        "後半開始に一分遅れて戻り、その一分後に得点。電気毛布メーカーだけが即座にスポンサー契約を申し出ました。",
      replacementHandlingGuide:
        "ハーフタイムの保温器具は終了三分前に回収してください。",
    },
    {
      variant: "B",
      worldlineId: "AS-FB-ES-B",
      registeredName: "低燃費潜伏型・ゴール前冬眠者",
      rank: "S",
      valuationAmount: "1億700万ユーロ",
      deductionReason:
        "遠征先ホテルの枕が合わない場合、翌日の起動時刻が読めない問題",
      deductionAmount: "－2,900万ユーロ",
      storyOpening:
        "この世界線において、あなたは試合中にも必要な瞬間まで深く休める、ゴール前の冬眠者です。",
      replacementEpisodeBody:
        "相手DFが完全にマークを外した理由を「さっきまで寝ているように見えた」と証言。本人は目を閉じて位置を確認していただけでした。",
      replacementHandlingGuide:
        "遠征には本人指定の枕を帯同メンバーとして登録してください。",
    },
    {
      variant: "C",
      worldlineId: "AS-FB-ES-C",
      registeredName: "必要時だけ伝説型・エコノミーエース",
      rank: "SSR",
      valuationAmount: "1億ユーロ",
      deductionReason: "延長戦を避けるため、同点でも帰宅準備を始める心理的リスク",
      deductionAmount: "－3,600万ユーロ",
      storyOpening:
        "この世界線において、あなたは必要な時だけ伝説になり、それ以外の時間はできるだけ一般人でいようとします。",
      replacementEpisodeBody:
        "延長突入の気配を察し、終了間際に決勝点。喜びの輪を抜け、誰より早くロッカーへ戻って着替えを始めました。",
      replacementHandlingGuide:
        "帰宅予定時刻を共有すると、そこから逆算して得点する場合があります。",
    },
  ],
  "burnout-follower": [
    {
      variant: "A",
      worldlineId: "AS-FB-BF-A",
      registeredName: "究極の献身・パニックバランサー",
      rank: "S",
      valuationAmount: "8,500万ユーロ",
      deductionReason: "極限のプレッシャーによるオウンゴール率の高さ",
      deductionAmount: "－6,500万ユーロ",
      storyOpening:
        "この世界線において、あなたはピッチ上のすべての悲劇を一人で背負う究極のバランサーです。",
      replacementEpisodeBody:
        "相手FWまでフリーに見えて思わずカバーへ入り、自陣ゴールへ完璧なワンタッチ。謝罪は味方、相手、観客、芝生の順に行われました。",
      replacementHandlingGuide: "守る対象は味方だけだと、試合前に明文化してください。",
    },
    {
      variant: "B",
      worldlineId: "AS-FB-BF-B",
      registeredName: "全方位救護型・スペース埋め職人",
      rank: "S+",
      valuationAmount: "1億600万ユーロ",
      deductionReason:
        "ボールボーイの業務まで手伝い、リスタートへ戻れない運用リスク",
      deductionAmount: "－4,400万ユーロ",
      storyOpening: "この世界線において、あなたの担当範囲はピッチ内に収まりません。",
      replacementEpisodeBody:
        "タッチライン外へ出たボールを自分で拾い、別の選手へ渡し、その選手の空いた場所まで自分で埋めました。",
      replacementHandlingGuide:
        "「それはスタッフの仕事です」という停止コマンドを全員で共有してください。",
    },
    {
      variant: "C",
      worldlineId: "AS-FB-BF-C",
      registeredName: "注目回避型・ワンタッチ救世主",
      rank: "SS",
      valuationAmount: "9,200万ユーロ",
      deductionReason:
        "ヒーローインタビューから味方を探して逃走するため、放送枠が不安定",
      deductionAmount: "－5,800万ユーロ",
      storyOpening: "この世界線において、あなたは英雄になる直前に、英雄の座を誰かへパスします。",
      replacementEpisodeBody:
        "決勝アシスト後のインタビューで「最後に触ったのはあの人なので」と味方を壇上へ置き、自分は広告ボードの裏から拍手していました。",
      replacementHandlingGuide:
        "表彰時は出口を一時的に閉鎖してください。称賛を察知すると帰ろうとします。",
    },
  ],
};

function buildResultContent(
  base: BaseTypeContent,
  variant: VariantContent,
): ResultContent {
  return {
    id: variant.worldlineId,
    worldlineId: variant.worldlineId,
    worldlineName: WORLDLINE_NAME,
    baseTypeId: base.baseTypeId,
    variant: variant.variant,
    registeredName: variant.registeredName,
    rank: variant.rank,
    positions: base.positions,
    valuationAmount: variant.valuationAmount,
    assessments: base.assessments,
    deduction: {
      reason: variant.deductionReason,
      amount: variant.deductionAmount,
    },
    story: `${variant.storyOpening}${base.storyRest}`,
    episodes: [
      formatEpisode(base.episodeOne),
      formatEpisode(base.episodeTwo),
      variant.replacementEpisodeBody,
    ],
    handlingGuide: [...base.handlingGuideCommon, variant.replacementHandlingGuide],
    stats: base.stats,
    skills: base.skills,
    finalSystemVerdict: base.finalSystemVerdict,
    scoutReportCopy: base.scoutReportCopy,
    worldlineStoryCopy: base.worldlineStoryCopy,
    visualKey: base.visualKey,
  };
}

const BASE_TYPE_ORDER: BaseTypeId[] = [
  "dominant-creator",
  "procrastination-dictator",
  "energy-saver",
  "burnout-follower",
];

export const RESULT_CONTENTS: ResultContent[] = BASE_TYPE_ORDER.flatMap((baseTypeId) =>
  VARIANTS_BY_BASE_TYPE[baseTypeId].map((variant) =>
    buildResultContent(BASE_TYPE_CONTENTS[baseTypeId], variant),
  ),
);

const VARIANT_IDS_BY_INDEX: VariantId[] = ["A", "B", "C"];

/**
 * Deterministically resolves one of the 12 approved RESULT_CONTENTS entries
 * from a base type and the current basic 4-question / 4-choice answer set,
 * per MATRIX §1's variant selection rule. Pure function, no randomness.
 */
export function resolveResultContent(
  baseTypeId: ResultContent["baseTypeId"],
  answerIndexes: number[],
): ResultContent {
  if (answerIndexes.length !== 4) {
    throw new Error(
      `resolveResultContent: expected exactly 4 answer indexes, received ${answerIndexes.length}.`,
    );
  }

  answerIndexes.forEach((answerIndex, position) => {
    if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex > 3) {
      throw new Error(
        `resolveResultContent: answerIndexes[${position}] must be an integer between 0 and 3, received ${answerIndex}.`,
      );
    }
  });

  const answerSignature = answerIndexes.reduce(
    (signature, answerIndex) => signature * 4 + answerIndex,
    0,
  );

  const variantIndex = answerSignature % 3;
  const variant = VARIANT_IDS_BY_INDEX[variantIndex];

  const resultContent = RESULT_CONTENTS.find(
    (content) => content.baseTypeId === baseTypeId && content.variant === variant,
  );

  if (!resultContent) {
    throw new Error(
      `resolveResultContent: no RESULT_CONTENTS entry found for baseTypeId "${baseTypeId}" and variant "${variant}".`,
    );
  }

  return resultContent;
}
