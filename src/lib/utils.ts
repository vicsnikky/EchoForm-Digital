import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getGrade(score: number) {
  if (score >= 75) return { grade: 'A1', remark: 'Excellent' };
  if (score >= 70) return { grade: 'B2', remark: 'Very Good' };
  if (score >= 65) return { grade: 'B3', remark: 'Good' };
  if (score >= 60) return { grade: 'C4', remark: 'Credit' };
  if (score >= 55) return { grade: 'C5', remark: 'Credit' };
  if (score >= 50) return { grade: 'C6', remark: 'Credit' };
  if (score >= 45) return { grade: 'D7', remark: 'Pass' };
  if (score >= 40) return { grade: 'E8', remark: 'Pass' };
  return { grade: 'F9', remark: 'Fail' };
}
