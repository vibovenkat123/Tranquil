import { Dispatch, SetStateAction } from "react";
import { BREATHE_STATE } from "./types";

export function nextBreathingState(state: BREATHE_STATE): BREATHE_STATE {
  switch (state) {
    case BREATHE_STATE.INHALE:
      return BREATHE_STATE.HOLD;
    case BREATHE_STATE.HOLD:
      return BREATHE_STATE.EXHALE;
    case BREATHE_STATE.EXHALE:
      return BREATHE_STATE.INHALE;
    default:
      return BREATHE_STATE.HOLD;
  }
}

export function reset(
  setTimeElapsed: Dispatch<SetStateAction<number>>,
  setState: Dispatch<SetStateAction<BREATHE_STATE>>
) {
  setTimeElapsed(0);
  setState(BREATHE_STATE.INHALE);
}
