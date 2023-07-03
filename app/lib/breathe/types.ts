import { Enum } from "../types";

const BREATHE_MSG = {
  INHALE: "Inhale",
  HOLD: "Hold",
  EXHALE: "Exhale",
} as const;

const DURATION = {
  INHALE: 4,
  HOLD: 2,
  EXHALE: 4,
} as const;

type BREATHE_MSG = Enum<typeof BREATHE_MSG>;
type DURATION = Enum<typeof DURATION>;

export const BREATHE_STATE = {
  INHALE: {
    msg: BREATHE_MSG.INHALE,
    duration: DURATION.INHALE,
  },
  HOLD: {
    msg: BREATHE_MSG.HOLD,
    duration: DURATION.HOLD,
  },
  EXHALE: {
    msg: BREATHE_MSG.EXHALE,
    duration: DURATION.EXHALE,
  },
} as const;

export type BREATHE_STATE = Enum<typeof BREATHE_STATE>;
