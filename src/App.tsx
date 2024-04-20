import { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { getRandomEnum as getRandomFromEnum } from "./helpers/getRandomFromEnum";
import { faker } from "@faker-js/faker";
import { ProvinceLeader } from "./types/province_leader";
import { Ideology } from "./types/ideology";
import { create } from "zustand";
import { Province } from "./province";

export interface GameStore {
  update: boolean;
  toggleUpdate: () => void;
  tilemap: ProvinceLeader[][];
  setTilemap: (v: ProvinceLeader[][]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  update: false,
  toggleUpdate: () => set((state) => ({ update: !state.update })),
  tilemap: [],
  setTilemap: (v: ProvinceLeader[][]) => set(() => ({ tilemap: v })),
}));

export const PROVINCE_SIZE_PX = 100;

function App() {
  const store = useGameStore();

  useEffect(() => {
    store.setTilemap(generateTilemap());
  }, [store.setTilemap]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      store.toggleUpdate(); // Call the toggle function every 16 ms
    }, 16);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [store.toggleUpdate]);

  return (
    <>
      <Grid container spacing={2} sx={{ maxWidth: PROVINCE_SIZE_PX * 5 }}>
        {store.tilemap.flat().map((leader, index) => (
          <Grid item key={index} sx={{ minWidth: 100, minHeight: 100 }}>
            <Province leader={leader} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function createProvinceLeader(): ProvinceLeader {
  return {
    id: crypto.randomUUID(),
    name: faker.person.firstName(),
    following: null, // Initially null, setup relationships as needed
    ideology: getRandomFromEnum(Ideology),
    stance: "economic",
  };
}

function generateTilemap(): ProvinceLeader[][] {
  const grid: ProvinceLeader[][] = [];
  for (let y = 0; y < 4; y++) {
    const row: ProvinceLeader[] = [];
    for (let x = 0; x < 4; x++) {
      row.push(createProvinceLeader());
    }
    grid.push(row);
  }
  return grid;
}

export default App;
