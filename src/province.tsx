import { Paper, useTheme } from "@mui/material";
import { ProvinceLeader } from "./types/province_leader";
import { getColorForIdeology } from "./helpers/getColorForIdeology";
import { PROVINCE_SIZE_PX, useGameStore } from "./App";
import { useEffect, useState } from "react";

type Decision =
  | { type: "idle" }
  | { type: "establish trade relationship"; id: string }
  | { type: "fight"; id: string };

export function Province(props: { leader: ProvinceLeader }) {
  const { leader } = props;
  const { palette } = useTheme();
  const bgcolor = getColorForIdeology(leader.ideology);
  const update = useGameStore((state) => state.update);

  const [currentFocus, setCurrentFocus] = useState<Decision>({ type: "idle" });

  useEffect(() => {
    const situation = getSituation({ leader });
    const potentialDecisions = getDecisions({ leader, situation });
    const decision = pickFromDecisions(potentialDecisions);
    if (currentFocus !== decision) setCurrentFocus(decision);

    console.log(leader.name, currentFocus);
  }, [update]);

  return (
    <Paper
      elevation={3}
      sx={{
        height: PROVINCE_SIZE_PX,
        width: PROVINCE_SIZE_PX,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor,
        color: palette.getContrastText(bgcolor),
      }}
    >
      {leader.name}
    </Paper>
  );
}

type Opinion = {
  weight: number;
  reason: string;
};
type LeaderAssessment = {
  leader: ProvinceLeader;
  distance: number;
  threat: number;
  opinions: Opinion[];
  strengthComparedToMe: number;
  valueOfResourcesToMe: number;
};

interface Situation {
  leaderAssessments: LeaderAssessment[];
  calmnessPercent: number;
}

function getSituation(props: { leader: ProvinceLeader }) {
  const situation: Situation = { leaderAssessments: [], calmnessPercent: 0.5 };

  return situation;
}

function getDecisions(props: {
  leader: ProvinceLeader;
  situation: Situation;
}): Decision[] {
  const { leader, situation } = props;

  const decisions: Decision[] = [];

  if (leader.stance === "aggressive") {
    if (situation.calmnessPercent > 0.7) {
      const target = findWarTarget();
      decisions.push({ type: "fight", id: target.id });
    }
  }
  if (leader.stance === "defensive") {
  }
  if (leader.stance === "economic") {
    const target = findEconomicTarget();
    decisions.push({ type: "establish trade relationship", id: target.id });
  }
  if (leader.stance === "diplomatic") {
  }

  return decisions;
}

function findWarTarget(): ProvinceLeader {
  // generate list ranked by weakest
  // determine closest
  // determine most valuable
  // pick target
  return {} as ProvinceLeader;
}

function findEconomicTarget(): ProvinceLeader {
  // find what leaders have resources i want
  // determine friendliest
  // determine most valuable
  // pick target
  return {} as ProvinceLeader;
}

function pickFromDecisions(decisions: Decision[]): Decision {
  // iterate and assign value to decisions

  const scoredDecisions = decisions.map((decision) => {
    return { decision: decision, score: Math.random() };
  });

  scoredDecisions.sort((a, b) => b.score - a.score);
  return scoredDecisions[0]?.decision;
}
