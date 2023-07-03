"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { BREATHE_STATE } from "../lib/breathe/types";
import { nextBreathingState, reset } from "../lib/breathe/helpers";

export default function Breathe(): React.ReactElement {
  const [state, setState] = useState<BREATHE_STATE>(BREATHE_STATE.INHALE);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  useEffect(() => {
    if (!started) {
      return;
    }
    const interval = setInterval(() => {
      if (timeElapsed / 100 >= 1) {
        setTimeElapsed(0);
        setState(nextBreathingState(state));
      } else {
        setTimeElapsed(timeElapsed + (1 / state.duration) * 50);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });
  if (!started) {
    return (
      <main className="overflow-hidden fixed">
        <Header />
        <div
          className="w-screen min-h-screen flex justify-center 
                    flex-col items-center bg-mountains bg-cover"
          style={{ overflow: "hidden" }}
        >
          <Button
            className="w-1/6 h-[3rem] border-2 border-border"
            onClick={() => {
              setStarted(true);
              reset(setTimeElapsed, setState);
              if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
              }
              document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                  setStarted(false);
                }
              });
            }}
          >
            Start
          </Button>
          <div className="text-center text-sm mt-4 absolute bottom-0">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://commons.wikimedia.org/wiki/File:Three_Sisters_from_Police_Creek.jpg"
            >
              Jakub Fryš
            </Link>
            ,
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://creativecommons.org/licenses/by-sa/4.0"
            >
              CC BY-SA 4.0
            </Link>
            , via Wikimedia Commons
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="overflow-hidden fixed w-screen h-screen">
      <div className="w-full h-screen flex justify-center flex-col items-center bg-mountains bg-cover p-4">
        <Card className="w-full md:w-1/2 lg:w-2/5 xl:w-1/4 p-4">
          <h1 className="text-3xl">{state.msg}</h1>
          <Progress value={timeElapsed} max={state.duration} className="mb-4" />
          <Button
            variant="destructive"
            onClick={() => {
              if (document.exitFullscreen) {
                if (window.innerHeight == screen.height) {
                  document.exitFullscreen();
                }
              }
              setStarted(false);
              reset(setTimeElapsed, setState);
            }}
          >
            Stop
          </Button>
        </Card>
        <div className="text-center text-sm mt-4 absolute bottom-0">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://commons.wikimedia.org/wiki/File:Three_Sisters_from_Police_Creek.jpg"
          >
            Jakub Fryš
          </Link>
          ,
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://creativecommons.org/licenses/by-sa/4.0"
          >
            CC BY-SA 4.0
          </Link>
          , via Wikimedia Commons
        </div>
      </div>
    </main>
  );
}
