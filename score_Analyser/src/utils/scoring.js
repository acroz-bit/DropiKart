const MAX_SCORES = {
  criteria: 80,
  market: 15,
  competition: 5,
  total: 100,
};

const toNumber = (value) => {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const formatDisplayDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getYesNoScore = (value, yesScore = 5) => (value === "yes" ? yesScore : 0);

const getLevelScore = (value, scores) => scores[value] ?? 0;

const getVolumeScore = (length, width, height) => {
  const volume = length * width * height;

  if (!volume) return 0;
  if (volume <= 1500) return 5;
  if (volume <= 5000) return 4;
  if (volume <= 10000) return 3;
  if (volume <= 20000) return 2;

  return 1;
};

const getMarginScore = (sellingPrice, productCostPrice) => {
  if (!sellingPrice || !productCostPrice || sellingPrice <= productCostPrice) {
    return 0;
  }

  const marginPercent = ((sellingPrice - productCostPrice) / sellingPrice) * 100;

  if (marginPercent >= 70) return 10;
  if (marginPercent >= 60) return 8;
  if (marginPercent >= 50) return 6;
  if (marginPercent >= 40) return 4;
  if (marginPercent >= 25) return 2;

  return 0;
};

const getMarkupScore = (sellingPrice, productCostPrice) => {
  if (!sellingPrice || !productCostPrice || sellingPrice <= productCostPrice) {
    return 0;
  }

  const markupRatio = sellingPrice / productCostPrice;

  if (markupRatio >= 3 && markupRatio <= 5) return 5;
  if (markupRatio >= 2.2) return 4;
  if (markupRatio >= 1.8) return 3;
  if (markupRatio >= 1.4) return 2;

  return 1;
};

const getTrendMomentumScore = (startValue, currentValue) => {
  const trendDelta = currentValue - startValue;

  if (trendDelta >= 25) return 5;
  if (trendDelta >= 15) return 4;
  if (trendDelta >= 5) return 3;
  if (trendDelta >= 0) return 2;
  if (trendDelta >= -10) return 1;

  return 0;
};

const getMarketScore = (currentTrendValue) => {
  if (currentTrendValue >= 80) return 15;
  if (currentTrendValue >= 65) return 12;
  if (currentTrendValue >= 50) return 9;
  if (currentTrendValue >= 35) return 6;
  if (currentTrendValue >= 20) return 3;

  return 0;
};

const getCompetitionScore = (activeAds) => {
  if (activeAds <= 20) return 5;
  if (activeAds <= 50) return 4;
  if (activeAds <= 100) return 3;
  if (activeAds <= 250) return 2;
  if (activeAds <= 500) return 1;

  return 0;
};

export const getCompetitionLevel = (activeAds) => {
  if (activeAds <= 50) return "Low Competition";
  if (activeAds <= 250) return "Medium Competition";

  return "High Competition";
};

const getVerdict = (totalScore) => {
  if (totalScore >= 75) {
    return {
      label: "Winning Product",
      tone: "winning",
      message: "This product has strong validation signals and is worth testing.",
    };
  }

  if (totalScore >= 50) {
    return {
      label: "Average Product",
      tone: "average",
      message: "This product has potential, but it needs a better offer or angle.",
    };
  }

  return {
    label: "Weak Product",
    tone: "weak",
    message: "This product needs major improvement before you spend on scaling.",
  };
};

const uniqueItems = (items) => [...new Set(items.filter(Boolean))];

const getStrengths = (scores, inputs) => {
  const strengths = [];

  if (scores.sizeScore >= 4) {
    strengths.push("Compact size can help with shipping and fulfillment.");
  }

  if (scores.marginScore >= 8) {
    strengths.push("Strong profit margin leaves room for ad spend.");
  }

  if (scores.markupScore >= 4) {
    strengths.push("The price-to-cost ratio is healthy for testing.");
  }

  if (inputs.improvesConfidence === "yes") strengths.push("Improves customer confidence.");
  if (inputs.improvesConvenience === "yes") strengths.push("Improves convenience for the buyer.");
  if (inputs.savesTime === "yes") strengths.push("Saves time for the customer.");
  if (inputs.solvesRealProblem === "yes") strengths.push("Solves a real customer problem.");
  if (inputs.improvesQualityOfLife === "yes") strengths.push("Improves quality of life.");

  if (inputs.uniqueProduct === "high") {
    strengths.push("Strong product uniqueness.");
  } else if (inputs.uniqueProduct === "medium") {
    strengths.push("Some uniqueness is present in the offer.");
  }

  if (inputs.highPerceivedValue === "high") {
    strengths.push("High perceived value supports stronger pricing.");
  } else if (inputs.highPerceivedValue === "medium") {
    strengths.push("Perceived value is decent.");
  }

  if (inputs.womenDominantCustomerBase === "yes") {
    strengths.push("Women-dominant audience can be easier to target creatively.");
  }

  if (inputs.easyToMarketWithVideos === "yes") {
    strengths.push("The product is suitable for video-based marketing.");
  }

  if (scores.trendMomentumScore >= 4) {
    strengths.push("Search interest is rising this month.");
  }

  if (scores.marketScore >= 12) {
    strengths.push("Current Google Trends demand is strong.");
  }

  if (scores.competitionScore >= 4) {
    strengths.push("Competition level looks manageable.");
  }

  return uniqueItems(strengths).slice(0, 6);
};

const getWeaknesses = (scores, inputs) => {
  const weaknesses = [];

  if (scores.sizeScore <= 2) {
    weaknesses.push("Larger size may increase shipping or handling difficulty.");
  }

  if (scores.marginScore <= 4) {
    weaknesses.push("Profit margin is thin for paid acquisition.");
  }

  if (scores.markupScore <= 2) {
    weaknesses.push("The markup is weak for comfortable testing.");
  }

  if (inputs.improvesConfidence !== "yes") weaknesses.push("Does not clearly improve confidence.");
  if (inputs.improvesConvenience !== "yes") weaknesses.push("Convenience benefit is not strong enough.");
  if (inputs.savesTime !== "yes") weaknesses.push("The time-saving angle is weak.");
  if (inputs.solvesRealProblem !== "yes") weaknesses.push("The product does not clearly solve a real problem.");
  if (inputs.improvesQualityOfLife !== "yes") weaknesses.push("Quality-of-life improvement is limited.");

  if (inputs.uniqueProduct === "low") {
    weaknesses.push("Low uniqueness makes the product easier to copy.");
  }

  if (inputs.highPerceivedValue === "low") {
    weaknesses.push("Perceived value is low for the asking price.");
  }

  if (inputs.womenDominantCustomerBase !== "yes") {
    weaknesses.push("The audience angle may be broader and harder to message.");
  }

  if (inputs.easyToMarketWithVideos !== "yes") {
    weaknesses.push("It may be harder to sell with visual creatives.");
  }

  if (scores.trendMomentumScore <= 1) {
    weaknesses.push("Trend momentum is flat or falling this month.");
  }

  if (scores.marketScore <= 6) {
    weaknesses.push("Current search demand looks limited.");
  }

  if (scores.competitionScore <= 1) {
    weaknesses.push("Competition appears crowded based on active ads.");
  }

  return uniqueItems(weaknesses).slice(0, 6);
};

const getTips = (scores, inputs) => {
  const tips = [];

  if (scores.marginScore <= 4 || scores.markupScore <= 2) {
    tips.push("Increase the selling price or reduce sourcing cost to improve margins.");
  }

  if (inputs.uniqueProduct === "low") {
    tips.push("Differentiate the product with a bundle, niche angle, or stronger branding.");
  }

  if (inputs.highPerceivedValue === "low") {
    tips.push("Improve the landing page, packaging, or positioning to raise perceived value.");
  }

  if (inputs.solvesRealProblem !== "yes") {
    tips.push("Focus your messaging on a sharper pain point or use case.");
  }

  if (inputs.easyToMarketWithVideos !== "yes") {
    tips.push("Create stronger demonstrations, before-after content, or UGC-style creatives.");
  }

  if (scores.trendMomentumScore <= 1 || scores.marketScore <= 6) {
    tips.push("Validate demand with small tests before scaling this product.");
  }

  if (scores.competitionScore <= 1) {
    tips.push("Test a niche audience or a stronger offer to compete in a crowded market.");
  }

  return uniqueItems(tips).slice(0, 5);
};

const createResultId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `analysis-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

export const calculateProductScore = (formValues) => {
  const inputs = {
    productName: formValues.productName.trim() || "Untitled Product",
    productLength: clamp(toNumber(formValues.productLength), 0, 10000),
    productWidth: clamp(toNumber(formValues.productWidth), 0, 10000),
    productHeight: clamp(toNumber(formValues.productHeight), 0, 10000),
    sellingPrice: clamp(toNumber(formValues.sellingPrice), 0, 1000000),
    productCostPrice: clamp(toNumber(formValues.productCostPrice), 0, 1000000),
    metaAdsRunning: clamp(toNumber(formValues.metaAdsRunning), 0, 100000),
    googleTrendStart: clamp(toNumber(formValues.googleTrendStart), 0, 100),
    googleTrendCurrent: clamp(toNumber(formValues.googleTrendCurrent), 0, 100),
    improvesConfidence: formValues.improvesConfidence,
    improvesConvenience: formValues.improvesConvenience,
    savesTime: formValues.savesTime,
    solvesRealProblem: formValues.solvesRealProblem,
    improvesQualityOfLife: formValues.improvesQualityOfLife,
    uniqueProduct: formValues.uniqueProduct,
    highPerceivedValue: formValues.highPerceivedValue,
    womenDominantCustomerBase: formValues.womenDominantCustomerBase,
    easyToMarketWithVideos: formValues.easyToMarketWithVideos,
  };

  const sizeScore = getVolumeScore(
    inputs.productLength,
    inputs.productWidth,
    inputs.productHeight
  );
  const marginScore = getMarginScore(inputs.sellingPrice, inputs.productCostPrice);
  const markupScore = getMarkupScore(inputs.sellingPrice, inputs.productCostPrice);
  const trendMomentumScore = getTrendMomentumScore(
    inputs.googleTrendStart,
    inputs.googleTrendCurrent
  );

  const criteriaScore = clamp(
    sizeScore +
      marginScore +
      markupScore +
      getYesNoScore(inputs.improvesConfidence) +
      getYesNoScore(inputs.improvesConvenience) +
      getYesNoScore(inputs.savesTime) +
      getYesNoScore(inputs.solvesRealProblem) +
      getYesNoScore(inputs.improvesQualityOfLife) +
      getLevelScore(inputs.uniqueProduct, { low: 0, medium: 5, high: 10 }) +
      getLevelScore(inputs.highPerceivedValue, { low: 0, medium: 5, high: 10 }) +
      getYesNoScore(inputs.womenDominantCustomerBase) +
      getYesNoScore(inputs.easyToMarketWithVideos) +
      trendMomentumScore,
    0,
    MAX_SCORES.criteria
  );

  const marketScore = getMarketScore(inputs.googleTrendCurrent);
  const competitionScore = getCompetitionScore(inputs.metaAdsRunning);
  const totalScore = clamp(
    criteriaScore + marketScore + competitionScore,
    0,
    MAX_SCORES.total
  );

  const verdict = getVerdict(totalScore);
  const createdAt = new Date().toISOString();

  const scores = {
    sizeScore,
    marginScore,
    markupScore,
    trendMomentumScore,
    criteriaScore,
    marketScore,
    competitionScore,
    totalScore,
  };

  const strengthsList = getStrengths(scores, inputs);
  const weaknessesList = getWeaknesses(scores, inputs);
  const tipsList = getTips(scores, inputs);

  const strengths = strengthsList.length
    ? strengthsList
    : ["This product has a balanced score profile with no standout weakness."];

  const weaknesses = weaknessesList.length
    ? weaknessesList
    : ["No major weakness was flagged by the current formula inputs."];

  const tips = tipsList.length
    ? tipsList
    : ["Run a small real-world test to validate the score before scaling."];

  return {
    id: createResultId(),
    productName: inputs.productName,
    totalScore,
    criteriaScore,
    marketScore,
    competitionScore,
    googleTrends: inputs.googleTrendCurrent,
    googleTrendStart: inputs.googleTrendStart,
    googleTrendCurrent: inputs.googleTrendCurrent,
    activeAds: inputs.metaAdsRunning,
    competitionLevel: getCompetitionLevel(inputs.metaAdsRunning),
    verdict: verdict.label,
    verdictTone: verdict.tone,
    message: verdict.message,
    strengths,
    weaknesses,
    tips,
    inputs,
    formulaBreakdown: [
      { label: "Compact Size", value: sizeScore, max: 5 },
      { label: "Profit Margin", value: marginScore, max: 10 },
      { label: "Price Markup", value: markupScore, max: 5 },
      { label: "Trend Momentum", value: trendMomentumScore, max: 5 },
    ],
    createdAt,
    displayDate: formatDisplayDate(createdAt),
  };
};

export const scoringGuide = [
  { label: "Compact size", max: 5, reason: "Smaller products are easier and cheaper to ship." },
  { label: "Profit margin", max: 10, reason: "Healthy margin gives space for ad spend and profit." },
  { label: "Price markup", max: 5, reason: "A stronger markup makes paid testing safer." },
  { label: "Improves confidence", max: 5, reason: "Emotion-based benefits improve conversion." },
  { label: "Improves convenience", max: 5, reason: "Convenience is a strong buying trigger." },
  { label: "Saves time", max: 5, reason: "Time-saving products are easier to sell quickly." },
  { label: "Solves real problem", max: 5, reason: "Problem-solving products usually convert better." },
  { label: "Improves quality of life", max: 5, reason: "Life-improvement benefits widen appeal." },
  { label: "Unique product", max: 10, reason: "Uniqueness reduces direct comparison with competitors." },
  { label: "High perceived value", max: 10, reason: "Higher perceived value supports stronger pricing." },
  { label: "Women-dominant audience", max: 5, reason: "A focused audience can simplify marketing." },
  { label: "Easy to market with videos", max: 5, reason: "Visual demos perform well in ads and UGC." },
  { label: "Trend momentum", max: 5, reason: "Rising monthly interest is a positive signal." },
  { label: "Google Trends demand", max: 15, reason: "Higher current demand supports stronger market score." },
  { label: "Competition score", max: 5, reason: "Lower ad saturation makes testing easier." },
];
