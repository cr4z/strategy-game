import { Ideology } from "../types/ideology";

export function getColorForIdeology(ideology: Ideology): string {
    const colorMap: Record<Ideology, string> = {
      [Ideology.Sun]: '#FFFFFF',  // White
      [Ideology.Knight]: '#FF0000',  // Red
      [Ideology.Pillar]: '#0000FF',  // Blue
      [Ideology.Leaf]: '#008000',  // Green
      [Ideology.Door]: '#FFFF00',  // Yellow
      [Ideology.Moon]: '#000000',  // Black
    };
    return colorMap[ideology];
  }