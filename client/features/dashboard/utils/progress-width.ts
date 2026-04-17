const WIDTH_CLASSES = [
  "w-[8%]",
  "w-[10%]",
  "w-[20%]",
  "w-[30%]",
  "w-[40%]",
  "w-[50%]",
  "w-[60%]",
  "w-[70%]",
  "w-[80%]",
  "w-[90%]",
  "w-[100%]",
] as const;

export const getProgressWidthClass = (value: number, max: number) => {
  if (max <= 0 || value <= 0) {
    return WIDTH_CLASSES[0];
  }

  const ratio = Math.min(100, Math.max(8, Math.round((value / max) * 100)));

  if (ratio >= 100) return WIDTH_CLASSES[10];
  if (ratio >= 90) return WIDTH_CLASSES[9];
  if (ratio >= 80) return WIDTH_CLASSES[8];
  if (ratio >= 70) return WIDTH_CLASSES[7];
  if (ratio >= 60) return WIDTH_CLASSES[6];
  if (ratio >= 50) return WIDTH_CLASSES[5];
  if (ratio >= 40) return WIDTH_CLASSES[4];
  if (ratio >= 30) return WIDTH_CLASSES[3];
  if (ratio >= 20) return WIDTH_CLASSES[2];
  if (ratio >= 10) return WIDTH_CLASSES[1];

  return WIDTH_CLASSES[0];
};
