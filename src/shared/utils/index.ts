import { ColorStone } from "../types";

export function getRandomPosition(maxPercentage = 80): number {
    return Math.floor(Math.random() * maxPercentage);
}

// Function to count the number of stones of each color
export function calculateColorCounts(stones: ColorStone[]): Record<string, number> {
    const colorCounts: Record<string, number> = {};

    stones.forEach((stone) => {
        colorCounts[stone.name] = (colorCounts[stone.name] || 0) + 1;
    });

    return colorCounts;
}
