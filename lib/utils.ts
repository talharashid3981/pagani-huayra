import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampValue(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function getPhaseProgress(
  value: number,
  range: readonly [number, number],
) {
  const [start, end] = range;
  if (end === start) {
    return 0;
  }

  return clampValue((value - start) / (end - start));
}
