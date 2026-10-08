import { TextAnalysisResult, SentimentType, EmotionType } from '../types/sentiment';

const POSITIVE_LEXICON: Record<string, number> = {
  love: 3,
  loved: 3,
  loves: 3,
  loving: 3,
  great: 3,
  amazing: 4,
  excellent: 4,
  awesome: 4,
  fantastic: 4,
  wonderful: 4,
  superb: 4,
  best: 3,
  good: 2,
  nice: 2,
  recommend: 3,
  recommended: 3,
  enjoyed: 3,
  happy: 3,
  delighted: 4,
  pleased: 2,
  impressed: 3,
  brilliant: 4,
  perfect: 4,
  helpful: 2,
  friendly: 2,
  fun: 2,
  smooth: 2,
  clean: 2,
  flawless: 4,
  stellar: 4,
};

const NEGATIVE_LEXICON: Record<string, number> = {
  bad: -2,
  terrible: -4,
  horrible: -4,
  awful: -4,
  disappointed: -3,
  disappointing: -3,
  disappointment: -3,
  worst: -4,
  hate: -4,
  hated: -4,
  poor: -2,
  slow: -2,
  broken: -3,
  useless: -3,
  fail: -3,
  failed: -3,
  rude: -3,
  waste: -3,
  annoying: -3,
  frustrating: -3,
  scam: -4,
  trash: -4,
  pathetic: -4,
  sucks: -3,
  problem: -2,
  issue: -2,
  bug: -2,
  delay: -2,
  delayed: -2,
  expensive: -2,
};

const EMOTION_MAP: Record<string, EmotionType> = {
  love: 'Love',
  loved: 'Love',
  adore: 'Love',
  cherish: 'Love',
  amazing: 'Joy',
  great: 'Joy',
  happy: 'Joy',
  excellent: 'Joy',
  awesome: 'Joy',
  fantastic: 'Joy',
  wonderful: 'Joy',
  delighted: 'Joy',
  sad: 'Sadness',
  depressed: 'Sadness',
  disappointed: 'Sadness',
  unhappy: 'Sadness',
  sorry: 'Sadness',
  miss: 'Sadness',
  angry: 'Anger',
  furious: 'Anger',
  rude: 'Anger',
  hate: 'Anger',
  rage: 'Anger',
  annoyed: 'Anger',
  scared: 'Fear',
  fear: 'Fear',
  terrified: 'Fear',
  worried: 'Fear',
  anxious: 'Fear',
  risk: 'Fear',
};

export function analyzeSocialText(input: string): TextAnalysisResult {
  const clean = input.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);

  let posScore = 0;
  let negScore = 0;
  const posDetected: string[] = [];
  const negDetected: string[] = [];
  const emotionCounts: Record<EmotionType, number> = {
    Joy: 0,
    Neutral: 0,
    Sadness: 0,
    Anger: 0,
    Fear: 0,
    Love: 0,
  };

  words.forEach((w) => {
    if (POSITIVE_LEXICON[w]) {
      posScore += POSITIVE_LEXICON[w];
      if (!posDetected.includes(w)) posDetected.push(w);
    }
    if (NEGATIVE_LEXICON[w]) {
      negScore += Math.abs(NEGATIVE_LEXICON[w]);
      if (!negDetected.includes(w)) negDetected.push(w);
    }
    if (EMOTION_MAP[w]) {
      emotionCounts[EMOTION_MAP[w]]++;
    }
  });

  let sentiment: SentimentType = 'Neutral';
  let confidence = 78;
  let emotion: EmotionType = 'Neutral';

  const diff = posScore - negScore;
  const totalWeight = posScore + negScore;

  if (diff > 1) {
    sentiment = 'Positive';
    confidence = Math.min(98, Math.max(82, 85 + diff * 3));
    emotion = emotionCounts.Love > 0 ? 'Love' : 'Joy';
  } else if (diff < -1) {
    sentiment = 'Negative';
    confidence = Math.min(97, Math.max(80, 84 + Math.abs(diff) * 3));
    if (emotionCounts.Anger > 0) emotion = 'Anger';
    else if (emotionCounts.Fear > 0) emotion = 'Fear';
    else emotion = 'Sadness';
  } else {
    sentiment = 'Neutral';
    confidence = totalWeight === 0 ? 88 : 76;
    emotion = 'Neutral';
  }

  // Explanation sentence
  let explanation = '';
  if (sentiment === 'Positive') {
    explanation = `High polarity positive expressions identified (${posDetected.join(', ')}). Tone demonstrates strong consumer satisfaction and affinity.`;
  } else if (sentiment === 'Negative') {
    explanation = `Critical pain points and negative sentiment indicators detected (${negDetected.join(', ')}). Suggests friction or dissatisfaction.`;
  } else {
    explanation = `Balanced or informative syntax without strong subjective polarizing cues. Categorized as objective neutral commentary.`;
  }

  const normTotal = Math.max(1, posScore + negScore + 2);
  const positiveScore = Math.round(((posScore + (sentiment === 'Neutral' ? 0.5 : 1)) / (normTotal + 1)) * 100);
  const negativeScore = Math.round(((negScore + (sentiment === 'Neutral' ? 0.5 : 0)) / (normTotal + 1)) * 100);
  const neutralScore = Math.max(5, 100 - positiveScore - negativeScore);

  return {
    text: input,
    sentiment,
    confidence,
    emotion,
    positiveIndicators: posDetected,
    negativeIndicators: negDetected,
    neutralIndicators: words.filter((w) => !POSITIVE_LEXICON[w] && !NEGATIVE_LEXICON[w]).slice(0, 4),
    explanation,
    summary: {
      positiveScore,
      neutralScore,
      negativeScore,
    },
  };
}
