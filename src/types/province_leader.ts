import { Ideology } from "./ideology";

export type ProvinceLeader = {
  id: string;
  name: string;
  following: ProvinceLeader | null;
  ideology: Ideology;
  stance: "aggressive" | "defensive" | "economic" | "diplomatic";
};
