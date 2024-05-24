'use client';
// Function to calculate activity time
export function calculateActivityTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

